const express = require('express');
const router = express.Router();
const userAPIController = require('../../controllers/apis/userApi');

//Rutas
//Listado de todos los usuarios
router.get('/', userAPIController.list);
//Detalle del usuario
router.get('/:id', userAPIController.detail);
//ultimo usuario creado
router.get('/last-user', userAPIController.lastUser);

module.exports = router;