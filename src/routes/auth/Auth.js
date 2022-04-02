const tabela = require("./table");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("../user/User");

class Auth {
	constructor({ email, password, profileType, token }) {
		this.email = email;
		this.password = password;
		this.profileType = profileType;
		this.token = token;
	}

	async login() {
		const result = await tabela.find(this.email, this.password);
		const UserData = new User(result);
		const passwordMatches = await compare(this.password, result.password);
		if (!passwordMatches) {
			throw new Error("ERRO");
		}
		const token = sign({}, "c0f520dd-1744-482f-832d-0495d6599589", {
			subject: UserData.id,
			expiresIn: "1d",
		});
		UserData.updateToken(token);
		this.token = token;
	}
}

module.exports = Auth;
