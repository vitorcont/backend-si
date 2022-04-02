const tabela = require("./table");
const { uuid } = require("uuidv4");

class User {
	constructor({ id, typeName, subTypes }) {
		this.id = id;
		this.typeName = typeName;
		this.subTypes = subTypes;
	}

	async criar() {
		const result = await tabela.inserir({
			id: uuid(),
			typeName: this.typeName,
			subTypes: this.subTypes.join(", "),
		});

		this.id = result.id;
		this.createdAt = result.createdAt;
		this.updatedAt = result.updatedAt;
	}

	async byId() {
		const result = await tabela.getById(this.id);

		this.id = result.id;
		this.typeName = result.typeName;
		this.subTypes = result.subTypes.split(", ");
		this.createdAt = result.dataCriacao;
		this.updatedAt = result.updatedAt;
	}

	async update() {
		const result = await tabela.getById(this.id);
		const fields = ["typeName", "subTypes"];
		const updatedData = {};

		fields.forEach((field) => {
			const valor = this[field];
			if (valor.length > 0) {
				if (field === "subTypes") {
					updatedData[field] = valor.join(", ");
				} else {
					updatedData[field] = valor;
				}
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
