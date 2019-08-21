const mysql = require('mysql');
const { DB_HOST, DB_PSW, DB_NAME, DB_USER } = require('../config');

//Create Connection
const connection = mysql.createConnection({
  host      : DB_HOST,
  user      : DB_USER,
  password  : DB_PSW,
  database  : DB_NAME
});

//Connection
connection.connect((err) =>{
  if(err) {
    console.log(err);
  } else {
    console.log('MySql Connected.....');
  }
});

module.exports = connection;
