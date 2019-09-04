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
  displayName: {
    type: String,
    require: true
  }
});

UserSchema.pre('save', function(next) {
  console.log('inside pre');
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
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
