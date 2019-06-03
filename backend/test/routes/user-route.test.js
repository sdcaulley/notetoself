const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const badRequest = require('./bad-request');

describe('user', () => {
    describe('user management', () => {
        it('email should not be in use', () => {
            badRequest('/register', { email: 'user1@test.com' }, 'Email is already in use');
        });
    });
});
