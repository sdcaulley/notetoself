const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./routes/user-route');
//const category = require('./routes/category-routes');
const app = express();
const morgan = require('morgan');

//set up middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up routes
app.use('/', users);
//app.use('/category', category);

app.get('/', function(req, res) {
  res.send('hello');
});

module.exports = app;
