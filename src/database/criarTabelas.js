const model = [
	require("../routes/user/model"),
	require("../routes/types/model"),
];

const createTables = async () => {
	model.map((item) => {
		item
			.sync()
			.then(() => console.log("Tabelas Criadas"))
			.catch();
	});
};

createTables();
