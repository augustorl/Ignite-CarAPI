import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

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

rentalsRoutes.get(
  "/user",
  ensureUserIsAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
