
// File: Settings.jsx
import React, { useState } from 'react';

export default function Settings() {
  const [profile, setProfile] = useState({ name: 'Nauman Yousaf', email: 'nauman@example.com', phone: '+92 300 0000000' });
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  }

  function saveProfile(e) {
    e.preventDefault();
    // pretend save
    alert('Profile saved');
  }

  function changePassword(e) {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) return alert('Passwords do not match');
    alert('Password changed');
    setPasswords({ current: '', next: '', confirm: '' });
  }

  return (
    <div className="p-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold">Settings & Profile</h1>
        <p className="text-blue-100">Update account info, password and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form className="bg-white rounded-xl shadow p-4" onSubmit={saveProfile}>
          <h2 className="text-lg font-semibold mb-3">Profile</h2>
          <label className="block mb-2">
            <span className="text-sm text-gray-600">Full name</span>
            <input name="name" value={profile.name} onChange={handleProfileChange} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </label>
          <label className="block mb-2">
            <span className="text-sm text-gray-600">Email</span>
            <input name="email" value={profile.email} onChange={handleProfileChange} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </label>
          <label className="block mb-2">
            <span className="text-sm text-gray-600">Phone</span>
            <input name="phone" value={profile.phone} onChange={handleProfileChange} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </label>
          <div className="flex gap-2 mt-3">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Save Profile</button>
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={() => setProfile({ name: '', email: '', phone: '' })}>Clear</button>
          </div>
        </form>

        <form className="bg-white rounded-xl shadow p-4" onSubmit={changePassword}>
          <h2 className="text-lg font-semibold mb-3">Change Password</h2>
          <label className="block mb-2">
            <span className="text-sm text-gray-600">Current Password</span>
            <input type="password" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </label>
          <label className="block mb-2">
            <span className="text-sm text-gray-600">New Password</span>
            <input type="password" value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </label>
          <label className="block mb-2">
            <span className="text-sm text-gray-600">Confirm New</span>
            <input type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-200 p-2" />
          </label>
          <div className="flex gap-2 mt-3">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}



