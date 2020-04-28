'use strict'
const should = require('chai').should(); // require('expect') const expect = chai.expect; lub const {expect} = require("chai");
const { ActiveSubstance } = require('../../src/api/active_substances/model');
const assert = require('assert');

const { fillDB } = require('../createNewProduct');

describe('Unit tests for products', () => {

    before(async () => {
        await ActiveSubstance.deleteMany({});
        fillDB();
    });

    describe('#Creating invalid Active Ingredient', () => {

        it('create active ingredient without name', (done) => {
            const activeSubstance = new ActiveSubstance({ description: "desc" });
            activeSubstance.save((err) => {
                assert(err.name === 'ValidationError');
                done();
            });
        });
    });

    describe('#Creating valid Active Ingredient', () => {

        it('create active ingredient', (done) => {
            const activeSubstance = new ActiveSubstance({ substance: "substancja", description: "desc" });
            activeSubstance.save()
                .then(active => {
                    active.should.be.a('object');
                    active.should.have.property('substance');
                    active.should.have.property('description');
                    done();
                }).catch((err) => done(err));
        });
    });
});