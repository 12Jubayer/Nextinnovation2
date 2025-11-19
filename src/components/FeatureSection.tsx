import React from 'react';
import { Award, Users, Clock, Monitor } from 'lucide-react';

const features = [
  {
    icon: <Award className="h-10 w-10 text-blue-600" />,
    title: "প্রত্যয়িত কোর্স",
    description: "আমাদের সকল কোর্স শিল্প মানদণ্ড অনুযায়ী ডিজাইন করা হয়েছে এবং শিল্প বিশেষজ্ঞদের দ্বারা অনুমোদিত।"
  },
  {
    icon: <Users className="h-10 w-10 text-blue-600" />,
    title: "অভিজ্ঞ শিক্ষক",
    description: "আমাদের শিক্ষকরা তাদের ক্ষেত্রে বছরের পর বছর অভিজ্ঞতা সহ শিল্পের শীর্ষ বিশেষজ্ঞ।"
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-600" />,
    title: "নমনীয় শিক্ষা",
    description: "আপনার নিজের গতিতে শিখুন। আমাদের সকল কোর্স আপনি যেকোন সময় অ্যাক্সেস করতে পারেন।"
  },
  {
    icon: <Monitor className="h-10 w-10 text-blue-600" />,
    title: "হাতে-কলমে শিক্ষা",
    description: "প্রকল্প-ভিত্তিক শিক্ষা যা আপনাকে বাস্তব জীবনের সমস্যা সমাধানের জন্য প্রস্তুত করে।"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">আমাদের বিশেষত্ব</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            আমরা কেন অন্যান্য শিক্ষা প্ল্যাটফর্ম থেকে আলাদা এবং আপনার জন্য সেরা পছন্দ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-100 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;