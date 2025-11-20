import React from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { logout } = useAdminAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">অ্যাডমিন ড্যাশবোর্ড</h1>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700">লগআউট</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link to="/admin/users" className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:bg-blue-50 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-4">ইউজারস</h2>
            <div className="text-gray-700">রেজিস্টার্ড ইউজারস এবং পারচেজড কোর্স</div>
          </Link>
          <Link to="/admin/withdrawals" className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:bg-blue-50 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-4">উইথড্র রিকোয়েস্ট</h2>
            <div className="text-gray-700">অ্যাফিলিয়েট উইথড্রাল রিকোয়েস্ট তালিকা</div>
          </Link>
      </div>
    </div>
  </div>
);
};

export default AdminDashboard;