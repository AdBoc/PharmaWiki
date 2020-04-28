'use strict'
const { app } = require('../../src/index');
const request = require('supertest');
const expect = require('chai').expect;
const { Product } = require('../../src/api/product/model');
const { ActiveSubstance } = require('../../src/api/active_substances/model');
const jwt = require('jsonwebtoken');
const { createProduct } = require('../createNewProduct');


describe('Integrations for user creation', () => {

    before(async () => {
        await Product.deleteMany({});
        await ActiveSubstance.deleteMany({});
        createProduct();
    });

    describe('Set header', () => {
        const token = jwt.sign({
            id: 123
        }, process.env.JWT_SECRET, { expiresIn: "30d" })

        describe('# GET /api/products', () => {
            it('should show only important fields', (done) => {
                request(app)
                    .get('/api/products')
                    .set('Authorization', 'Bearer ' + token)
                    .query({ page: 0, limit: 5 })
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
                            .that.includes.all.keys(['name', 'details']);
                        done();
                    });
            });
        });

        describe('# GET /api/products/:searchForProduct', () => {
            it('should show only important fields', (done) => {
                request(app)
                    .get('/api/products/amotaks')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
                            .that.includes.all.keys(['name', 'details', 'refundation', 'prescription', 'activeSubstance']);
                        done();
                    });
            });
        });

        describe('# GET /api/products/active/:searchForProducts', () => {
            it('should show only important fields', (done) => {
                request(app)
                    .get('/api/products/active/amoksycyklina')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body)
                            .to.be.an.instanceof(Array)
                            .and.to.have.property(0)
                            .that.includes.all.keys(['name', 'details', 'refundation', 'prescription', 'activeSubstance']);
                        done();
                    });
            });
        });
    });
});