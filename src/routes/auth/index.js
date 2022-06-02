const router = require("express").Router();
const Auth = require("./Auth");

router.post("/", async (req, res, prox) => {
	try {
		const data = req.body;
		console.log("aaa", req.body);
		const authData = new Auth(data);
		await authData.login();
		console.log("aaa");
		res.status(200).json({ token: authData.token });
	} catch (err) {
		prox(err);
	}
});

router.post("/recovery", async (req, res, prox) => {
	try {
		const data = req.body;
		const authData = new Auth(data);
		await authData.passwordRecovery();
		res.status(200).json();
	} catch (err) {
		prox(err);
	}
});

module.exports = router;
