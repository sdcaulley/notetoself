const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
