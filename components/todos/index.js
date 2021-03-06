const express = require('express');
const router = express.Router();
const todosController = require('./todosController');

/* GET todos listing. */
router.get('/', todosController.list);

router.get('/:userId', todosController.getTodoByUserId);

router.post('/', todosController.create);

router.put('/:id', todosController.update);

// PUT update additional labels array
router.put('/update-labels/:id', todosController.updateAdditionalLabels);

/* DELETE a todo */
router.delete('/:id', todosController.delete)

module.exports = router;
