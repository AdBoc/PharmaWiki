'use strict'
const request = require('supertest');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');

const { ActiveSubstance } = require('../../src/api/active_substances/model');
const { app } = require('../../src/index');
const { fillDB } = require('../createNewProduct');

describe('Integrations for user creation', () => {

    before(async () => {
        await ActiveSubstance.deleteMany({});
        fillDB();
    });

    describe('with token', () => {
        const token = jwt.sign({
            id: 123
        }, process.env.JWT_SECRET, { expiresIn: "30d" })

        describe('# GET /api/active', () => {
            it('should show only important fields', (done) => {
                request(app)
                    .get('/api/active')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
                            .that.includes.all.keys(['substance']);
                        done();
                    });
            });
        });

        describe('# GET /api/activeSubstance/:searchForActive', () => {
            it('should show only important fields', (done) => {
                request(app)
                    .get('/api/active/amoksycyklina')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
                            .that.includes.all.keys(['substance', 'description']);
                        done();
                    });
            });
        });
    });
});