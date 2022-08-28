const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { user } = require('../userController');


const Category= db.Category;


const categoryAPIController = {
    'list': (req, res) => {
        db.Category.findAll({
            attributes: ['id', 'category_name']})

      
        .then(category => {
            let respuesta = {
                
                meta: {
                    status : 200,
                    total: category.length,
                    url: 'api/category'
                },
                data: category
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Category.findByPk(req.params.id,{attributes: ['id', 'category_name']
        })
            .then(category => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: category.length,
                        url: '/api/category/:id'
                    },
                    data: category
                }
                res.json(respuesta);
            });
    },
    
    
    
}

module.exports = categoryAPIController;