// Sidebar Component

import {
  Menu,
  X,
  Home,
  Package,
  PlusCircle,
  Edit,
  Truck,
  ShoppingCart,
  ClipboardList,
  BarChart3,
  Settings,
  User,
  LogOut,
  Database,
} from "lucide-react";
export function Sidebar({ sidebarOpen, setSidebarOpen, handleLogout }) {
  return (
    <>
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out mt-16 lg:mt-0`}
      >
        <nav className="p-4 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="/inventory"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Package size={20} />
            <span>Inventory</span>
          </a>

          <a
            href="/inventory/add"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <PlusCircle size={20} />
            <span>Add Item</span>
          </a>

          <a
            href="/inventory/edit"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Edit size={20} />
            <span>Edit Item</span>
          </a>

          <a
            href="/suppliers"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Truck size={20} />
            <span>Suppliers / Vendors</span>
          </a>

          <a
            href="/purchase-orders"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ClipboardList size={20} />
            <span>Purchase Orders</span>
          </a>

          <a
            href="/sales-orders"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Sales Orders</span>
          </a>

          <a
            href="/stock-adjustment"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Database size={20} />
            <span>Stock Adjustment</span>
          </a>

          <a
            href="/reports"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <BarChart3 size={20} />
            <span>Reports</span>
          </a>
          <a
            href="/profile"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <User size={20} />
            <span>Profile</span>
          </a>

          <a
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
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

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}