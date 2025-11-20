import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdminAuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('admin_auth');
    setIsAdmin(stored === 'true');
    setLoading(false);
  }, []);

  const login = async (password: string) => {
    if (password === 'hellocode') {
      setIsAdmin(true);
      localStorage.setItem('admin_auth', 'true');
      return;
    }
    throw new Error('Invalid admin password');
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_auth');
  };

  const value: AdminAuthContextType = { isAdmin, loading, login, logout };
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};