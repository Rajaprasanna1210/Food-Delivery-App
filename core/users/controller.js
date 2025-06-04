const service = require('../users/service');

exports.register = async (req, res, next) => {
  try {
    const user = await service.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await service.login(req.body);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res) => {
  res.json({ user: req.user });
};
