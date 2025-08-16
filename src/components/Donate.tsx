import React, { useState } from 'react';
import { Heart, CreditCard, Smartphone, Building, Gift, Users, Home, Utensils } from 'lucide-react';

// Razorpay integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    pan: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = ['500', '1000', '2500', '5000', '10000'];

  const donationCategories = [
    {
      icon: Utensils,
      title: 'Feed an Elder',
      description: 'Provide nutritious meals for a month',
      amount: '₹1,500',
      color: 'emerald'
    },
    {
      icon: Home,
      title: 'Shelter Support',
      description: 'Help maintain our care centers',
      amount: '₹5,000',
      color: 'amber'
    },
    {
      icon: Heart,
      title: 'Healthcare Fund',
      description: 'Medical care and medicines',
      amount: '₹3,000',
      color: 'emerald'
    },
    {
      icon: Users,
      title: 'Companionship Program',
      description: 'Support social activities and visits',
      amount: '₹2,000',
      color: 'amber'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setDonorInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
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

    // Simulate donation process for demo
    setTimeout(async () => {
      try {
        // Send donation confirmation email
        const response = await fetch('http://localhost:3001/api/donation-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
          
          // Reset form
          setDonorInfo({ name: '', email: '', phone: '', pan: '' });
          setSelectedAmount('1000');
          setCustomAmount('');
        } else {
          alert('Failed to process donation. Please try again.');
        }
      } catch (error) {
        console.error('Error processing donation:', error);
        alert('Failed to process donation. Please try again.');
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  // Thank You Modal Component
  const ThankYouModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fadeInUp">
        <div className="bg-emerald-100 p-4 rounded-full inline-block mb-6">
          <Heart className="h-12 w-12 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Generosity!</h3>
        <p className="text-gray-600 mb-6">
          Your donation of ₹{customAmount || selectedAmount} has been successfully processed. 
          You will receive a tax-deductible receipt via email within 5 minutes.
        </p>
        <p className="text-emerald-600 font-semibold mb-6">
          Your contribution will directly help elderly individuals in Greater Mumbai receive the care and support they need. 
          Thank you for making a difference! 🙏
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
            to elderly individuals in Greater Mumbai who need it most. Every contribution matters.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Donation Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Ways to Help</h3>
            <div className="space-y-4">
              {donationCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex items-start space-x-4">
                      <div className={`bg-${category.color}-100 p-3 rounded-full`}>
                        <IconComponent className={`h-6 w-6 text-${category.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{category.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                        <p className={`text-${category.color}-600 font-bold`}>{category.amount}</p>
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
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                      donationType === 'one-time'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                      donationType === 'monthly'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount (₹)</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`py-3 px-4 rounded-lg font-semibold transition duration-300 ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                />
              </div>

              {/* Donor Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    placeholder="Your full name"
                    value={donorInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    placeholder="your.email@example.com"
                    value={donorInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    placeholder="+91-9876543210"
                    value={donorInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number (for 80G receipt)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                    placeholder="ABCDE1234F (Optional)"
                    value={donorInfo.pan}
                    onChange={(e) => handleInputChange('pan', e.target.value)}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 cursor-pointer transition duration-300">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-emerald-600" />
                      <span className="font-semibold">Credit/Debit Card</span>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 cursor-pointer transition duration-300">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-6 w-6 text-emerald-600" />
                      <span className="font-semibold">UPI/Digital Wallet</span>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 cursor-pointer transition duration-300">
                    <div className="flex items-center space-x-3">
                      <Building className="h-6 w-6 text-emerald-600" />
                      <span className="font-semibold">Net Banking</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Summary */}
              <div className="bg-emerald-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Donation Summary</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-800">
                    ₹{customAmount || selectedAmount}
                    {donationType === 'monthly' && '/month'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-800 capitalize">{donationType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax Benefit:</span>
                  <span className="font-semibold text-emerald-600">80G Eligible</span>
                </div>
              </div>

              {/* Donate Button */}
              <button 
                onClick={handleDonation}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center transition-all duration-300 ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg transform hover:scale-105'
                }`}
              >
                <Gift className="mr-2 h-6 w-6" />
                {isProcessing ? 'Processing...' : `Donate ₹${customAmount || selectedAmount} Now`}
              </button>

              <p className="text-gray-500 text-sm text-center mt-4">
                Your donation is secure and processed through Razorpay. You will receive a tax-deductible receipt via email.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Why Donate to Us?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-emerald-100 p-3 rounded-full inline-block mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">100% Transparency</h4>
              <p className="text-gray-600">Every rupee is accounted for and used directly for elderly care services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-amber-100 p-3 rounded-full inline-block mb-4">
                <Gift className="h-8 w-8 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Tax Benefits</h4>
              <p className="text-gray-600">Get 80G tax deduction benefits on your donations as per Indian tax laws.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-emerald-100 p-3 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Direct Impact</h4>
              <p className="text-gray-600">See the immediate difference your donation makes in elderly lives.</p>
            </div>
          </div>
          
          <div className="mt-8 bg-emerald-50 p-6 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">📧 Automated Receipt System</h4>
            <p className="text-emerald-700 text-sm">
              After successful payment, you'll automatically receive a detailed tax-deductible receipt 
              via email with all necessary information for your records and tax filing.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    {/* Thank You Modal */}
    {showThankYou && <ThankYouModal />}
    </>
  );
};

export default Donate;