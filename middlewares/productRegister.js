const { check, body } = require('express-validator');
//const {users} = require("../data");
const db = require("../database/models");

const validationRegister = [
    
    check('name').notEmpty().withMessage("El nombre no puede ser vacio").bail()
    .isEmail().withMessage("Debe tener minimo 5 caracteres"),

    check('price')
        .notEmpty().withMessage("El precio no puede estar vacio").bail(),
        
    check('description')
        .notEmpty().withMessage("La descripción no puede estar vacia, al menos  10 caracteres").bail(),
    check('description2')
        .notEmpty().withMessage("la descripción no puede estar vacia, al menos  10 caracteres").bail(),
    check('description_detail')
        .notEmpty().withMessage("El detalle de la descripción no puede estar vacia, al menos  10 caractere").bail(),
    check('stock')
        .notEmpty().withMessage("El stock no puede estar vacio").bail(),
    check('category')
        .notEmpty().withMessage("Desbes seleccionar una categoria").bail(),
    check('transferable')
        .notEmpty().withMessage("La transferencia no puede estar vacia").bail(),
    check('discount')
        .notEmpty().withMessage("El descuento no puede estar vacio").bail(),
    check('shipping')
        .notEmpty().withMessage("El envio no puede estar vacio").bail(),
    check ('image')
    .notEmpty().withMessage('Debe ser un archivo valido (JPG, JPEG, PNG, GIF)')

]


module.exports = validationRegister;