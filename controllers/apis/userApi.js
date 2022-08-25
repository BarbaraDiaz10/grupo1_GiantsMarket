const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { user } = require('../userController');



const User = db.User;
const Rol= db.Rol;

const userAPIController = {
    'list': (req, res) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'email', [db.sequelize.fn("CONCAT",'api/users/',db.Sequelize.col('id')),"detail"]
            
        ]})

      
        .then(users => {
            let respuesta = {
                
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.User.findByPk(req.params.id,{attributes: ['id', 'first_name', 'last_name', 'email','date','gender','image' ]
        })
            .then(users => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: '/api/users/:id'
                    },
                    data: users
                }
                res.json(respuesta);
            });
    },
    
    
    
}

module.exports = userAPIController;