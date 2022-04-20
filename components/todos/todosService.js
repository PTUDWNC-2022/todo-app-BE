const todosModel = require('./todosModel');
const usersModel = require('../users/usersModel');

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
	if (result.acknowledged) return result;

	return null;
}

exports.create = async (newBody) => {
	try {
    const result = await todosModel.create(newBody);
    const getNewTodo = await todosModel.findOneById(
      result.insertedId.toString()
    );

    //Update column order array to board collection
    await usersModel.pushTodoOrder(
      getNewTodo.userId.toString(),
      getNewTodo._id.toString()
    );

    return getNewTodo;
  } catch (error) {
		throw new Error(error);
	}
};

exports.getTodoByUserId = async (userId) => {
	const todos = await todosModel.getTodoByUserId(userId);
	if (todos) return todos;

	return null;
};

exports.updateAdditionalLabels = async (todoId, newLabelsArray) => {
	try {
		const result = await todosModel.updateAdditionalLabels(todoId, newLabelsArray);
		if (result.acknowledged) return result;
		
		return null;
	} catch (e) {
		throw new Error(e);
	}
};