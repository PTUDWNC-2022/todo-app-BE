const labelsModel = require("./labelsModel");

exports.create = async (userId) => {
  const result = await labelsModel.create(userId);
  if (result.insertedId) return result;
  
  return null;
};

exports.push = async (documentId, newLabel) => {
  const result = await labelsModel.push(documentId, newLabel);
  if (result.acknowledged) return result;
  
  return null;
};

exports.getDocumentByUserId = async (userId) => {
  return await labelsModel.getDocumentByUserId(userId);
};
