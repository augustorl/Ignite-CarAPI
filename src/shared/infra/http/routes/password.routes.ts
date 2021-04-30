import { Router } from "express";

import SendForgotPasswordMailControler from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailControler();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
export { passwordRoutes };
