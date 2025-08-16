import React from 'react';
import { TrendingUp, Users, Home, Heart } from 'lucide-react';

const Impact = () => {
  const stats = [
    {
      number: '2,847',
      label: 'Elderly Lives Touched',
      icon: Users,
      color: 'emerald'
    },
    {
      number: '10',
      label: 'Care Centers Operating',
      icon: Home,
      color: 'amber'
    },
    {
      number: '50,000+',
      label: 'Meals Served This Year',
      icon: Heart,
      color: 'emerald'
    },
    {
      number: '98%',
      label: 'Satisfaction Rate',
      icon: TrendingUp,
      color: 'amber'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the difference we're making in the lives of elderly individuals and their families 
            through our dedicated services and community support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`bg-${stat.color}-100 p-4 rounded-full inline-block mb-4`}>
                  <IconComponent className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Success Stories</h3>
            <div className="space-y-6">
              <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                <p className="text-gray-700 italic mb-4">
                  "Thanks to Help Rescue Secure Life, my grandmother found a new family. 
                  She's no longer lonely and receives the medical care she needs. The staff 
                  treats her with such love and respect."
                </p>
                <p className="text-emerald-600 font-semibold">- Rajesh Kumar, Mumbai</p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                <p className="text-gray-700 italic mb-4">
                  "I was living alone after my husband passed away. The companionship program 
                  brought joy back into my life. I now have friends who visit me regularly 
                  and make sure I'm well taken care of."
                </p>
                <p className="text-amber-600 font-semibold">- Mrs. Sharma, 78 years old</p>
              </div>
            </div>
          </div>
          
          <div>
            <img
              src="https://images.pexels.com/photos/7551661/pexels-photo-7551661.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Happy elderly residents"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Be Part of Our Impact</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Your support helps us continue making a difference in the lives of elderly individuals 
            who need care and companionship. Every donation, no matter the size, creates lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#donate" className="bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Make a Donation
            </a>
            <a href="#contact" className="bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;