import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureUserIsAuthenticated } from "@shared/infra/http/middlewares/ensureUserIsAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureUserIsAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
