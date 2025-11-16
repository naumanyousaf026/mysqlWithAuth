// backend/routes/allRoutes.js
const express = require('express');
const { Op } = require('sequelize');
const { Category, Product, Customer, Transaction, Payment, Supplier, PurchaseOrder, PurchaseOrderItem, StockAdjustment
} = require('../models');

const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

function handleError(res, err) {
  console.error(err);
  return res.status(500).json({ error: err.message || 'Server error' });
}

// ---------------- Category Router ----------------
const categoryRouter = express.Router();
categoryRouter.get('/', async (req, res) => {
  try { const categories = await Category.findAll({ include: [{ model: Product, as: 'products' }] }); res.json(categories); } 
  catch (err) { handleError(res, err); }
});
categoryRouter.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product, as: 'products' }] });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) { handleError(res, err); }
});
categoryRouter.post('/', authMiddleware, async (req, res) => {
  try { const cat = await Category.create(req.body); res.status(201).json(cat); } 
  catch (err) { handleError(res, err); }
});
categoryRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    const updatedCat = await Category.findByPk(req.params.id);
    res.json(updatedCat);
  } catch (err) { handleError(res, err); }
});
categoryRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- Product Router ----------------
const productRouter = express.Router();
productRouter.get('/', async (req, res) => {
  try {
    const { q, limit = 50, offset = 0 } = req.query;
    const where = q ? { name: { [Op.like]: `%${q}%` } } : undefined;
    const products = await Product.findAll({ where, include: [{ model: Category, as: 'category' }], limit: +limit, offset: +offset });
    res.json(products);
  } catch (err) { handleError(res, err); }
});
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: [{ model: Category, as: 'category' }] });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) { handleError(res, err); }
});
productRouter.post('/', authMiddleware, async (req, res) => {
    console.log('📦 Product POST route reached');
  try { const product = await Product.create(req.body); res.status(201).json(product); } 
  catch (err) { handleError(res, err); }
});
productRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (err) { handleError(res, err); }
});
productRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- Customer Router ----------------
const customerRouter = express.Router();
customerRouter.get('/', async (req, res) => {
  try { const customers = await Customer.findAll(); res.json(customers); } 
  catch (err) { handleError(res, err); }
});
customerRouter.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, { include: [{ model: Transaction, as: 'transactions' }] });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) { handleError(res, err); }
});
customerRouter.post('/', authMiddleware, async (req, res) => {
  try { const customer = await Customer.create(req.body); res.status(201).json(customer); } 
  catch (err) { handleError(res, err); }
});
customerRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await Customer.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Customer not found' });
    const updatedCustomer = await Customer.findByPk(req.params.id);
    res.json(updatedCustomer);
  } catch (err) { handleError(res, err); }
});
customerRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Customer.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- Transaction Router ----------------
const transactionRouter = express.Router();
transactionRouter.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ include: [{ model: Product, as: 'product' }, { model: Customer, as: 'customer' }, { model: Payment, as: 'payments' }] });
    res.json(transactions);
  } catch (err) { handleError(res, err); }
});
transactionRouter.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, { include: [{ model: Product, as: 'product' }, { model: Customer, as: 'customer' }, { model: Payment, as: 'payments' }] });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) { handleError(res, err); }
});
transactionRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { payments, ...transactionData } = req.body;
    const transaction = await Transaction.create(transactionData);
    if (Array.isArray(payments)) {
      for (const p of payments) {
        await Payment.create({ ...p, transaction_id: transaction.id });
      }
    }
    const created = await Transaction.findByPk(transaction.id, { include: [{ model: Payment, as: 'payments' }] });
    res.status(201).json(created);
  } catch (err) { handleError(res, err); }
});
transactionRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await Transaction.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Transaction not found' });
    const updatedTx = await Transaction.findByPk(req.params.id);
    res.json(updatedTx);
  } catch (err) { handleError(res, err); }
});
transactionRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Transaction.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- Payment Router ----------------
const paymentRouter = express.Router();
paymentRouter.get('/', async (req, res) => {
  try { const payments = await Payment.findAll({ include: [{ model: Transaction, as: 'transaction' }] }); res.json(payments); } 
  catch (err) { handleError(res, err); }
});
paymentRouter.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, { include: [{ model: Transaction, as: 'transaction' }] });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (err) { handleError(res, err); }
});
paymentRouter.post('/', authMiddleware, async (req, res) => {
  try { const payment = await Payment.create(req.body); res.status(201).json(payment); } 
  catch (err) { handleError(res, err); }
});
paymentRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await Payment.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Payment not found' });
    const updatedPayment = await Payment.findByPk(req.params.id);
    res.json(updatedPayment);
  } catch (err) { handleError(res, err); }
});
paymentRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Payment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Payment not found' });
    res.json({ message: 'Payment deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- Supplier Router ----------------
const supplierRouter = express.Router();
supplierRouter.get('/', async (req, res) => {
  try { const suppliers = await Supplier.findAll({ include: [{ model: PurchaseOrder, as: 'purchaseOrders' }] }); res.json(suppliers); } 
  catch (err) { handleError(res, err); }
});
supplierRouter.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id, { include: [{ model: PurchaseOrder, as: 'purchaseOrders' }] });
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json(supplier);
  } catch (err) { handleError(res, err); }
});
supplierRouter.post('/', authMiddleware, async (req, res) => {
  try { const supplier = await Supplier.create(req.body); res.status(201).json(supplier); } 
  catch (err) { handleError(res, err); }
});
supplierRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await Supplier.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Supplier not found' });
    const updatedSupplier = await Supplier.findByPk(req.params.id);
    res.json(updatedSupplier);
  } catch (err) { handleError(res, err); }
});
supplierRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Supplier.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Supplier not found' });
    res.json({ message: 'Supplier deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- PurchaseOrder Router ----------------
const poRouter = express.Router();
poRouter.get('/', async (req, res) => {
  try {
    const pos = await PurchaseOrder.findAll({ include: [{ model: Supplier, as: 'supplier' }, { model: PurchaseOrderItem, as: 'items', include: [{ model: Product, as: 'product' }] }] });
    res.json(pos);
  } catch (err) { handleError(res, err); }
});
poRouter.get('/:id', async (req, res) => {
  try {
    const po = await PurchaseOrder.findByPk(req.params.id, { include: [{ model: Supplier, as: 'supplier' }, { model: PurchaseOrderItem, as: 'items', include: [{ model: Product, as: 'product' }] }] });
    if (!po) return res.status(404).json({ error: 'PurchaseOrder not found' });
    res.json(po);
  } catch (err) { handleError(res, err); }
});
poRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, ...poData } = req.body;
    const po = await PurchaseOrder.create(poData);
    if (Array.isArray(items)) {
      for (const it of items) {
        await PurchaseOrderItem.create({ ...it, purchase_order_id: po.id });
      }
    }
    const created = await PurchaseOrder.findByPk(po.id, { include: [{ model: PurchaseOrderItem, as: 'items' }] });
    res.status(201).json(created);
  } catch (err) { handleError(res, err); }
});
poRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await PurchaseOrder.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'PurchaseOrder not found' });
    const updatedPo = await PurchaseOrder.findByPk(req.params.id);
    res.json(updatedPo);
  } catch (err) { handleError(res, err); }
});
poRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await PurchaseOrder.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'PurchaseOrder not found' });
    res.json({ message: 'PurchaseOrder deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- PurchaseOrderItem Router ----------------
const poItemRouter = express.Router();
poItemRouter.get('/', async (req, res) => {
  try { const items = await PurchaseOrderItem.findAll({ include: [{ model: Product, as: 'product' }, { model: PurchaseOrder, as: 'purchaseOrder' }] }); res.json(items); } 
  catch (err) { handleError(res, err); }
});
poItemRouter.post('/', authMiddleware, async (req, res) => {
  try { const item = await PurchaseOrderItem.create(req.body); res.status(201).json(item); } 
  catch (err) { handleError(res, err); }
});
poItemRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await PurchaseOrderItem.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'PurchaseOrderItem not found' });
    const updatedItem = await PurchaseOrderItem.findByPk(req.params.id);
    res.json(updatedItem);
  } catch (err) { handleError(res, err); }
});
poItemRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await PurchaseOrderItem.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'PurchaseOrderItem not found' });
    res.json({ message: 'PurchaseOrderItem deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- StockAdjustment Router ----------------
const stockRouter = express.Router();
stockRouter.get('/', async (req, res) => {
  try { const stocks = await StockAdjustment.findAll({ include: [{ model: Product, as: 'product' }] }); res.json(stocks); } 
  catch (err) { handleError(res, err); }
});
stockRouter.post('/', authMiddleware, async (req, res) => {
  try { const stock = await StockAdjustment.create(req.body); res.status(201).json(stock); } 
  catch (err) { handleError(res, err); }
});
stockRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [updated] = await StockAdjustment.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'StockAdjustment not found' });
    const updatedStock = await StockAdjustment.findByPk(req.params.id);
    res.json(updatedStock);
  } catch (err) { handleError(res, err); }
});
stockRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await StockAdjustment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'StockAdjustment not found' });
    res.json({ message: 'StockAdjustment deleted' });
  } catch (err) { handleError(res, err); }
});

// ---------------- Export all routers ----------------
module.exports = {
  categoryRouter,
  productRouter,
  customerRouter,
  transactionRouter,
  paymentRouter,
  supplierRouter,
  poRouter,
  poItemRouter,
  stockRouter 
};
