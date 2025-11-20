import React, { useEffect, useState } from 'react';

interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
}

const AdminWithdrawals: React.FC = () => {
  const [items, setItems] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/withdrawals`);
        if (res.ok) {
          const data = await res.json();
          setItems(data.withdrawals || []);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [API_BASE]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">উইথড্র রিকোয়েস্ট</h1>
        {loading ? (
          <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map(w => (
                  <tr key={w.id}>
                    <td className="px-4 py-2 text-sm text-gray-700">{w.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{w.userId}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">৳{w.amount}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{w.method}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{w.status}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{new Date(w.createdAt).toLocaleString()}</td>
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

export default AdminWithdrawals;