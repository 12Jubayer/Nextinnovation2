import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'affiliate' | 'business_partner' | 'admin';
  courses: string[];
  loginCount?: number;
  lastLogin?: string | null;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/users`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [API_BASE]);

  const total = users.length;
  const affiliates = users.filter(u => u.role === 'affiliate').length;
  const partners = users.filter(u => u.role === 'business_partner').length;
  const customers = users.filter(u => u.role === 'customer').length;
  const admins = users.filter(u => u.role === 'admin').length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">ইউজার তালিকা</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow"><div className="text-gray-500">মোট</div><div className="text-2xl font-bold">{total}</div></div>
          <div className="bg-white rounded-lg p-4 shadow"><div className="text-gray-500">কাস্টমার</div><div className="text-2xl font-bold">{customers}</div></div>
          <div className="bg-white rounded-lg p-4 shadow"><div className="text-gray-500">অ্যাফিলিয়েট</div><div className="text-2xl font-bold">{affiliates}</div></div>
          <div className="bg-white rounded-lg p-4 shadow"><div className="text-gray-500">পার্টনার</div><div className="text-2xl font-bold">{partners}</div></div>
          <div className="bg-white rounded-lg p-4 shadow"><div className="text-gray-500">অ্যাডমিন</div><div className="text-2xl font-bold">{admins}</div></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">নাম</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ইমেইল</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">রোল</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">কোর্স</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">লগইন</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">লাস্ট লগইন</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(u => (
                  <tr key={u.id}>
                    <td className="px-4 py-2 text-sm text-gray-700">{u.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{u.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{u.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{u.role}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{u.courses?.length || 0}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{u.loginCount || 0}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;