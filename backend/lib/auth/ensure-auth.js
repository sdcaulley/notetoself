const token = require('./token');

async function ensureAuth(ctx, next) {
  const bearerToken = ctx.header.authorization;
  const auth = bearerToken.split(' ')[1];

  return next(token.verify(auth));
}

module.exports = ensureAuth;
