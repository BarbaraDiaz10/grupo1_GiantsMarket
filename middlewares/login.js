const { body } = require('express-validator');

const validationLogin = [
    body('email').notEmpty().withMessage("El email no puede ser vacio").bail()
    .isEmail().withMessage("Debe ingresar un formato de email válido"), ,
    body('password').notEmpty().withMessage("La contraseña no puede ser vacio").bail()
    .isLength({ min: 8, max: 10 }).withMessage("La contraseña debe tener entre 8 a 10 caracteres")

]

module.exports = validationLogin;