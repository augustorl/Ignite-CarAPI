import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureUserIsAuthenticated } from "../middlewares/ensureUserIsAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.patch(
  "/avatar",
  ensureUserIsAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
export { usersRoutes };