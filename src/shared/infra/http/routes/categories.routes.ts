import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureUserIsAdmin } from "@shared/infra/http/middlewares/ensureUserIsAdmin";
import { ensureUserIsAuthenticated } from "@shared/infra/http/middlewares/ensureUserIsAuthenticated";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureUserIsAuthenticated,
  ensureUserIsAdmin,
  (request, response) => {
    return createCategoryController.handle(request, response);
  }
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureUserIsAuthenticated,
  ensureUserIsAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
