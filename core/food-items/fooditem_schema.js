const Joi = require('joi');

exports.foodItemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  isVeg: Joi.boolean().required(),
  category: Joi.string().required(),
});
