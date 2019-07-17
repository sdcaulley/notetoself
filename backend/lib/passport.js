const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('./connection');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        let user_id = jwt_payload.id;
        let queryStatement = `SELECT id, login, password, displayname FROM notes_users WHERE id = ${user_id}`;

        db.query(queryStatement, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return done(null, result);
            }
        });
    }));
};
