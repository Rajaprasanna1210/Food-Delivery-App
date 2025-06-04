const Joi = require('joi');

exports.placeOrderSchema = Joi.object({
  delivery_address: Joi.string().required(),
  food_item_ids: Joi.array().items(Joi.number().integer()).required()
});

exports.updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('Pending', 'Confirmed', 'Out for Delivery', 'Delivered').required()
});