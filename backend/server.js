require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, initDatabase } = require('./config/db');
const authRoutes = require('./routes/auth');
const User = require('./models/User'); // Model import karo
const index=require('./models/index');
const {categoryRouter, productRouter, customerRouter, transactionRouter, paymentRouter, supplierRouter, poRouter, poItemRouter,stockRouter} = require('./routes/allRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
  app.use('/api/categories', categoryRouter);
  app.use('/api/products', productRouter);
  app.use('/api/customers', customerRouter);
  app.use('/api/transactions', transactionRouter);
  app.use('/api/payments', paymentRouter);
  app.use('/api/suppliers', supplierRouter);
  app.use('/api/purchase-orders', poRouter);
  app.use('/api/purchase-order-items', poItemRouter);
  app.use('/api/stock-adjustments', stockRouter);
// Test route
app.get('/test', async (req, res) => {
  try {
    const users = await User.findAll(); // Sequelize model use karo
    res.json(users);
  } catch (err) {
    console.error('TEST ROUTE ERROR:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Server start function
async function startServer() {
  try {
    // Step 1: Database create/verify
    await initDatabase();
    
    // Step 2: Sequelize connect
    await sequelize.authenticate();
    console.log('✅ MySQL Connected via Sequelize');

    // Step 3: Models sync (alter:true = safe updates in development)
    await sequelize.sync({ alter: true });
    console.log('✅ All models synced with database');

    // Step 4: Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Startup failed:', err);
    process.exit(1); // Exit on critical error
  }
}

// Start karo
startServer();