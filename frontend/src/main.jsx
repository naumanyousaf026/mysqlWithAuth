import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/signup.jsx";
import LoginPage from "./components/login.jsx";
import  AddItem from"./components/adminPages/AddItem.jsx";
import EditItem from"./components/adminPages/EditItem.jsx";
import Inventory from"./components/adminPages/Inventory.jsx";
import PurchaseOrders from"./components/adminPages/PurchaseOrdersPage.jsx";
import SalesOrders from"./components/adminPages/SalesOrdersPage.jsx";
import Suppliers from"./components/adminPages/SuppliersPage.jsx";
import StockAdjustment from"./components/adminPages/StockAdjustment.jsx";
import Reports from"./components/adminPages/Reports.jsx";
import Settings from"./components/adminPages/Settings.jsx";
import Profile from "./components/adminPages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path:"/login",
    element:<LoginPage/>,
  }, 
  {
  path: "/inventory/add",
    element: < AddItem />,
  },
  {
  path: "/inventory/edit",
    element: <EditItem />,
  },
  {
  path: "/inventory",
    element: <Inventory />,
  },
    {
  path: "/suppliers",
    element: <Suppliers />,
  }, 
    {
  path: "/sales-orders",
    element: <SalesOrders />,
  },
    {
  path: "/purchase-orders",
    element: <PurchaseOrders />,
  },
    {
  path: "/stock-adjustment",
    element: <StockAdjustment />,
  },
    {
  path: "/reports",
    element: <Reports />,
  },
    {
  path: "/settings",
    element: <Settings />,
  },
    {
  path: "/profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
