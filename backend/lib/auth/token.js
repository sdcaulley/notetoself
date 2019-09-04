const jwt = require('jsonwebtoken');
const { sekret } = require('../../config');

module.exports = {
  sign(user) {
    const payload = {
      id: user._id,
      displayName: user.displayName
    };

    return jwt.sign(payload, sekret);
  },
  verify(token) {
    return jwt.verify(token, sekret);
  }
};
