'use strict'
const User = require('../../src/api/users/model');
const assert = require('assert');
const should = require('chai').should();

describe('User unit tests ', () => {

    before(async () => {
        await User.deleteMany({});
    });

    describe('#Test for adding user', () => {
        it('creates an user', (done) => {
            const user = new User({ username: "piotrek<3", email: "piotr@piotr.piotr", password: "piotrek" });
            user.save().then(() => {
                assert(!user.isNew);
                done();
            });
        });

        it('Finds created user', (done) => {
            User.findOne({ username: 'piotrek<3' })
                .then((user) => {
                    assert(user.username === 'piotrek<3');
                    done();
                }).catch((err) => done(err));
        });
    });

    describe('Creating with invalid data', () => {
        it('missing username', (done) => {
            const user = new User({ email: "test@test.test", password: "test" });
            user.save((err) => {
                assert(err.name === 'ValidationError');
                done();
            });
        });

        it('missing email', (done) => {
            const user = new User({ username: "test", password: "test" });
            user.save((err) => {
                assert(err.name === 'ValidationError');
                done();
            });
        });

        it('email is not an email', (done) => {
            const user = new User({ username: "test", email: "testtest", password: "test" });
            user.save((err) => {
                assert(err.name === 'ValidationError');
                done();
            });
        });
    });

    describe('method view', () => {

        it('should show only username and email but not password', (done) => {
            User.findOne({ email: "piotr@piotr.piotr" })
                .then((user) => {
                    user.view().should.have.property('username');
                    user.view().should.have.property('id');
                    user.view().should.have.property('email');
                    user.view().should.not.have.property('password');
                    done();
                }).catch((err) => done(err));
        });

        it('password authentication when password is correct', async () => { //ASYNC
            const user = await User.findOne({ email: "piotr@piotr.piotr" });
            const res = await user.authenticate('piotrek')
            assert.ok(res);
        });

        it('password authentication when it is not correct', (done) => { //PROMISE
            User.findOne({ email: "piotr@piotr.piotr" })
                .then((user) => {
                    user.authenticate('invalidPassword')
                        .then((res) => {
                            res.should.be.false;
                            done();
                        }).catch((err) => done(err));
                });
        });
    });
});