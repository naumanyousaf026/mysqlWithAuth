const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  customer_id: { type: DataTypes.INTEGER, allowNull: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unit_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  total_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  amount_paid: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  remaining_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  transaction_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  notes: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'transactions',
  timestamps: false, // transaction_date used instead of created_at
  underscored: true,
});

module.exports = Transaction;
