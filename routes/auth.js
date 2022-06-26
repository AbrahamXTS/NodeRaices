import express from "express";
import {
	handleLogin,
	handleForgotPassword,
	handleRegister,
	handleRegisterSubmit,
	handleConfirmEmail,
	handleForgotPasswordSubmit,
	handleChangePassword,
	handleChangePasswordSubmit,
} from "../controllers/index.js";

export const authRouter = express.Router();

authRouter.get("/login", handleLogin);

authRouter.get("/forgot-password", handleForgotPassword);
authRouter.post("/forgot-password", handleForgotPasswordSubmit);

authRouter.get("/new-password/:token", handleChangePassword);
authRouter.post("/new-password/:token", handleChangePasswordSubmit);

authRouter.get("/register", handleRegister);
authRouter.post("/register", handleRegisterSubmit);

authRouter.get("/confirm-email/:token", handleConfirmEmail);


