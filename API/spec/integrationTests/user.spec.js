'use strict'
const request = require('supertest');
const expect = require('chai').expect; // require('expect') const expect = chai.expect; 
const application = require('../../src/index');
const User = require('../../src/api/users/model');

const app = application.app;
const mongoose = application.db;

describe('Integrations for user creation', () => {

    before(async () => {
        await User.deleteMany({});
    });

    it('testing protected route', (done) => {
        request(app)
            .get('/api/user/me')
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

    describe('#POST /user/signup', () => {
        it('testing user signup', (done) => {
            request(app)
                .post('/api/user/signup')
                .send({ username: "piotrek", email: "piotrek@piotrek.piotrek", password: "piotrek" })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.token).to.not.be.empty;
                    done();
                });

        });

        it('user already exists', (done) => {
            request(app)
                .post('/api/user/signup')
                .send({ username: "piotrek", email: "piotrek@piotrek.piotrek", password: "piotrek1" })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(409);
                    done();
                });
        });
    });

    describe('#POST /user/login', () => {
        let token = null;

        it('testing login functionality with bad credentials', (done) => {
            request(app)
                .post('/api/user/login')
                .auth('incorrect', 'credentials', (err) => (done()))
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body.token).to.be.undefined;
                    done();
                });
        });

        it('testing login functionality', (done) => {
            request(app)
                .post('/api/user/login')
                .auth('piotrek', 'piotrek')
                .end((err, res) => {
                    token = res.body.token;
                    expect(token).to.not.be.empty;
                    expect(res.body.user).to.be.to.be.an('object');
                    expect(res.body).to.have.all.keys(['user', 'token']);
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });

        it('testing protected route', (done) => {
            request(app)
                .get('/api/user/me')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res.body).to.have.all.keys(['id', 'username', 'email']);
                    expect(res.body.username).to.equal('piotrek');
                    expect(res.body.email).to.equal("piotrek@piotrek.piotrek")
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });

        it('test username change', (done) => {
            request(app)
                .patch('/api/user/me/options')
                .set('Authorization', 'Bearer ' + token)
                .send({ username: "ricardo", email: "orlicki@love.ricardo" })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(302);
                    done();
                });
        });

        it('testing protected route', (done) => {
            request(app)
                .get('/api/user/me')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    expect(res.body).to.have.all.keys(['id', 'username', 'email']);
                    expect(res.body.username).to.equal('ricardo');
                    expect(res.body.email).to.equal("piotrek@piotrek.piotrek")
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });
});