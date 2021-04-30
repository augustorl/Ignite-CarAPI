import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureUserIsAuthenticated } from "@shared/infra/http/middlewares/ensureUserIsAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

const uploadAvatar = multer(uploadConfig);

usersRoutes.patch(
  "/avatar",
  ensureUserIsAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
export { usersRoutes };
