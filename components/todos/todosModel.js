const { TODOS } = require('../../models/collections');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.findOneById = async (id) => {
	try {
		const result = await db()
			.collection(TODOS)
			.findOne({ _id: ObjectId(id) })
		return result
	} catch (error) {
		throw new Error(error)
	}
}

exports.list = async () => {
	try {
		return await db().collection(TODOS).find().toArray();
	} catch (error) {
		throw new Error(error);
	}
};

exports.delete = async (todoId) => {
	try {
		return await db()
      .collection(TODOS)
      .deleteOne({ _id: ObjectId(todoId) });
	} catch (error) {
		throw new Error(error);
	}
};

exports.update = async (todoId, newBody) => {
	const filter = { _id: ObjectId(todoId) };
	const options = { upsert: false };
	const update = { $set: { ...newBody } };
	try {
		return await db().collection(TODOS).updateOne(filter, update, options);
	} catch (error) {
		throw new Error(error);
	}
};

exports.create = async (newBody) => {
	try {
		return await db()
      .collection(TODOS)
      .insertOne({
        name: newBody.name,
        isCompleted: newBody.isCompleted,
        userId: ObjectId(newBody.userId),
        createdDate: Date.now(),
      });
	} catch (error) {
		throw new Error(error);
	}
};

exports.getTodoByUserId = async (userId) => {
	try {
		return await db()
      .collection(TODOS)
      .find({ userId: ObjectId(userId) })
      .toArray();
	} catch (error) {
		throw new Error(error);
	}
};
