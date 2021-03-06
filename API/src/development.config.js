module.exports = {
    http: {
        port: 2137,
        ip: '127.0.0.1',
        apiRoot: '/api'
    },
    mongoDB: {
        host: 'mongodb://localhost/pharma',
        options: {
            debug: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    },
    jwtExpiration: "30d"
}