process.env.MONGODB_URI = 'mongodb://localhost:27017/n2s_test';
require('../lib/db');
const mongoose = require('mongoose');
const app = require('../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(app);

before((done) => {
    console.log('before hook');
    const drop = () => mongoose.connection.dropDatabase(() =>{
        done();
    });
    if(mongoose.connection.readyState === 1) drop();
    else mongoose.connection.on( 'open', drop);
});

before(() => {
    const users = [
        {
            name: 'user1',
            email: 'user1@test.com',
            password: 'user123',
            password_confirm: 'user123'
        },
        {
            name: 'user2',
            email: 'user2@test.com',
            password: 'user231',
            password_confirm: 'user231'
        },
        {
            name: 'user3',
            email: 'user3@test.com',
            password: 'user312',
            password_confirm: 'user312'
        }
    ];

    function saveUser(user) {
        request
            .post('/register')
            .send(user)
            .then(res => {
                user._id = res.body._id;
            })
            .catch(function(err) {
                console.log('user err = ', err);
            });
    }

    users.forEach(user => {
        saveUser(user);
    });
});
