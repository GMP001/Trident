// D:/Trident Log/Trident-FE/src/pages/GetQuote.tsx

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import LazyVideo from '../pages/LazyVideo';
import { quoteAPI, contentAPI } from '../services/api';
import { getMediaUrl } from '../utils/urlHelper';

// ============================================================
// Component
// ============================================================
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

    const [heroMedia, setHeroMedia] = useState('/get_a_quote.mp4');

    useEffect(() => {
        const loadHero = async () => {
            try {
                const response = await contentAPI.getPage('get-quote');
                if (response.success && response.page?.hero?.media) {
                    setHeroMedia(response.page.hero.media);
                }
            } catch (err) {
                console.error('Failed to load quote hero:', err);
            }
        };
        loadHero();
    }, []);

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
            const payload = {
                ...formData,
                modeOfTransport: formData.modeOfTransport ? [formData.modeOfTransport] : [],
                cargoType: formData.cargoType ? [formData.cargoType] : [],
                shipmentTerms: formData.shipmentTerms ? [formData.shipmentTerms] : [],
            };

            const response = await quoteAPI.submit(payload);

            if (response.success) {
                console.log('Quote submitted successfully');
                setSubmitted(true);
            } else {
                alert(response.message || 'Failed to submit. Please try again.');
            }
        } catch (error: any) {
            console.error('Error submitting quote:', error);
            alert(error.message || 'Network error. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const labelStyle = 'text-base sm:text-lg text-gray-700 cursor-pointer select-none';

    // ============================================================
    // Success State
    // ============================================================
    if (submitted) {
        return (
            <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
                <Navbar />
                <section className="relative h-[60vh] sm:h-[70vh] md:h-[78vh] flex items-center justify-start overflow-hidden mt-16 md:mt-[150px]">
                    <div className="absolute inset-0 overflow-hidden bg-black" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                        {heroMedia?.endsWith('.mp4') || heroMedia?.endsWith('.webm') ? (
                            <LazyVideo
                                src={getMediaUrl(heroMedia)}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                            />
                        ) : (
                            <img
                                src={getMediaUrl(heroMedia)}
                                alt="Get a Quote Hero"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                            />
                        )}
                        <div className="absolute inset-0" style={{
                            borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px',
                            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
                        }} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                        style={{ height: '45px', background: '#4c6860', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />
                    <div className="relative z-10 w-full px-5 sm:px-8 md:pl-[180px] md:pr-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-white font-bold leading-tight">
                            Get a Quote
                        </h1>
                    </div>
                </section>
                <section className="py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                    <div className="max-w-3xl mx-auto text-center py-12 md:py-20">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                            <svg className="w-10 h-10 md:w-12 md:h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-gray-900 font-bold mb-4">
                            Thank You!
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-600 mb-8">
                            Your quote request has been submitted successfully. Our team will get back to you within 1 business day.
                        </p>
                        <button onClick={() => setSubmitted(false)}
                            className="bg-[#4c6860] text-white px-6 md:px-8 py-3 rounded-md hover:bg-[#006666] transition-all text-base md:text-lg font-medium">
                            Submit Another Request
                        </button>
                    </div>
                </section>
                <Footer />

                <div className="bg-gray-900">
                  <div className="w-full h-px bg-gray-700"></div>
                </div>

                <div className="bg-gray-900 text-white py-6 text-center px-4">
                  <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
                </div>

                <div className="bg-gray-900">
                  <div className="w-full h-px bg-gray-600"></div>
                </div>

                <div className="bg-gray-900 text-gray-500 py-4 text-center px-4">
                  <p className="text-xs">Powered by - ARK PANORAMA LAB</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // Form State
    // ============================================================
    return (
        <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[78vh] flex items-center justify-start overflow-hidden mt-16 md:mt-[150px]">
                <div className="absolute inset-0 overflow-hidden bg-black" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                    {heroMedia?.endsWith('.mp4') || heroMedia?.endsWith('.webm') ? (
                        <LazyVideo
                            src={getMediaUrl(heroMedia)}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                        />
                    ) : (
                        <img
                            src={getMediaUrl(heroMedia)}
                            alt="Get a Quote Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                        />
                    )}
                    <div className="absolute inset-0" style={{
                        borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px',
                        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
                    }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{ height: '45px', background: '#4c6860', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />
                <div className="relative z-10 w-full px-5 sm:px-8 md:pl-[180px] md:pr-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-white font-bold leading-tight">
                        Get a Quote
                    </h1>
                </div>
            </section>

            {/* Title */}
            <section className="py-10 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-gray-900 leading-tight mb-3 md:mb-4 font-bold">
                        Quote Request
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] text-[#4c6860] leading-tight font-bold">
                        Delivering Possibilities, On Time
                    </p>
                    <div className="w-24 h-0.5 bg-[#4c6860] mt-5 md:mt-6"></div>
                </div>
            </section>

            {/* Quote Form */}
            <section className="py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
                        <div className="space-y-10 md:space-y-12">

                            {/* Contact Information */}
                            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Your Name <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" required value={formData.name} onChange={e => handleInputChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter your full name" />
                                </div>
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input type="email" required value={formData.email} onChange={e => handleInputChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter your email address" />
                                </div>
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input type="tel" required value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter your phone number" />
                                </div>
                            </div>

                            {/* Origin & Destination */}
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Origin <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" required value={formData.origin} onChange={e => handleInputChange('origin', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter origin city/port" />
                                </div>
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Destination <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" required value={formData.destination} onChange={e => handleInputChange('destination', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter destination city/port" />
                                </div>
                            </div>

                            {/* Mode of Transport */}
                            <div>
                                <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-3 md:mb-4">
                                    Mode of Transport <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-4 md:gap-6">
                                    {['Air', 'Sea', 'Road', 'Multimodal'].map(mode => (
                                        <label key={mode} className="flex items-center gap-2">
                                            <input type="radio" name="modeOfTransport"
                                                checked={formData.modeOfTransport === mode}
                                                onChange={() => handleRadioChange('modeOfTransport', mode)}
                                                className="w-5 h-5 text-[#4c6860] border-gray-300 focus:ring-[#4c6860] cursor-pointer" />
                                            <span className={labelStyle}>{mode}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Cargo Type */}
                            <div>
                                <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-3 md:mb-4">
                                    Cargo Type <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-4 md:gap-6">
                                    {['General', 'Fragile', 'Perishable', 'DG', 'Oversized'].map(type => (
                                        <label key={type} className="flex items-center gap-2">
                                            <input type="radio" name="cargoType"
                                                checked={formData.cargoType === type}
                                                onChange={() => handleRadioChange('cargoType', type)}
                                                className="w-5 h-5 text-[#4c6860] border-gray-300 focus:ring-[#4c6860] cursor-pointer" />
                                            <span className={labelStyle}>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Shipment Terms */}
                            <div>
                                <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-3 md:mb-4">
                                    Shipment Terms <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-4 md:gap-6">
                                    {['EXW', 'FOB', 'CIF', 'DDP', 'DDU'].map(term => (
                                        <label key={term} className="flex items-center gap-2">
                                            <input type="radio" name="shipmentTerms"
                                                checked={formData.shipmentTerms === term}
                                                onChange={() => handleRadioChange('shipmentTerms', term)}
                                                className="w-5 h-5 text-[#4c6860] border-gray-300 focus:ring-[#4c6860] cursor-pointer" />
                                            <span className={labelStyle}>{term}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Weight & Volume */}
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Gross Weight (KG) <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" required value={formData.grossWeight} onChange={e => handleInputChange('grossWeight', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter gross weight" />
                                </div>
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Volume (CBM) <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" required value={formData.volume} onChange={e => handleInputChange('volume', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter volume" />
                                </div>
                            </div>

                            {/* Target Rate & Terms */}
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Target Rate (Optional)
                                    </label>
                                    <input type="text" value={formData.targetRate} onChange={e => handleInputChange('targetRate', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter target rate" />
                                </div>
                                <div>
                                    <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                        Target Destination Terms
                                    </label>
                                    <input type="text" value={formData.targetDestinationTerms} onChange={e => handleInputChange('targetDestinationTerms', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                        placeholder="Enter destination terms" />
                                </div>
                            </div>

                            {/* Company Name */}
                            <div>
                                <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                    Company Name
                                </label>
                                <input type="text" value={formData.companyName} onChange={e => handleInputChange('companyName', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860]"
                                    placeholder="Enter your company name" />
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 font-semibold mb-2 md:mb-3">
                                    Additional Notes or Instructions
                                </label>
                                <textarea rows={5} value={formData.additionalNotes} onChange={e => handleInputChange('additionalNotes', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base md:text-lg focus:outline-none focus:border-[#4c6860] focus:ring-1 focus:ring-[#4c6860] resize-none"
                                    placeholder="Enter any additional information..." />
                            </div>

                            {/* Submit */}
                            <div className="text-center">
                                <button type="submit" disabled={isSubmitting}
                                    className="bg-[#4c6860] text-white px-8 md:px-12 py-3 md:py-4 rounded-md hover:bg-[#006666] transition-all text-base md:text-lg lg:text-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto">
                                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />

            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-700"></div>
            </div>

            <div className="bg-gray-900 text-white py-6 text-center px-4">
              <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
            </div>

            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-600"></div>
            </div>

            <div className="bg-gray-900 text-gray-500 py-4 text-center px-4">
              <p className="text-xs">Powered by - ARK PANORAMA LAB</p>
            </div>
        </div>
    );
};

export default GetQuote;
