import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/coursesData';

const CustomerPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">আপনার পণ্য ও কোর্স</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
              <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <Link to={`/course/${course.id}`} className="text-blue-600 hover:underline">ডিটেইলস</Link>
                  <Link to={`/payment?courseId=${course.id}`} className="bg-blue-600 text-white px-3 py-1 rounded-md">কিনুন</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;

