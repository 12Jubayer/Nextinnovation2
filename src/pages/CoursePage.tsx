import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, BookOpen, Check } from 'lucide-react';
import { getCourseById } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = getCourseById(courseId || '');
  const { user } = useAuth();

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">কোর্স পাওয়া যায়নি</h2>
          <Link to="/" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 mr-2" /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center text-white hover:text-blue-100 mb-6 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" /> হোম পেজে ফিরে যান
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-blue-100 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center text-blue-100 mb-8">
                <div className="flex items-center mr-6 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{course.students} জন শিক্ষার্থী</span>
                </div>
                <div className="flex items-center mb-2">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{course.lessons} টি লেসন</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <img 
                  src={course.instructorImage} 
                  alt={course.instructor} 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <p className="text-lg font-semibold">ইন্সট্রাক্টর: {course.instructor}</p>
                  <p className="text-blue-100">বিশেষজ্ঞ {course.title} শিক্ষক</p>
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold mb-4">
                  ৳{course.price}
                </div>
                
                {user ? (
                  <Link 
                    to="/payment" 
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
                  >
                    এখনই ভর্তি হন
                  </Link>
                ) : (
                  <Link
                    to="/register"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
                  >
                    রেজিস্টার করে ভর্তি হন
                  </Link>
                )}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">কোর্স বিবরণ</h2>
              <p className="text-gray-700 mb-6">{course.fullDescription}</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">এই কোর্সে যা শিখবেন</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">কোর্স কারিকুলাম</h2>
              
              <div className="space-y-6">
                {course.curriculum.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        মডিউল {moduleIndex + 1}: {module.module}
                      </h3>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                            {moduleIndex + 1}.{lessonIndex + 1}
                          </div>
                          <p className="text-gray-700">{lesson}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Course Info Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">কোর্স বিবরণ</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">মূল্য</span>
                  <span className="font-semibold text-gray-900">৳{course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">সময়কাল</span>
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">মোট লেসন</span>
                  <span className="font-semibold text-gray-900">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ইন্সট্রাক্টর</span>
                  <span className="font-semibold text-gray-900">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ছাত্র</span>
                  <span className="font-semibold text-gray-900">{course.students} জন</span>
                </div>
              </div>
              
              {user ? (
                <Link 
                  to="/payment" 
                  className="block w-full bg-blue-600 text-white text-center px-4 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  এখনই ভর্তি হন
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="block w-full bg-blue-600 text-white text-center px-4 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  রেজিস্টার করে ভর্তি হন
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;