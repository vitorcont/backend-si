const model = require("./model");

module.exports = {
	listar() {
		return model.findAll();
	},
	inserir(data) {
		return model.create(data);
	},
	async getById(id) {
		const result = await model.findOne({
			where: {
				id,
			},
		});
		if (!result) {
			throw new Error("Não encontrado");
		} else {
			return result;
		}
	},
	update(id, data) {
		return model.update(data, {
			where: {
				id,
			},
		});
	},
	remove(id) {
		return model.destroy({
			where: {
				id,
			},
		});
	},
};
