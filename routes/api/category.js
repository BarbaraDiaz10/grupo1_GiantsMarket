const express = require('express');
const router = express.Router();
const categoryAPIController = require('../../controllers/apis/categoryApi');


router.get('/', categoryAPIController.list);
router.get('/:id', categoryAPIController.detail);

module.exports = router;