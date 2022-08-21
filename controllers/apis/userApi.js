const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { user } = require('../userController');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const User = db.User;
const Rol= db.Rol;
//---------------------------
//Dentro del userAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const userAPIController = {
    'list': (req, res) => {
        db.User.findAll({
            attributes: ['id', 'first_name', 'email']
        })
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