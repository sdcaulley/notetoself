const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
//const users = require('./routes/user-route');

const app = express();
app.use(cors());
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use('/', users);

app.get('/', function(req, res) {
    res.send('hello');
});

module.exports = app;
