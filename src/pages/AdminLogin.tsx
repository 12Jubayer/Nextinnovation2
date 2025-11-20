import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(password);
      navigate('/admin/dashboard');
    } catch {
      setError('ভুল অ্যাডমিন পাসওয়ার্ড');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">অ্যাডমিন লগইন</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="পাসওয়ার্ড লিখুন"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4">অ্যাডমিন পাসওয়ার্ড: hellocode</p>
      </div>
    </div>
  );
};

export default AdminLogin;