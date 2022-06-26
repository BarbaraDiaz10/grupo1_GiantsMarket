const { body } = require('express-validator');

const validationRegister = [
    body('first_name').notEmpty().withMessage("El nombre no puede ser vacio"),
    body('lastname').notEmpty().withMessage("El apellido no puede ser vacio"),
    body('email').notEmpty().withMessage("El email no puede ser vacio").bail()
    .isEmail().withMessage("Debe ingresar un formato de email válido"),
    body('password').notEmpty().withMessage("La contraseña debe tener entre 8 a 10 caracteres").bail()
    .isLength({ min: 8, max: 10 }).withMessage("Debe ingresar un formato de email válido"),
    body('date').notEmpty().withMessage("La fecha no puede ser vacia"),
    body('gender').notEmpty().withMessage("El género no puede ser vacio"),
    body('rol').notEmpty().withMessage("El rol no puede ser vacio")


]

module.exports = validationRegister;