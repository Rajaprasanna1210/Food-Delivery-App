const service = require('./order_service');

exports.placeOrder = async (req, res, next) => {
  try {
    const order = await service.placeOrder(req.user.id, req.body.delivery_address, req.body.food_item_ids);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await service.getOrders(req.user.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const updatedOrder = await service.updateOrderStatus(req.params.id, req.body.status);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};
