// FILE: src/pages/Inventory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy fetch — replace with your API call
  useEffect(() => {
    const seed = [
      { id: '1', name: 'Product A', sku: 'PA-001', qty: 120 },
      { id: '2', name: 'Product B', sku: 'PB-002', qty: 32 },
      { id: '3', name: 'Product C', sku: 'PC-003', qty: 0 },
    ];
    setTimeout(() => { setItems(seed); setLoading(false); }, 300);
  }, []);

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Inventory</h2>
        <p className="text-blue-100">Manage your items — view, edit or add new products.</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">All Items</h3>
        <Link to="/inventory/add" className="inline-block bg-white text-blue-700 px-4 py-2 rounded-lg font-medium shadow">
          + Add Item
        </Link>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading items...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${item.qty === 0 ? 'text-red-600' : 'text-gray-700'}`}>{item.qty} in stock</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link to={`/inventory/edit`} className="flex-1 text-center px-3 py-2 rounded-md border border-blue-700 text-blue-700">Edit</Link>
                <button className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-md border border-red-200">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
