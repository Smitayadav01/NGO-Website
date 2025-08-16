import React from 'react';
import { Shield, Users, Heart, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help Rescue Secure Life Charitable Trust is dedicated to providing compassionate care 
            and support to elderly individuals who face isolation, lack of family support, or need assistance 
            with daily living activities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img
              src="https://www.tribecacare.com/wp-content/uploads/2019/02/fun-activities-in-old-age-home.png"
              alt="Caring for elderly"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2019, our organization emerged from witnessing the growing need for elderly care 
              in the Greater Mumbai region. Under the visionary leadership of Seema Vishwakarma, we recognized that many senior citizens were living in isolation, 
              without proper support systems or family care.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              What started as a small community initiative has grown into a comprehensive charitable trust 
              that serves thousands of elderly individuals across Greater Mumbai, providing them with 
              dignity, care, and the companionship they deserve.
            </p>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 mb-6">
              <p className="text-amber-700 font-semibold">
                <strong>Founder & Director:</strong> Seema Vishwakarma
              </p>
              <p className="text-amber-600 text-sm mt-1">Leading with compassion and dedication since 2019</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
              <p className="text-emerald-700 font-semibold italic">
                "Every elderly person deserves to live their golden years with dignity, care, and love."
              </p>
              <p className="text-emerald-600 text-sm mt-2">- Our Founding Principle</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-emerald-100 p-4 rounded-full inline-block mb-4">
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Protection</h4>
            <p className="text-gray-600">Ensuring safety and security for vulnerable elderly individuals</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 p-4 rounded-full inline-block mb-4">
              <Users className="h-8 w-8 text-amber-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Community</h4>
            <p className="text-gray-600">Building connections and reducing isolation among seniors</p>
          </div>
          <div className="text-center">
            <div className="bg-emerald-100 p-4 rounded-full inline-block mb-4">
              <Heart className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Compassion</h4>
            <p className="text-gray-600">Providing care with empathy and understanding</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 p-4 rounded-full inline-block mb-4">
              <Award className="h-8 w-8 text-amber-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Excellence</h4>
            <p className="text-gray-600">Maintaining the highest standards in all our services</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;