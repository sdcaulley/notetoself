const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/user-route');
//const category = require('./routes/category-routes');
const app = express();
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(cors());
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', users);
//app.use('/category', category);

app.get('/', function(req, res) {
    res.send('hello');
});

module.exports = app;
