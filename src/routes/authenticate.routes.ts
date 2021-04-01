import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticaRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticaRoutes.post("/sessions", authenticateUserController.handle);
export { authenticaRoutes };
