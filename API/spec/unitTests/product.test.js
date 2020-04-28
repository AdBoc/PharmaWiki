'use strict'
const should = require('chai').should();
const { Product } = require('../../src/api/product/model');
const { ActiveSubstance } = require('../../src/api/active_substances/model');
const assert = require('assert');

const { createProduct } = require('../createNewProduct');

describe('Unit tests for products', () => {

    before(async () => {
        await Product.deleteMany({});
        await ActiveSubstance.deleteMany({});
        createProduct();
    });

    describe('#Creating invalid product', () => {

        it('create product without name', (done) => {
            const product = new Product({ prescription: "true", details: "details" });
            product.save((err) => {
                assert(err.name === 'ValidationError');
                done();
            });
        }); //prescription jest tworzone zawsze DOMYSLNIE na true, nawet jesli sie jej nie precyzuje

        it('create product without details', (done) => {
            const product = new Product({ name: "aabbccdd", prescription: "true" });
            product.save((err) => {
                assert(err.name === 'ValidationError');
                done();
            });
        });
    });

    describe('#Testing product and methods', () => {

        it('Finds product', (done) => {
            Product.findOne({ name: "amotaks" })
                .then((product) => {
                    product.should.be.a('object');
                    product.should.have.property('name');
                    product.should.have.property('activeSubstance');
                    product.should.have.property('prescription');
                    product.should.have.property('refundation');
                    product.should.have.property('details');
                    done();
                }).catch((err) => done(err));
        });

        it('test view method', (done) => {
            Product.findOne({ name: "amotaks" })
                .then((product) => {
                    product.view().should.be.a('object');
                    product.view().should.have.property('name');
                    product.view().should.not.have.property('activeSubstance');
                    product.view().should.not.have.property('prescription');
                    product.view().should.not.have.property('refundation');
                    product.view().should.have.property('details');
                    done();
                }).catch((err) => done(err));
        });

        it('test view method', (done) => {
            Product.findOne({ name: "amotaks" })
                .then((product) => {
                    product.view(true).should.be.a('object');
                    product.view(true).should.have.property('name');
                    product.view(true).should.have.property('activeSubstance');
                    product.view(true).should.have.property('prescription');
                    product.view(true).should.have.property('refundation');
                    product.view(true).should.have.property('details');
                    done();
                }).catch((err) => done(err));
        });

    });
})