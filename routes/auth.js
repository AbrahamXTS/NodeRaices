import express from "express";
import {
	handleLogin,
	handleLoginSubmit,
	handleForgotPassword,
	handleForgotPasswordSubmit,
	handleRegister,
	handleRegisterSubmit,
	handleChangePassword,
	handleChangePasswordSubmit,
	handleConfirmEmail,
} from "../controllers/index.js";

export const authRouter = express.Router();

authRouter.get("/login", handleLogin);
authRouter.post("/login", handleLoginSubmit);

authRouter.get("/forgot-password", handleForgotPassword);
authRouter.post("/forgot-password", handleForgotPasswordSubmit);

authRouter.get("/new-password/:token", handleChangePassword);
authRouter.post("/new-password/:token", handleChangePasswordSubmit);

authRouter.get("/register", handleRegister);
authRouter.post("/register", handleRegisterSubmit);

authRouter.get("/confirm-email/:token", handleConfirmEmail);


