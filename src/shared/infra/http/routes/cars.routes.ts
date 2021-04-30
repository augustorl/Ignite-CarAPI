import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";

const carsRoutes = Router();

const uploadImage = multer(uploadConfig);
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
  "/",
  ensureUserIsAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureUserIsAuthenticated,
  ensureUserIsAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureUserIsAuthenticated,
  ensureUserIsAdmin,
  uploadImage.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
