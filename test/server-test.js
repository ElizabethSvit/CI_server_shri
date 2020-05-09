//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let assert = require('assert');

let server = require('../node-server.js');

// var sinon = require('sinon');
// var PassThrough = require('stream').PassThrough;
// var http = require('http');

// let SettingsForm = require('../ci-client/src/components/SettingsForm');

chai.use(chaiHttp);

describe('SettingsForm queries testing', () => {

    describe('/GET repo settings', () => {
        it('it should get repo configs', (done) => {
            chai.request('http://localhost:5000')
                .get('/api/settings')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST repo settings', () => {
        it('it should POST repo settings', (done) => {
            let settings = {
                "repoName": "string",
                "buildCommand": "string",
                "mainBranch": "string",
                "period": 0
            };
            chai.request('http://localhost:5000')
                .post('/api/settings')
                .send(settings)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // testing the correct parameters in post
    // describe('/POST repo settings', () => {
    //     before(function() {
    //         this.request = sinon.stub(http, 'request');
    //     });
    //     it('should send post params in request body', function() {
    //         let settings = {
    //             "repoName": "string",
    //             "buildCommand": "string",
    //             "mainBranch": "string",
    //             "period": 0
    //         };
    //
    //         var expected = JSON.stringify(settings);
    //
    //         var request = new PassThrough();
    //         var write = sinon.spy(request, 'write');
    //
    //         this.request.returns(request);
    //         server.post(settings, function() { });
    //         assert(write.withArgs(expected).calledOnce);
    //     });
    // });
});

describe('/GET list of builds', () => {
    it('it should get list of builds', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/builds')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/GET build details', () => {
    it('it should return error on empty buildId', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/build/details?buildId=')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('it should GET build details', (done) => {
        // TODO: как-то вызывать реальную апишку и брать оттуда buildId
        chai.request('http://localhost:5000')
            .get('/api/build/details?buildId=123')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    // it('it should GET build details', (done) => {
    //     // TODO: как-то вызывать реальную апишку и брать оттуда buildId
    //     let buildId = "94f187db-3d37-492d-a8bd-ffae57a2d1e1";
    //     chai.request('http://localhost:5000')
    //         .get('/api/build/details')
    //         .send(buildId)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });
});

describe('/GET build log', () => {
    it('it should return error on empty buildId', (done) => {
        let buildId = "";
        chai.request('http://localhost:5000')
            .get('/api/build/log?buildId=')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
