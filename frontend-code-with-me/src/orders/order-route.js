const express = require('express');
const router = express.Router();
const orderController = require('./order-controller.js');

router.get('/', orderController.getAllOrders);

module.exports = router;