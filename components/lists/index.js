const express = require('express');
const router = express.Router();
const listsController = require('./listsController');

router.get('/user/:userId', listsController.listByUserId);
router.post('/', listsController.addNewList);
router.put('/update', listsController.update);

router.get('/:id/join', listsController.joinList);
router.get('/:id/invite/link', listsController.generateListInviteLink);

module.exports = router;
