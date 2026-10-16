// D:/Trident Log/Trident-FE/src/pages/ContactUs.tsx

import { useState, useEffect } from 'react';
import { contentAPI, contactAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import LazyVideo from '../pages/LazyVideo';
import { getMediaUrl } from '../utils/urlHelper';

// ============================================================
// Types
// ============================================================
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

// ============================================================
// Default Content (Fallback) — unchanged
// ============================================================
const defaultContent: ContactContent = {
    isActive: true,
    hero: { media: '/Sales_talking_to_Customer.jpg' },
    intro: {
        title: "Let's connect. We're always ready to move.",
        description: "Whether you need to request a quote, resolve a document issue, or simply ask a question about freight, the Trident team is here to help — fast, clearly, and 24/7."
    },
    consultation: {
        title: 'Book Your 30-Minute Freight Consultation with Trident',
        description: 'Are you looking to streamline your logistics, resolve a shipment issue, or explore competitive freight solutions for your business?',
        subDescription: "In this 30-minute consultation, you'll speak directly with a logistics expert from Trident Limited, one of Bangladesh's fastest-growing freight forwarding companies with over 30 years of industry experience.",
        coverTitle: "What We'll Cover (based on your needs):",
        coverPoints: [
            'Air and sea import/export planning',
            'Rate negotiations and booking guidance',
            'Customs clearance procedures (IGM, ASYCUDA, AMS, etc.)',
            'Documentation and compliance support',
            'Shipment tracking and problem resolution'
        ],
        closingText: "Whether you're a first-time shipper or managing high-volume global trade lanes, we're here to support you with efficient, transparent, and tailored logistics solutions."
    }
};

// ============================================================
// Helper
// ============================================================
const findSection = (sections: any[], key: string) => {
    return sections?.find((s: any) => s.section_key === key) || null;
};

// ============================================================
// Constants
// ============================================================
const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
];

const getMonthName = (month: number): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
};

const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

const getStartDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
};

