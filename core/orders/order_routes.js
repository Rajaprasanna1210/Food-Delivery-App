const router = require('express').Router();
const controller = require('./order_controller');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');
const { placeOrderSchema, updateOrderStatusSchema } = require('./order_schema');

router.post('/', auth, validate(placeOrderSchema), controller.placeOrder);
router.get('/', auth, controller.getOrders);
router.put('/:id/status', auth, validate(updateOrderStatusSchema), controller.updateOrderStatus);

module.exports = router;
