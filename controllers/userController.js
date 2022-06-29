const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const session = require('express-session');
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


        // let sessionEmail = req.body.email
        // let sessionPassword = req.body.password
        // const validationLogin = users.find(user => user.email === sessionEmail) 
            
        //     if(sessionEmail === validationLogin && sessionPassword === validationLogin){
        //         res.redirect("/", {users});
        //     }else{
        //         res.send("Email o contraseña invalida")
        //     }
                

        res.redirect("/");


    }

    
}

module.exports = userController