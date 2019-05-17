const app = require('../../lib/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request(app);

const assert = chai.assert;

function badRequest(url, data, error) {
    request
        .post(url)
        .send(data)
        .then(
            () => { throw new Error('Status should not be OK'); },
            res => {
                assert.equal(res.status, 400);
                assert.equal(res.response.body.error, error);
            }
        )
        .catch(function(err) {
            console.log('err ', err);
        });
}

module.exports = badRequest;
