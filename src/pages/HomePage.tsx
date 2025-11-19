import React from 'react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import FeatureSection from '../components/FeatureSection';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import { courses } from '../data/coursesData';

const HomePage = () => {
  return (
    <div>
      <Hero />
      
      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের জনপ্রিয় কোর্সসমূহ</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              আমাদের বিশেষজ্ঞ শিক্ষকদের সাথে দক্ষতা অর্জন করুন এবং আপনার ক্যারিয়ার উন্নত করুন
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
                duration={course.duration}
                students={course.students}
                lessons={course.lessons}
                imageUrl={course.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
      
      <FeatureSection />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;