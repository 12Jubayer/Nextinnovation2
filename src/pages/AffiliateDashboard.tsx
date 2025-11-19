import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Calculator, Percent, Users } from 'lucide-react';

const AffiliateDashboard: React.FC = () => {
  const [price, setPrice] = useState<number>(100);
  const [units, setUnits] = useState<number>(1);

  const dist = useMemo(() => {
    const total = price * units;
    return {
      company: total * 0.4,
      affiliate: total * 0.2,
      partnership: total * 0.3,
      incentive: total * 0.1,
    };
  }, [price, units]);

  const clubPerUnit = useMemo(() => {
    return {
      shortTime: price * 0.1,
      longTime: price * 0.12,
      lifeTime: price * 0.08,
    };
  }, [price]);

  const minWithdraw = 1000;
  const withdrawChargePct = 10;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Virtual Product Selling Project by the NextInnovation</h1>
            <Link
              to="/affiliate/withdraw"
              className="bg-white text-purple-700 px-4 py-2 rounded-md font-semibold transform transition-all duration-200 hover:scale-105 hover:-translate-y-px"
            >
              উইথড্র
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Calculator className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">ইনপুট</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">প্রাইস</label>
                <input type="number" value={price} onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ইউনিট বিক্রি</label>
                <input type="number" value={units} onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex items-center text-gray-600">
                <Percent className="h-5 w-5 mr-2" />
                <span>Company 40% • Affiliate 20% • Rewards 30% • Carry 10%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex items-center mb-4">
              <Wallet className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">ডিস্ট্রিবিউশন</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-lg p-4 bg-blue-50">
                <p className="text-sm text-gray-700">Company (40%)</p>
                <p className="text-2xl font-bold text-blue-700">৳{dist.company.toFixed(2)}</p>
              </div>
              <div className="rounded-lg p-4 bg-orange-50">
                <p className="text-sm text-gray-700">Affiliate (20%)</p>
                <p className="text-2xl font-bold text-orange-700">৳{dist.affiliate.toFixed(2)}</p>
              </div>
              <div className="rounded-lg p-4 bg-green-50">
                <p className="text-sm text-gray-700">Business Partnership Rewards (30%)</p>
                <p className="text-2xl font-bold text-green-700">৳{dist.partnership.toFixed(2)}</p>
              </div>
              <div className="rounded-lg p-4 bg-purple-50">
                <p className="text-sm text-gray-700">Incentive/Carry (10%)</p>
                <p className="text-2xl font-bold text-purple-700">৳{dist.incentive.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center">
            <Users className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">Business Partnership Rewards</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 font-semibold">
              <div className="text-gray-700">টাইপ</div>
              <div className="text-gray-700">Selling & Team Building Target</div>
              <div className="text-gray-700">Club Amount Will Be</div>
              <div className="text-gray-700">Club Commission</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2">
              <div className="text-gray-900">ShortTime Business Partner (6 Months) 10%</div>
              <div className="text-gray-700">5 Units</div>
              <div className="text-gray-900">৳{clubPerUnit.shortTime.toFixed(2)}</div>
              <div className="text-gray-900">10</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2">
              <div className="text-gray-900">LongTime Business Partner (1 Year) 12%</div>
              <div className="text-gray-700">3 ShortTime Business Partner</div>
              <div className="text-gray-900">৳{clubPerUnit.longTime.toFixed(2)}</div>
              <div className="text-gray-900">12</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2">
              <div className="text-gray-900">LifeTime Business Partner (Lifetime) 8%</div>
              <div className="text-gray-700">2 LongTime Business Partner</div>
              <div className="text-gray-900">৳{clubPerUnit.lifeTime.toFixed(2)}</div>
              <div className="text-gray-900">8</div>
            </div>
          </div>
          <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
            <div className="text-blue-700">Minimum Withdraw: ৳{minWithdraw}</div>
            <div className="text-blue-700">Withdrawal Charge: {withdrawChargePct}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;