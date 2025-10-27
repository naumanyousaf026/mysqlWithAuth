
/* -----------------------------
   File: src/pages/PurchaseOrdersPage.jsx
   ----------------------------- */
import React from 'react';

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold">Purchase Orders (Incoming)</h1>
        <p className="text-blue-100 mt-1">Create and track incoming purchase orders from your vendors.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="text-lg font-semibold">Recent Incoming</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>PO# 2025-001 — <span className="font-medium">Pending</span></li>
            <li>PO# 2025-009 — <span className="font-medium">Received</span></li>
            <li>PO# 2025-011 — <span className="font-medium">Partially Received</span></li>
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow overflow-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Purchase Orders</h3>
            <div>
              <button className="rounded px-3 py-2 border">Filter</button>
              <button className="ml-2 rounded px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white">New PO</button>
            </div>
          </div>

          <table className="w-full mt-3 text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">PO #</th>
                <th className="py-2">Supplier</th>
                <th className="py-2">Expected</th>
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3">2025-001</td>
                <td className="py-3">Acme Supplies</td>
                <td className="py-3">Oct 28, 2025</td>
                <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Pending</span></td>
                <td className="py-3">$1,240.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold">Create Purchase Order</h3>
        <form className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Supplier" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Expected Delivery" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="PO Reference" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Total" />

          <div className="sm:col-span-4 flex items-center">
            <button type="button" className="ml-auto rounded-lg px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white">Create PO</button>
          </div>
        </form>
      </section>
    </div>
  );
}

