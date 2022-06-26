import bcrypt from "bcrypt"
import { User } from "../models/index.js";
import { check, validationResult } from "express-validator";
import { IDGenerator, emailRegister, emailPasswordFormatter } from '../utils/index.js';

export const handleLogin = (req, res) => {
	// Podemos pasar parametros hacia las vistas proporcionando un objeto como segundo parametro de la función render
	res.render("auth/login", {
		title: "Inicia sesión",
	});
};

export const handleForgotPassword = (req, res) => {
	res.render("auth/forgotPassword", {
		title: "Recupera tu acceso",
		csrf: req.csrfToken()
	});
};

export const handleForgotPasswordSubmit = async (req, res) => {
	
	const { email } = req.body;
	
	await check("email").isString().notEmpty().withMessage("El campo de email es obligatorio.").isEmail().withMessage("El email ingresado no es valido.").run(req);

	if (validationResult(req).array().length > 0) {
		return res.render("auth/forgotPassword", {
			title: "Recupera tu acceso",
			csrf: req.csrfToken(),
			validations: validationResult(req).array(),
		});
	}

	const user = await User.findOne({where: { email }})

	if (user == null) {
		return res.render("auth/forgotPassword", {
			title: "Recupera tu acceso",
			csrf: req.csrfToken(),
			validations: [{ msg: "El correo registrado no pertenece a ningún usuario." }],
		});
	}

	user.token = IDGenerator();

	await user.save();

	emailPasswordFormatter({
		name: user.name,
		email: user.email,
		token: user.token,
	})

	res.render("templates/message", {
		title: "Recupera tu acceso",
		header: `¡Listo! Revisa tu correo.`,
		message: `Hemos enviado un correo electrónico para verificar que efectivamente se trata de ti, por favor sigue las instrucciones adjuntas.`
	});
}

export const handleChangePassword = async (req, res) => {
	
	const { token } = req.params;
	const user = await User.findOne({where: { token }});

	if (!user) {
		return res.render("templates/message", {
			title: "Error al validar tu información",
			header: `¡Oh no!`,
			message: `Ocurrió un error mientras validabamos tu información. Por favor reinicia el proceso de cambio de contraseña :(`,
			error: ":("
		})
	}

	res.render("auth/formResetPassword", {
		title: "Recupera tu acceso",
		csrf: req.csrfToken()
	});
}

export const handleChangePasswordSubmit = async (req, res) => {

	const { token } = req.params;
	const { password } = req.body;

	await check("password").isLength({ min: 6 }).withMessage("La contraseña debe incluir al menos 6 carácteres.").run(req);
	await check("verification").equals(password).withMessage("Las contraseñas ingresadas no coinciden.").run(req);
	
	// Si existen problemas durante la evaluación de los campos.
	if (validationResult(req).array().length > 0) {
		return res.render("auth/formResetPassword", {
			title: "Recupera tu acceso",
			csrf: req.csrfToken(),
			validations: validationResult(req).array(),
		});
	}

	const user = await User.findOne({where: { token }});
	
	// Hasheando el nuevo password
	user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
	user.token = null;

	await user.save();

	return res.render("templates/message", {
		title: "Contraseña reestablecida",
		header: `¡Listo!`,
		message: `Hemos validado tu información correctamente y tu contraseña ha sido cambiada. Por favor inicia sesión para continuar ;)`,
		success: ":)"
	});
}

export const handleRegister = (req, res) => {
	res.render("auth/register", {
		title: "Crea tu cuenta",
		csrf: req.csrfToken()
	});
};

export const handleRegisterSubmit = async (req, res) => {

	const { name, email, password } = req.body
	
	await check("name").isString().notEmpty().withMessage("El campo de nombre es obligatorio.").run(req);
	await check("email").isString().notEmpty().withMessage("El campo de email es obligatorio.").isEmail().withMessage("El email ingresado no es valido.").run(req);
	await check("password").isLength({ min: 6 }).withMessage("La contraseña debe incluir al menos 6 carácteres.").run(req);
	await check("verification").equals(password).withMessage("Las contraseñas ingresadas no coinciden.").run(req);

	if (validationResult(req).array().length > 0) {
		// Si existen errores volvemos a renderizar la misma página pero ya incluyendo los errores
		return res.render("auth/register", {
			title: "Crea tu cuenta",
			csrf: req.csrfToken(),
			validations: validationResult(req).array(),
			answers: {
				name,
				email,
				password,
			},
		});
	}

	// Verificando duplicidad de correos
	if (await User.findOne({where: { email }})) {
		return res.render("auth/register", {
			title: "Crea tu cuenta",
			csrf: req.csrfToken(),
			validations: [{ msg: "El correo registrado está asociado a otro usuario." }],
			answers: {
				name,
				email,
				password,
			},
		});
	}

	// Si no retornó por errores o duplicidad
	const user = await User.create({ name, email, password, token: IDGenerator(), confirmed: false });

	emailRegister({
		name: user.name,
		email: user.email,
		token: user.token,
	})

	res.render("templates/message", {
		title: "Cuenta creada correctamente",
		header: `¡Listo! Revisa tu correo.`,
		message: `Hemos enviado un correo electrónico para verificar que efectivamente es tuyo, por favor sigue las instrucciones enviadas.`
	});
};

export const handleConfirmEmail = async (req, res) => {
	
	const { token } = req.params;
	const user = await User.findOne({where: { token }});

	if (user) {
		res.render("templates/message", {
			title: "Cuenta creada correctamente",
			header: `¡Listo!`,
			message: `Hemos confirmado tu cuenta. Por favor inicia sesión para continuar ;)`,
			success: ":)"
		})
	} else {
		return res.render("templates/message", {
			title: "Error al confirmar tu cuenta",
			header: `¡Oh no!`,
			message: `Hubo un error mientras confirmabamos tu cuenta. Por favor reinicia el proceso de registro :(`,
			error: ":("
		})
	}

	user.token = null;
	user.confirmed = true;

	// Guarda los cambios en la base de datos.
	await user.save();
};