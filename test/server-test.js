var expect  = require('chai').expect;
var request = require('request');

it('get config', function(done) {
    request('http://localhost:5000' , function(error, response, body) {
        expect(body).to.equal();
        done();
    });
});
