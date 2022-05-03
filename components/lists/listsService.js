const listsModel = require("./listsModel");

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