// ============================================================
// Component
// ============================================================
const ContactUs = () => {
    const [content, setContent] = useState<ContactContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [booked, setBooked] = useState(false);
    const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [topic, setTopic] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    useEffect(() => {
        window.scrollTo(0, 0);
        loadContent();
        loadBookedSlots();
    }, []);

    // ============================================================
    // Load Content
    // ============================================================
    const loadContent = async () => {
        try {
            const response = await contentAPI.getPage('contact');

            if (response.success && response.page) {
                const page = response.page;
                const sections = page.sections || [];

                const introSection = findSection(sections, 'intro');
                const intro = {
                    title: introSection?.title || defaultContent.intro.title,
                    description: introSection?.description || defaultContent.intro.description,
                };

                const consultationSection = findSection(sections, 'consultation');
                const consultation = {
                    title: consultationSection?.title || defaultContent.consultation.title,
                    description: consultationSection?.description || defaultContent.consultation.description,
                    subDescription: consultationSection?.sub_description || defaultContent.consultation.subDescription,
                    coverTitle: consultationSection?.heading || defaultContent.consultation.coverTitle,
                    coverPoints: consultationSection?.points || defaultContent.consultation.coverPoints,
                    closingText: consultationSection?.closing_text || defaultContent.consultation.closingText,
                };

                setContent({
                    isActive: page.is_active ?? defaultContent.isActive,
                    hero: { media: page.hero?.media || defaultContent.hero.media },
                    intro,
                    consultation,
                });
            }
        } catch (err) {
            console.error('Error loading contact content:', err);
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Load Booked Slots
    // ============================================================
    const loadBookedSlots = async () => {
        try {
            const response = await contactAPI.getBookedSlots();
            setBookedSlots(response.bookedSlots || []);
        } catch (err) {
            console.error('Error loading booked slots:', err);
        }
    };

    const isDateBooked = (day: number) => {
        const monthName = getMonthName(currentMonth);
        const dateStr = `${monthName} ${day}, ${currentYear}`;
        const bookingsForDate = bookedSlots.filter(slot => slot.date === dateStr);
        return bookingsForDate.length >= 2;
    };

    const getBookedCount = (day: number): number => {
        const monthName = getMonthName(currentMonth);
        const dateStr = `${monthName} ${day}, ${currentYear}`;
        return bookedSlots.filter(slot => slot.date === dateStr).length;
    };

    const getBookedTimesForDate = (day: number): string[] => {
        const monthName = getMonthName(currentMonth);
        const dateStr = `${monthName} ${day}, ${currentYear}`;
        return bookedSlots
            .filter(slot => slot.date === dateStr)
            .map(slot => slot.time);
    };

    const goToPrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const isPastDate = (day: number): boolean => {
        const todayDate = new Date();
        const checkDate = new Date(currentYear, currentMonth, day);
        const todayWithoutTime = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
        return checkDate < todayWithoutTime;
    };

    const handleDateClick = (day: number) => {
        const isPast = isPastDate(day);
        const isFullyBooked = isDateBooked(day);
        if (!isPast && !isFullyBooked) {
            setSelectedDate(day);
            setSelectedTime(null);
        }
    };

    const handleBookAppointment = async () => {
        if (!selectedDate || !selectedTime || !name || !email || !phone) {
            alert('Please fill in all required fields (Name, Email, Phone).');
            return;
        }

        setIsSubmitting(true);
        const dateStr = `${getMonthName(currentMonth)} ${selectedDate}, ${currentYear}`;

        try {
            await contactAPI.submitBooking({
                name, email, phone, companyName,
                date: dateStr,
                time: selectedTime,
                topic,
                additionalNotes,
            });

            setBooked(true);
            loadBookedSlots();
            setTimeout(() => setBooked(false), 5000);

            setName(''); setEmail(''); setPhone(''); setCompanyName('');
            setTopic(''); setAdditionalNotes('');
            setSelectedDate(null); setSelectedTime(null);
        } catch (error) {
            alert('Failed to book. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ============================================================
    // Loading State
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4c6860]"></div>
            </div>
        );
    }

    // ============================================================
    // Render
    // ============================================================
    return (
        <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[78vh] flex items-center justify-end overflow-hidden mt-16 md:mt-[150px]">
                <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                    {content.hero.media?.endsWith('.mp4') || content.hero.media?.endsWith('.webm') ? (
                        <LazyVideo
                            src={getMediaUrl(content.hero.media)}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                        />
                    ) : (
                        <img
                            src={getMediaUrl(content.hero.media || '/Sales_talking_to_Customer.jpg')}
                            alt="Contact Us Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                        />
                    )}
                    <div className="absolute inset-0"
                        style={{
                            borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px',
                            background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
                        }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{ height: '45px', background: '#4c6860', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />
                <div className="relative z-10 w-full text-right px-5 sm:px-8 md:pr-[180px] md:pl-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-white font-bold leading-tight">
                        Contact Us
                    </h1>
                </div>
            </section>

            {/* Intro */}
            <section className="py-10 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[58px] text-gray-900 leading-tight mb-3 md:mb-4 font-bold">
                        {content.intro.title}
                    </h1>
                    <div className="w-full h-[1px] bg-gray-300 my-6 md:my-8"></div>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-[32px] text-[#4c6860] leading-snug md:leading-tight font-bold">
                        {content.intro.description}
                    </p>
                </div>
            </section>

            {/* Consultation & Calendar */}
            <section className="py-10 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-gray-50">
                <div className="w-full">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">

                            {/* Left — Info + Form */}
                            <div className="p-6 sm:p-8 md:p-10">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                                    {content.consultation.title}
                                </h2>
                                <p className="text-base sm:text-lg text-gray-600 mb-3 md:mb-4 leading-relaxed">
                                    {content.consultation.description}
                                </p>
                                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                                    {content.consultation.subDescription}
                                </p>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                                    {content.consultation.coverTitle}
                                </h3>
                                <ul className="space-y-2 text-base sm:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                                    {content.consultation.coverPoints.map((point, idx) => (
                                        <li key={idx}>• {point}</li>
                                    ))}
                                </ul>
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                                    {content.consultation.closingText}
                                </p>

                                {/* Form */}
                                <div className="border-t pt-6 mt-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                                        Your Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" required value={name} onChange={e => setName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#4c6860]"
                                                placeholder="Your full name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#4c6860]"
                                                placeholder="your@email.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone <span className="text-red-500">*</span>
                                            </label>
                                            <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#4c6860]"
                                                placeholder="+8801XXXXXXXXX" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Company Name
                                            </label>
                                            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#4c6860]"
                                                placeholder="Your company" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Consultation Topic
                                            </label>
                                            <select value={topic} onChange={e => setTopic(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#4c6860]">
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Additional Notes
                                            </label>
                                            <textarea rows={3} value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-[#4c6860] resize-none"
                                                placeholder="Any specific requirements..." />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right — Calendar */}
                            <div className="p-6 sm:p-8 md:p-10">
                                <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold text-gray-900 mb-4 md:mb-6">
                                    Select a Date &amp; Time
                                </h3>

                                {/* Month Navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <button onClick={goToPrevMonth}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth()}>
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                                        {getMonthName(currentMonth)} {currentYear}
                                    </p>
                                    <button onClick={goToNextMonth}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Day Headers */}
                                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500">{day}</div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6 md:mb-8">
                                    {Array.from({ length: getStartDayOfMonth(currentYear, currentMonth) }).map((_, i) => (
                                        <div key={`empty-${i}`} className="aspect-square"></div>
                                    ))}
                                    {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => i + 1).map(day => {
                                        const isFullyBooked = isDateBooked(day);
                                        const bookedCount = getBookedCount(day);
                                        const isPartiallyBooked = bookedCount === 1;
                                        const isPast = isPastDate(day);
                                        const isDisabled = isPast;
                                        return (
                                            <button key={day} onClick={() => !isDisabled && handleDateClick(day)} disabled={isDisabled}
                                                className={`aspect-square flex items-center justify-center rounded-full text-xs sm:text-sm font-medium transition-all relative
                                                    ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                                        selectedDate === day ? 'bg-[#4c6860] text-white shadow-lg' :
                                                        isFullyBooked ? 'bg-orange-300 text-orange-800 cursor-not-allowed' :
                                                        isPartiallyBooked ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                                                        'hover:bg-[#4c6860]/10 text-gray-700'}`}
                                                title={isFullyBooked ? 'Fully Booked' : isPartiallyBooked ? '1 slot booked' : 'Available'}
                                            >
                                                {day}
                                                {isPartiallyBooked && (
                                                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Legend */}
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 text-[10px] sm:text-xs text-gray-500 flex-wrap">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-orange-300"></div>
                                        <span>Fully Booked</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-orange-100 border border-orange-300"></div>
                                        <span>1 Slot Left</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-300"></div>
                                        <span>Past</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-[#4c6860]"></div>
                                        <span>Selected</span>
                                    </div>
                                </div>

                                {selectedDate && (
                                    <div className="mb-6">
                                        <p className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                                            Available Times for {selectedDate} {getMonthName(currentMonth)}:
                                        </p>
                                        {getBookedCount(selectedDate) === 1 && (
                                            <p className="text-xs text-orange-600 mb-3">
                                                ⚠️ 1 slot already booked on this date. You can book the remaining slot.
                                            </p>
                                        )}
                                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                            {timeSlots.map(time => {
                                                const bookedTimes = getBookedTimesForDate(selectedDate);
                                                const isTimeBooked = bookedTimes.includes(time);
                                                const isFirstHalf = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].includes(time);
                                                const isSecondHalf = ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'].includes(time);

                                                const bookedInFirstHalf = bookedTimes.some(t => ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].includes(t));
                                                const bookedInSecondHalf = bookedTimes.some(t => ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'].includes(t));

                                                const isDisabled = isTimeBooked ||
                                                    (bookedInFirstHalf && isFirstHalf) ||
                                                    (bookedInSecondHalf && isSecondHalf);

                                                return (
                                                    <button key={time}
                                                        onClick={() => !isDisabled && setSelectedTime(time)}
                                                        disabled={isDisabled}
                                                        className={`px-1.5 sm:px-3 py-2 rounded-md text-[11px] sm:text-sm font-medium transition-all
                                                            ${isTimeBooked ? 'bg-orange-100 text-orange-600 border border-orange-300 cursor-not-allowed' :
                                                                isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' :
                                                                selectedTime === time ? 'bg-[#4c6860] text-white border border-[#4c6860]' :
                                                                'border border-gray-300 text-gray-700 hover:border-[#4c6860] hover:text-[#4c6860]'}`}
                                                        title={isTimeBooked ? 'Already booked' : isDisabled ? 'Same half already booked' : 'Available'}>
                                                        {time}
                                                        {isTimeBooked && (
                                                            <span className="block text-[9px] sm:text-[10px] text-orange-500">Booked</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="flex items-center gap-3 sm:gap-4 mt-3 text-[10px] sm:text-xs text-gray-500 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div>
                                                <span>Booked</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></div>
                                                <span>Same half (blocked)</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 rounded bg-[#4c6860]"></div>
                                                <span>Your selection</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedDate && selectedTime && (
                                    <button onClick={handleBookAppointment} disabled={isSubmitting}
                                        className="w-full bg-[#4c6860] text-white py-3 rounded-md hover:bg-[#006666] transition-all text-base sm:text-lg font-semibold mb-4 disabled:opacity-50">
                                        {isSubmitting ? 'Booking...' : 'Fix Appointment'}
                                    </button>
                                )}

                                {booked && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
                                        ✅ Consultation booked successfully! We'll confirm shortly.
                                    </div>
                                )}

                                <div className="text-center text-xs sm:text-sm text-gray-500 mt-4">
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

export default ContactUs;
