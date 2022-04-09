const todosModel = require('./todosModel');

exports.list = async () => {
	const todos = await todosModel.list();
	if (todos) return todos;

	return null;
};

exports.delete = async (todoId) => {
	const result = await todosModel.delete(todoId);
	if (result.deletedCount) return result;

	return null;
};

exports.update = async (todoId, newBody) => {
	const result = await todosModel.update(todoId, newBody);
	if (result.modifiedCount) return result;

	return null;
}

exports.create = async (newBody) => {
	const result = await todosModel.create(newBody);
	if (result.insertedId) return result;

	return null;
};

exports.getTodoByUserId = async (userId) => {
	const todos = await todosModel.getTodoByUserId(userId);
	if (todos) return todos;

	return null;
};