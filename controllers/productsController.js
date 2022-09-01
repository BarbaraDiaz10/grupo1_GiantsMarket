const fs = require('fs');
const path = require('path');


const productsFilePath = (path.join(__dirname, '../data/products.json'));
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8'); //Esta función solo escribe en el JSON
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models/index');
let user = db.User.findOne();
const Product = db.Product;
const Category = db.Category;
const productsController = {
    // index: (req, res) => {
    //     /*LISTAR LOS PRODUCTOS*/
    //     db.Product.findAll({
    //             order: [
    //                 ['name', 'ASC']
    //             ]
    //         })
    //         .then(products => {
    //             if (req.session.form) {
    //                 let data = req.session.form
    //                 res.render("index", { data: data, products });
    //             }
    //             res.render("index", { products })
    //         })
    // },

    productDetail: (req, res) => {
        // db.Product.findByPk(req.params.id)
        //     .then(product => {
        //         res.render('productDetail', {
        //             product,
        //             toThousand
        //         })
        //     })
        let product = db.Product.findByPk(req.params.id)
        Promise.all([user, product])
            .then(data => {
                let [user, product] = data
                res.render('productDetail', { user, product, toThousand })
            })
    },
    productCart: (req, res) => {
        res.render("productCart")
    },

    create: (req, res) => { //Solo necesitamos pasarle la vista renderizada para que la rellene, es por get
        let product = db.Product.findByPk(req.params.id)
        Promise.all([user, product])
            .then(data => {
                let [user, product] = data
                res.render('createProduct', { user, product, toThousand })
            })

        /*llamar al crear
        db.product.findAll()
        .then((allCategories)=>{
            res.render('createProduct')
        })*/
    },

    store: (req, res) => {
        //console.log(req.files[0].filename)
            /***********************PARA LAS IMAGENES ***********************/
        let imageBd

        if (req.files[0] != undefined) {
            imageBd = req.files[0].filename
        } else {
            imageBd = "default-image.png"
        }
        /********************************************************** */
        db.Product.create({
                ...req.body,
                image: '/images/products/' + imageBd
            })
            .then(() =>
                res.redirect('/')

            )

    },
    edit: (req, res) => {

        let id = req.params.id;

        let promProduct = Product.findByPk(id)
            // let promCategories = Category.findAll()
        Promise
            .all([promProduct, user])
            .then(([Product, user]) => {
                res.render("editProduct", { Product, user })
            })





    },


    update: (req, res) => {
       // console.log(req.files[0])
            /***********************PARA LAS IMAGENES ***********************/
        let imageBd

        if (req.files[0] != undefined) {
            imageBd = req.files[0].filename
        } else {
            imageBd = "default-image.png"
        }
        let id = req.params.id;
        Product.update({...req.body,
            image: '/images/products/' + imageBd
        }, {
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/productDetail/' + id);
        }).catch(err => { res.send(err) });


    },

    destroy: (req, res) => {
        let productId = req.params.id;

        Product.destroy({
            where: {
                id: +productId
            }
        }).then(() => {
            res.redirect('/')
        }).catch(err => res.send(err))
    },

}

module.exports = productsController