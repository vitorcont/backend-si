const Sequelize = require("sequelize");
const instance = require("../../database/index");

const cols = {
	id: {
		type: Sequelize.STRING,
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
	profileType: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	token: {
		type: Sequelize.STRING,
		allowNull: true,
	},
};

const options = {
	freezeTableName: true,
	tableName: "users",
	timestamp: true,
	createdAt: "createdAt",
	updatedAt: "updatedAt",
};

module.exports = instance.define("users", cols, options);
