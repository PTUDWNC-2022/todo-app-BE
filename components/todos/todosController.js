const todosService = require('./todosService');

exports.list = async (req, res) => {
	const todos = await todosService.list();
	if (todos.length !== 0) {
		res.status(200).json(todos);
	} else {
		res.status(404).json({ message: 'Error! Not found!' });
	}
};

exports.delete = async (req, res) => {
	const todo = await todosService.delete(req.params.id);
	if (todo) {
		res.status(200).json({ message: 'Successfully deleted one todo.' });
	} else {
		res.status(404).json({ message: 'Error!' });
	}
};
