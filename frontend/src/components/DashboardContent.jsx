// src/components/DashboardContent.jsx
import React from 'react';
import { User } from 'lucide-react';

export default function DashboardContent({ userData }) {
  const recent = [
    { action: 'New user registered', time: '2 minutes ago', color: 'blue' },
    { action: 'Payment received', time: '15 minutes ago', color: 'green' },
    { action: 'Task completed', time: '1 hour ago', color: 'purple' },
    { action: 'Settings updated', time: '3 hours ago', color: 'orange' },
  ];

  // Map color names to Tailwind classes (so Tailwind can pick them up at build time)
  const colorClassMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {userData?.name}!</h2>
        <p className="text-blue-100">Here's what's happening with your account today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">1,234</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Active Sessions</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🟢</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">456</p>
          <p className="text-sm text-green-600 mt-2">↑ 8% from last week</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">$12.5K</p>
          <p className="text-sm text-green-600 mt-2">↑ 23% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Tasks</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">89</p>
          <p className="text-sm text-gray-500 mt-2">23 pending</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recent.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${colorClassMap[item.color] || 'bg-gray-400'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-center">
              <span className="text-2xl mb-2 block">➕</span>
              <span className="text-sm font-medium text-gray-700">Add New</span>
            </button>
            <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors text-center">
              <span className="text-2xl mb-2 block">📊</span>
              <span className="text-sm font-medium text-gray-700">Reports</span>
            </button>
            <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-center">
              <span className="text-2xl mb-2 block">⚙️</span>
              <span className="text-sm font-medium text-gray-700">Settings</span>
            </button>
            <button className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-center">
              <span className="text-2xl mb-2 block">💬</span>
              <span className="text-sm font-medium text-gray-700">Support</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
