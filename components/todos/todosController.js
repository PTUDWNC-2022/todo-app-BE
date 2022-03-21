const todosService = require('./todosService');

exports.list = async (req, res) => {
	const todos = await todosService.list();
	if (todos) {
		res.status(200).json(todos);
	} else {
		res.status(404).json({ message: 'Error!' });
	}
};
