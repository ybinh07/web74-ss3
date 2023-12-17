import { Router } from "express";

import { accessTokenValidator, loginValidator, registerValidator } from "../middlewares/user-middlewares.js";
import { getMeController, loginController, registerController } from "../controller/user-controller.js";
const userRoute = Router();

userRoute.post("/register", registerValidator, registerController);
userRoute.post("/login", loginValidator, loginController);
userRoute.get("/me", accessTokenValidator,getMeController);

export default userRoute;
