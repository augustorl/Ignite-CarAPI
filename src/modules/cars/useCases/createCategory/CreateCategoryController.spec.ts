import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const hashedPassword = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}', 'admin', 'admin@rentx.com.br', '${hashedPassword}', 'true', 'now()', 'xxxxxxx')
      `
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Description supertest",
      })
      .set({
        Authorization: `Bearer ${token},`,
      });

    expect(response.status).toBe(201);
  });

  it("should not able to two categorys with the same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Description supertest",
      })
      .set({
        Authorization: `Bearer ${token},`,
      });

    expect(response.status).toBe(400);
  });
});
