const express = require('express');
const router = express.Router();
const User = require('../models/user-schema');
const token = require('../auth/token');

//User registration
router
  .post('/register', (req, res) => {
    let newUser = new User(req.body);
    let userObj;

    return newUser.save()
      .then(user => {
        userObj = user;
        return token.sign(user);
      })
      .then(token => {
        res.send({ userObj, token});
      })
      .catch(err => {
        let message = 'That login is already in use.';
        console.log('err: ', err);
        res.send(message);
      });
  })
  //user login
  .post('/login', (req, res) => {
    let userObj;

    User.findOne({login: req.body.login})
      .then(user => {
        if (!user) {
          throw {
            code: 400,
            error: 'User does not exist.'
          };
        } else if (!user.comparePassword(req.body.password)) {
          throw {
            code: 400,
            error: 'Password is incorrect.'
          };
        }
        return user;
      })
      .then(user => {
        userObj = user;
        return token.sign(user);
      })
      .then(token => {
        res.send({userObj, token});
      })
      .catch(err => {
        console.log('login err: ', err);
        res.send(err.error);
      });
  });

module.exports = router;
