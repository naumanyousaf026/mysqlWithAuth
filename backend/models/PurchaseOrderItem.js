const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PurchaseOrderItem = sequelize.define('PurchaseOrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unit_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  received_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'purchase_order_items',
  timestamps: false,
  underscored: true,
});

module.exports = PurchaseOrderItem;
