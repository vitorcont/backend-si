const Sequelize = require("sequelize");
const instance = require("../../database/index");

const cols = {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
};

const options = {
	freezeTableName: true,
	tableName: "user",
	timestamp: true,
	createdAt: "createdAt",
	updatedAt: "updatedAt",
};

module.exports = instance.define("user", cols, options);
