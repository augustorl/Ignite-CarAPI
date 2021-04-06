import { Router } from "express";

import { authenticaRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/specifications", specificationsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);

router.use(authenticaRoutes);

export { router };
