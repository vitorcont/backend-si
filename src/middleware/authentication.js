const { verify } = require("jsonwebtoken");

const authenticateUser = (req, res, prox) => {
	const authToken = req.headers.authorization;
	console.log("HERE", req.headers.authorization);

	if (!authToken) {
		console.log("a");
		return res.status(401).send();
	}
	const token = authToken.split(" ")[1];

	try {
		verify(token, "c0f520dd-1744-482f-832d-0495d6599589");

		return prox();
	} catch (err) {
		return res.status(401).send();
	}
};

module.exports = { authenticateUser };
