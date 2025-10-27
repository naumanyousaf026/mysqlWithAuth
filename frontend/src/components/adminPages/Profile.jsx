
// File: Profile.jsx
import React, { useState } from 'react';

export default function Profile() {
  const [admin, setAdmin] = useState({
    name: 'Nauman Yousaf',
    role: 'Administrator',
    email: 'nauman@example.com',
    phone: '+92 300 0000000',
    location: 'Karachi, Pakistan',
    bio: 'Responsible for managing the platform, users and inventory.',
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(admin);

  function saveProfile(e) {
    e.preventDefault();
    setAdmin(form);
    setEditing(false);
    // Replace with API call as needed
  }

  return (
    <div className="p-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p className="text-blue-100">Manage your account and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-3 overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Nauman+Yousaf&background=1d4ed8&color=ffffff&size=128" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-semibold">{admin.name}</h2>
          <p className="text-sm text-gray-500">{admin.role}</p>

          <div className="mt-4 w-full">
            <div className="flex justify-between py-2 border-t">
              <span className="text-sm text-gray-600">Products managed</span>
              <span className="font-semibold">1,250</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="text-sm text-gray-600">Active campaigns</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="text-sm text-gray-600">Last login</span>
              <span className="text-sm">Oct 23, 2025</span>
            </div>
          </div>

          <button onClick={() => setEditing(true)} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white">Edit Profile</button>
        </aside>

        <main className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="font-medium">{admin.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Phone</div>
                <div className="font-medium">{admin.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Location</div>
                <div className="font-medium">{admin.location}</div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-sm text-gray-700">{admin.bio}</p>
          </section>

          <section className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex justify-between"><span>Updated Product P-1002</span><span className="text-xs text-gray-500">Oct 24, 2025</span></li>
              <li className="flex justify-between"><span>Exported stock report</span><span className="text-xs text-gray-500">Oct 22, 2025</span></li>
              <li className="flex justify-between"><span>Changed password</span><span className="text-xs text-gray-500">Sep 18, 2025</span></li>
            </ul>
          </section>

          {editing && (
            <div className="fixed inset-0 bg-black/30 flex items-start justify-center p-6">
              <form onSubmit={saveProfile} className="bg-white rounded-xl shadow p-6 w-full max-w-2xl">
                <h3 className="text-lg font-semibold mb-3">Edit Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-600">Full name</span>
                    <input name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Role</span>
                    <input name="role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Email</span>
                    <input name="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-600">Phone</span>
                    <input name="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                  </label>
                </div>

                <label className="block mt-3">
                  <span className="text-sm text-gray-600">Location</span>
                  <input name="location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
                </label>

                <label className="block mt-3">
                  <span className="text-sm text-gray-600">Bio</span>
                  <textarea rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2"></textarea>
                </label>

                <div className="flex gap-2 mt-4 justify-end">
                  <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">Save</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

