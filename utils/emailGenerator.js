import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const emailRegister = async (data) => {
	const { name, email, token } = data;

	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	await transport.sendMail({
		from: "contacto@bienesraices.com",
		to: email,
		subject: "Confirma tu cuenta | BienesRaices",
		text: "Confirma tu cuenta | BienesRaices",
		html: `
			<div class="container">
				<p class="title">¡Hola ${name}!</p>
				<p>Estamos felices de verte en <span class="title">Bienes</span>Raices</p>
				<p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>
				<a class="button" href=${process.env.URL}/auth/confirm-email/${token}>Confirmar cuenta</a>
				<p class="warning">
					Si tu no creaste esta cuenta, puedes ignorar este mensaje
				</p>
			</div>
	
			<style>
				@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");
			
				* {
					font-family: "Roboto", sans-serif;
				}
			
				.container {
					display: flex;
					height: 100vh;
					margin: 0 auto;
					align-items: center;
					flex-direction: column;
					justify-content: center;
				}
			
				p {
					text-align: center;
				}
			
				.title {
					font-weight: bold;
				}
			
				.normal {
					font-weight: normal;
				}
			
				.button {
					padding: 13px;
					color: white;
					font-size: 15px;
					font-weight: bold;
					margin-top: 20px;
					border-radius: 15px;
					text-decoration: none;
					background-color: #4f46e5;
				}
			
				.warning {
					font-size: 10px;
					margin-top: 40px;
				}
			</style>
		`,
	});
};
