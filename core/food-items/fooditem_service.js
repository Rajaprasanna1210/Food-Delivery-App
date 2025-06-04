const { getModels } = require('../../database/database');
function getFoodItemModel() {
    return getModels().FoodItem;
}

exports.createFoodItem = async (restaurantId, data) => {
    const FoodItem = getFoodItemModel();

    return await FoodItem.create({ ...data, restaurant_id: restaurantId });
};

exports.getAllFoodItems = async () => {
    const FoodItem = getFoodItemModel();

    return await FoodItem.findAll();
};

exports.getFoodItemById = async (id) => {
    const FoodItem = getFoodItemModel();

    return await FoodItem.findOne({ where: { id } });
};