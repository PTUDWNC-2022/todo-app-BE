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
      .find({ name: { $regex: `${name}\\s\\(\\d+\\)|^${name}$` } })
      .toArray();

    return { length: documentFound.length };
  } catch (e) {
    throw new Error(e);
  }
};

exports.update = async (list) => {
  try {
    return await db()
      .collection(LISTS)
      .updateOne({ _id: ObjectId(list._id) }, { $set: { ...list } });
  } catch (e) {
    throw new Error(e);
  }
};
