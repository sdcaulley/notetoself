const chai = require('chai');
const assert = chai.assert;
const utils = require('../../lib/utilities/db-utils');
const Test = require('../test-schema');

describe('CRUD operations', () => {
  let payload = [
    {
      name: 'test1',
      place: 'here'
    },
    {
      name: 'test2',
      place: 'here'
    }
  ];

  async function createDocs(doc) {
    const response = doc.map(doc => {
      const data = utils.makeNewDocument(Test, doc);
      return data;
    });
    return Promise.all(response);
  }

  it('makeNewDocument saves a new document to the collection', async () => {
    const result = await utils.makeNewDocument(Test, payload[0]);
    assert.property(result, '_id');
  });

  it('findAllDocuments returns all the documents in a collections', async () => {
    const data = await createDocs(payload);
    const result = await utils.findAllDocuments(Test);
    assert.equal(result.length, data.length);
  });

  it('findOneDocument returns a document using a property', async () => {
    const data = await createDocs(payload);
    const result = await utils.findOneDocument(Test, { name: 'test2' });
    assert.deepEqual(data[1]._id, result._id);
  });

  it('updateDocument modifies existing document', async () => {
    const data = await createDocs(payload);
    const result = await utils.updateDocument(Test, data[0]._id, { name: 'Troy' });
    assert.propertyVal(result, 'name', 'Troy');
  });

  it('deleteDocument removes a document from the collection', async () => {
    const data = await createDocs(payload);
    const confirm = await utils.deleteDocument(Test, data[1]._id);
    assert.deepEqual(data[1]._id, confirm._id);
  });
});
