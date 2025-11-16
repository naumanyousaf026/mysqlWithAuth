// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken") || null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) window.authToken = token;
      else delete window.authToken;
    }
  }, [token]);

  const login = (newToken, remember = true) => {
    setToken(newToken);
    if (typeof window !== "undefined") {
      if (remember) localStorage.setItem("authToken", newToken);
      else localStorage.removeItem("authToken");
    }
  };

  const logout = () => {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      delete window.authToken;
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
