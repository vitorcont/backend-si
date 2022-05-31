const router = require("express").Router();
const reportTable = require("./table");
const typeTable = require("../types/table");
const userTable = require("../user/table");
const { APP_USER } = require("../../enum/profileTypes.js");
const Report = require("./Report");

router.get("/", async (req, res, prox) => {
	const response = await reportTable.listar({ raw: true });
	const types = await typeTable.listar({ raw: true });
	let token = null,
		user = null;

	const authToken = req.headers.authorization;
	console.log(authToken);
	if (authToken) {
		token = authToken.split(" ")[1];
		user = await userTable.findByToken(token);
	}

	if (!user && token) {
		res.status(400).json({ msg: "Usuário não encontrado" });
		return;
	}
	let filteredResponse = response;
	if (user && user.profileType === APP_USER) {
		console.log("AQUI");

		filteredResponse = response.filter((item) => item.userId === user.id);
	}

	filteredResponse = filteredResponse.filter((item) => {
		return !!types.find((value) => value.id === item.typeId);
	});

	const treatedResponse = filteredResponse.map((item) => {
		let type = types.find((value) => value.id === item.typeId);
		type = {
			id: type.id,
			typeName: type.typeName,
			subTypes: type.subTypes.split(", "),
			createdAt: type.createdAt,
			updatedAt: type.updatedAt,
		};

		return {
			id: item.id,
			title: item.title,
			description: item.description,
			typeId: item.typeId,
			userId: item.userId,
			type,
			subTypes: item.subTypes.split(", "),
			latitude: item.latitude,
			longitude: item.longitude,
			updatedAt: item.updatedAt,
			createdAt: item.createdAt,
		};
	});

	res.status(200).json(treatedResponse);
});

router.post("/", async (req, res, prox) => {
	try {
		const data = req.body;
		const typeData = new Report(data);
		await typeData.criar();
		res.status(200).json(typeData);
	} catch (err) {
		prox(err);
	}
});

router.get("/:id", async (req, res, prox) => {
	const id = req.params.id;

	try {
		const typeData = new Report({ id });
		await typeData.byId(id);
		res.status(200).json(typeData);
	} catch (err) {
		prox(err);
	}
});

router.put("/:id", async (req, res, prox) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const typeData = new Report({ ...data, id: id });
		await typeData.update();
		res.status(200).json(typeData);
	} catch (err) {
		prox(err);
	}
});

router.delete("/:id", async (req, res, prox) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const typeData = new Report({ id: id });
		await typeData.byId();
		await typeData.remove();
		res.status(200).json(typeData);
	} catch (err) {
		prox(err);
	}
});

module.exports = router;
