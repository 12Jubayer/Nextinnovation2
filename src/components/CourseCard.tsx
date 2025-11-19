import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  students: number;
  lessons: number;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  price,
  duration,
  students,
  lessons,
  imageUrl
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg font-bold">
          ৳{price}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap justify-between items-center mb-4 text-sm text-gray-500">
          <div className="flex items-center mr-4 mb-2">
            <Clock size={16} className="mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <Users size={16} className="mr-1" />
            <span>{students} জন শিক্ষার্থী</span>
          </div>
          <div className="flex items-center mb-2">
            <BookOpen size={16} className="mr-1" />
            <span>{lessons} টি লেসন</span>
          </div>
        </div>
        
        <Link 
          to={`/course/${id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md font-medium 
          transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          বিস্তারিত দেখুন
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;