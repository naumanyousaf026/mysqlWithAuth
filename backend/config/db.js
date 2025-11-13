// backend/config/db.js
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const DB_NAME = 'TESTDB';
const DB_USER = 'root';
const DB_PASS = 'Nomikhan@1122';
const DB_HOST = 'localhost';

// Sequelize instance directly export karo
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

// Database create karne ka function
async function initDatabase() {
  try {
    const conn = await mysql.createConnection({ 
      host: DB_HOST, 
      user: DB_USER, 
      password: DB_PASS 
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await conn.end();
    console.log('✅ Database created/verified');
  } catch (err) {
    console.error('❌ Database creation error:', err);
    throw err;
  }
}

module.exports = { sequelize, initDatabase };