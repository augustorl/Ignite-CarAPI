import express, { NextFunction, Response } from "express";
import "reflect-metadata";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import "@shared/infra/typeorm/";

import "@shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
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
app.listen(3333, () => console.log("Server runing on Port:3333"));
