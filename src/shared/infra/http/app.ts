import cors from "cors";
import express, { NextFunction, Response, Request } from "express";
import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import { AppError } from "@errors/AppError";
import createConnection from "@shared/infra/typeorm/";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

import "@shared/container";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(cors());

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
