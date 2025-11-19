export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  duration: string;
  students: number;
  lessons: number;
  imageUrl: string;
  instructor: string;
  instructorImage: string;
  features: string[];
  curriculum: {
    module: string;
    lessons: string[];
  }[];
}

export const courses: Course[] = [
  {
    id: 'web-development',
    title: 'ওয়েব ডেভেলপমেন্ট',
    description: 'HTML, CSS, JavaScript, React, Node.js সহ আধুনিক ওয়েব ডেভেলপমেন্ট শিখুন।',
    fullDescription: 'এই কোর্সে আপনি ওয়েব ডেভেলপমেন্টের মৌলিক বিষয় থেকে শুরু করে আধুনিক ফ্রন্টএন্ড এবং ব্যাকএন্ড প্রযুক্তি পর্যন্ত সবকিছু শিখবেন। HTML, CSS, JavaScript, React.js, Node.js, এবং MongoDB প্রযুক্তি ব্যবহার করে পূর্ণাঙ্গ ওয়েব অ্যাপ্লিকেশন তৈরি করতে শিখবেন।',
    price: 12000,
    duration: '৬ মাস',
    students: 450,
    lessons: 120,
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructor: 'জাহিদ হাসান',
    instructorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'HTML5, CSS3, JavaScript ফাউন্ডেশন',
      'React.js ফ্রন্টএন্ড ডেভেলপমেন্ট',
      'Node.js ব্যাকএন্ড ডেভেলপমেন্ট',
      'RESTful API ডিজাইন',
      'ডাটাবেস ইন্টিগ্রেশন (MongoDB)',
      'রেসপনসিভ ডিজাইন প্রিন্সিপাল',
      'প্রজেক্ট-ভিত্তিক শিক্ষা',
      'ক্যারিয়ার সাপোর্ট'
    ],
    curriculum: [
      {
        module: 'ফাউন্ডেশন',
        lessons: [
          'HTML5 ফাউন্ডেশন',
          'CSS3 স্টাইলিং এবং লেআউট',
          'রেসপনসিভ ডিজাইন বেসিকস',
          'জাভাস্ক্রিপ্ট ফাণ্ডামেন্টালস'
        ]
      },
      {
        module: 'ফ্রন্টএন্ড ডেভেলপমেন্ট',
        lessons: [
          'মডার্ন জাভাস্ক্রিপ্ট (ES6+)',
          'React ফাণ্ডামেন্টালস',
          'কম্পোনেন্ট-বেইজড ডেভেলপমেন্ট',
          'স্টেট ম্যানেজমেন্ট'
        ]
      },
      {
        module: 'ব্যাকএন্ড ডেভেলপমেন্ট',
        lessons: [
          'Node.js ইন্ট্রোডাকশন',
          'Express.js ফ্রেমওয়ার্ক',
          'RESTful API ডিজাইন',
          'মঙ্গোডিবি ডাটাবেস'
        ]
      },
      {
        module: 'প্রজেক্ট ডেভেলপমেন্ট',
        lessons: [
          'ফুল স্ট্যাক ওয়েব অ্যাপ্লিকেশন',
          'ডেপ্লয়মেন্ট স্ট্র্যাটেজি',
          'পারফরম্যান্স অপ্টিমাইজেশন',
          'সিকিউরিটি বেস্ট প্র্যাকটিস'
        ]
      }
    ]
  },
  {
    id: 'graphic-design',
    title: 'গ্রাফিক ডিজাইন',
    description: 'ফটোশপ, ইলাস্ট্রেটর, এবং ইনডিজাইন সহ গ্রাফিক ডিজাইনের সমস্ত দিক শিখুন।',
    fullDescription: 'এই কোর্সে আপনি গ্রাফিক ডিজাইনের মৌলিক নীতিমালা, বিভিন্ন ডিজাইন সফটওয়্যার (অ্যাডোবি ফটোশপ, ইলাস্ট্রেটর, ইনডিজাইন) এবং প্রফেশনাল ডিজাইন ওয়ার্কফ্লো শিখবেন। লোগো ডিজাইন, বিজ্ঞাপন, ব্র্যান্ডিং, ওয়েব ডিজাইন এবং প্রিন্ট ডিজাইন - সবকিছু শিখবেন।',
    price: 10000,
    duration: '৪ মাস',
    students: 380,
    lessons: 90,
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructor: 'সাবরিনা আহমেদ',
    instructorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'অ্যাডোবি ফটোশপ মাস্টারি',
      'অ্যাডোবি ইলাস্ট্রেটর ভেক্টর আর্ট',
      'ডিজাইন থিওরি এবং প্রিন্সিপাল',
      'লোগো ডিজাইন ও ব্র্যান্ডিং',
      'ইউআই/ইউএক্স ডিজাইন',
      'প্রিন্ট এবং ডিজিটাল মিডিয়া',
      'পোর্টফোলিও ডেভেলপমেন্ট',
      'ফ্রিল্যান্সিং গাইডলাইন'
    ],
    curriculum: [
      {
        module: 'ডিজাইন ফাণ্ডামেন্টালস',
        lessons: [
          'ডিজাইন থিওরি',
          'কালার থিওরি',
          'টাইপোগ্রাফি',
          'কম্পোজিশন ও লেআউট'
        ]
      },
      {
        module: 'অ্যাডোবি ফটোশপ',
        lessons: [
          'ফটোশপ ইন্টারফেস ও টুলস',
          'ফটো এডিটিং টেকনিক',
          'মানিপুলেশন ও রিটাচিং',
          'ডিজিটাল পেইন্টিং'
        ]
      },
      {
        module: 'অ্যাডোবি ইলাস্ট্রেটর',
        lessons: [
          'ভেক্টর গ্রাফিক্স ফাণ্ডামেন্টালস',
          'লোগো ডিজাইন',
          'ইলাস্ট্রেশন টেকনিক',
          'ব্র্যান্ডিং ডিজাইন'
        ]
      },
      {
        module: 'প্রফেশনাল প্রজেক্ট',
        lessons: [
          'ব্র্যান্ড আইডেনটিটি ডিজাইন',
          'প্রিন্ট ডিজাইন',
          'সোশ্যাল মিডিয়া গ্রাফিক্স',
          'পোর্টফোলিও ডেভেলপমেন্ট'
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'ডিজিটাল মার্কেটিং',
    description: 'সোশ্যাল মিডিয়া মার্কেটিং, SEO, কনটেন্ট মার্কেটিং, ইমেইল মার্কেটিং সহ সমস্ত ডিজিটাল মার্কেটিং চ্যানেল শিখুন।',
    fullDescription: 'এই কোর্সে আপনি ডিজিটাল মার্কেটিংয়ের সমস্ত দিক শিখবেন - সোশ্যাল মিডিয়া মার্কেটিং, সার্চ ইঞ্জিন অপটিমাইজেশন (SEO), কনটেন্ট মার্কেটিং, ইমেইল মার্কেটিং, পেইড অ্যাডভারটাইজিং এবং অ্যানালিটিক্স। ব্র্যান্ডের অনলাইন উপস্থিতি বাড়ানো থেকে শুরু করে কনভার্শন রেট বাড়ানো পর্যন্ত সবকিছু শিখবেন।',
    price: 9000,
    duration: '৩ মাস',
    students: 520,
    lessons: 75,
    imageUrl: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructor: 'তানভীর রহমান',
    instructorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'সম্পূর্ণ ডিজিটাল মার্কেটিং স্ট্র্যাটেজি',
      'সোশ্যাল মিডিয়া মার্কেটিং',
      'সার্চ ইঞ্জিন অপটিমাইজেশন (SEO)',
      'গুগল অ্যাডস ও ফেসবুক অ্যাডস',
      'কনটেন্ট মার্কেটিং',
      'ইমেইল মার্কেটিং',
      'অ্যানালিটিক্স ও ডাটা-ড্রিভেন মার্কেটিং',
      'ই-কমার্স মার্কেটিং'
    ],
    curriculum: [
      {
        module: 'ডিজিটাল মার্কেটিং ফাণ্ডামেন্টালস',
        lessons: [
          'ডিজিটাল মার্কেটিং ওভারভিউ',
          'অডিয়েন্স রিসার্চ',
          'মার্কেটিং ফানেল',
          'ব্র্যান্ড স্ট্র্যাটেজি'
        ]
      },
      {
        module: 'সোশ্যাল মিডিয়া মার্কেটিং',
        lessons: [
          'ফেসবুক মার্কেটিং',
          'ইনস্টাগ্রাম মার্কেটিং',
          'লিংকডইন মার্কেটিং',
          'সোশ্যাল মিডিয়া অ্যাড ক্যাম্পেইন'
        ]
      },
      {
        module: 'সার্চ ইঞ্জিন অপটিমাইজেশন',
        lessons: [
          'অন-পেজ SEO',
          'অফ-পেজ SEO',
          'কিওয়ার্ড রিসার্চ',
          'লিংক বিল্ডিং স্ট্র্যাটেজি'
        ]
      },
      {
        module: 'পেইড অ্যাডভারটাইজিং',
        lessons: [
          'গুগল অ্যাডস',
          'ফেসবুক ও ইনস্টাগ্রাম অ্যাডস',
          'রিমার্কেটিং',
          'কনভার্শন অপটিমাইজেশন'
        ]
      }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};