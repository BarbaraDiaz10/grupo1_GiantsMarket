const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const several = products.filter(product => product.category == 'varios');
const unique = products.filter(product => product.category == 'unico');


const mainController = {
    index: (req, res) => {
        res.render("index", { products })
    }
}

module.exports = mainController