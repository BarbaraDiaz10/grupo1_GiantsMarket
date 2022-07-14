const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models/index');

const mainController = {
    index: (req, res) => {
        /*LISTAR LOS PRODUCTOS*/
        db.Product.findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(products => {
                if (req.session.form) {
                    let data = req.session.form
                    res.render("index", { data: data, products });
                }
                res.render("index", { products })
            })
    },

    admin: (req, res) => {
        res.send("Hola admin " + req.query.user)
    }
}

module.exports = mainController