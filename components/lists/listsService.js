const jwt = require('jsonwebtoken');
const listsModel = require('./listsModel');
const usersModel = require('../users/usersModel');

exports.listByUserId = async (id) => {
	try {
		const lists = await listsModel.listByUserId(id);
		if (lists) return lists;
		return null;
	} catch (e) {
		throw new Error(e);
	}
};

exports.addNewList = async (newList) => {
	try {
		const existed = await listsModel.listByName(newList.name);
		if (existed.length) {
			newList.name = `${newList.name} (${existed.length})`;
		}

		const result = await listsModel.addNewList(newList);
		if (result.acknowledged) return result.insertedId;
		else return null;
	} catch (e) {
		throw new Error(e);
	}
};

exports.update = async (list) => {
	try {
		const existed = await listsModel.listByName(list.name);
		if (existed.length) {
			list.name = `${list.name} (${existed.length})`;
		}

		const result = await listsModel.update(list);
		return result.acknowledged;
	} catch (e) {
		throw new Error(e);
	}
};

// exports.listById = async (listId) => {
//   try {
//     return await listsModel.listById(listId);
//   } catch (e) {
//     throw new Error(e);
//   }
// };

exports.joinList = async (userId, listId, inviteToken) => {
	try {
		const decoded = jwt.verify(inviteToken, process.env.JWT_SECRET);

		const list = await listsModel.findListById(listId);

		const isJoined = list.users.find((user) => user._id == userId);

		if (listId === decoded['listId'] && !isJoined) {
			const userAddToList = await usersModel.findUserById(userId);
			userAddToList._id = userAddToList._id.toString();

			const updateListUser = [...list.users, userAddToList];
			const listUpdated = { ...list, users: updateListUser, isPublish: true };

			await listsModel.update(listUpdated);
			return listUpdated;
		} else {
			return null;
		}
	} catch (e) {
		throw new Error(e);
	}
};

exports.generateListInviteLink = async (listId, userId) => {
	try {
		let inviteLink = null;

		const token = jwt.sign(
			{
				sender: userId,
				listId: listId,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '12h' }
		);

		// inviteLink = `${process.env.FE_HOST_DOMAIN}/list/${listId}/sharing?inviteToken=${token}`;
		inviteLink = `http://localhost:3000/list/${listId}/join?inviteToken=${token}`;

		return inviteLink;
	} catch (e) {
		throw new Error(e);
	}
};
