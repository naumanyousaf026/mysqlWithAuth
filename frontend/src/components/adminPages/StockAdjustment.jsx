// File: StockAdjustment.jsx
import React, { useState } from 'react';

export default function StockAdjustment() {
  const [items, setItems] = useState([
    { id: 1, sku: 'P-1001', name: 'Product A', qty: 120 },
    { id: 2, sku: 'P-1002', name: 'Product B', qty: 45 },
  ]);
  const [form, setForm] = useState({ sku: '', change: 0, note: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'change' ? Number(value) : value }));
  }

  function applyAdjustment(e) {
    e.preventDefault();
    if (!form.sku) return;
    setItems(prev => prev.map(it => it.sku === form.sku ? { ...it, qty: it.qty + form.change } : it));
    setForm({ sku: '', change: 0, note: '' });
  }

  return (
    <div className="p-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold">Stock Adjustment</h1>
        <p className="text-blue-100">Make manual corrections to stock quantities.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form className="space-y-4 bg-white rounded-xl shadow p-4" onSubmit={applyAdjustment}>
          <h2 className="text-lg font-semibold">Adjust Stock</h2>
          <label className="block">
            <span className="text-sm text-gray-700">SKU</span>
            <input name="sku" value={form.sku} onChange={handleChange} list="skus" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" placeholder="P-1001" />
            <datalist id="skus">
              {items.map(i => <option key={i.id} value={i.sku}>{i.name}</option>)}
            </datalist>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Change (use negative to subtract)</span>
            <input name="change" type="number" value={form.change} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Note</span>
            <input name="note" value={form.note} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
          </label>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-90">Apply</button>
            <button type="button" onClick={() => setForm({ sku: '', change: 0, note: '' })} className="px-4 py-2 rounded-lg border">Reset</button>
          </div>
        </form>

        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Current Stock</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="px-3 py-2">SKU</th>
                  <th className="px-3 py-2">Product</th>
                  <th className="px-3 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id} className="border-t">
                    <td className="px-3 py-2">{i.sku}</td>
                    <td className="px-3 py-2">{i.name}</td>
                    <td className="px-3 py-2 font-mono">{i.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}


