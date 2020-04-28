const { Product } = require("./model")

// Get All Products
const findAll = (req, res) => { //podaj do postman np.localhost:2137/api/products?page=1&limit=3 to zadziala/mozesz podac np. samo page bez limitu to limiy bedzie domyslna wartoscia
    const pageOptions = { //pierwsza strona to page=0
        page: parseInt(req.query.page, 10) || 0, //parsuje /api/products?page=1&limit=3 tak zeby czytalo strona = 1 limit = 3 
        limit: parseInt(req.query.limit, 10) || 5 // po || sa podane domysle wartosci jesli nie ma podanego query po pytajniku /api/products
    }//parseInt(req.query.limit, 10) ta 10 to radix, okresla do jakiego systemu maja byc parsowane liczby(10 jest domyslna i nie trzeba jej podawac i jest systemem decymalnym)

    Product.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec((err, product) => {
            if (err) { return res.status(500).send({ message: err.message }) };
            res.json(product.map(product => product.view()))
        });//skip przy duzych bazach pewnie nie jest najlepszym rozwiazaniem  
};

// Find a Product by name
const findByName = (req, res) => {
    Product.find({ name: RegExp(`^${req.params.product}`, 'i') })
        .populate('activeSubstance', '-_id -__v')
        .exec((err, product) => {

            if (err) return res.status(500).json({ error: err.message });
            if (product.length === 0) {
                return res.status(404).send({
                    message: "No products were found"
                });
            }
            res.send(product.map(product => product.view(true)));
        });
};

const findByActiveName = (req, res) => {
    Product.find()
        .populate({
            path: 'activeSubstance',
            match: { substance: req.params.activeName },
            select: '-_id -__v'
        })
        .exec((err, product) => {
            if (err) return res.status(500).json({ error: err.message });

            product = product.filter((product) => {
                return product.activeSubstance.length
            });

            if (typeof product !== 'undefined' && product.length > 0) {
                res.send(product.map(product => product.view(true)));
            }
            else {
                return res.status(404).json({
                    message: `Product with given active ingredient ${req.params.activeName} was not found`
                });
            }
        });
}

module.exports = { findAll, findByName, findByActiveName };