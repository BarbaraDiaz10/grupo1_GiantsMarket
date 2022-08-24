const { check, body } = require('express-validator');
//const {users} = require("../data");
const db = require("../database/models");

const validationRegister = [
    check('email').notEmpty().withMessage("El email no puede ser vacio").bail()
    .isEmail().withMessage("Debe ingresar un formato de email válido"),


    body('email').custom(value => {
        /* let user = users.filter(user =>{
            return user.email == value
        }) */
        return db.User.findOne({
                where: {
                    email: value
                }
            })
            .then(user => {
                if (user) {
                    return Promise.reject('Este email ya está registrado')
                }
            })
    }),

    check('first_name')
    .notEmpty().withMessage("El nombre no puede estar vacio").bail()
    .withMessage("Debe tener al menos 2 caracteres"),

    check('last_name')
    .notEmpty().withMessage("El apellido no puede estar vacio").bail()
    .withMessage("Debe tener al menos 3 caracteres"),

    check('password')
    .notEmpty()
    .withMessage('Debes ingresar una contraseña')
    .isLength({
        min: 8,
        max: 10
    })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),

    // check('image')
    // .notEmpty().withMessage('Debe ser un archivo valido (JPG, JPEG, PNG, GIF, jpg, jpeg, png, gif)')

]


/*body('first_name').notEmpty().withMessage("El nombre no puede ser vacio"),
    body('last_name').notEmpty().withMessage("El apellido no puede ser vacio"),
    body('email').notEmpty().withMessage("El email no puede ser vacio").bail()
    .isEmail().withMessage("Debe ingresar un formato de email válido"),
    body('password').notEmpty().withMessage("La contraseña debe tener entre 8 a 10 caracteres").bail()
    .isLength({ min: 8, max: 10 }).withMessage("Debe ingresar un formato de email válido"),
    body('date').notEmpty().withMessage("La fecha no puede ser vacia"),
    body('role_id').notEmpty().withMessage("El rol no puede ser vacio")


]*/

module.exports = validationRegister;