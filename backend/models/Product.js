const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(200), allowNull: false },
  sku: { type: DataTypes.STRING(50), allowNull: true, unique: true },
  unit_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  description: { type: DataTypes.TEXT, allowNull: true },
  // foreign key category_id will be added via association or explicitly:
  category_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'products',
  timestamps: true,
  underscored: true,
});

module.exports = Product;
