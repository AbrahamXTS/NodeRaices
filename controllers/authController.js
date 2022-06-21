import { User } from "../models/index.js"

export const handleLogin = (req, res) => {
	// Podemos pasar parametros hacia las vistas proporcionando un objeto como segundo parametro de la función render
	res.render("auth/login", {
		title: "Inicia sesión",
	});
};

export const handleForgotPassword = (req, res) => {
	res.render("auth/forgotPassword", {
		title: "Recupera tu acceso",
	});
};

export const handleRegister = (req, res) => {
	res.render("auth/register", {
		title: "Crea tu cuenta",
	});
};

export const handleRegisterSubmit = async (req, res) => {
	const user = await User.create(req.body);

	res.json(user);
}