const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String
    },
    modified_date: {
        type: Date,
        default: Date.now
    },
    size: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
