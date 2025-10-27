/* -----------------------------
   File: src/pages/SuppliersPage.jsx
   ----------------------------- */
import React from 'react';

export default function SuppliersPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold">Suppliers / Vendors</h1>
        <p className="text-blue-100 mt-1">Manage your supplier list, contacts and quick actions.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="text-lg font-semibold">Quick Stats</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>Total Suppliers: <span className="font-medium">128</span></li>
            <li>Active: <span className="font-medium">112</span></li>
            <li>New this month: <span className="font-medium">9</span></li>
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow overflow-auto">
          <h3 className="text-lg font-semibold">Supplier Directory</h3>
          <table className="w-full mt-3 text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Name</th>
                <th className="py-2">Contact</th>
                <th className="py-2">Location</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows - replace with data mapping */}
              <tr className="border-t">
                <td className="py-3">Acme Supplies</td>
                <td className="py-3">+92 300 0000000</td>
                <td className="py-3">Lahore, PK</td>
                <td className="py-3"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Active</span></td>
                <td className="py-3"> <button className="text-sm font-medium">View</button> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold">Add Supplier</h3>
        <form className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Supplier name" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Phone / Email" />
          <input className="col-span-1 sm:col-span-1 border rounded px-3 py-2" placeholder="Location" />
          <div className="sm:col-span-3 flex items-center space-x-2">
            <button type="button" className="ml-auto rounded-lg px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white">Save</button>
          </div>
        </form>
      </section>
    </div>
  );
}
