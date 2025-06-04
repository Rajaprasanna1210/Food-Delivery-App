const router = require('express').Router();
const controller = require('./fooditem_controller');
const validate = require('../../middleware/validate');
const { foodItemSchema } = require('./fooditem_schema');

router.post('/restaurants/:id/food-items', validate(foodItemSchema), controller.create);
router.get('/food-items', controller.getAll);
router.get('/food-items/:id', controller.getById);

module.exports = router;
