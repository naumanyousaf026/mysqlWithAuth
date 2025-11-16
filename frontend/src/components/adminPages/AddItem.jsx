import React, { useState, useEffect } from 'react';
import { Sidebar } from '../Sidebar';
import { ArrowLeft } from 'lucide-react';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    unit_price: '',
    stock_quantity: '',
    description: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!form.name || !form.sku || !form.unit_price) {
      setError('Please fill all required fields (Name, SKU, Unit Price)');
      return;
    }

    if (isNaN(form.unit_price) || Number(form.unit_price) < 0) {
      setError('Unit price must be a valid positive number');
      return;
    }

    if (form.stock_quantity && (isNaN(form.stock_quantity) || Number(form.stock_quantity) < 0)) {
      setError('Stock quantity must be a valid positive number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const productData = {
        name: form.name,
        sku: form.sku,
        unit_price: Number(form.unit_price),
        stock_quantity: form.stock_quantity ? Number(form.stock_quantity) : 0,
        description: form.description || null,
        category_id: form.category_id ? Number(form.category_id) : null
      };
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      const result = await response.json();
      console.log('Product created successfully:', result);
      
      setSuccess('Product created successfully!');
      
      // Reset form
      setForm({
        name: '',
        sku: '',
        unit_price: '',
        stock_quantity: '',
        description: '',
        category_id: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    window.history.back();
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 sm:p-6 lg:p-8 text-white mb-4 sm:mb-6 shadow-lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Add Product</h2>
            <p className="text-sm sm:text-base text-blue-100">Create a new product to add to inventory.</p>
          </div>

          {/* Form */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs sm:text-sm text-green-600 font-medium">{success}</p>
              </div>
            )}

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                    placeholder="e.g. Wireless Mouse"
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                    placeholder="e.g. WM-001"
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Unit Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      name="unit_price"
                      value={form.unit_price}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 shadow-sm pl-7 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock_quantity"
                    value={form.stock_quantity}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors bg-white"
                >
                  <option value="">Select a category (optional)</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors resize-none"
                  placeholder="Product description (optional)"
                  rows="4"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto sm:flex-1 md:flex-none px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                >
                  {loading ? 'Creating...' : 'Create Product'}
                </button>
                <button
                  onClick={() => {
                    setForm({
                      name: '',
                      sku: '',
                      unit_price: '',
                      stock_quantity: '',
                      description: '',
                      category_id: ''
                    });
                    setError('');
                    setSuccess('');
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}