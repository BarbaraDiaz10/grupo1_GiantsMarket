const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const several = products.filter(product => product.category == 'varios');
const unique = products.filter(product => product.category == 'unico');
const { validationResult } = require('express-validator');

const mainController = {
    index: (req, res) => {
        if (req.session.form) {
            let data = req.session.form
            res.render("index", { data: data, products });
        }
        res.render("index", { products })
    },

    admin: (req, res) => {
        res.send("Hola admin " + req.query.user)
    }
}

module.exports = mainController