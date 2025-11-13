const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  supplier_id: { type: DataTypes.INTEGER, allowNull: false },
  order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  expected_date: { type: DataTypes.DATE, allowNull: true },
  received_date: { type: DataTypes.DATE, allowNull: true },
  status: { type: DataTypes.STRING(20), defaultValue: 'pending' },
  total_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  notes: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'purchase_orders',
  timestamps: false,
  underscored: true,
});

module.exports = PurchaseOrder;
