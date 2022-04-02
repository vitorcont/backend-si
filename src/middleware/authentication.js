require("dotenv").config();
const { verify } = require("jsonwebtoken");

const authenticateUser = (req, res, prox) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).send();
	}
	const token = authToken.split(" ")[1];

	try {
		verify(token, process.env.JWT_TOKEN);

		return prox();
	} catch (err) {
		return res.status(401).send();
	}
};

module.exports = { authenticateUser };
