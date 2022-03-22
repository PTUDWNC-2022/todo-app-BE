const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.list = async () => {
	try {
		const todos = await db().collection('todos').find().toArray();
		return todos;
	} catch (error) {
		throw new Error(error);
	}
};

exports.delete = async (todoId) => {
	try {
		const result = await db()
			.collection('todos')
			.deleteOne({ _id: ObjectId(todoId) });
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

exports.update = async (todoId, newBody) => {
	const filter = { _id: ObjectId(todoId) };
	const options = { upsert: false };
	const update = { $set: { name: newBody.name, isCompleted: newBody.isCompleted } };
	try {
		const result = await db().collection('todos').updateOne(
			filter,
			update,
			options
		);
		return result;
	} catch (error) {
		throw new Error(error);
	}
}
