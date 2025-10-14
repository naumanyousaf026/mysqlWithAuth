require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Sequelize instance
const authRoutes = require('./routes/auth');
require('./models/User'); // import model so Sequelize knows it

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Simple DB test route
app.get('/test', async (req, res) => {
  try {
    const [rows] = await sequelize.query('SELECT * FROM users'); // ✅ use sequelize, not db
    res.json(rows);
  } catch (err) {
    console.error('TEST ROUTE ERROR:', err);
    res.status(500).send('Database error');
  }
});

// Start server + connect DB
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected via Sequelize');

    await sequelize.sync({ alter: true });
    console.log('✅ All models synced with database');

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();
