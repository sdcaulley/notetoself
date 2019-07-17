const mysql = require('mysql');

//Create Connection
const connection = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : 'iwtMoFmS17_',
    database  : 'n2s'
});

//Connection
connection.connect((err) =>{
    if(err) {
        console.log(err);
    }
    console.log('MySql Connected.....');
});

module.exports = connection;
