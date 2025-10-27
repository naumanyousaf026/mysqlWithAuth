// FILE: src/pages/AddItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const [form, setForm] = useState({ name: '', sku: '', qty: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.sku || form.qty === '') {
      setError('Please fill all fields');
      return;
    }
    const newItem = { id: Date.now().toString(), name: form.name, sku: form.sku, qty: Number(form.qty) };

    // Replace with POST request to your backend
    console.log('Submitting', newItem);

    // After success, navigate back to inventory
    navigate('/dashboard/inventory');
  }

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Add Item</h2>
        <p className="text-blue-100">Create a new item to add to inventory.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl bg-white p-6 rounded-xl shadow">
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Item name</span>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="e.g. Wireless Mouse" />
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">SKU</span>
          <input name="sku" value={form.sku} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="e.g. WM-001" />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Quantity</span>
          <input type="number" name="qty" value={form.qty} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="0" />
        </label>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">Create Item</button>
          <button type="button" onClick={() => navigate('/dashboard/inventory')} className="px-4 py-2 rounded-lg border">Cancel</button>
        </div>
      </form>
    </div>
  );
}