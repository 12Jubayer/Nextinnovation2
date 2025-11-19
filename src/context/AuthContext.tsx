import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type UserType = 'customer' | 'affiliate' | 'business_partner' | 'admin';
interface User {
  id: string;
  name: string;
  email: string;
  courses: string[];
  role: UserType;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (u: User) => void;
  registerAffiliate: (name: string, email: string, password: string) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = ((import.meta as unknown) as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (!parsed.role) parsed.role = 'customer';
      setUser(parsed);
      localStorage.setItem('user', JSON.stringify(parsed));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Invalid login credentials');
      }
      const data = await res.json();
      const userData: User = { ...data.user };
      if (!userData.role) userData.role = 'customer';
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch {
      throw new Error('Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Registration failed');
      }
      const data = await res.json();
      const userData: User = { ...data.user };
      if (!userData.role) userData.role = 'customer';
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const registerAffiliate = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'affiliate' })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || 'Registration failed');
      }
      const data = await res.json();
      const userData: User = { ...data.user };
      if (!userData.role) userData.role = 'affiliate';
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (u: User) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    registerAffiliate
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};