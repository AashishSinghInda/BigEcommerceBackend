
let express = require('express');
const { checkToken } = require('../../middleware/checkToken');
const { saveOrder, verifyOrder, viewOrder } = require('../../controllers/web/orderController');

let orderRoutes = express.Router();

orderRoutes.post('/order-save', checkToken,saveOrder)
orderRoutes.post('/verify-order', checkToken, verifyOrder)
orderRoutes.post('/view-order', checkToken, viewOrder)

module.exports = {orderRoutes}