//D:/Trident Log/Trident-FE/src/pages/GetQuote.tsx

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import LazyVideo from '../pages/LazyVideo';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    modeOfTransport: '',
    cargoType: '',      
    shipmentTerms: '', 
    grossWeight: '',
    volume: '',
    targetRate: '',
    targetDestinationTerms: '',
    companyName: '',
    additionalNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRadioChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Quote submitted:', data);
        setSubmitted(true);
      } else {
        alert(data.message || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Network error. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkboxStyle = "w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500 cursor-pointer";
  const labelStyle = "text-lg text-gray-700 cursor-pointer select-none";

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section - Video background only */}
      <section className="relative h-[78vh] flex items-center justify-start overflow-hidden mt-[150px]">
        <div className="absolute inset-0 overflow-hidden" style={{
          borderBottomRightRadius: '60px',
          borderBottomLeftRadius: '60px',
        }}>
          <LazyVideo
            src="/get_a_quote.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px',
            }}
          />
          
          {/* Gradient Overlay - Dark on left, transparent on right */}
          <div 
            className="absolute inset-0"
            style={{ 
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px',
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
            }} 
          />
        </div>
        
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '45px',
            background: '#38bdf8',
            borderBottomRightRadius: '60px',
            borderBottomLeftRadius: '60px',
            zIndex: 5,
          }}
        />
        
        {/* Title */}
        <div className="relative z-10 w-full" style={{ paddingLeft: '180px' }}>
          <h1 className="text-[72px] text-white font-bold leading-tight">
            Get a Quote
          </h1>
        </div>
      </section>

    {/* Title Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <h1 className="text-[72px] text-gray-900 leading-tight mb-4 font-bold">
            Quote Request
          </h1>
          <p className="text-[42px] text-sky-500 leading-tight font-bold">
            Delivering Possibilities, On Time
          </p>
          <div className="w-24 h-0.5 bg-blue-500 mt-6"></div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          
          {submitted ? (
            <div className="max-w-3xl mx-auto text-center py-20">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[42px] text-gray-900 font-bold mb-4">Thank You!</h2>
              <p className="text-[22px] text-gray-600 mb-8">Your quote request has been submitted successfully. Our team will get back to you within 1 business day.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-sky-500 text-white px-8 py-3 rounded-md hover:bg-sky-600 transition-all text-lg font-medium"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
              <div className="space-y-12">
                {/* Contact Information */}
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-3">Your Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-3">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-3">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
                
                {/* Origin & Destination */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[22px] text-gray-900 font-semibold mb-3">Origin <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.origin}
                      onChange={(e) => handleInputChange('origin', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="Enter origin city/port"
                    />
                  </div>
                  <div>
                    <label className="block text-[22px] text-gray-900 font-semibold mb-3">Destination <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="Enter destination city/port"
                    />
                  </div>
                </div>

                {/* Mode of Transport */}
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-4">Mode of Transport <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-6">
                    {['Air', 'Sea', 'Road', 'Multimodal'].map((mode, index) => (
                      <label key={mode} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="modeOfTransport"
                          required={index === 0}
                          checked={formData.modeOfTransport === mode}
                          onChange={() => handleRadioChange('modeOfTransport', mode)}
                          className="w-5 h-5 text-sky-500 border-gray-300 focus:ring-sky-500 cursor-pointer"
                        />
                        <span className={labelStyle}>{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cargo Type */}
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-4">Cargo Type <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-6">
                    {['General', 'Fragile', 'Perishable', 'DG', 'Oversized'].map((type, index) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="cargoType"
                          required={index === 0}
                          checked={formData.cargoType === type}
                          onChange={() => handleRadioChange('cargoType', type)}
                          className="w-5 h-5 text-sky-500 border-gray-300 focus:ring-sky-500 cursor-pointer"
                        />
                        <span className={labelStyle}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shipment Terms */}
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-4">Shipment Terms <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-6">
                    {['EXW', 'FOB', 'CIF', 'DDP', 'DDU'].map((term, index) => (
                      <label key={term} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shipmentTerms"
                          required={index === 0}
                          checked={formData.shipmentTerms === term}
                          onChange={() => handleRadioChange('shipmentTerms', term)}
                          className="w-5 h-5 text-sky-500 border-gray-300 focus:ring-sky-500 cursor-pointer"
                        />
                        <span className={labelStyle}>{term}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Weight & Volume */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[22px] text-gray-900 font-semibold mb-3">Gross Weight (KG) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.grossWeight}
                      onChange={(e) => handleInputChange('grossWeight', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="Enter gross weight"
                    />
                  </div>
                  <div>
                    <label className="block text-[22px] text-gray-900 font-semibold mb-3">Volume (CBM) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.volume}
                      onChange={(e) => handleInputChange('volume', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="Enter volume"
                    />
                  </div>
                </div>

                {/* Target Rate & Terms */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[22px] text-gray-900 font-semibold mb-3">Target Rate (Optional)</label>
                    <input
                      type="text"
                      value={formData.targetRate}
                      onChange={(e) => handleInputChange('targetRate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="Enter target rate"
                    />
                  </div>
                  <div>
                    <label className="block text-[22px] text-gray-900 font-semibold mb-3">Target Destination Terms</label>
                    <input
                      type="text"
                      value={formData.targetDestinationTerms}
                      onChange={(e) => handleInputChange('targetDestinationTerms', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      placeholder="Enter destination terms"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-3">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-[22px] text-gray-900 font-semibold mb-3">Additional Notes or Instructions</label>
                  <textarea
                    rows={5}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
                    placeholder="Enter any additional information..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-sky-500 text-white px-12 py-4 rounded-md hover:bg-sky-600 transition-all text-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    {/* Copyright */}
      <div className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default GetQuote;
