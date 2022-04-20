const usersService = require('./usersService');

exports.getAllTodosByUser = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await usersService.getAllTodosByUser(id);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			errors: error.message,
		});
	}
};

exports.update = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await usersService.update(id, req.body);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			errors: error.message,
		});
	}
};

