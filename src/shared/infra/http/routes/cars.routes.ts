import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  "/",
  ensureUserIsAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle
);

export { carsRoutes };
