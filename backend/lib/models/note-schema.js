const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    require: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    require: true
  },
  size: {
    type: Number
  }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
