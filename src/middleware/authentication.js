require("dotenv").config();
const { verify } = require("jsonwebtoken");
const { validateProfile } = require("../../src/services/profileTypes");
const profileEnum = require("../../src/enum/profileTypes");

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

const authenticateUserAdmin = async (req, res, prox) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).send();
	}
	const token = authToken.split(" ")[1];

	try {
		verify(token, process.env.JWT_TOKEN);
		await validateProfile(profileEnum.DASH_ADMIN, token);

		return prox();
	} catch (err) {
		return res.status(401).send();
	}
};

const authenticateUserDashboard = async (req, res, prox) => {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).send();
	}
	const token = authToken.split(" ")[1];

	try {
		verify(token, process.env.JWT_TOKEN);
		await validateProfile(profileEnum.DASH_DEFAULT, token);

		return prox();
	} catch (err) {
		return res.status(401).send();
	}
};

module.exports = {
	authenticateUser,
	authenticateUserAdmin,
	authenticateUserDashboard,
};
