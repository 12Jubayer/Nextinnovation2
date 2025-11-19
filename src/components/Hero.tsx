import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              আপনার ক্যারিয়ার শুরু করুন আইটি ক্ষেত্রে
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              আমাদের অভিজ্ঞ শিক্ষকদের সাথে আধুনিক প্রযুক্তি শিখুন এবং আপনার দক্ষতা বাড়ান। আমরা আপনাকে সফল হতে সাহায্য করব।
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-outline">
                শুরু করুন
              </Link>
              <Link to="/course/web-development" className="btn-secondary flex items-center">
                কোর্স দেখুন
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Students learning online"
              className="rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;