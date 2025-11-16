// src/main/index.jsx (or src/index.jsx)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/signup.jsx";
import LoginPage from "./components/login.jsx";
import AddItem from "./components/adminPages/AddItem.jsx";
import EditItem from "./components/adminPages/EditItem.jsx";
import Inventory from "./components/adminPages/Inventory.jsx";
import PurchaseOrders from "./components/adminPages/PurchaseOrdersPage.jsx";
import SalesOrders from "./components/adminPages/SalesOrdersPage.jsx";
import Suppliers from "./components/adminPages/SuppliersPage.jsx";
import StockAdjustment from "./components/adminPages/StockAdjustment.jsx";
import Reports from "./components/adminPages/Reports.jsx";
import Settings from "./components/adminPages/Settings.jsx";
import Profile from "./components/adminPages/Profile.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  { path: "/", element:
      // Protect the root (and you can protect any route similarly)
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <LoginPage /> },

  // example: protect admin pages
  { path: "/inventory/add", element: <ProtectedRoute><AddItem /></ProtectedRoute> },
  { path: "/inventory/edit", element: <ProtectedRoute><EditItem /></ProtectedRoute> },
  { path: "/inventory", element: <ProtectedRoute><Inventory /></ProtectedRoute> },
  { path: "/suppliers", element: <ProtectedRoute><Suppliers /></ProtectedRoute> },
  { path: "/sales-orders", element: <ProtectedRoute><SalesOrders /></ProtectedRoute> },
  { path: "/purchase-orders", element: <ProtectedRoute><PurchaseOrders /></ProtectedRoute> },
  { path: "/stock-adjustment", element: <ProtectedRoute><StockAdjustment /></ProtectedRoute> },
  { path: "/reports", element: <ProtectedRoute><Reports /></ProtectedRoute> },
  { path: "/settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },
  { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
