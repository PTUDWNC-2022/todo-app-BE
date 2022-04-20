const { USERS, TODOS } = require('../../models/collections');
const { ObjectId } = require('mongodb');
const { db } = require('../../models/db');

exports.getAllTodosByUser = async (userId) => {
	try {
		const result = await db()
			.collection(USERS)
			.aggregate([
				{ $match: { _id: ObjectId(userId) } },
				{
					$lookup: {
						from: TODOS,
						localField: '_id',
						foreignField: 'userId',
						as: 'todos',
					},
				},
			])
			.toArray();

		return result[0] || {};
	} catch (error) {
		throw new Error(error);
	}
};

exports.update = async (id, data) => {
	try {
    const updateData = {
      ...data,
    }

		const result = await db()
			.collection(USERS)
			.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{ $set: updateData },
				{ returnDocument: 'after' }
			)
		return result.value
	} catch (error) {
		throw new Error(error)
	}
}

exports.pushTodoOrder = async (userId, todoId) => {
	try {
		const result = await db()
			.collection(USERS)
			.findOneAndUpdate(
				{ _id: ObjectId(userId) },
				{ $push: { todoOrder: todoId } },
				{ returnDocument: 'after' }
			);

		return result.value;
	} catch (error) {
		throw new Error(error);
	}
};
