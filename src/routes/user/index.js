const router = require("express").Router();
const tabela = require("./table");
const User = require("./User");

router.get("/", async (req, res, prox) => {
	const response = await tabela.listar();
	const filteredResponse = response.map((item) => ({
		id: item.id,
		name: item.name,
		email: item.email,
		profileType: item.profileType,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
	}));
	res.status(200).send(filteredResponse);
});

router.post("/", async (req, res, prox) => {
	try {
		const data = req.body;
		const userData = new User(data);
		await userData.criar();
		res.status(200).send(userData);
	} catch (err) {
		prox(err);
	}
});

router.get("/:id", async (req, res, prox) => {
	const id = req.params.id;

	try {
		const userData = new User({ id });
		await userData.byId(id);
		res.status(200).send(userData);
	} catch (err) {
		prox(err);
	}
});

router.put("/:id", async (req, res, prox) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const userData = new User({ ...data, id: id });
		await userData.update();
		res.status(200).send(userData);
	} catch (err) {
		prox(err);
	}
});

router.delete("/:id", async (req, res, prox) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const userData = new User({ id: id });
		await userData.byId();
		await userData.remove();
		res.status(200).send(userData);
	} catch (err) {
		prox(err);
	}
});

module.exports = router;
