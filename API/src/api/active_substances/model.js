const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActiveSubstanceSchema = new Schema({
    substance: {
        type: String,
        required: true,
        unique: true,
        match: /[a-zA-Z0-9]/g
    },
    description: {
        type: String,
        maxlength: 35
    }
})

module.exports = {
    ActiveSubstanceSchema,
    ActiveSubstance: mongoose.model('ActiveSubstance', ActiveSubstanceSchema)
}
