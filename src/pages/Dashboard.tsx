import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/coursesData';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  const enrolledCourses = courses.filter(c => (user?.courses || []).includes(c.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-16 w-16 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold mr-4">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={logout}
                  className="flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>লগআউট</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-6 flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">কোর্স সম্পন্ন</p>
                  <p className="font-bold text-2xl text-gray-900">0 / {enrolledCourses.length}</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">মোট সময় ব্যয়</p>
                  <p className="font-bold text-2xl text-gray-900">5 ঘন্টা</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">সার্টিফিকেট</p>
                  <p className="font-bold text-2xl text-gray-900">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">আমার কোর্সসমূহ</h3>
          </div>
          
          <div className="p-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h4>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">প্রগ্রেস: 15% সম্পন্ন</p>
                      <Link
                        to={`/course/${course.id}`}
                        className="block w-full bg-blue-600 text-white text-center py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                      >
                        কোর্স চালিয়ে যান
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">কোনো কোর্স নেই</h4>
                <p className="text-gray-500 mb-4">আপনি এখনও কোনো কোর্সে নিবন্ধন করেননি।</p>
                <Link
                  to="/"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  কোর্স দেখুন
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">আরও কোর্স আপনার জন্য</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => !enrolledCourses.some(ec => ec.id === course.id)).map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">৳{course.price}</span>
                      <Link
                        to={`/course/${course.id}`}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium hover:bg-blue-200 transition-colors"
                      >
                        বিস্তারিত
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;