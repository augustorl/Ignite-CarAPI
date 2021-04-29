import { Response, Request } from "express";
import { container } from "tsyringe";

import RefreshTokenUseCase from "./RefreshTokenUseCase";

export default class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refreshToken = await refreshTokenUseCase.execute(token);

    return response.json(refreshToken);
  }
}
