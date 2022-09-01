// let admins = ["Cristal", "Gertrude", "Yoshi", "Shay", "Costa", "Ansell", "Karine", "Christiano", "Dave", "Sam"]

// function admin(req, res, next) {

//     let user = req.query.user

//     if (admins.includes(user)) {
//         next()
//     } else {
//         res.send("No tienes los privilegios para ingresar");
//     }
// }

// module.exports = admin

const locals = (req, res, next) => {


    if (req.session && req.session.userLogged && req.session.userLogged.admin) {
        next()
   
    }    
    
        res.redirect("/")
    
    }
    
    module.exports = locals