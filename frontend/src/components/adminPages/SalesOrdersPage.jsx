/* -----------------------------
   File: src/pages/SalesOrdersPage.jsx
   ----------------------------- */
import React from 'react';

export default function SalesOrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold">Sales Orders (Outgoing)</h1>
        <p className="text-blue-100 mt-1">View and manage outgoing sales orders to your customers.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="text-lg font-semibold">Today's Orders</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>SO# 3001 — <span className="font-medium">Packing</span></li>
            <li>SO# 3002 — <span className="font-medium">Shipped</span></li>
            <li>SO# 3003 — <span className="font-medium">Awaiting Payment</span></li>
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow overflow-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Sales Orders</h3>
            <div>
              <button className="rounded px-3 py-2 border">Filter</button>
              <button className="ml-2 rounded px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white">New SO</button>
            </div>
          </div>

          <table className="w-full mt-3 text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">SO #</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Ship Date</th>
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3">3001</td>
                <td className="py-3">Retail Mart</td>
                <td className="py-3">Oct 26, 2025</td>
                <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Shipped</span></td>
                <td className="py-3">$850.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold">Create Sales Order</h3>
        <form className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Customer" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Ship Date" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="SO Reference" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Total" />

          <div className="sm:col-span-4 flex items-center">
            <button type="button" className="ml-auto rounded-lg px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white">Create SO</button>
          </div>
        </form>
      </section>
    </div>
  );
}
