const express = require('express');
const router = express.Router();
const authenticationController = require('./authenticationController');

router.post('/register', authenticationController.register);

router.post('/login', authenticationController.login);

module.exports = router;
