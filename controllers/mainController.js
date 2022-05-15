const mainController = {
    index: (req,res) => {
        res.render("index")
    },
    productDetail: (req,res) => {
        res.render("productDetail")
    },
    productCart: (req,res) => {
        res.render("productCart")
    },
    login: (req,res) => {
        res.render("login")
    },
    register: (req,res) => {
        res.render("register")
    }
}

module.exports= mainController