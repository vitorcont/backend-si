const model = require("../user/model");

module.exports = {
	async find(email) {
		const result = await model.findOne({
			where: {
				email,
			},
			raw: true,
		});
		if (!result) {
			throw new Error("Não encontrado");
		} else {
			return result;
		}
	},
	async findToken(token) {
		const result = await model.findOne({
			where: {
				token,
			},
			raw: true,
		});

		return result;
	},
	update(id, data) {
		return model.update(data, {
			where: {
				id,
			},
		});
	},
};
