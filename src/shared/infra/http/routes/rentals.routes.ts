import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post(
  "/",
  ensureUserIsAuthenticated,
  createRentalController.handle
);

rentalsRoutes.post(
  "/devolution/:id",
  ensureUserIsAuthenticated,
  devolutionRentalController.handle
);

export { rentalsRoutes };
