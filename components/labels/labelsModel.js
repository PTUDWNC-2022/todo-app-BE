const { LABELS } = require("../../models/collections");
const { ObjectId } = require("mongodb");
const { db } = require("../../models/db");

exports.create = async (userId) => {
  try {
    return await db()
      .collection(LABELS)
      .insertOne({
        userId: ObjectId(userId),
        additionalLabels: [],
      });
  } catch (e) {
    throw new Error(e);
  }
};

exports.push = async (documentId, newLabel) => {
  try {
    return await db().collection(LABELS).updateOne(
      {_id: ObjectId(documentId)},
      {$push: {additionalLabels: newLabel}}
    );
  } catch (e) {
    throw new Error(e);
  }
};

exports.getDocumentByUserId = async (userId) => {
  try {
    return await db()
      .collection(LABELS)
      .findOne({ userId: ObjectId(userId) });
  } catch (e) {
    throw new Error(e);
  }
};

exports.checkDocumentExists = async (documentId) => {
  try {
    const documentFound = await db().collection(LABELS).findOne({_id: ObjectId(documentId)});
    if (documentFound) return documentFound;
  } catch (e) {
    throw new Error(e);
  }
};
