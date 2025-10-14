import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Settings, LogOut, Bell, Search } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData] = useState({
    name: 'Nauman',
    email: 'nauman@example.com',
    avatar: 'N'
  });

  useEffect(() => {
    // You can fetch user data from API here
    // const token = window.authToken;
    // fetch user profile with token
  }, []);

  const handleLogout = () => {
    // Clear auth token
    window.authToken = null;
    // Redirect to login
    console.log('Logging out...');
    // window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="ml-2 lg:ml-0 text-xl sm:text-2xl font-bold text-blue-600">
                Dashboard
              </h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {userData.avatar}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-700">{userData.name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out mt-16 lg:mt-0`}>
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Home size={20} />
              <span className="font-medium">Home</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <User size={20} />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings size={20} />
              <span>Settings</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {userData.name}!</h2>
            <p className="text-blue-100">Here's what's happening with your account today.</p>
          </div>

          {/* Stats Cards */}
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

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New user registered', time: '2 minutes ago', color: 'blue' },
                  { action: 'Payment received', time: '15 minutes ago', color: 'green' },
                  { action: 'Task completed', time: '1 hour ago', color: 'purple' },
                  { action: 'Settings updated', time: '3 hours ago', color: 'orange' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></div>
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
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}