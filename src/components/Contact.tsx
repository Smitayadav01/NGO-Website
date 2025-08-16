import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowThankYou(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        });
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('Failed to send message. Please check your connection and try again.');
    }

    setIsSubmitting(false);
  };

  const ThankYouModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fadeInUp">
        <div className="bg-emerald-100 p-4 rounded-full inline-block mb-6">
          <Send className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Reaching Out!</h3>
        <p className="text-gray-600 mb-6">
          We have received your message and will get back to you within 24 hours. Your interest in supporting our cause means a lot to us.
        </p>
        <p className="text-emerald-600 font-semibold mb-6">
          For urgent matters, please call our emergency helpline: +91-98191916886
        </p>
        <button
          onClick={() => setShowThankYou(false)}
          className="bg-emerald-500 text-white px-8 py-3 rounded-full hover:bg-emerald-600 transition duration-300 font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our services or want to help? We'd love to hear from you. Reach out to us and join our mission to support elderly care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Main Office', content: 'Help Rescue Secure Life Charitable Trust\nGreater Mumbai Region, Mumbai\nMaharashtra 400001\nIndia', bg: 'bg-emerald-100', color: 'text-emerald-600' },
                  { icon: Phone, title: 'Phone Numbers', content: 'Emergency: +91-98191916886\nOffice: +91-98191916886\nVolunteer: +91-98191916886', bg: 'bg-amber-100', color: 'text-amber-600' },
                  { icon: Mail, title: 'Email', content: 'General: xxx@gmail.com\nEmergency: xxx@gmail.com\nDonations: xxx@gmail.com', bg: 'bg-emerald-100', color: 'text-emerald-600' },
                  { icon: Clock, title: 'Office Hours', content: 'Mon-Fri: x:00 AM - x:00 PM\nSat: x:00 AM - x:00 PM\nSun: Emergency only\n24/7 Emergency Helpline Available', bg: 'bg-amber-100', color: 'text-amber-600' }
                ].map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className={`${info.bg} p-3 rounded-full`}>
                        <Icon className={`h-6 w-6 ${info.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{info.title}</h4>
                        <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {['firstName', 'lastName'].map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field === 'firstName' ? 'First Name' : 'Last Name'}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                        placeholder={`Your ${field === 'firstName' ? 'first' : 'last'} name`}
                        value={formData[field as 'firstName' | 'lastName']}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>

                {['email', 'phone'].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <input
                      type={field}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                      placeholder={field === 'email' ? 'your.email@example.com' : '+91-9876543210'}
                      value={formData[field as 'email' | 'phone']}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                  >
                    <option>General Inquiry</option>
                    <option>Volunteer Opportunity</option>
                    <option>Donation Information</option>
                    <option>Service Request</option>
                    <option>Emergency Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    placeholder="Please describe how we can help you or how you'd like to support our cause..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showThankYou && <ThankYouModal />}
    </>
  );
};

export default Contact;
