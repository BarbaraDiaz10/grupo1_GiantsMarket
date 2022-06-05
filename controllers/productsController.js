const fs = require('fs');
const path = require('path');


const productsFilePath = (path.join(__dirname, '../data/products.json'));
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8'); //Esta función solo escribe en el JSON

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    index: (req, res) => {
        res.render('products', {
            products,
            toThousand
        })
    },

    productDetail: (req, res) => {
        let productId = +req.params.id;
        let product = products.find(product => product.id === productId)

        res.render('productDetail', {
            product,
            toThousand
        })
    },
    productCart: (req, res) => {
        res.render("productCart")
    },

    create: (req, res) => { //Solo necesitamos pasarle la vista renderizada para que la rellene, es por get
        res.render('createProduct')
    },

    store: (req, res) => {
        /***********************PARA LAS IMAGENES ***********************/
        let image

        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = "default-image.png"
        }
        /********************************************************** */

        let newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: image //PARA LAS IMAGENES
        }
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
        res.redirect('/');

    },
    edit: (req, res) => {
        let id = +req.params.id;
        let product = products.find(product => product.id === id);

        res.render("editProduct", { product })
    },


    update: (req, res) => {
        let id = +req.params.id
        let productToEdit = products.find(product => product.id === id)
            //console.log('Got body:', req);
            //console.log('Get Id:', id);
        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            image: productToEdit.image
        };

        let productEdited = products.map(product => {
            if (product.id === productToEdit.id) {
                return product = {...productToEdit };
            }
            return product

        })


        //fs.writeFileSync(productsFilePath, JSON.stringify(productEdited));
        writeJson(productEdited)
        console.log(productEdited);
        res.redirect('/productDetail/' + id)
    },

    destroy: (req, res) => {
        let id = req.params.id;
        let productDelete = products.filter(i => i.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(productDelete));
        res.redirect('/');
    },


    /*login: (req, res) => {
        res.render("login")
    },
    register: (req, res) => {
        res.render("register")
    }*/
}

module.exports = productsController