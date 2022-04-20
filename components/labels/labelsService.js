const labelsModel = require("./labelsModel");

exports.create = async (userId) => {
  const result = await labelsModel.create(userId);
  if (result.insertedId) return result;
  
  return null;
};

exports.push = async (documentId, newLabel) => {
  try {
    const checkExistedLabel = await labelsModel.checkIfLabelExist(documentId, newLabel);
    if (checkExistedLabel && checkExistedLabel.length) {
      newLabel = `${newLabel} (${checkExistedLabel.length})`;
    }
    
    const result = await labelsModel.push(documentId, newLabel);
    if (result.acknowledged) return result;
  
    return null;
  } catch (e) {
    throw new Error(e);
  }
};

exports.remove = async (documentId, label) => {
  try {
    const result = await labelsModel.remove(documentId, label);
    if (result.acknowledged) return result;
    
    return null;
  } catch (e) {
    throw new Error(e);
  }
};

exports.getDocumentByUserId = async (userId) => {
  return await labelsModel.getDocumentByUserId(userId);
};
