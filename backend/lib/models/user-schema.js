const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    rquire: true
  },
  displayName: {
    type: String,
    require: true
  }
});

UserSchema.pre('save', function(next) {
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
  return bcrypt.compare(password, this.password);
};

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;
