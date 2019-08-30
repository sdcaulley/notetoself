const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    require: true
  },
  hash: {
    type: String,
    rquire: true
  },
  salt: {
    type: String,
    require: true
  },
  displayName: {
    type: String,
    require: true
  }
});

UserSchema.virtual('password').set(function(password) {
  this.hash = bcrypt.hash(password, 10, (err) => {
    console.log('bcrypt err: ', err);
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.hash, (err) => {
    console.log('compare password err: ', err);
  });
};

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;
