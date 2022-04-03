const Auth = require("../routes/auth/Auth");

const validateProfile = async (allowedProfileType, token) => {
	const AuthData = new Auth({
		email: "",
	});
	await AuthData.getProfileType(token);

	if (AuthData.profileType < allowedProfileType) {
		throw new Error("PERFIL INVALIDO");
	}
};

module.exports = { validateProfile };
