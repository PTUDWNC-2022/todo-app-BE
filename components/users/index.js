const express = require('express');
const router = express.Router();
const usersController = require('./usersController');

/* GET all todos of current user */
router.get('/:id', usersController.getAllTodosByUser);

router.put('/:id', usersController.update);

module.exports = router;
