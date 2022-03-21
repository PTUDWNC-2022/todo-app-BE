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
