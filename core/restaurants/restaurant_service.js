const { getModels } = require('../../database/database');

function getRestaurantModel() {
  return getModels().Restaurant;
}

function getFoodItemModel() {
  return getModels().FoodItem;
}

exports.createRestaurant = async (data, userId) => {
  const Restaurant = getRestaurantModel();
  return await Restaurant.create({ ...data, created_by_user_id: userId });
};

exports.getAllRestaurants = async () => {
  const Restaurant = getRestaurantModel();
  return await Restaurant.findAll();
};

exports.getRestaurantById = async (id) => {
  const Restaurant = getRestaurantModel();
  const FoodItem = getFoodItemModel();
  
  return await Restaurant.findOne({
    where: { id },
    include: [{ model: FoodItem }],
  });
};
