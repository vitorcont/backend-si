const User = require("../routes/user/User");

const validateProfile = (allowedProfileType, token) => {
	const UserData = new User();
	UserData.byToken(token);

	return UserData.profileType <= allowedProfileType;
};

module.exports = { validateProfile };
