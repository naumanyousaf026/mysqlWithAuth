
// FILE: src/pages/EditItem.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditItem() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', sku: '', qty: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Dummy fetch — replace with API call to get a single item by id
  useEffect(() => {
    const fakeItem = { id, name: 'Product A', sku: 'PA-001', qty: 120 };
    setTimeout(() => { setForm({ name: fakeItem.name, sku: fakeItem.sku, qty: fakeItem.qty }); setLoading(false); }, 200);
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // replace with PUT/PATCH request to backend
    console.log('Saving', { id, ...form });
    navigate('/dashboard/inventory');
  }

  if (loading) return <div className="p-6">Loading item...</div>;

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Edit Item</h2>
        <p className="text-blue-100">Update product details.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl bg-white p-6 rounded-xl shadow">
        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Item name</span>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">SKU</span>
          <input name="sku" value={form.sku} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Quantity</span>
          <input type="number" name="qty" value={form.qty} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
        </label>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">Save Changes</button>
          <button type="button" onClick={() => navigate('/dashboard/inventory')} className="px-4 py-2 rounded-lg border">Cancel</button>
        </div>
      </form>
    </div>
  );
}



