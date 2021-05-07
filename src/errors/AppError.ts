import { StatusCodes } from "http-status-codes";

import { errorMessages } from "./ErrorMessages";

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(
    message: keyof typeof errorMessages,
    statusCode: keyof typeof StatusCodes = "BAD_REQUEST"
  ) {
    this.message = errorMessages[message];
    this.statusCode = StatusCodes[statusCode];
  }
}

export { AppError };
