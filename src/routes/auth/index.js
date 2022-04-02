const router = require("express").Router();
const tabela = require("./table");
const Auth = require("./Auth");

router.post("/", async (req, res, prox) => {
	try {
		const data = req.body;
		const authData = new Auth(data);
		await authData.login();
		res.status(200).send(authData);
	} catch (err) {
		prox(err);
	}
});

module.exports = router;
