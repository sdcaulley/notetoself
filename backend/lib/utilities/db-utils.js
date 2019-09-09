function findAllDocuments (collection) {
  return collection.find();
}

function findOneDocument (collection, search) {
  return collection.findOne(search);
}

function makeNewDocument(item, collection) {
  let newItem = new collection(item);
  return newItem.save();
}

function updateDocument(collection, id, data) {
  return collection.findByIdAndUpdate(id, data, { new: true });
}

async function deleteDocument(collection, id) {
  return await collection.findOneAndDelete({ _id: id });
}

module.exports = {
  findAllDocuments,
  findOneDocument,
  makeNewDocument,
  updateDocument,
  deleteDocument
};
