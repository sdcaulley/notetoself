const Note = require('../../models/note-schema');
const dbUtils = require('../../utilities/db-utils');
const ensureAuth = require('../../auth/ensure-auth');

async function getNotes(ctx, next) {
  const notes = await dbUtils.findAllDocuments(Note);

  ctx.response.body = {
    notes: notes
  };

  await next();
}

async function addNote(ctx, next) {
  const data = ctx.request.body;
  const size = dbUtils.findDocumentSize(data);
  const payload = {
    data,
    size: size
  };
  const note = await dbUtils.makeNewDocument(Note, payload);

  ctx.response.body = {
    note: {
      note
    }
  };

  await next();
}

async function updateNote(ctx, next) {
  const data = ctx.request.body;
  const payload = {
    dateUpdated: Date.now
  };

  if(data.title) { payload.title = data.title; }
  if(data.category) { payload.category = data.category; }
  if(data.body) { payload.body = data.body; }

  const note = await dbUtils.updateDocument(Note, data._id, payload);
  const size = dbUtils.findDocumentSize(note);
  const noteSize = { note, size: size};
  const newNote = await noteSize.save();

  ctx.response.body = {
    note: {
      newNote
    }
  };

  await next();
}

async function deleteNote(ctx) {
  const id = await dbUtils.splitUrl(ctx.request.url);
  const note = await dbUtils.findOneDocument(Note, { _id: id });
  const confirm = dbUtils.deleteDocument(Note, id);
  if(confirm) {
    ctx.response.body = {
      message: `The note ${note.name} has been deleted.`
    };
  }
}

module.exports = (router) => {
  router.get('/', ensureAuth, getNotes);
  router.post('/add', ensureAuth, addNote);
  router.patch('/update', ensureAuth, updateNote);
  router.delete('/:id', ensureAuth, deleteNote);
};
