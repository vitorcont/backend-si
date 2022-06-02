const tabela = require("./table");
const { uuid } = require("uuidv4");
const { hash } = require("bcryptjs");

class User {
	constructor({ id, name, email, password, profileType, token }) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.password = password;
		this.profileType = profileType;
		this.token = token;
	}

	async criar() {
		const repeated = await tabela.findByEmail(this.email);
		if (repeated) {
			throw new Error("USUÁRIO JÁ EXISTENTE");
		}
		const hashedPassword = await hash(this.password, 8);
		const result = await tabela.inserir({
			id: uuid(),
			name: this.name,
			email: this.email,
			password: hashedPassword,
			profileType: this.profileType,
		});

		this.id = result.id;
		this.createdAt = result.dataCriacao;
		this.updatedAt = result.updatedAt;
	}

	async byId() {
		const result = await tabela.getById(this.id);

		this.id = result.id;
		this.name = result.name;
		this.email = result.email;
		this.profileType = result.profileType;
		this.createdAt = result.createdAt;
		this.updatedAt = result.updatedAt;
	}

	async update() {
		const fields = ["name", "email", "password", "profileType"];
		const updatedData = {};

		console.log(this)

		Promise.all(
			fields.map(async (field) => {
				const valor = this[field];
				if (field === "password") {
					const hashedPassword = await hash(valor, 8);
					
					updatedData[field] = await hashedPassword;
					await tabela.update(this.id, {
						...updatedData,
						updatedAt: new Date().toISOString(),
					});
				}
				if (
					(typeof valor === "string" && valor.length > 0) ||
					typeof valor === "number"
				) {
					updatedData[field] = valor;
					await hash('1', 8);
				}
			})
		);

		if (Object.keys(updatedData).length < 1) {
			throw new Error("Erro nos campos");
		}

		await tabela.update(this.id, {
			...updatedData,
			updatedAt: new Date().toISOString(),
		});
	}

	async remove() {
		return tabela.remove(this.id);
	}

	async updateToken(token) {
		this.token = token;
		await tabela.update(this.id, {
			token,
		});
	}

	async byToken() {
		const result = await tabela.findByToken(this.token);
		this.id = result.id;
		this.name = result.name;
		this.email = result.email;
		this.profileType = result.profileType;
		this.createdAt = result.createdAt;
		this.updatedAt = result.updatedAt;
	}
}

module.exports = User;
