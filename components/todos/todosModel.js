const { TODOS } = require('../../models/collections');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.list = async () => {
	try {
		const todos = await db().collection(TODOS).find().toArray();
		return todos;
	} catch (error) {
		throw new Error(error);
	}
};

exports.delete = async (todoId) => {
	try {
		const result = await db()
			.collection(TODOS)
			.deleteOne({ _id: ObjectId(todoId) });
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

exports.update = async (todoId, newBody) => {
	const filter = { _id: ObjectId(todoId) };
	const options = { upsert: false };
	const update = { $set: { ...newBody } };
	try {
		const result = await db()
			.collection(TODOS)
			.updateOne(filter, update, options);
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

exports.create = async (newBody) => {
	try {
		const result = await db()
			.collection(TODOS)
			.insertOne({ name: newBody.name, isCompleted: newBody.isCompleted });
		return result;
	} catch (error) {
		throw new Error(error);
	}
};
