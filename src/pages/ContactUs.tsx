import { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import LazyVideo from '../pages/LazyVideo';

interface ContactContent {
  isActive: boolean;
  hero: { media?: string };
  intro: { title: string; description: string };
  consultation: {
    title: string;
    description: string;
    subDescription: string;
    coverTitle: string;
    coverPoints: string[];
    closingText: string;
  };
}

const defaultContent: ContactContent = {
  isActive: true,
  hero: { media: "/contact_us_2.mp4" },
  intro: {
    title: "Let's connect. We're always ready to move.",
    description: "Whether you need to request a quote, resolve a document issue, or simply ask a question about freight, the Trident team is here to help — fast, clearly, and 24/7."
  },
  consultation: {
    title: "Book Your 30-Minute Freight Consultation with Trident",
    description: "Are you looking to streamline your logistics, resolve a shipment issue, or explore competitive freight solutions for your business?",
    subDescription: "In this 30-minute consultation, you'll speak directly with a logistics expert from Trident Limited, one of Bangladesh's fastest-growing freight forwarding companies with over 30 years of industry experience.",
    coverTitle: "What We'll Cover (based on your needs):",
    coverPoints: [
      "Air and sea import/export planning",
      "Rate negotiations and booking guidance",
      "Customs clearance procedures (IGM, ASYCUDA, AMS, etc.)",
      "Documentation and compliance support",
      "Shipment tracking and problem resolution"
    ],
    closingText: "Whether you're a first-time shipper or managing high-volume global trade lanes, we're here to support you with efficient, transparent, and tailored logistics solutions."
  }
};

const ContactUs = () => {
  const [content, setContent] = useState<ContactContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [topic, setTopic] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const currentMonth = 'July 2026';
  const daysInMonth = 31;
  const startDay = 3;

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  useEffect(() => { window.scrollTo(0, 0); loadContent(); loadBookedSlots(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('contact');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          intro: { ...defaultContent.intro, ...(pc.intro || {}) },
          consultation: { ...defaultContent.consultation, ...(pc.consultation || {}), coverPoints: pc.consultation?.coverPoints || defaultContent.consultation.coverPoints }
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const loadBookedSlots = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact/booked-slots');
      const data = await response.json();
      setBookedSlots(data.bookedSlots || []);
    } catch (err) { console.error('Error loading booked slots:', err); }
  };

  const isDateBooked = (day: number) => {
    const dateStr = `${currentMonth.split(' ')[0]} ${day}, ${currentMonth.split(' ')[1]}`;
    return bookedSlots.some(slot => slot.date === dateStr);
  };

  const gm = (p: string) => {
    if (!p) return '';
    if (p.startsWith('http')) return p;
    if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`;
    return p;
  };

  const handleDateClick = (day: number) => {
    if (!isDateBooked(day)) {
      setSelectedDate(day);
      setSelectedTime(null);
    }
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !name || !email || !phone) {
      alert('Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    setIsSubmitting(true);
    const dateStr = `${currentMonth.split(' ')[0]} ${selectedDate}, ${currentMonth.split(' ')[1]}`;

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, companyName,
          date: dateStr,
          time: selectedTime,
          topic,
          additionalNotes,
        }),
      });

      if (response.ok) {
        setBooked(true);
        loadBookedSlots(); // Refresh booked slots
        setTimeout(() => setBooked(false), 5000);
        // Reset form
        setName(''); setEmail(''); setPhone(''); setCompanyName('');
        setTopic(''); setAdditionalNotes('');
        setSelectedDate(null); setSelectedTime(null);
      } else {
        alert('Failed to book. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[78vh] flex items-center justify-end overflow-hidden mt-[150px]">
        <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          <LazyVideo
            src={gm(content.hero.media || '/contact_us_2.mp4')}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
          />
          
          {/* Gradient Overlay - Dark on right, transparent on left */}
          <div 
            className="absolute inset-0"
            style={{ 
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px',
              background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
            }} 
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '45px', background: '#38bdf8', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />
        
        <div className="relative z-10 w-full text-right" style={{ paddingRight: '180px' }}>
          <h1 className="text-[72px] text-white font-bold leading-tight">Contact Us</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <h1 className="text-[58px] text-gray-900 leading-tight mb-4 font-bold">{content.intro.title}</h1>
          <div className="w-full h-[1px] bg-gray-300 my-8"></div>
          <p className="text-[32px] text-sky-900 leading-tight font-bold">{content.intro.description}</p>
        </div>
      </section>

      {/* Consultation & Calendar Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              
              {/* Left Side - Consultation Info + Form */}
              <div className="p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.consultation.title}</h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">{content.consultation.description}</p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{content.consultation.subDescription}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{content.consultation.coverTitle}</h3>
                <ul className="space-y-2 text-lg text-gray-600 leading-relaxed mb-6">
                  {(content.consultation.coverPoints || []).map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{content.consultation.closingText}</p>

                {/* Contact Form Fields */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                      <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500" placeholder="+8801XXXXXXXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500" placeholder="Your company" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Topic</label>
                      <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500">
                        <option value="">Select a topic</option>
                        <option value="Air Freight">Air Freight</option>
                        <option value="Sea Freight">Sea Freight</option>
                        <option value="Customs Clearance">Customs Clearance</option>
                        <option value="Warehousing">Warehousing</option>
                        <option value="Supply Chain">Supply Chain</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                      <textarea rows={3} value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 resize-none" placeholder="Any specific requirements..." />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Calendar */}
              <div className="p-10">
                <h3 className="text-[26px] font-bold text-gray-900 mb-6">Select a Date & Time</h3>
                <p className="text-xl font-semibold text-gray-800 mb-6">{currentMonth}</p>
                
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 mb-8">
                  {Array.from({ length: startDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const isBooked = isDateBooked(day);
                    return (
                      <button key={day} onClick={() => handleDateClick(day)} disabled={isBooked}
                        className={`aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all
                          ${isBooked ? 'bg-sky-500 text-white cursor-not-allowed' : 
                            selectedDate === day ? 'bg-sky-600 text-white' : 'hover:bg-sky-100 text-gray-700'}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mb-6">
                    <p className="text-lg font-semibold text-gray-800 mb-3">
                      Available Times for {selectedDate} {currentMonth.split(' ')[0]}:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(time => (
                        <button key={time} onClick={() => handleTimeClick(time)}
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-all
                            ${selectedTime === time ? 'bg-sky-600 text-white' : 'border border-gray-300 text-gray-700 hover:border-sky-500 hover:text-sky-600'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <button onClick={handleBookAppointment} disabled={isSubmitting}
                    className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition-all text-lg font-semibold mb-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Booking...' : 'Fix Appointment'}
                  </button>
                )}

                {booked && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
                    ✅ Consultation booked successfully! We'll confirm shortly.
                  </div>
                )}

                <div className="text-center text-sm text-gray-500 mt-4">
                  <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                  </svg>
                  Time Zone: Asia/Dhaka (GMT+6)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <div className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default ContactUs;
