const listsService = require('./listsService');
exports.listByUserId = async (req, res) => {
	const { userId } = req.params;
	const lists = await listsService.listByUserId(userId);

	if (lists) {
		res.status(200).json(lists);
	} else {
		res.status(404).json({ message: 'Error! Not found!' });
	}
};

exports.addNewList = async (req, res) => {
	const result = await listsService.addNewList(req.body);

	if (result) {
		res.status(200).json(result);
	} else {
		res.status(404).json({ message: 'Error! Not found!' });
	}
};

exports.update = async (req, res) => {
	const result = await listsService.update(req.body);

	if (result) {
		res.status(200).json(result);
	} else {
		res.status(404).json({ message: 'Error! Not found!' });
	}
};

// exports.listById = async (req, res) => {
//   const { listId } = req.params;
//   const result = await listsService.listById(listId);
//
//   if (result) {
//     res.status(200).json(result);
//   } else {
//     res.status(404).json({ message: "Error! Not found!" });
//   }
// };
exports.joinList = async (req, res) => {
	const userId = req.user._id;
	const listId = req.params.id;
	const inviteToken = req.query.inviteToken;

	const listMember = await listsService.joinList(userId, listId, inviteToken);
	if (listMember) {
		res.status(200).json({ message: 'Successfully', data: listMember });
	} else {
		res.status(401).json({ message: 'Fail!' });
	}
};

exports.generateListInviteLink = async (req, res) => {
	const listId = req.params.id;
	const userId = req.user._id;

	const inviteLink = await listsService.generateListInviteLink(listId, userId);
	if (inviteLink) {
		res.status(200).json({ message: 'Successfully', data: inviteLink });
	} else {
		res.status(401).json({ message: 'Fail!' });
	}
};
