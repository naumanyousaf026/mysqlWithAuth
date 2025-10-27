// File: Reports.jsx
import React from 'react';

export default function Reports() {
  const stockLevels = [
    { sku: 'P-1001', name: 'Product A', qty: 120 },
    { sku: 'P-1002', name: 'Product B', qty: 45 },
    { sku: 'P-1003', name: 'Product C', qty: 5 },
  ];

  const topSellers = [
    { sku: 'P-1002', name: 'Product B', sold: 1200 },
    { sku: 'P-1001', name: 'Product A', sold: 980 },
  ];

  const valuation = stockLevels.reduce((s, it) => s + it.qty * (it.sku === 'P-1001' ? 10 : it.sku === 'P-1002' ? 20 : 8), 0);

  return (
    <div className="p-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-blue-100">Stock levels, valuation and top sellers at a glance.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Stock Levels</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {stockLevels.map(s => (
              <li key={s.sku} className="flex justify-between">
                <span>{s.name} <span className="text-xs text-gray-400">({s.sku})</span></span>
                <span className={`font-semibold ${s.qty <= 10 ? 'text-red-600' : 'text-gray-900'}`}>{s.qty}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Valuation</h3>
          <div className="text-2xl font-bold">${valuation.toLocaleString()}</div>
          <p className="text-sm text-gray-500 mt-2">Estimated stock value based on unit price assumptions.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Top Sellers</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            {topSellers.map(t => (
              <li key={t.sku} className="flex justify-between">
                <span>{t.name}</span>
                <span className="font-medium">{t.sold.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <section className="mt-6 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Export / Filters</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <select className="p-2 rounded border-gray-200">
            <option>All SKUs</option>
            {stockLevels.map(s => <option key={s.sku}>{s.sku} - {s.name}</option>)}
          </select>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Export CSV</button>
        </div>
      </section>
    </div>
  );
}