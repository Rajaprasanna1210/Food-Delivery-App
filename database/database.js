const fs = require('fs');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

let sequelize;
let User, Restaurant, FoodItem, Order;

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  console.log(`✔ Database '${DB_NAME}' checked/created.`);
  await connection.end();
}

async function initSequelize() {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
  });

  // Load models
  User = require('../core/users/model')(sequelize);
  Restaurant = require('../core/restaurants/restaurant_model')(sequelize);
  FoodItem = require('../core/food-items/fooditem_model')(sequelize);
  Order = require('../core/orders/order_model')(sequelize);

  try {
    await sequelize.authenticate();
    console.log('✔ Sequelize connected successfully.');
  } catch (err) {
    console.error('✖ Sequelize connection error:', err.message);
    process.exit(1);
  }

  // Associations
  User.hasMany(Order, { foreignKey: 'user_id' });
  Order.belongsTo(User, { foreignKey: 'user_id' });

  Restaurant.hasMany(FoodItem, { foreignKey: 'restaurant_id' });
  FoodItem.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

  Order.belongsToMany(FoodItem, { through: 'OrderItems', foreignKey: 'order_id' });
  FoodItem.belongsToMany(Order, { through: 'OrderItems', foreignKey: 'food_item_id' });

  return sequelize;
}

async function runSchemaFile() {
  const sql = fs.readFileSync('./database/database.txt', 'utf-8');
  const queries = sql.split(';').map(q => q.trim()).filter(Boolean);

  for (const query of queries) {
    try {
      await sequelize.query(query);
    } catch (err) {
      console.error(`✖ Error executing SQL:\n${query}\n`, err.message);
    }
  }

  console.log('✔ Raw SQL schema executed (if present).');
}

async function initDatabase() {
  await createDatabaseIfNotExists();
  await initSequelize();
  await runSchemaFile();

  return {
    sequelize,
    models: {
      User,
      Restaurant,
      FoodItem,
      Order,
    }
  };
}

function getModels() {
  if (!User || !Order || !Restaurant || !FoodItem) {
    throw new Error('Models not initialized yet. Call initDatabase() first.');
  }
  return {
    User,
    Restaurant,
    FoodItem,
    Order,
  };
}

module.exports = {
  initDatabase,
  getModels,
  sequelize,
};
