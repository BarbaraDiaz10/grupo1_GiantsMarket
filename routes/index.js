// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/mainController')
const validationProduct = require('../middlewares/productRegister')
const productsController = require('../controllers/productsController')
const adminMiddleware = require('../middlewares/admin');

/***********************PARA LAS IMAGENES ***********************/
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
    /********************************************************** */
    /* GET home page. */
router.get('/', controller.index);
router.get('/admin', adminMiddleware, controller.admin); /*middlewares que valida si es admin o no*/
router.get('/productDetail/:id/', productsController.productDetail);
// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);
router.post('/create', upload.any(),validationProduct, productsController.store);
/*** EDIT ONE PRODUCT ***/
router.get('/views/edit/:id/', productsController.edit);
router.post('/productDetail/:id', upload.any(),validationProduct, productsController.update);

// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy);
module.exports = router;