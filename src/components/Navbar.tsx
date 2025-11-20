import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isAdmin } = useAdminAuth();
  const REPO_URL = (
    (import.meta as unknown) as { env?: { VITE_REPO_URL?: string } }
  ).env?.VITE_REPO_URL;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NextInnovation</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              হোম
            </Link>
            <Link to="/course/web-development" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              ওয়েব ডেভেলপমেন্ট
            </Link>
            <Link to="/course/graphic-design" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              গ্রাফিক ডিজাইন
            </Link>
            <Link to="/course/digital-marketing" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              ডিজিটাল মার্কেটিং
            </Link>
            {REPO_URL && (
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px"
              >
                রিপোজিটরি
              </a>
            )}
            <Link to={isAdmin ? '/admin/dashboard' : '/admin/login'} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              অ্যাডমিন
            </Link>
            
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  ড্যাশবোর্ড
                </Link>
                <Link to="/affiliate/withdraw" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  উইথড্র
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  লগইন
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  রেজিস্টার
                </Link>
                <Link to="/affiliate/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  অ্যাফিলিয়েট লগইন
                </Link>
                <Link to="/affiliate/register" className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-100 transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  অ্যাফিলিয়েট রেজিস্টার
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              হোম
            </Link>
            <Link to="/course/web-development" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              ওয়েব ডেভেলপমেন্ট
            </Link>
            <Link to="/course/graphic-design" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              গ্রাফিক ডিজাইন
            </Link>
            <Link to="/course/digital-marketing" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
              ডিজিটাল মার্কেটিং
            </Link>
                {REPO_URL && (
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px"
                  >
                    রিপোজিটরি
                  </a>
                )}
                <Link to={isAdmin ? '/admin/dashboard' : '/admin/login'} className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  অ্যাডমিন
                </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  ড্যাশবোর্ড
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left text-gray-700 hover:text-red-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px"
                >
                  লগআউট
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  লগইন
                </Link>
                <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 hover:-translate-y-px">
                  রেজিস্টার
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;