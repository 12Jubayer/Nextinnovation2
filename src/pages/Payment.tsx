import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, CheckCircle, Calendar, Lock, Phone } from 'lucide-react';
import { getCourseById } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'nagad'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nagadNumber, setNagadNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { user, updateUser } = useAuth();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') || '';
  const selectedCourse = getCourseById(courseId || '') || null;
  const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      setIsProcessing(false);
      setSuccess(true);
      
      try {
        if (user && courseId) {
          const res = await fetch(`${API_BASE}/api/purchase`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, courseId })
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.user) {
              updateUser(data.user);
            }
          }
        }
      } catch {}

      // Redirect to dashboard after payment success
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 2000);
  };

  // Format card number input with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      setCardNumber(formattedValue);
    }
  };

  // Format expiry date
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\//g, '');
    if (value.length <= 4) {
      const formattedValue = value
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .trim();
      setExpiryDate(formattedValue);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {success ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">পেমেন্ট সফল হয়েছে!</h2>
            <p className="text-gray-600 mb-6">
              আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আপনি এখন আপনার কোর্স অ্যাক্সেস করতে পারবেন।
            </p>
            <p className="text-sm text-gray-500 mb-4">
              আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">পেমেন্ট করুন</h2>
              <p className="text-gray-600">
                আপনার কোর্স অ্যাক্সেস পেতে পেমেন্ট সম্পন্ন করুন
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <h3 className="text-xl font-bold">পেমেন্ট সারাংশ</h3>
                <div className="mt-4 flex justify-between">
                  <div className="text-blue-100">কোর্স:</div>
                  <div>{selectedCourse?.title || 'কোর্স নির্বাচন করুন'}</div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="text-blue-100">মূল্য:</div>
                  <div>{selectedCourse ? `৳${selectedCourse.price}` : '-'}</div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="text-blue-100">শিক্ষার্থী:</div>
                  <div>{user?.name}</div>
                </div>
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/20">
                  <div className="text-lg font-bold">মোট</div>
                  <div className="text-2xl font-bold">{selectedCourse ? `৳${selectedCourse.price}` : '-'}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">পেমেন্ট মাধ্যম নির্বাচন করুন</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                        paymentMethod === 'card'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <CreditCard className="h-6 w-6" />
                      <span className="font-medium">ক্রেডিট কার্ড</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                        paymentMethod === 'nagad'
                          ? 'border-pink-600 bg-pink-50 text-pink-600'
                          : 'border-gray-200 hover:border-pink-600 hover:bg-pink-50'
                      }`}
                    >
                      <Phone className="h-6 w-6" />
                      <span className="font-medium">নগদ</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                        <h4 className="text-lg font-bold text-gray-900">কার্ড তথ্য</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            কার্ড নম্বর
                          </label>
                          <input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            কার্ডে নাম
                          </label>
                          <input
                            id="cardName"
                            type="text"
                            placeholder="আপনার নাম"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                              মেয়াদ শেষ
                            </label>
                            <div className="relative">
                              <input
                                id="expiryDate"
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <div className="relative">
                              <input
                                id="cvv"
                                type="text"
                                placeholder="123"
                                maxLength={3}
                                value={cvv}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '');
                                  if (value.length <= 3) {
                                    setCvv(value);
                                  }
                                }}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <Lock className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-sm text-gray-600">
                        আপনার পেমেন্ট তথ্য নিরাপদ এবং এনক্রিপ্ট করা আছে।
                      </p>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-primary w-full flex justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          পেমেন্ট প্রক্রিয়া করা হচ্ছে...
                        </>
                      ) : (
                        {selectedCourse ? `৳${selectedCourse.price} পেমেন্ট করুন` : 'পেমেন্ট করুন'}
                      )}
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <Phone className="h-6 w-6 text-pink-600 mr-2" />
                        <h4 className="text-lg font-bold text-gray-900">নগদ পেমেন্ট</h4>
                      </div>
                      
                      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
                        <p className="text-gray-700 mb-4">নগদ পেমেন্টের জন্য নিম্নলিখিত ধাপগুলি অনুসরণ করুন:</p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-600">
                          <li>নগদ অ্যাপ খুলুন</li>
                          <li>Send Money অপশনে যান</li>
                          <li>এই নম্বরে পেমেন্ট করুন: <span className="font-medium text-pink-600">01305223310</span></li>
                          <li>রেফারেন্স হিসেবে আপনার নাম দিন</li>
                        </ol>
                      </div>

                      <div>
                        <label htmlFor="nagadNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          আপনার নগদ নম্বর
                        </label>
                        <input
                          id="nagadNumber"
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          value={nagadNumber}
                          onChange={(e) => setNagadNumber(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                          required
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          পেমেন্ট যাচাই করা হচ্ছে...
                        </>
                      ) : (
                        'নগদ পেমেন্ট নিশ্চিত করুন'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;