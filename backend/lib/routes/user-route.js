const User = require('../models/user-schema');
const token = require('../auth/token');
const { findUser, makeNewDocument } = require('../utilities/db-utils');

async function userRegistration(ctx, next) {
  console.log('hello from userRegistration');
  const user = await makeNewDocument(ctx.request.body, User);

  if (user) {
    const userToken = await token.sign(user);

    ctx.response.body = {
      user: {
        id: user._id,
        displayName: user.displayName
      },
      token: userToken
    };
    await next();
  }
}

async function userLogin(ctx, next) {
  const user = await findUser(User, { login: ctx.request.body.login });
  const hasPass = await user.comparePassword(ctx.request.body.password, next);
  console.log('hasPass: ', hasPass);
  if(hasPass) {
    const userToken = await token.sign(user);
    ctx.response.body = {
      user: {
        id: user._id,
        displayName: user.displayName
      },
      token: userToken};
  }

  await next();
}

module.exports = {
  userRegistration,
  userLogin
};
