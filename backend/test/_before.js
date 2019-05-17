process.env.MONGODB_URI = 'mongodb://localhost:27017/n2s_test';
require('../lib/db');
const mongoose = require('mongoose');

before((done) => {
    const drop = () => mongoose.connection.dropDatabase(() =>{
        done();
    });
    if(mongoose.connection.readyState === 1) drop();
    else mongoose.connection.on( 'open', drop);
});
