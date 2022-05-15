var express = require('express');
var router = express.Router();
const controller = require('../controllers/mainController')

/* GET home page. */
router.get('/', controller.index) ;
router.get('/productDetail', controller.productDetail) ;
router.get('/productCart', controller.productCart) ;
router.get('/login', controller.login) ;
router.get('/register', controller.register) ;


module.exports = router;
