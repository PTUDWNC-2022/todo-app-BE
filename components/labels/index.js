const express = require('express');
const router = express.Router();
const labelsController = require('./labelsController');

// GET label document by userId
router.get('/:userId', labelsController.getDocumentByUserId);

// PUT push new label to additional labels array
router.put('/new-label', labelsController.pushNewLabel);

// PUT remove label from additional labels array
router.put('/remove-label', labelsController.removeLabel);

module.exports = router;