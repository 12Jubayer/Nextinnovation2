import React, { useEffect, useState } from 'react';
import { CreditCard, Banknote, Globe, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Method = 'paypal' | 'stripe' | 'bank' | 'bkash' | 'nagad';

const AffiliateWithdraw: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(1000);
  const [method, setMethod] = useState<Method>('paypal');
  const [details, setDetails] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const API_BASE = (
    import.meta as unknown as { env?: { VITE_API_URL?: string } }
  ).env?.VITE_API_URL || 'http://localhost:5000';

  const loadItems = async () => {
    if (!user) return;
    const res = await fetch(`${API_BASE}/api/affiliate/withdraw?userId=${encodeURIComponent(user.id)}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data.withdrawals || []);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const submit = async () => {
    if (!user) return;
    setMessage('');
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/affiliate/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, amount, method, details })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage((err as { error?: string }).error || 'অনুরোধ ব্যর্থ হয়েছে');
      } else {
        setMessage('উইথড্র অনুরোধ সাবমিট হয়েছে');
        setAmount(1000);
        setDetails({});
        await loadItems();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const MethodIcon = () => {
    switch (method) {
      case 'paypal':
      case 'stripe':
        return <Globe className="h-6 w-6 text-blue-600" />;
      case 'bank':
        return <CreditCard className="h-6 w-6 text-green-600" />;
      case 'bkash':
      case 'nagad':
        return <Phone className="h-6 w-6 text-pink-600" />;
      default:
        return <Banknote className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center mb-4">
            <MethodIcon />
            <h1 className="text-xl font-bold text-gray-900 ml-2">অ্যাফিলিয়েট উইথড্র</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">অ্যামাউন্ট (মিনিমাম 1000)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পেমেন্ট মেথড</label>
              <select value={method} onChange={(e) => setMethod(e.target.value as Method)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="bank">Bank Transfer</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {method === 'paypal' && (
              <input placeholder="PayPal Email" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => setDetails({ email: e.target.value })} />
            )}
            {method === 'stripe' && (
              <input placeholder="Stripe Email" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => setDetails({ email: e.target.value })} />
            )}
            {method === 'bank' && (
              <input placeholder="Bank Account / IBAN" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => setDetails({ account: e.target.value })} />
            )}
            {method === 'bkash' && (
              <input placeholder="bKash Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => setDetails({ phone: e.target.value })} />
            )}
            {method === 'nagad' && (
              <input placeholder="Nagad Number" className="w-full px-3 py-2 border border-gray-300 rounded-md" onChange={(e) => setDetails({ phone: e.target.value })} />
            )}
          </div>
          <div className="mt-4">
            <button onClick={submit} disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded-md">
              {isSubmitting ? 'সাবমিট হচ্ছে...' : 'উইথড্র অনুরোধ সাবমিট করুন'}
            </button>
          </div>
          {message && <div className="mt-4 text-sm text-gray-700">{message}</div>}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">আমার উইথড্র অনুরোধসমূহ</h2>
          </div>
          <div className="p-6">
            {items.length === 0 ? (
              <p className="text-gray-600">কোনো উইথড্র অনুরোধ নেই</p>
            ) : (
              <div className="space-y-3">
                {items.map((w) => (
                  <div key={w.id} className="border border-gray-200 rounded-md p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">৳{w.amount} • {w.method}</p>
                      <p className="text-sm text-gray-600">{new Date(w.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">{w.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateWithdraw;