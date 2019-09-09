const jsonSize = require('json-size');

function findAllDocuments (collection) {
  return collection.find().lean();
}

function findOneDocument (collection, search) {
  return collection.findOne(search).lean();
}

function makeNewDocument(collection, item) {
  let newItem = new collection(item);
  return newItem.save().lean();
}

function updateDocument(collection, id, data) {
  return collection.findByIdAndUpdate(id, data, { new: true }).lean();
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
