var express = require('express');
var router = express.Router();
const path = require('path');
const mainController = require('../controllers/userController')
const validationRegister = require('../middlewares/register');
const validationLogin = require('../middlewares/login');
/* GET users listing. */
router.get('/', mainController.index);
router.get('/login', mainController.login);
router.post('/login', validationLogin, mainController.userLogin);
router.get('/register', mainController.register);
router.post('/register', validationRegister, mainController.user);
module.exports = router;