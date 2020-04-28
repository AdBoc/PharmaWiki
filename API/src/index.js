const { http, mongoDB } = require('./config');
const routing = require('./api');

require('dotenv').config();
const expressService = require('./services/express');
const mongoService = require('./services/mongoose');

const app = expressService(http, routing);
const db = mongoService(mongoDB);

module.exports = {
    app,
    db
}