import React from 'react';
import { ArrowRight, Users, Home, Utensils } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-20 min-h-screen flex items-center bg-gradient-to-br from-emerald-50 to-amber-50"
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/11009445.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}

      // https://thumbs.dreamstime.com/b/sacred-beautiful-peacock-feather-as-symbol-hindu-god-lord-krishna-sunset-krishna-janmashtami-sacred-beautiful-peacock-330829253.jpg
    >
      
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Bringing <span className="text-emerald-500">Hope</span> and 
              <span className="text-amber-500"> Care</span> to Our Elders
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We provide comprehensive support, companionship, and essential services to elderly individuals 
              who need care and connection. No one should face their golden years alone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#donate" className="bg-emerald-500 text-white px-8 py-4 rounded-full hover:bg-emerald-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center">
                Support Our Cause
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#about" className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-full hover:bg-amber-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-center">
                Learn More
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-emerald-100 p-3 rounded-full inline-block mb-2">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">2,500+</div>
                <div className="text-sm text-gray-600">Elders Helped</div>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 p-3 rounded-full inline-block mb-2">
                  <Home className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">10</div>
                <div className="text-sm text-gray-600">Care Centers</div>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 p-3 rounded-full inline-block mb-2">
                  <Utensils className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">50,000+</div>
                <div className="text-sm text-gray-600">Meals Served</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://give.do/blog/wp-content/uploads/2024/05/NGO-for-old-age-banner.jpg"
              alt="Elderly care and support"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
