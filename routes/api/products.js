const express = require('express');
const router = express.Router();
const productAPIController = require('../../controllers/apis/productApi');

//Rutas
//Listado de todos los usuarios
router.get('/', productAPIController.list);
//Detalle del usuario
router.get('/:id', productAPIController.detail);

module.exports = router;