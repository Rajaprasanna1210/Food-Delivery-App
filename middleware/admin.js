const { getModels } = require('../database/database');

module.exports = async function (req, res, next) {
  try {
    const { User } = getModels();
    const userRecord = await User.findOne({
      where: { id: req.user.id, isAdmin: true },
    });

    if (!userRecord) {
      return res.status(403).json({ message: 'Access denied: Admins only.' });
    }

    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ message: 'Internal server error during admin check.' });
  }
};
