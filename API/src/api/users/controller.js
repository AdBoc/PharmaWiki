const User = require('./model')
const { sign } = require("../../services/jwt");

const create = async ({ body }, res, next) => {
    try {
        const user = await User.create(body);
        res.status(201).json({
            user: user.view(),
            token: sign(user)
        })
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({
                message: 'Email or username already registered'
            })
        }
        next(err);
    }

};

const login = async (req, res, next) => {
    const { user } = req;
    const token = sign(user);

    res.json({//user: user.view(),
        token
    });
};

const showMe = async (req, res, next) => {
    let { user } = req;
    try {
        let myUser = await User.findById(user.id); //myUser = myUser.map(user => user.view()); //filtracja
        myUser = myUser.view()
        res.json(myUser);
    } catch (err) {
        next(err);
    }
};

const editUser = async (req, res, next) => { // user moze sobie zmienic tylko username
    let { user } = req;
    try {
        await User.findByIdAndUpdate(user.id, { username: req.body.username }); //pozwala na zmiane tylko hasla        
        res.redirect('..'); //redirect o strone do tylu czyli z user/me/options do user/me //default status to 302 found dla redirecta//ewentualnie mozna dac zamiast .. /api/user/me
    } catch (err) {
        next(err);
    }
}

const deleteDB = async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id, (err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!doc) return res.status(404).end();

        res.status(204).end();
    });
};

const index = async ({ query }, res, next) => {
    let users = await User.find();
    users = users.map(user => user.view());
    res.json(users);
};
module.exports = { create, deleteDB, login, index, showMe, editUser }