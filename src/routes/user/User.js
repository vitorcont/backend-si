const tabela = require("./table");
const { uuid } = require("uuidv4");
const { hash } = require("bcryptjs");

class User {
	constructor({ id, name, email, password, profileType }) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.password = password;
		this.profileType = profileType;
	}

	async criar() {
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
		const result = await tabela.getById(this.id);
		const fields = ["name", "email", "password", "profileType"];
		const updatedData = {};

		fields.forEach((field) => {
			const valor = this[field];
			if (
				(typeof valor === "string" && valor.length > 0) ||
				typeof valor === "number"
			) {
				updatedData[field] = valor;
			}
		});

		if (Object.keys(updatedData).length < 1) {
			throw new Error();
		}

		tabela.update(this.id, {
			...updatedData,
			updatedAt: new Date().toISOString(),
		});
	}

	async remove() {
		return tabela.remove(this.id);
	}
}

module.exports = User;
