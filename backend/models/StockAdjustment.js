const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const StockAdjustment = sequelize.define('StockAdjustment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  adjustment_type: { type: DataTypes.ENUM('increase','decrease'), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  reason: { type: DataTypes.TEXT, allowNull: true },
  adjusted_by: { type: DataTypes.INTEGER, allowNull: false },
  adjustment_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: 'stock_adjustments',
  timestamps: false,
  underscored: true,
});

module.exports = StockAdjustment;
