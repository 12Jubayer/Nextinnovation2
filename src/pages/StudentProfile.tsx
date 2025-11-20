import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Pencil, User, Mars, Venus } from 'lucide-react';

type Gender = 'male' | 'female' | null;

interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'affiliate' | 'business_partner' | 'admin';
  courses: string[];
  loginCount?: number;
  lastLogin?: string | null;
  gender?: Gender;
}

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
  const [data, setData] = useState<PublicUser | null>(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const canEdit = !!user && (user.role === 'admin' || user.id === id);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const res = await fetch(`${API_BASE}/api/users/${id}`);
      if (res.ok) {
        const d = await res.json();
        setData(d.user);
        setName(d.user?.name || '');
        setGender((d.user?.gender as Gender) ?? null);
      }
    };
    load();
  }, [id, API_BASE]);

  const save = async () => {
    if (!id) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, gender })
      });
      if (!res.ok) throw new Error('Failed');
      const d = await res.json();
      setData(d.user);
    } catch {
      setError('আপডেট ব্যর্থ হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const GenderIcon = () => {
    if (gender === 'male') return <Mars className="h-6 w-6 text-blue-600" />;
    if (gender === 'female') return <Venus className="h-6 w-6 text-pink-600" />;
    return <User className="h-6 w-6 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">স্টুডেন্ট প্রোফাইল</h1>
            <GenderIcon />
          </div>
          {data ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500">স্টুডেন্ট আইডি</div>
                  <div className="font-semibold">{data.id}</div>
                </div>
                <div>
                  <div className="text-gray-500">ইমেইল</div>
                  <div className="font-semibold">{data.email}</div>
                </div>
                <div>
                  <div className="text-gray-500">রোল</div>
                  <div className="font-semibold">{data.role}</div>
                </div>
                <div>
                  <div className="text-gray-500">কোর্স</div>
                  <div className="font-semibold">{data.courses?.length || 0}</div>
                </div>
                <div>
                  <div className="text-gray-500">লগইন</div>
                  <div className="font-semibold">{data.loginCount || 0}</div>
                </div>
                <div>
                  <div className="text-gray-500">লাস্ট লগইন</div>
                  <div className="font-semibold">{data.lastLogin ? new Date(data.lastLogin).toLocaleString() : '-'}</div>
                </div>
              </div>

              {canEdit && (
                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center mb-4">
                    <Pencil className="h-5 w-5 text-blue-600 mr-2" />
                    <div className="text-lg font-bold">প্রোফাইল এডিট</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">জেন্ডার</label>
                      <select
                        value={gender ?? ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          setGender(v === '' ? null : (v as Gender));
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">সেট নেই</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                  <button onClick={save} disabled={saving} className="btn-primary mt-4">
                    {saving ? 'সেভ হচ্ছে...' : 'সেভ'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;