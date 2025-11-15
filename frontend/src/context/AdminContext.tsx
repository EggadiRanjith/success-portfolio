"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already authenticated
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("admin_authenticated", "true");
    // Set expiration (24 hours)
    localStorage.setItem("admin_auth_expiry", String(Date.now() + 24 * 60 * 60 * 1000));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_auth_expiry");
  };

  useEffect(() => {
    // Check for auth expiration
    const expiry = localStorage.getItem("admin_auth_expiry");
    if (expiry && Date.now() > parseInt(expiry)) {
      logout();
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminProvider");
  }
  return context;
}

