const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const ModelUsers = require('../models/User');
const db = require('../database/models/index');

const User = db.User;

const userController = {
    index: (req, res) => {


        res.render("index", { products })
    },

    login: (req, res) => {
        res.render("login")
        if (req.session.form.remember_password == 'on') {
            res.cookie('email', req.body.email, { maxAge: (1000 * 1000) * 90 })
            const email = req.session.form.email
            res.render("login", { email: email })

        }
    },

    register: (req, res) => {
        res.render("register")

    },

    store: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            console.log(resultValidation.errors)
            res.render("register", {
                errors: resultValidation.mapped(),
            })
        } else {
            console.log('aqui22')
            let image


            if (req.files[0] != undefined) {
                image = req.files[0].filename
            } else {
                image = "default-image.png"
            }
            /********************************************************** */


            db.User.create({
                    ...req.body,
                    password: bcrypt.hashSync('password', 10),
                })
                .then(() =>
                    res.redirect('/register')

                )
        }




    },
    user: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
            })
        }
    },

    userLogin: (req, res) => {

        let resultValidation = validationResult(req)
        let userToLogin = ModelUsers.findField('email', req.body.email);

        if (!resultValidation.errors.length > 0) {
            if (userToLogin) {
                //REVISAR
                // let password = req.body.password == userToLogin.password;
                let password = req.body.password;
                if (password) {
                    //REVISAR
                    // userData = userToLogin
                    // delete userToLogin.password;
                    // req.session.userLogged = userData;

                    if (req.body.remember) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 1000) * 90 })
                    }

                    return res.redirect('/');
                }
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'Los datos ingresados son incorrectos'
                        }
                    }
                });
            } else {
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'No se encontro el correo ingresado'
                        }
                    }
                })
            }
        } else {

            return res.render('login', {
                errors: resultValidation.mapped(),
            })
        }

    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    },

    edit: (req, res) => {
        let id = req.params.id;
        let user = users.find(i => i.id == id);
        res.render("editUser", { user });


    },

    update: (req, res) => {
        let id = req.params.id;
        let userEdit = users.find(i => i.id == id);
        let image

        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = userEdit.image
        }

        userEdit = {
            id: userEdit.id,
            ...req.body,
            image: image
        };

        let userEdited = users.map(i => {
            if (i.id == userEdit.id) {
                return i = {...userEdit }
            }
            return i;
        });

        fs.writeFileSync(usersFilePath, JSON.stringify(userEdited));
        res.redirect('/');


    },

    destroy: (req, res) => {
        let id = req.params.id;
        let userDelete = users.filter(i => i.id != id);
        fs.writeFileSync(usersFilePath, JSON.stringify(userDelete));
        res.redirect('/');

    },

}

module.exports = userController