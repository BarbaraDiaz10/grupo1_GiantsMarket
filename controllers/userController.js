const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const ModelUsers = require('../models/User');

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
    // userLogin: (req, res) => {
    //     const resultValidation = validationResult(req)
    //     if (resultValidation.errors.length > 0) {
    //         res.render("login", {
    //             errors: resultValidation.mapped(),
    //         })
    //     }
    //     req.session.form = {}
    //     req.session.form.email = req.body.email;
    //     req.session.form.password = req.body.password;
    //     req.session.form.remember_password = req.body.remember_password;

    //     let sessionEmail = req.session.form.email
    //     let sessionPassword = req.session.form.password

    //     let validationLogin = users.find(user => user.email === sessionEmail && user.password === sessionPassword)
    //     if (validationLogin) {
    //         res.redirect("/");
    //     } else {
    //         const msg = "Email o contraseña invalida"
    //         res.render("login", { msg: msg })
    //     }



    // },


    userLogin: (req, res) => {

		let resultValidation = validationResult(req)
		let userToLogin = ModelUsers.findField('email', req.body.email);
		
		if (!resultValidation.errors.length > 0){ 
		if(userToLogin) {
            //REVISAR
			// let password = req.body.password == userToLogin.password;
             let password = req.body.password;
			if (password) {
            //REVISAR
				// userData = userToLogin
				// delete userToLogin.password;
				// req.session.userLogged = userData;

				if(req.body.remember) {
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

}

module.exports = userController