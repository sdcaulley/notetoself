const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
