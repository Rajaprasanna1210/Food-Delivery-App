const { getModels } = require('../../database/database');


function getFoodItemModel() {
  return getModels().FoodItem;
}

function getOrderModel() {
  return getModels().Order;
}

exports.placeOrder = async (userId, delivery_address, food_item_ids) => {
  const  Order  = getOrderModel();
  const order = await Order.create({ user_id: userId, delivery_address });
  await order.addFoodItems(food_item_ids); // Sequelize many-to-many relation
  return order;
};

exports.getOrders = async (userId) => {
  const  Order  = getOrderModel();
  const  FoodItem  = getFoodItemModel();
  return Order.findAll({
    where: { user_id: userId },
    include: [FoodItem]
  });
};

exports.updateOrderStatus = async (id, status) => {
  const Order  = getOrderModel();
  const order = await Order.findOne({ where: { id } });
  if (!order) throw new Error('Order not found');
  order.status = status;
  await order.save();
  return order;
};
