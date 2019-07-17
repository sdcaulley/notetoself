const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const passport = require('passport');
const validateRegisterInput = require('../validation/register');
//const validateLoginInput = require('../validation/login');
const db = require('../connection');

userRouter.post('/register', function(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    let newUser = req.body;
    let sql = `SELECT id FROM notes_users WHERE login = '${ newUser.login }'`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log('register err:', err);
        } else if (result.length > 0) {
            return res.status(400).json({
                user: 'User already exists'
            });
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if(err) {
                    console.log('There was and error: ', err);
                } else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) {
                            console.log('There was an error: ', err);
                        } else {
                            newUser.password = hash;
                            const sql = `INSERT INTO notes_users(login, password, displayname) VALUES ('${newUser.login}', '${newUser.password}', '${newUser.displayname}')`;

                            db.query(sql, (err, response) => {
                                if(err) {
                                    console.log('There was an error: ', err);
                                } else {
                                    res.json(response);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// userRouter.post('/login', (req, res) => {
//     const { errors, isValid } = validateLoginInput(req.body);
//     if(!isValid) {
//         return res.status(400).json(errors);
//     }
//
//     const email = req.body.email;
//     const password = req.body.password;
//
//     User.findOne({email})
//         .then(user => {
//             if(!user) {
//                 errors.email = 'User not found';
//                 return res.status(404).json(errors);
//             }
//             bcrypt.compare(password, user.password)
//                 .then(isMatch => {
//                     if(isMatch) {
//                         const payload = {
//                             id: user.id,
//                             name: user.name
//                         };
//                         jwt.sign(payload, 'secret', {
//                             expiresIn: 3600
//                         }, (err, token) => {
//                             if(err) console.log('There is some error in token', err);
//                             else {
//                                 res.json({
//                                     success: true,
//                                     token: `Bearer ${token}`
//                                 });
//                             }
//                         });
//                     } else {
//                         errors.password = 'Incorrect Password';
//                         return res.status(400).json(errors);
//                     }
//                 });
//         });
// });
//
// userRouter.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
//     return res.json({
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email
//     });
// });

module.exports = userRouter;
