const sequelize = require('../config/db');

// import models
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Customer = require('./Customer');
const Transaction = require('./Transaction');
const Payment = require('./Payment');
const Supplier = require('./Supplier');
const PurchaseOrder = require('./PurchaseOrder');
const PurchaseOrderItem = require('./PurchaseOrderItem');
const StockAdjustment = require('./StockAdjustment');

// Associations

// Category <-> Product
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Product <-> StockAdjustment
Product.hasMany(StockAdjustment, { foreignKey: 'product_id', as: 'adjustments' });
StockAdjustment.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Product <-> Transaction
Product.hasMany(Transaction, { foreignKey: 'product_id', as: 'transactions' });
Transaction.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Customer <-> Transaction
Customer.hasMany(Transaction, { foreignKey: 'customer_id', as: 'transactions' });
Transaction.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

// Transaction <-> Payment
Transaction.hasMany(Payment, { foreignKey: 'transaction_id', as: 'payments' });
Payment.belongsTo(Transaction, { foreignKey: 'transaction_id', as: 'transaction' });

// Supplier <-> PurchaseOrder
Supplier.hasMany(PurchaseOrder, { foreignKey: 'supplier_id', as: 'purchaseOrders' });
PurchaseOrder.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });

// PurchaseOrder <-> PurchaseOrderItem
PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: 'purchase_order_id', as: 'items' });
PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: 'purchase_order_id', as: 'purchaseOrder' });

// Product <-> PurchaseOrderItem
Product.hasMany(PurchaseOrderItem, { foreignKey: 'product_id', as: 'purchaseItems' });
PurchaseOrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// StockAdjustment <-> User (adjusted_by)
User.hasMany(StockAdjustment, { foreignKey: 'adjusted_by', as: 'stockAdjustments' });
StockAdjustment.belongsTo(User, { foreignKey: 'adjusted_by', as: 'adjustedBy' });

// If you want, export all models in one object
module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Customer,
  Transaction,
  Payment,
  Supplier,
  PurchaseOrder,
  PurchaseOrderItem,
  StockAdjustment,
};
