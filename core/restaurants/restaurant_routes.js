const express = require('express');
const { createRestaurant, getAllRestaurants, getRestaurantById } = require('./restaurant_controller');
const validate = require('../../middleware/validate');
const { createRestaurantSchema } = require('./restaurant_schema');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const router = express.Router();

router.post('/', auth, admin, validate(createRestaurantSchema), createRestaurant); // admin protected
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

module.exports = router;
