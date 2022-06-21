import express from "express";
import { handleLogin, handleForgotPassword, handleRegister, handleRegisterSubmit } from "../controllers/index.js";

export const authRouter = express.Router();

authRouter.get("/login", handleLogin);

authRouter.get("/forgot-password", handleForgotPassword);

authRouter.get("/register", handleRegister); 
authRouter.post("/register", handleRegisterSubmit);