const router = require("express").Router();
const tabela = require("./table");
const Auth = require("./Auth");

router.post("/", async (req, res, prox) => {
	try {
		const data = req.body;
		const authData = new Auth(data);
		await authData.login();
		res.status(200).send({ token: authData.token });
	} catch (err) {
		prox(err);
	}
});

router.post("/recovery", async (req, res, prox) => {
	try {
		const data = req.body;
		const authData = new Auth(data);
		await authData.passwordRecovery();
		res.status(200).send();
	} catch (err) {
		prox(err);
	}
});

module.exports = router;
