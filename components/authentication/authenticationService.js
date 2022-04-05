const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticationModel = require('./authenticationModel');

exports.register = async (email, password) => {
	//validation
	const isExist = await authenticationModel.checkExistUserByEmail(email);
	if (isExist) {
		throw new Error('This account has already existed');
	}

	const user = await authenticationModel.create(email, password);
	return user;
};

exports.login = async (email, password) => {
	const user = await authenticationModel.checkExistUserByEmail(email);
	if (!user) {
		throw new Error('User not found!');
	}

	const isValid = bcrypt.compareSync(password, user.password);
	if (!isValid) {
		throw new Error('Invalid password');
	}
	return user;
};

exports.createJwt = (user) => {
	return jwt.sign(
		{
			userId: user._id,
			email: user.email,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '12h' }
	);
};
