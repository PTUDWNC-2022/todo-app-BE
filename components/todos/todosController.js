const todosService = require("./todosService");

exports.list = async (req, res) => {
  const todos = await todosService.list();
  if (todos.length !== 0) {
    res.status(200).json(todos);
  } else {
    res.status(404).json({ message: "Error! Not found!" });
  }
};

exports.delete = async (req, res) => {
  const todo = await todosService.delete(req.params.id);
  if (todo) {
    res.status(200).json({ message: "Successfully deleted one todo." });
  } else {
    res.status(404).json({ message: "Error!" });
  }
};

exports.update = async (req, res) => {
  const updateOne = await todosService.update(req.params.id, req.body);
  if (updateOne) {
    res.status(200).json({ message: "Successfully update todo." });
  } else {
    res.status(404).json({ message: "Error!" });
  }
};

exports.create = async (req, res) => {
  const insertOne = await todosService.create(req.body);
  if (insertOne) {
    res
      .status(201)
      .json({ message: "Successfully create new todo.", newTodo: insertOne });
  } else {
    res.status(500).json({ message: "Error!" });
  }
};

exports.getTodoByUserId = async (req, res) => {
  const todos = await todosService.getTodoByUserId(req.params.userId);
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404).json({ message: "Error! Not found!" });
  }
};

exports.updateAdditionalLabels = async (req, res) => {
  try {
    const updateOne = await todosService.updateAdditionalLabels(
      req.params.id,
      req.body.newLabelsArray
    );
    if (updateOne) {
      res
        .status(200)
        .json({ message: "Successfully update additional labels." });
    } else {
      res.status(500).json({ message: "Error!" });
    }
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
};
