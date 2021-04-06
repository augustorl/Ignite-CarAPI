import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureUserIsAdmin } from "@shared/infra/http/middlewares/ensureUserIsAdmin";
import { ensureUserIsAuthenticated } from "@shared/infra/http/middlewares/ensureUserIsAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureUserIsAuthenticated,
  ensureUserIsAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
