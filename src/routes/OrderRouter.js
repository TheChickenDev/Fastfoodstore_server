const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/create', orderController.createOrder);
router.put('/update/:id', orderController.updateOrder);
router.get('/get-all', orderController.getAllOrder);

module.exports = router;
