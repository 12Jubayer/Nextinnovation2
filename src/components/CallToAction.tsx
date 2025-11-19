import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">আপনার ক্যারিয়ার শুরু করুন আজই</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          আমাদের দক্ষতা উন্নয়ন কোর্সগুলো আপনাকে আধুনিক শ্রমবাজারের জন্য প্রস্তুত করবে। আজই শুরু করুন এবং আপনার ভবিষ্যত গড়ুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="btn-outline">
            নিবন্ধন করুন
          </Link>
          <Link to="/login" className="btn-secondary">
            লগইন করুন
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;