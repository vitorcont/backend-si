const Sequelize = require("sequelize");
const instance = require("../../database/index");

const cols = {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	typeName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	subTypes: {
		type: Sequelize.STRING,
		allowNull: false,
	},
};

const options = {
	freezeTableName: true,
	tableName: "types",
	timestamp: true,
	createdAt: "createdAt",
	updatedAt: "updatedAt",
};

module.exports = instance.define("types", cols, options);
