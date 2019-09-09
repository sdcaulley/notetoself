const User = require('../../models/user-schema');
const token = require('../../auth/token');
const dbUtils = require('../../utilities/db-utils');
const ensureAuth = require('../../auth/ensure-auth');

async function userRegistration(ctx, next) {
  const user = await dbUtils.makeNewDocument(ctx.request.body, User);

  if (user) {
    const userToken = await token.sign(user);

    ctx.response.body = {
      user: {
        _id: user._id,
        displayName: user.displayName
      },
      token: userToken
    };
    await next();
  }
}

async function userLogin(ctx, next) {
  const user = await dbUtils.findOneDocument(User, { login: ctx.request.body.login });
  const hasPass = await user.comparePassword(ctx.request.body.password, next);

  if(hasPass) {
    const userToken = await token.sign(user);
    ctx.response.body = {
      user: {
        _id: user._id,
        displayName: user.displayName
      },
      token: userToken};
  }

  await next();
}

async function userUpdate(ctx, next) {
  const data = ctx.request.body;
  const payload = {};

  if(data.login) { payload.login = data.login; }
  if(data.displayName) { payload.displayName = data.displayName; }

  const user = await dbUtils.updateDocument(User, data._id, payload);

  if(data.password) {
    user.password = data.password;
  }

  const newUser = await user.save();
  ctx.response.body = {
    user: {
      _id: newUser._id,
      login: newUser.login,
      displayName: newUser.displayName
    }
  };

  await next();
}

async function userDelete(ctx) {
  const array = ctx.request.url.split('/');
  const id = array[2];
  const confirm = dbUtils.deleteDocument(User, id);
  if(confirm) {
    ctx.response.body = {
      message: 'Your account has been deleted.'
    };
  }
}

module.exports = (router) => {
  router.post('/registration', userRegistration);
  router.post('/login', userLogin);
  router.patch('/update', ensureAuth, userUpdate);
  router.delete('/:id', ensureAuth, userDelete);
};
