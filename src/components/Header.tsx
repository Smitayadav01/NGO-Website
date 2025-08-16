import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-2 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Help Rescue Secure Life</h1>
              <p className="text-sm text-gray-600">Charitable Trust</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-emerald-500 transition duration-300">Home</a>
            <a href="#about" className="text-gray-700 hover:text-emerald-500 transition duration-300">About</a>
            <a href="#services" className="text-gray-700 hover:text-emerald-500 transition duration-300">Services</a>
            <a href="#impact" className="text-gray-700 hover:text-emerald-500 transition duration-300">Impact</a>
            <a href="#donate" className="text-gray-700 hover:text-emerald-500 transition duration-300">Donate</a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-500 transition duration-300">Contact</a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <a href="#donate" className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold">
              Donate Now
            </a>
            <a href="#contact" className="border-2 border-emerald-500 text-emerald-500 px-6 py-2 rounded-full hover:bg-emerald-500 hover:text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-center">
              Volunteer
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-emerald-500 transition duration-300">Home</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-500 transition duration-300">About</a>
              <a href="#services" className="text-gray-700 hover:text-emerald-500 transition duration-300">Services</a>
              <a href="#impact" className="text-gray-700 hover:text-emerald-500 transition duration-300">Impact</a>
              <a href="#donate" className="text-gray-700 hover:text-emerald-500 transition duration-300">Donate</a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-500 transition duration-300">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <a href="#donate" className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-center">
                  Donate Now
                </a>
                <a href="#contact" className="border-2 border-emerald-500 text-emerald-500 px-6 py-2 rounded-full hover:bg-emerald-500 hover:text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-center">
                  Volunteer
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;