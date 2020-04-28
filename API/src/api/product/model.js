const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: false,
        index: true,
        required: true,
        match: /[a-zA-Z0-9]/g
    },
    activeSubstance: [{
        type: Schema.Types.ObjectId,
        ref: 'ActiveSubstance'
    }],
    prescription: {
        type: Boolean,
        default: false,
        required: true
    },
    refundation: {
        type: String,
        enum: ['Not refunded', '50% of price', '30% of price', '100% of price'],
        default: 'Not refunded'
    },
    details: {
        type: String,
        required: true
    }
});

ProductSchema.methods.view = function (full) {
    const obj = {
        name: this.name,
        details: this.details
    }

    if (full) {
        return {
            ...obj,
            refundation: this.refundation,
            prescription: this.prescription,
            activeSubstance: this.activeSubstance
        }
    }
    return obj;
}

module.exports = {
    ProductSchema,
    Product: mongoose.model('Product', ProductSchema)
}