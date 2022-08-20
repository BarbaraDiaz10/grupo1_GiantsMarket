const { check, body } = require('express-validator');
//const {users} = require("../data/db");
const bcrypt = require('bcryptjs')
const db = require('../database/models');
const { user } = require('../controllers/userController');

const validationLogin = [
    body('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),
  
    body('email').custom(value => {
    
      return db.User.findOne({
          where : {
              email : value
          }
      })
      .then(user => {
          if(!user){
              return Promise.reject('Este email no está registrado')
          }
      })
  }),
  /*body('email').notEmpty().withMessage("El email no puede ser vacio").bail()
    .isEmail().withMessage("Debe ingresar un formato de email válido"),*/
  body('password').custom((value, {req}) => {
  return db.User.findOne({where: { email: req.body.email}})
  /*.then((user)=>{
    if (!bcrypt.compareSync(value, user.password)){
      return Promise.reject()
    }*/
  })//.catch(() => {
    //return Promise.reject("Las contraseñas no coinciden");
  //})
  

    /*body('email').notEmpty().withMessage("El email no puede estar vacio").bail()
    .isEmail().withMessage("Debe ingresar un formato de email válido"),
    // body('password').notEmpty().withMessage("La contraseña no puede ser vacio").bail()
    // .isLength({ min: 8, max: 10 }).withMessage("La contraseña debe tener entre 8 a 10 caracteres")*/

]

module.exports = validationLogin;