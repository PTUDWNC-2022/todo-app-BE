const { db } = require("../../models/db");
const { LISTS } = require("../../models/collections");
const { ObjectId } = require("mongodb");

exports.listByUserId = async (id) => {
  try {
    return await db()
      .collection(LISTS)
      .find({ users: { $elemMatch: { _id: id } } })
      .toArray();
  } catch (e) {
    throw new Error(e);
  }
};

exports.addNewList = async (newList) => {
  try {
    return await db().collection(LISTS).insertOne(newList);
  } catch (e) {
    throw new Error(e);
  }
};

exports.listByName = async (name) => {
  try {
    const documentFound = await db()
      .collection(LISTS)
      .find({
        name: { $regex: `${name}\\s\\(\\d+\\)|${name}\\n` },
        disabled: true,
      })
      .toArray();

    return { length: documentFound.length };
  } catch (e) {
    throw new Error(e);
  }
};

exports.update = async (list) => {
  try {
    const { _id, ...rest } = list;

    return await db()
      .collection(LISTS)
      .updateOne({ _id: ObjectId(_id) }, { $set: { ...rest } });
  } catch (e) {
    throw new Error(e);
  }
};

exports.findListById = async (listId) => {
	try {
		const list = await db().collection(LISTS).findOne({_id: ObjectId(listId)});
		if (list) return list;
	} catch (e) {
		throw new Error(e);
	}
};

