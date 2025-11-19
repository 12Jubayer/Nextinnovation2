import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AffiliateRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { registerAffiliate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না');
      return;
    }
    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর');
      return;
    }
    setIsLoading(true);
    try {
      await registerAffiliate(name, email, password);
      navigate('/affiliate');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'রেজিস্ট্রেশন ব্যর্থ হয়েছে';
      const translated = msg.includes('User already exists')
        ? 'এই ইমেইলে একটি অ্যাকাউন্ট ইতিমধ্যে রয়েছে। অন্য ইমেইল ব্যবহার করুন।'
        : msg.includes('Missing required fields')
        ? 'নাম, ইমেইল ও পাসওয়ার্ড প্রয়োজন।'
        : msg;
      setError(translated);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl p-8 text-white transform transition hover:scale-[1.01]">
          <div className="text-center mb-6 animate-pulse">
            <h2 className="text-3xl font-bold">অ্যাফিলিয়েট রেজিস্ট্রেশন</h2>
            <p className="text-blue-100">আজই অ্যাফিলিয়েট হিসেবে শুরু করুন</p>
          </div>
          {error && <div className="mb-4 bg-red-500/20 text-red-200 p-3 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="h-5 w-5 absolute left-3 top-3 text-blue-200" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নাম"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <div className="relative">
              <Mail className="h-5 w-5 absolute left-3 top-3 text-blue-200" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ইমেইল"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <div className="relative">
              <Lock className="h-5 w-5 absolute left-3 top-3 text-blue-200" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <div className="relative">
              <Lock className="h-5 w-5 absolute left-3 top-3 text-blue-200" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/5 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-white text-blue-700 font-semibold py-2 rounded-md transform transition hover:-translate-y-px hover:shadow">
              {isLoading ? 'লোডিং...' : 'রেজিস্টার করুন'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AffiliateRegister;