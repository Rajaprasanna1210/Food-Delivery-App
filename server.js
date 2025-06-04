const express = require('express');
const { initDatabase } = require('./database/database');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();
const app = express();
app.use(express.json());

// We will store DB/models here after init
let db;

// Routes
app.use('/api/users', require('./core/users/routes'));
app.use('/api/restaurants', require('./core/restaurants/restaurant_routes'));
app.use('/api', require('./core/food-items/fooditem_routes'));
 app.use('/api/orders', require('./core/orders/order_routes'));


// Add other routes similarly

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

initDatabase().then((database) => {
  db = database; // store the db and models to use in services if needed

  app.locals.db = db; // Optional: attach to app.locals for access in middleware/routes

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
