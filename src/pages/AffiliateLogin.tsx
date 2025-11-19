import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AffiliateLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      if (user && user.role !== 'affiliate') {
        setError('এই অ্যাকাউন্ট অ্যাফিলিয়েট নয়');
        return;
      }
      navigate('/affiliate');
    } catch {
      setError('লগইন ব্যর্থ হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur rounded-2xl shadow-xl p-8 text-white transform transition hover:scale-[1.01]">
          <div className="text-center mb-6 animate-pulse">
            <h2 className="text-3xl font-bold">অ্যাফিলিয়েট লগইন</h2>
            <p className="text-blue-100">আপনার অ্যাফিলিয়েট ড্যাশবোর্ডে প্রবেশ করুন</p>
          </div>
          {error && <div className="mb-4 bg-red-500/20 text-red-200 p-3 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button type="submit" disabled={isLoading} className="w-full bg-white text-blue-700 font-semibold py-2 rounded-md transform transition hover:-translate-y-px hover:shadow">
              {isLoading ? 'লোডিং...' : 'লগইন করুন'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AffiliateLogin;