const { db } = require('../../models/db');

exports.list = async () => {
	const todos = await db().collection('todos').find().toArray();
	return todos;
};
