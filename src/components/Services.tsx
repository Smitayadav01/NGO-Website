import React from 'react';
import { Home, Stethoscope, Users, Utensils, Phone, Car, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Senior Living Centers",
      description: "Safe, comfortable residential facilities with 24/7 care and support for elderly individuals without family support.",
      color: "emerald"
    },
    {
      icon: Stethoscope,
      title: "Healthcare Support",
      description: "Regular health checkups, medication management, and coordination with healthcare providers.",
      color: "amber"
    },
    {
      icon: Users,
      title: "Companionship Programs",
      description: "Regular visits and social activities to combat loneliness and provide emotional support.",
      color: "emerald"
    },
    {
      icon: Utensils,
      title: "Meal Services",
      description: "Nutritious meals delivered to homes or served at our centers, ensuring proper nutrition.",
      color: "amber"
    },
    {
      icon: Phone,
      title: "Emergency Helpline",
      description: "24/7 helpline for emergencies and urgent assistance needs of elderly community members.",
      color: "emerald"
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Safe transportation services for medical appointments, shopping, and social activities.",
      color: "amber"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive support services designed to meet the unique needs of elderly 
            individuals, ensuring their safety, health, and happiness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
              >
                <div className={`bg-${service.color}-100 p-4 rounded-full inline-block mb-6`}>
                  <IconComponent className={`h-8 w-8 text-${service.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <a href="#contact" className={`mt-6 inline-flex items-center text-${service.color}-600 font-semibold hover:text-${service.color}-700 hover:translate-x-2 transition-all duration-300`}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
          <p className="text-emerald-100 mb-6">
            If you or someone you know needs urgent assistance, don't hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Call Emergency Line: +91-9819196886
            </a>
            <a href="#contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Request Home Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;