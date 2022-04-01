const tabela = require("./table");
const { uuid } = require("uuidv4");

class User {
	constructor({ id, name, email, password }) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.password = password;
	}

	async criar() {
		const result = await tabela.inserir({
			id: uuid(),
			name: this.name,
			email: this.email,
			password: this.password,
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
		this.createdAt = result.dataCriacao;
		this.updatedAt = result.updatedAt;
	}

	async update() {
		const result = await tabela.getById(this.id);
		const fields = ["name", "email", "password"];
		const updatedData = {};

		fields.forEach((field) => {
			const valor = this[field];
			if (typeof valor === "string" && valor.length > 0) {
				updatedData[field] = valor;
			}
		});

		if (Object.keys(updatedData).length < 1) {
			throw new Error();
		}

		tabela.update(this.id, updatedData);
	}

	async remove() {
		return tabela.remove(this.id);
	}
}

module.exports = User;
