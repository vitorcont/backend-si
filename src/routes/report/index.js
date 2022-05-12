const router = require("express").Router();
const reportTable = require("./table");
const typeTable = require("../types/table");
const Report = require("./Report");

router.get("/", async (req, res, prox) => {
	const response = await reportTable.listar({ raw: true });
	const types = await typeTable.listar({ raw: true });

	const treatedResponse = response.map((item) => {
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
