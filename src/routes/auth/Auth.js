require("dotenv").config();
const tabela = require("./table");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("../user/User");
const { sendRecoveryMail } = require("../../services/mail");
const { hash } = require("bcryptjs");

class Auth {
	constructor({ email, password, profileType, token }) {
		this.email = email;
		this.password = password;
		this.profileType = profileType;
		this.token = token;
	}

	async login() {
		const result = await tabela.find(this.email);
		const UserData = new User(result);
		const passwordMatches = await compare(this.password, result.password);

		if (!passwordMatches) {
			throw new Error("ERRO");
		}
		const token = sign({}, process.env.JWT_TOKEN, {
			subject: UserData.id,
			expiresIn: "1d",
		});

		await UserData.updateToken(token);

		this.token = token;
	}

	async getProfileType(token) {
		const result = await tabela.findToken(token);
		if (result) {
			this.profileType = result.profileType;
			this.token = token;
		} else {
			throw new Error("ERROR");
		}
	}

	async passwordRecovery() {
		const result = await tabela.find(this.email);
		if (result) {
			var arr = [];
			while (arr.length < 5) {
				var r = Math.floor(Math.random() * 100) + 1;
				if (arr.indexOf(r) === -1) arr.push(r);
			}
			const newPassword = arr.join("");
			const hashedPassword = await hash(newPassword, 8);
			tabela.update(result.id, { password: hashedPassword });
			await sendRecoveryMail(newPassword, result.email);
		} else {
			throw new Error("ERROR");
		}
	}
}

module.exports = Auth;
