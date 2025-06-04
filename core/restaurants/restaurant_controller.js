const service = require('./restaurant_service');

exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await service.createRestaurant(req.body, req.user.id);
    res.status(201).json(restaurant);
  } catch (err) {
    next(err);
  }
};

exports.getAllRestaurants = async (req, res, next) => {
  try {
    const data = await service.getAllRestaurants();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await service.getRestaurantById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Not found' });
    res.json(restaurant);
  } catch (err) {
    next(err);
  }
};
