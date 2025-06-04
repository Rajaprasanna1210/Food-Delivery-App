const Joi = require('joi');

exports.createRestaurantSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  cuisine: Joi.string().required(),
});
