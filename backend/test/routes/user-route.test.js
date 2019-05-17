const app = require('../../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(app);
const badRequest = require('./bad-request');

describe('user', () => {
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
                    console.log('err ', err);
                });
        }

        users.forEach(user => {
            saveUser(user);
        });
    });

    describe('user management', () => {
        it('email should not be in use', () => {
            badRequest('/register', { email: 'user1@test.com' }, 'Email is already in use');
        });
    });
});
