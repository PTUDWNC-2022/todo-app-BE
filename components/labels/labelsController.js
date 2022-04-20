const labelsService = require("./labelsService");
const labelsModel = require('./labelsModel');
const authenticationModel = require('../authentication/authenticationModel');

exports.getDocumentByUserId = async (req, res) => {
  try {
    const isExist = await authenticationModel.checkExistUserById(req.params.userId);
    if (!isExist) {
      return res.status(500).json({ errors: 'User not found!' });
    }
    
    const document = await labelsService.getDocumentByUserId(req.params.userId);
    if (document) res.status(200).json(document);
    else {
      const newDocument = await labelsService.create(req.params.userId);
      res.status(200).json(newDocument);
    }
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
};

exports.pushNewLabel = async (req, res) => {
  const { documentId, newLabel } = req.body;
  try {
    const isExisted = await labelsModel.checkDocumentExists(documentId);
    if (!isExisted) return res.status(500).json({ errors: 'Document not found!' });
  
    const updateOne = await labelsService.push(documentId, newLabel);
    if (updateOne) {
      res.status(200).json({ message: 'Successfully add new table.' });
    } else {
      res.status(500).json({ message: 'Error!' });
    }
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
};

exports.removeLabel = async (req, res) => {
  const { documentId, label } = req.body;
  try {
    const isExisted = await labelsModel.checkDocumentExists(documentId);
    if (!isExisted) return res.status(500).json({ errors: 'Document not found!' });
    
    const updateOne = await labelsService.remove(documentId, label);
    if (updateOne) {
      res.status(200).json({ message: 'Successfully remove label.' });
    } else {
      res.status(500).json({ message: 'Error!' });
    }
  } catch (e) {
    res.status(500).json({ errors: e.message });
  }
};

