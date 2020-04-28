const { ActiveSubstance } = require('./active_substances/model');
const { Product } = require('./product/model');
const token = require('../middlewares/token');
const { Router } = require('express');
const router = Router();

router.get('/init', token, init = (req, res) => {

    function saveIt(someproduct) {
        someproduct.save((err) => {
            if (err) return console.error(err.stack)
            console.log(`product is saved`);
        });
    }

    //add ACTIVE SUBSTANCES
    const amoksycyklina = new ActiveSubstance({
        substance: "amoksycyklina",
        description: "ogólnego zastosowania antybiotyk"
    });
    const lewetyracetam = new ActiveSubstance({
        substance: "lewetyracetam",
        description: "padaczka"
    })
    const ascorbic_acid = new ActiveSubstance({
        substance: "ascorbic acid",
    })
    const rutosidum = new ActiveSubstance({
        substance: "rutosidum",
    })
    const ketoprofenum = new ActiveSubstance({
        substance: "ketoprofenum",
        description: "zwyrodnieniowe choroby reumatyczne"
    })

    //add PRODUCTS
    const amotaks = new Product({
        name: "amotaks",
        prescription: "true",
        refundation: "100% of price",
        details: 'kapsulki twarde | 0,5g | 16 kaps |'
    });
    amotaks.activeSubstance.push(amoksycyklina._id);
    const cezarius = new Product({
        name: "cezarius",
        prescription: "true",
        refundation: "100% of price",
        details: 'kapsulki twarde | 0,5g | 50 kaps |'
    });
    cezarius.activeSubstance.push(lewetyracetam._id);
    const rutionoscorbin = new Product({
        name: "rutinoscorbin",
        details: 'kapsulki twarde | 0,5g | 60 kaps |'
    });
    rutionoscorbin.activeSubstance.push(rutosidum._id, ascorbic_acid._id);

    const cerutin = new Product({
        name: "cerutin",
        details: 'kapsulki twarde | 0,5g | 20 kaps |'
    })
    cerutin.activeSubstance.push(ascorbic_acid._id);

    const ketonal = new Product({
        name: "ketonal",
        prescription: "true",
        refundation: "50% of price",
        details: "kapsułki twarde | 0,05 g | 30 kaps |" 
    })
    ketonal.activeSubstance.push(ketoprofenum._id)

    const ketonal1 = new Product({
        name: " ",
        prescription: "true",
        refundation: "50% of price",
        details: "roztwór do wstrzykiwań | 0,05 g/ml | 10 amp. po 2 ml |" 
    })
    ketonal1.activeSubstance.push(ketoprofenum._id)

    saveIt(amoksycyklina);
    saveIt(lewetyracetam);
    saveIt(ascorbic_acid);
    saveIt(rutosidum);
    saveIt(amotaks);
    saveIt(cezarius);
    saveIt(rutionoscorbin);
    saveIt(cerutin);
    saveIt(ketoprofenum);
    saveIt(ketonal);
    saveIt(ketonal1);

    res.send("DB filled")
});

router.get('/drop', token, (req, res) => {

    ActiveSubstance.remove({}, function (err) {
        console.log('collection removed');
    });
    Product.remove({}, function (err) {
        console.log('collection removed');
    });

    res.send("collection removed");
});

module.exports = router;