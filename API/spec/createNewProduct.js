const { Product } = require('../src/api/product/model');
const { ActiveSubstance } = require('../src/api/active_substances/model');

function fillDB() {

    amoksycyklina = new ActiveSubstance({
        substance: "amoksycyklina",
        prescription: "true",
        description: "antybiotyk"
    });

    amoksycyklina.save((err) => {
        if (err) return console.error(err.stack)
    });
}

function createProduct() {

    fillDB();

    const amotaks = new Product({
        name: "amotaks",
        prescription: "true",
        refundation: "100% of price",
        details: 'kapsulki twarde | 0,5g | 16 kaps |'
    });
    amotaks.activeSubstance.push(amoksycyklina._id);

    amotaks.save((err) => {
        if (err) return console.error(err.stack)
    });
}
module.exports = { fillDB, createProduct };