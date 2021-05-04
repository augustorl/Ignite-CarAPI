import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import ProfileUserController from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureUserIsAuthenticated } from "@shared/infra/http/middlewares/ensureUserIsAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

const uploadAvatar = multer(uploadConfig);

usersRoutes.patch(
  "/avatar",
  ensureUserIsAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get(
  "/profile",
  ensureUserIsAuthenticated,
  profileUserController.handle
);
export { usersRoutes };
