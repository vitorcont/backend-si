const Sequelize = require("sequelize");
const instance = require("../../database/index");

const cols = {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	typeId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	subTypes: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	image: {
		type: Sequelize.BLOB("medium"),
		allowNull: false,
	},
	audio: {
		type: Sequelize.BLOB("medium"),
		allowNull: false,
	},
	latitude: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	longitude: {
		type: Sequelize.STRING,
		allowNull: true,
	},
};

const options = {
	freezeTableName: true,
	tableName: "report",
	timestamp: true,
	createdAt: "createdAt",
	updatedAt: "updatedAt",
};

module.exports = instance.define("report", cols, options);
