const express = require('express');
const router = express.Router();
const productController = require('./product-controller.js');

router.get('/', productController.getAllProducts);


module.exports = router;