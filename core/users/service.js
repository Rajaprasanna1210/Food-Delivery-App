const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getModels } = require('../../database/database');

function getUserModel() {
  return getModels().User;
}

exports.register = async ({ name, email, password }) => {
  const User = getUserModel();
  const exists = await User.findOne({ where: { email } });
  if (exists) throw new Error('Email already in use');
  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed });
};

exports.login = async ({ email, password }) => {
  const User = getUserModel();
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
