const jsonSize = require('json-size');

function findAllDocuments (collection) {
  return collection.find();
}

function findOneDocument (collection, search) {
  return collection.findOne(search);
}

function makeNewDocument(collection, item) {
  let newItem = new collection(item);
  return newItem.save();
}

function updateDocument(collection, id, data) {
  return collection.findByIdAndUpdate(id, data, { new: true });
}

async function deleteDocument(collection, id) {
  return await collection.findOneAndDelete({ _id: id });
}

function splitUrl (url) {
  const array = url.split('/');
  const id = array[2];
  return id;
}

async function findDocumentSize(document) {
  return jsonSize(document);
}

module.exports = {
  findAllDocuments,
  findOneDocument,
  makeNewDocument,
  updateDocument,
  deleteDocument,
  splitUrl,
  findDocumentSize
};
