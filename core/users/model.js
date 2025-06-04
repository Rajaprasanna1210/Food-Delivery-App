const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    console.log('####################################################################');
    
  return sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'Users', // Optional explicit table name
  });
};
