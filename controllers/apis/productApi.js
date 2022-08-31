const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
//const { user } = require('../userController');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Product = db.Product;
const Category = db.Category;

//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const productsAPIController = {
    'list': (req, res) => {

        db.Product.findAll({
                attributes: ['id', 'name', 'description', [db.sequelize.fn("CONCAT", 'api/products/', db.Sequelize.col('id')), "detail"]

                ]
            })
            .then(products => {

                let response = {

                    meta: {
                        status: 200,
                        count: products.length,
                        //countByCategory: {},
                        products: 'api/products/'
                    },
                    data: products,

                }
                res.json(response);
            })
    },

    'detail': (req, res) => {
        db.Product.findByPk(req.params.id, {
                attributes: ['id', 'name', 'description', 'description_detail', 'price', 'discount', 'category_id', 'image', 'transferable', 'shipping', 'stock']
            })
            .then(products => {
                let response = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: '/api/products/:id'
                    },
                    data: products
                }
                res.json(response);
            });
    },

    'lastProduct': (req, res) => {
        db.Product.findAll({
                limit: 1,
                order: [
                    ['id', 'DESC'],
                ]

            })
            .then(products => {
                return res.json({
                    meta: {
                        status: 200,
                        url: "/api/products/last-product", //completar
                    },
                    data: products

                })
            })

    }

}

module.exports = productsAPIController;