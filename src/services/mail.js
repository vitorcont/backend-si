const nodemailer = require("nodemailer");
require("dotenv").config();

const sendRecoveryMail = async (message, reciever) => {
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_PROVIDER,
		auth: {
			user: process.env.EMAIL_HOST,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_HOST,
		to: reciever,
		subject: "IMPORTANTE - Recuperação de Senha",
		text: `Sua nova senha foi definida para ${message}, não se esqueça de altera-lá posteriormente`,
	};

	await transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			throw new Error(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports = { sendRecoveryMail };
