import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-500 p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Help Rescue Secure Life</h3>
                <p className="text-sm text-gray-400">Charitable Trust</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Dedicated to providing compassionate care and support to elderly individuals 
              who need assistance and companionship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300" target="_blank"
    rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300"  target="_blank"
    rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300" target="_blank"
    rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-emerald-400 transition duration-300">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-emerald-400 transition duration-300">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-emerald-400 transition duration-300">Our Services</a></li>
              <li><a href="#impact" className="text-gray-400 hover:text-emerald-400 transition duration-300">Impact</a></li>
              <li><a href="#donate" className="text-gray-400 hover:text-emerald-400 transition duration-300">Donate</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-emerald-400 transition duration-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300">Senior Living Centers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300">Healthcare Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300">Companionship Programs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300">Meal Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition duration-300">Emergency Helpline</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">+91-98191916886</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">hrslifecharitabletrust@gmail.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Emergency Helpline</h5>
              <p className="text-emerald-400 font-bold text-lg">+91-98191916886</p>
              <p className="text-gray-400 text-sm">Available 24/7</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Help Rescue Secure Life Charitable Trust. All rights reserved. 
            <span className="text-emerald-400"> Made with ❤️ for our elders.</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Founded by Seema Vishwakarma | Serving Greater Mumbai Region
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;