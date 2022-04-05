const { db } = require('../../models/db');
const { USERS } = require('../../models/collections');
const bcrypt = require('bcryptjs');

exports.checkExistUserByEmail = async (email) => {
	try {
		const user = await db().collection(USERS).findOne({ email });
		if (user) return user;
	} catch (error) {
		throw new Error(error);
	}
};

exports.create = async (email, password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	try {
		const user = await db()
			.collection(USERS)
			.insertOne({ email: email, password: hash });
		return user;
	} catch (error) {
		throw new Error(error);
	}
};
