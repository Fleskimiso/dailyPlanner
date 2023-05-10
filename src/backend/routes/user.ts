import express, {} from "express";
import { loginController, logoutController, registerController, validateLogin, validateRegistration } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/login", validateLogin , loginController);
userRouter.post("/register", validateRegistration, registerController);
userRouter.get("/logout", logoutController );




export default userRouter;