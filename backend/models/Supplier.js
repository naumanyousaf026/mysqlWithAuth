const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 
const Supplier = sequelize.define('Supplier', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  contact_person: { type: DataTypes.STRING(100), allowNull: true },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  email: { type: DataTypes.STRING(100), allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'suppliers',
  timestamps: true,
  underscored: true,
});

module.exports = Supplier;
