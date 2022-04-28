const router = require("express").Router();
const tabela = require("./table");
const Types = require("./Types");

router.get("/", async (req, res, prox) => {
	const response = await tabela.listar({ raw: true });
	const treatedResponse = response.map((item) => ({
		id: item.id,
		typeName: item.typeName,
		subTypes: item.subTypes.split(", "),
		updatedAt: item.updatedAt,
		createdAt: item.createdAt,
	}));

	res.status(200).json(treatedResponse);
});

router.post("/", async (req, res, prox) => {
	try {
		const data = req.body;
		const typeData = new Types(data);
		await typeData.criar();
		res.status(200).json(typeData);
	} catch (err) {
		prox(err);
	}
});

router.get("/:id", async (req, res, prox) => {
	const id = req.params.id;

	try {
		const typeData = new Types({ id });
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
		const typeData = new Types({ ...data, id: id });
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
		const typeData = new Types({ id: id });
		await typeData.byId();
		await typeData.remove();
		res.status(200).json(typeData);
	} catch (err) {
		prox(err);
	}
});

module.exports = router;
