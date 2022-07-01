const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const userController = {
    index: (req, res) => {


        res.render("index", { products })
    },

    login: (req, res) => {
        res.render("login")
    },

    register: (req, res) => {
        res.render("register")

    },

    store: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
            })
        }


        let image


        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = "default-image.png"
        }
        /********************************************************** */

        let newUsers = {

            id: users[users.length - 1].id + 1,
            ...req.body,
            password: bcrypt.hashSync('password', 10),
            image: image //PARA LAS IMAGENES
        }
        users.push(newUsers);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ''));
        res.redirect('/');

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
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            res.render("login", {
                errors: resultValidation.mapped(),
            })
        }
        req.session.form = {}
        req.session.form.email = req.body.email;
        req.session.form.password = req.body.password;
        req.session.form.remember_password = req.body.remember_password;
        console.log(req.session.form)
        if(req.session.form.remember_password == 'on') {
            res.cookie('email', req.body.email, { maxAge: (1000 * 1000) * 90 })
            res.render('login', {email : req.body.email})
            
        }

        

        let sessionEmail = req.session.form.email
        let sessionPassword = req.session.form.password

        let validationLogin = users.find(user => user.email == sessionEmail)
        if (validationLogin.email == sessionEmail && validationLogin.password == sessionPassword) {
            res.redirect("/");
        } else {
            const msg = "Email o contraseña invalida"
            res.render("login", { msg: msg })
        }

        
        
    },
        // cookieRemember:{

        //      let cookie = req.session.
        //  },

        logout: (req, res) => {
            res.clearCookie('email');
            req.session.destroy();
            return res.redirect('/');
        }

}

module.exports = userController