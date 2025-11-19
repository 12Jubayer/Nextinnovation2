import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "সাইফুল ইসলাম",
    role: "ওয়েব ডেভেলপার",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "কানেক্ট আইটি আমার জীবন পরিবর্তন করেছে। ওয়েব ডেভেলপমেন্ট কোর্স শেষ করার পর, আমি একটি ভাল কোম্পানিতে চাকরি পেয়েছি।",
    rating: 5
  },
  {
    id: 2,
    name: "নাজমুল হক",
    role: "গ্রাফিক ডিজাইনার",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "গ্রাফিক ডিজাইন কোর্সের মাধ্যমে আমি নতুন দক্ষতা অর্জন করেছি। এখন আমি ফ্রিল্যান্সার হিসেবে কাজ করছি এবং ভাল আয় করছি।",
    rating: 5
  },
  {
    id: 3,
    name: "সাবরিনা আক্তার",
    role: "ডিজিটাল মার্কেটার",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    quote: "ডিজিটাল মার্কেটিং কোর্স করার পর আমি অনলাইনে মার্কেটিং করতে সক্ষম হয়েছি এবং এখন একটি প্রতিষ্ঠিত কোম্পানিতে কাজ করছি।",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের শিক্ষার্থীদের মতামত</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            আমাদের শিক্ষার্থীরা কিভাবে কানেক্ট আইটি-র কোর্সগুলো তাদের ক্যারিয়ার গড়তে সাহায্য করেছে
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;