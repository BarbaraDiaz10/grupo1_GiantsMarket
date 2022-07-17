const fs = require('fs');
const path = require('path');


const productsFilePath = (path.join(__dirname, '../data/products.json'));
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = dataBase => fs.writeFileSync(productsFilePath, JSON.stringify(dataBase), 'utf-8'); //Esta función solo escribe en el JSON
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models/index');


const productsController = {
    index: (req, res) => {
        res.render('products', {
            products,
            toThousand
        })
    },

    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render('productDetail', {
                    product,
                    toThousand
                })
            })
            // let productId = +req.params.id;
            // let product = products.find(product => product.id === productId)

        // res.render('productDetail', {
        //     product,
        //     toThousand
        // })
    },
    productCart: (req, res) => {
        res.render("productCart")
    },

    create: (req, res) => { //Solo necesitamos pasarle la vista renderizada para que la rellene, es por get
        res.render('createProduct')
        /*llamar al crear
        db.product.findAll()
        .then((allCategories)=>{
            res.render('createProduct')
        })*/
    },

    store: (req, res) => {
        /***********************PARA LAS IMAGENES ***********************/
        let image

        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = "default-image.png"
        }
        /********************************************************** */

        let newProduct = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: image //PARA LAS IMAGENES
        }
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
        res.redirect('/');

        /* crear
        const { name, description,description_detail, discount, image} = req.body
        db.Product.create({
            name,
            description,
            description_detail, 
            discount, 
            image
        }).then (product =>{
            res.redirect('/');
        })*/

    },
    edit: (req, res) => {
        let id = req.params.id;
        let product = products.find(i => i.id == id);
        res.render("editProduct", { product });

        /* Llamado al editar
        let id = db.Product.findByPk (product_id, {include: ['category']})
        let products = db.Category.findAll()
        Promise.all ([id,product])
            .then(([Product, allCategories])=>{
                res.render("editProduct", {Product, allCategories})
            })
        }
        .catch(err =>res.send(err));*/
    },


    update: (req, res) => {
        let id = req.params.id;
        let productEdit = products.find(i => i.id == id);
        let image

        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = productEdit.image //no funciona
        }
        //después de buscar el id que viene como parametro se procede a sobreescribirlo
        //se iguala el id de esa posición del arreglo al id encontrado anteriormete
        //con un objeto literal igualando todo a lo que tiene req.body(todo el formulario)
        productEdit = {
            id: productEdit.id,
            ...req.body,
            image: image
        };
        //luego se debe recorrer el arreglo completo y buscar el id que se está editando
        // por ultimo igualar el id que se encontró a todo el objeto literal previamente editado 
        let productEdited = products.map(i => {
            if (i.id == productEdit.id) {
                return i = {...productEdit }
            }
            return i;
        });
        //se usa este metodo para escribir en nuestro json en donde como primer parametro se le pasa
        //el archivo json y el segundo hay que stringuifiarlo(para convertir) y pasarle lo que queremos editar 
        fs.writeFileSync(productsFilePath, JSON.stringify(productEdited));
        res.redirect('/productDetail/' + id);

      /* Editar
      let id = req.params.id;
      db.product.update ({...req.body},{
        where:{
            product_id : id
        }
      }) .then(()=>{
        res.redirect('/productDetail/' + id);
      }).catch(err=>{res.send(err)});*/


    },

    destroy: (req, res) => {
        let id = req.params.id;
        let productDelete = products.filter(i => i.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(productDelete));
        res.redirect('/');

        /* Eliminar
        db.Product.destroy({
            where : {
                product_id : +req.params.id
            }
        }) .then (()=>{
            res.redirect('/')
        }).catch(err=>res.send(err))*/
    },

}

module.exports = productsController