import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NextInnovation</h3>
            <p className="text-gray-300 mb-4">
              আমরা বাংলাদেশের প্রথম সারির একটি অনলাইন শিক্ষা প্ল্যাটফর্ম। আমাদের লক্ষ্য হচ্ছে সবার জন্য সাশ্রয়ী মূল্যে মানসম্পন্ন শিক্ষা প্রদান করা।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">আমাদের কোর্সসমূহ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/course/web-development" className="text-gray-300 hover:text-white transition-colors">
                  ওয়েব ডেভেলপমেন্ট
                </Link>
              </li>
              <li>
                <Link to="/course/graphic-design" className="text-gray-300 hover:text-white transition-colors">
                  গ্রাফিক ডিজাইন
                </Link>
              </li>
              <li>
                <Link to="/course/digital-marketing" className="text-gray-300 hover:text-white transition-colors">
                  ডিজিটাল মার্কেটিং
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">যোগাযোগ করুন</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-1" />
                <span>চাঁদপুর, চট্টগ্রাম, বাংলাদেশ</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <a href="mailto:aljubayer92@gmail.com" className="hover:underline">
                  aljubayer92@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <a href="tel:+8801305223310" className="hover:underline">
                  +৮৮০১৩০৫২২৩৩১০
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} NextInnovation। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;