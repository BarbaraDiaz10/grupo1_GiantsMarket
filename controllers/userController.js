const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');

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
    user: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
            })
        }
        //     req.session.first_name = req.body.first_name;
        //     req.session.lastname = req.body.lastname;
        //     req.session.email = req.body.email;
        //     req.session.password = req.body.password;
        //     req.session.date = req.body.date;
        //     req.session.gender = req.body.gender;
        //     req.session.rol = req.body.rol;

        //     res.redirect("/");
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
        res.redirect("/");
    }
}

module.exports = userController