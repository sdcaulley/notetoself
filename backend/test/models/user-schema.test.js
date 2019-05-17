const User = require('../../lib/models/user-schema');
const testInvalid = require('./test_invalid')(User);

describe('user schema', () => {
    it('requires name', () => {
        return testInvalid({email: 'user@test.com', password: 'test'});
    });
    it('requires email', () => {
        return testInvalid({name: 'Test User', password: 'test'});
    });
    it('requires password', () => {
        return testInvalid({name: 'Test User', email: 'user@test.com'});
    });
});
