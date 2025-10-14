import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/signup.jsx";
import LoginPage from "./components/login.jsx";
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

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
