import React, { useState } from 'react';
import { Heart, CreditCard, Smartphone, Building, Gift, Users, Home, Utensils } from 'lucide-react';

// Razorpay integration placeholder
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', phone: '', pan: '' });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = ['500', '1000', '2500', '5000', '10000'];

  const donationCategories = [
    { icon: Utensils, title: 'Feed an Elder', description: 'Provide nutritious meals for a month', amount: '₹1,500', bg: 'bg-emerald-100', text: 'text-emerald-600' },
    { icon: Home, title: 'Shelter Support', description: 'Help maintain our care centers', amount: '₹5,000', bg: 'bg-amber-100', text: 'text-amber-600' },
    { icon: Heart, title: 'Healthcare Fund', description: 'Medical care and medicines', amount: '₹3,000', bg: 'bg-emerald-100', text: 'text-emerald-600' },
    { icon: Users, title: 'Companionship Program', description: 'Support social activities and visits', amount: '₹2,000', bg: 'bg-amber-100', text: 'text-amber-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  const initializeRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonation = async () => {
    const amount = customAmount || selectedAmount;

    // Validation
    if (!donorInfo.name || !donorInfo.email || !donorInfo.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }
    if (!amount || parseInt(amount) < 100) {
      alert('Minimum donation amount is ₹100');
      return;
    }

    setIsProcessing(true);

    // Simulate Razorpay integration
    const scriptLoaded = await initializeRazorpay();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Check your connection.');
      setIsProcessing(false);
      return;
    }

    // For demo, we simulate donation instead of actual Razorpay checkout
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donation-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: donorInfo.name,
          donorEmail: donorInfo.email,
          amount: parseInt(amount),
          donationType,
          phone: donorInfo.phone,
          pan: donorInfo.pan
        })
      });

      if (response.ok) {
        setShowThankYou(true);
        setDonorInfo({ name: '', email: '', phone: '', pan: '' });
        setSelectedAmount('1000');
        setCustomAmount('');
      } else {
        alert('Failed to process donation. Please try again.');
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('Failed to process donation. Please try again.');
    }

    setIsProcessing(false);
  };

  const ThankYouModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fadeInUp">
        <div className="bg-emerald-100 p-4 rounded-full inline-block mb-6">
          <Heart className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Generosity!</h3>
        <p className="text-gray-600 mb-6">
          Your donation of ₹{customAmount || selectedAmount} has been successfully processed. 
          You will receive a receipt via email shortly.
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
      <section id="donate" className="py-20 bg-gradient-to-br from-emerald-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-emerald-500 p-4 rounded-full inline-block mb-6">
              <Heart className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Make a Difference Today</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your generous donation helps us provide essential care, companionship, and support 
              to elderly individuals in Greater Mumbai.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Donation Categories */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Ways to Help</h3>
              <div className="space-y-4">
                {donationCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                      <div className="flex items-start space-x-4">
                        <div className={`${category.bg} p-3 rounded-full`}>
                          <Icon className={`h-6 w-6 ${category.text}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{category.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                          <p className="font-bold text-gray-800">{category.amount}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Donation</h3>

                {/* Donation Type */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Donation Type</label>
                  <div className="flex space-x-4">
                    {['one-time', 'monthly'].map(type => (
                      <button
                        key={type}
                        onClick={() => setDonationType(type)}
                        className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                          donationType === type ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type === 'one-time' ? 'One-time' : 'Monthly'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount (₹)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                    {predefinedAmounts.map(amount => (
                      <button
                        key={amount}
                        onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                        className={`py-3 px-4 rounded-lg font-semibold transition duration-300 ${
                          selectedAmount === amount && !customAmount ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                  />
                </div>

                {/* Donor Information */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text" placeholder="Full Name" value={donorInfo.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="email" placeholder="Email" value={donorInfo.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="tel" placeholder="Phone" value={donorInfo.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="text" placeholder="PAN (Optional)" value={donorInfo.pan}
                    onChange={e => handleInputChange('pan', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Donate Button */}
                <button
                  onClick={handleDonation}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center transition-all duration-300 ${
                    isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <Gift className="mr-2 h-6 w-6" />
                  {isProcessing ? 'Processing...' : `Donate ₹${customAmount || selectedAmount} Now`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showThankYou && <ThankYouModal />}
    </>
  );
};

export default Donate;
