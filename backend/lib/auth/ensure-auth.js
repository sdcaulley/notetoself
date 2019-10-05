const token = require('./token');

async function ensureAuth(ctx, next) {
  const bearerToken = ctx.header.authorization;
  //code needed for Postman
  //const auth = bearerToken.split(' ')[1];

  return next(token.verify(bearerToken));
}

module.exports = ensureAuth;
