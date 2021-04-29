import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import RefreshTokenController from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticaRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticaRoutes.post("/sessions", authenticateUserController.handle);
authenticaRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticaRoutes };
