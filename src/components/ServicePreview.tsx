import React from 'react';
import { Home, Stethoscope, Users, Utensils, ArrowRight, Heart } from 'lucide-react';

const ServicePreview = () => {
  const featuredServices = [
    {
      icon: Home,
      title: "Senior Living Centers",
      description: "Safe, comfortable residential facilities with 24/7 care and support.",
      color: "emerald",
      stats: "10 Centers"
    },
    {
      icon: Stethoscope,
      title: "Healthcare Support",
      description: "Regular health checkups, medication management, and medical coordination.",
      color: "amber",
      stats: "2,500+ Served"
    },
    {
      icon: Users,
      title: "Companionship Programs",
      description: "Regular visits and social activities to combat loneliness and isolation.",
      color: "emerald",
      stats: "Daily Visits"
    },
    {
      icon: Utensils,
      title: "Meal Services",
      description: "Nutritious meals delivered to homes or served at our care centers.",
      color: "amber",
      stats: "50,000+ Meals"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="bg-emerald-500 p-4 rounded-full inline-block mb-6">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How We Help Our Elders</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the comprehensive care and support services we provide to ensure 
            every elderly individual lives with dignity, comfort, and companionship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-t-4 border-emerald-500"
              >
                <div className={`bg-${service.color}-100 p-4 rounded-full inline-block mb-4`}>
                  <IconComponent className={`h-8 w-8 text-${service.color}-600`} />
                </div>
                <div className={`text-${service.color}-600 font-bold text-sm mb-2`}>{service.stats}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <a 
                  href="#services" 
                  className={`inline-flex items-center text-${service.color}-600 font-semibold hover:text-${service.color}-700 hover:translate-x-2 transition-all duration-300 text-sm`}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a 
            href="#services" 
            className="bg-emerald-500 text-white px-8 py-4 rounded-full hover:bg-emerald-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold inline-flex items-center"
          >
            View All Our Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Join us in our mission to provide care, comfort, and companionship to elderly individuals 
            who need support. Every action counts in making their lives better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#donate" 
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
            >
              Donate Now
            </a>
            <a 
              href="#contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePreview;