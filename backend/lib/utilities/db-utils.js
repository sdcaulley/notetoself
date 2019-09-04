
function findUser (collection, search) {
  return collection.findOne(search);
}

function makeNewDocument(item, collection) {
  let newItem = new collection(item);
  return newItem.save();
}

module.exports = {
  findUser,
  makeNewDocument,
};
