module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    delivery_address: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM('Pending', 'Confirmed', 'Out for Delivery', 'Delivered'),
      defaultValue: 'Pending'
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  return Order;
};