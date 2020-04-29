const User = require('../api/users/model')

module.exports = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    User.findOne({ username }).then((user) => {
        if (!user) {
            return res.status(403).json({message: 'Wrong Email or Password'}).end();
        }
        return user.authenticate(password, user.password).then((user) => {
            if (!user) return res.status(403).json({message: 'Wrong Email or Password'}).end();

            req.user = user;
            next();
        })
    });

};
