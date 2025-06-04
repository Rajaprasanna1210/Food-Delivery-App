const service = require('./fooditem_service');

exports.create = async (req, res, next) => {
  try {
    const item = await service.createFoodItem(req.params.id, req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const items = await service.getAllFoodItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await service.getFoodItemById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

