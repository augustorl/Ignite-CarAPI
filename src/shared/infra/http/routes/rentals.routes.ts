import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post(
  "/",
  ensureUserIsAuthenticated,
  createRentalController.handle
);

export { rentalsRoutes };
