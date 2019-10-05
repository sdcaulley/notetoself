const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../server');
const assert = chai.assert;
const request = chai.request(server).keepOpen();

describe('user-routes', () => {
  const user1 = {
    login: 'user1@test.com',
    password: 'user1',
    displayName: 'user1'
  };

  it('userRegistration should create a new user', (done) => {
    request
      .post('/user/registration')
      .send(user1)
      .end((err, res) => {
        const result = res.body.user;
        assert.hasAnyKeys(result, ['_id']);
        done();
      });
  });

  it('userLogin should return a token', async () => {
    const user = await request
      .post('/user/registration')
      .send(user1)
      .then(res => {
        return res.body.user;
      })
      .catch(err => {
        console.error('error: ', err);
      });
    if (user) {
      request
        .post('/user/login')
        .send(user1)
        .end((err, res) => {
          const result = res.body;
          assert.hasAnyKeys(result, ['token']);
        });
    }
  });

  it('userUpdate changes an existing user document', async () => {
    const user = await request
      .post('/user/registration')
      .send(user1)
      .then(res => {
        return res.body;
      })
      .catch(err => {
        console.error('error: ', err);
      });

    if(user) {
      request
        .patch('/user/update')
        .send({
          _id: user.user._id,
          displayName: 'testNo'
        })
        .set('Authorization', user.token)
        .end((err, res) => {
          assert.propertyVal(res.body.user, 'displayName', 'testNo');
        });

    }
  });

  it('userDelete removes a user from the database', async () => {
    const user = await request
      .post('/user/registration')
      .send(user1)
      .then(res => {
        return res.body;
      })
      .catch(err => {
        console.error('error: ', err);
      });
    console.log('user: ', user);
    if(user) {
      const _id = user._id;
      request
        .delete(`/user/${_id}`)
        .set('Authorization', user.token)
        .end((err, res) => {
          assert.equal(res.body.message, 'Your account has been deleted.');
        });
    }
  });
});
