const router = require("express").Router();
const tabela = require("./table");
const User = require("./User");
const {
	authenticateUser,
	authenticateUserAdmin,
	authenticateUserDashboard,
} = require("../../middleware/authentication");
const profileEnum = require("../../enum/profileTypes");
const { validateProfile } = require("../../services/profileTypes");

router.get("/", authenticateUserDashboard, async (req, res, prox) => {
	const response = await tabela.listar();
	const filteredResponse = response.map((item) => ({
		id: item.id,
		name: item.name,
		email: item.email,
		profileType: item.profileType,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
	}));
	res.status(200).json(filteredResponse);
});

router.get("/me", authenticateUser, async (req, res, prox) => {
	const authToken = req.headers.authorization;
	const token = authToken.split(" ")[1];
	const response = await tabela.findByToken(token);

	if (token) {
		res.status(200).json({
			id: response.id,
			name: response.name,
			email: response.email,
			profileType: response.profileType,
			createdAt: response.createdAt,
			updatedAt: response.updatedAt,
		});
	} else {
		res.status(400).json({ message: "user_not_found" });
	}
});

router.post("/", async (req, res, prox) => {
	try {
		const authToken = req.headers.authorization;
		let data = req.body;
		if (data.profileType > profileEnum.APP_USER) {
			authenticateUserAdmin(req, res, () => {});
		}
		if (authToken) {
			const token = authToken.split(" ")[1];
			data = {
				...data,
				token,
			};
		}
		const userData = new User(data);
		await userData.criar();
		res.status(200).json({
			name: userData.name,
			email: userData.email,
			profileType: userData.profileType,
			createdAt: userData.createdAt,
			updatedAt: userData.updatedAt,
		});
	} catch (err) {
		prox(err);
	}
});

router.get("/:id", authenticateUser, async (req, res, prox) => {
	const id = req.params.id;

	try {
		const userData = new User({ id });
		await userData.byId(id);
		res.status(200).json(userData);
	} catch (err) {
		prox(err);
	}
});

router.put("/:id", authenticateUser, async (req, res, prox) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const userData = new User({ ...data, id: id });
		await userData.update();
		res.status(200).json({ ...userData, password: undefined });
	} catch (err) {
		prox(err);
	}
});

router.delete("/:id", authenticateUser, async (req, res, prox) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const userData = new User({ id: id });
		await userData.byId();
		await userData.remove();
		res.status(200).json(userData);
	} catch (err) {
		prox(err);
	}
});

module.exports = router;
