var express = require('express');
var router = express.Router();
const path = require('path');
const mainController = require ('../controllers/mainController')
const controller = require ('../controllers/productsController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/', controller.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);

module.exports = router;
