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
app.listen(PORT, function() {
	console.log('Express listening on port' + PORT + '!');
  });
exports.creatnew = async (todoId) => {
	const result = await todosModel.creatnew(todoId);
	if (result.insertedId ) return result;

	return null;
};