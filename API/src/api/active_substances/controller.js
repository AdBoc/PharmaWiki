const { ActiveSubstance } = require('./model');

const index = (req, res) => {
    ActiveSubstance.find({}, "-_id -description -__v")
        .then(activesubstance => {
            res.send(activesubstance);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

const findByName = (req, res) => {
    ActiveSubstance.find({ substance: RegExp(`^${req.params.active}`, 'i') }, "-_id -__v")
        .exec((err, activesubstance) => {
            if (err) return res.status(500).json({ error: err.message });
            if (activesubstance.length === 0) {
                return res.status(404).send({
                    message: "No active substance was found"
                });
            }
            res.send(activesubstance);
        });
};

module.exports = { index, findByName }