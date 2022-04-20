const usersModel = require('./usersModel');

exports.getAllTodosByUser = async (userId) => {
  try {
		const user = await usersModel.getAllTodosByUser(userId);

		if (!user || !user.todos) {
			throw new Error('Board not found!');
		}

		//Sort todos by todo order(FE)

		return user;
	} catch (error) {
		throw new Error(error);
	}
};

exports.update = async (id, data) => {
	try {
		const updateData = {
			...data
		};
		if (updateData.id) delete updateData.id;
		if (updateData.todos) delete updateData.todos;

		const updatedBoard = await usersModel.update(id, updateData);

		return updatedBoard;
	} catch (error) {
		throw new Error(error);
	}
};
