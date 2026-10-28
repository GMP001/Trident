// D:/Trident Log/Trident-FE/src/pages/HomePage.tsx

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../../src/pages/Footer';
import { PlusOutlined, MinusOutlined, ClockCircleOutlined, SafetyCertificateOutlined, EyeOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LazyVideo from '../pages/LazyVideo';
import LazyImage from '../pages/LazyImage';
import { getMediaUrl } from '../utils/urlHelper';

// ============================================================
// Types
// ============================================================
interface HomeCard {
    title: string;
    description: string;
    image: string;
    link: string;
    hidden?: boolean;
}

interface HomeFAQ {
    question: string;
    answer: string;
}

interface HomeContent {
    hero: {
        title: string;
        subtitle: string;
        image: string;
        button1Text: string;
        button2Text: string;
    };
    beReady: {
        title: string;
        subtitle: string;
        description: string;
        image: string;
    };
    logisticsServices: {
        title: string;
        description: string;
        cards: HomeCard[];
    };
    whatMakesDifferent: {
        title: string;
        items: string[];
    };
    faqs: HomeFAQ[];
    connectToday: {
        title: string;
        subtitle: string;
        ctaText: string;
        backgroundImage: string;
    };
}

// ============================================================
// Default Content (Fallback)
// ============================================================
const defaultContent: HomeContent = {
    hero: {
        title: "Navigating Global Trade with global and local experties.",
        subtitle: "",
        // Change this line to point to your new webp file
        image: "/webp/hero_image_home_page.webp", 
        button1Text: "Explore Our Services",
        button2Text: "Talk to Logistics Expert"
    },
    beReady: {
        title: "Be ready for anything",
        subtitle: "to go all the way",
        description: "Logistics can get messy fast. And just when you think you're done, another challenge appears. With Trident as your partner, you don't have to face challenges alone. We bring clarity where complexity builds. Whether it's one service or a complete solution, you stay ready for what comes next.",
        image: "/webp/be_ready_home_page_2.webp"
    },
    logisticsServices: {
        title: "Logistics services and solutions",
        description: "Regardless of your industry, your commodity, or your key markets, Trident offers global and local logistics solutions that enable small and large businesses to grow.",
        cards: [
            { title: "Trident Rate Quote", description: "Get fixed prices and guaranteed loading.", image: "/Get_a_rate.webp", link: "/get-quote" },
            { title: "Ocean Freight", description: "FCL/LCL, Global Routing, Import & Export.", image: "/Ocean_freight.webp", link: "/ocean-freight#ocean-freight" },
            { title: "Air Freight", description: "Air Fright and Charter Import and Export.", image: "/cargo_service.webp", link: "/ocean-freight#air-freight" },
            { title: "Less-than-Container Load", description: "Ship boxes and pallets via ocean with LCL.", image: "/LCL_Stuffing_13.webp", link: "/ocean-freight#lcl" },
            { title: "Special Cargo Shipment", description: "Special cargo execution beyond standard offerings.", image: "/special_cargo_shipment_01.webp", link: "/ocean-freight#special-cargo" },
            { title: "Cars in Containers", description: "Flexible transportation of finished vehicles.", image: "/car_in_container.webp", link: "/ocean-freight#cars-in-containers" },
            { title: "Flexibag Logistics", description: "Transporting bulk liquids efficiently and safely.", image: "/flexibag_logistics.avif", link: "/ocean-freight#flexibag" },
            { title: "Supply Chain Management", description: "Combine data and systems for streamlined logistics.", image: "/scm.avif", link: "/ocean-freight#supply-chain" },
            { title: "Cold Storage", description: "Reliable logistics for temperature-sensitive cargo.", image: "/cold_storage.webp", link: "/ocean-freight#cold-storage" },
            { title: "Project Logistics", description: "Specialised transportation for project cargo.", image: "/project_cargo_05.webp", link: "/ocean-freight#project-logistics" },
            { title: "Garments on Hanger", description: "Wrinkle-free delivery with hanging storage.", image: "/garments_on_hanger_02.webp", link: "/ocean-freight#garments" },
            { title: "Customs Clearance Services", description: "Seamless customs brokerage and clearance.", image: "/customs_clearance.webp", link: "/ocean-freight#customs-clearance-services" },
            { title: "Warehousing & Consolidation", description: "Secure storage and cargo consolidation.", image: "/warehousing_homepage.jpg", link: "/ocean-freight#warehousing-&-consolidation" },
            { title: "LCL Shipment", description: "Efficient less-than-container load shipments.", image: "/lcl_stuffing_07.avif", link: "/ocean-freight#lcl-shipment" }
        ]
    },
    whatMakesDifferent: {
        title: "What Makes Trident Different",
        items: [
            "Round-the-clock operations - no shipment goes unanswered",
            "Licensed customs handlers at ports and airports (Customs Clearance, Airport, Seaport & Land-Port)",
            "Integrated with Cargo Aim, ASYCUDA & global flight schedules",
            "100+ global partners, 150+ clients, 2,000+ shipments delivered"
        ]
    },
    faqs: [
        { question: "How do I request a quote for my shipment?", answer: "You can use our Request a Quote form on the homepage. Fill in your cargo details, destination, and preferred shipping mode. Our team will respond within 1 business day. Alternatively, please call us on +8801755 605033 & +8801713244029 and get a quote ASAP." },
        { question: "Is real-time shipment tracking available?", answer: "Yes, real-time tracking is available through our Cargo Aim system for all air and sea shipments. Our ERP-based tracking dashboard is currently in development and will launch soon." },
        { question: "Can I speak to a person for support?", answer: "Absolutely. Trident prides itself on real human support - 24/7. Use our \"Talk to a Logistics Expert\" button or the WhatsApp chat icon to connect directly." },
        { question: "How experienced is Trident?", answer: "Founded in 2025 by 30+ years experienced management body in the local market, Trident is growing into one of Bangladesh's most trusted freight forwarders gradually, handling over 2,000+ shipments globally with a track record of timely, compliant service." },
        { question: "Do you offer customs clearance services?", answer: "Yes - our licensed teams handle full customs clearance for both sea and air imports. We also assist with IGM handling, pre-arrival notifications, and ASYCUDA entries." },
        { question: "When will the client ERP portal be available?", answer: "Our ERP platform is currently under development. Expected features include document downloads, shipment history, invoicing, role-based access, auto notifications, and more." }
    ],
    connectToday: {
        title: "Connect Now",
        subtitle: "Driven by Communication",
        ctaText: "Have a chat with Logistics Expert",
        backgroundImage: "/air_cargo_booking.jpg"
    },
};

// ============================================================
// Helper: Find section by key
// ============================================================
const findSection = (sections: any[], key: string): any => {
    return sections?.find((s: any) => s.section_key === key) || null;
};

// ============================================================
// Component
// ============================================================
const HomePage = () => {
    const [content, setContent] = useState<HomeContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            setError(null);
            const response = await contentAPI.getPage('home');

            if (response.success && response.page) {
                const page = response.page;
                const sections = page.sections || [];

                // Hero
                const hero = {
                    title: page.hero?.title || defaultContent.hero.title,
                    subtitle: page.hero?.subtitle || defaultContent.hero.subtitle,
                    image: page.hero?.media || defaultContent.hero.image,
                    button1Text: page.hero?.button1_text || defaultContent.hero.button1Text,
                    button2Text: page.hero?.button2_text || defaultContent.hero.button2Text,
                };

                // Be Ready section
                const beReadySection = findSection(sections, 'beReady');
                const beReady = {
                    title: beReadySection?.title || defaultContent.beReady.title,
                    subtitle: beReadySection?.subtitle || defaultContent.beReady.subtitle,
                    description: beReadySection?.description || defaultContent.beReady.description,
                    image: beReadySection?.video || defaultContent.beReady.image,
                };

                // Logistics Services (cards_grid)
                const servicesSection = findSection(sections, 'logisticsServices');
                const cards: HomeCard[] = (servicesSection?.cards || []).map((card: any) => {
                    // Auto-generate the link if the admin forgot to add one
                    let safeLink = card.link || '#';
                    if (safeLink === '#' || safeLink === '' || (!safeLink.includes('#') && safeLink !== '/get-quote')) {
                        if (card.title) {
                            const slug = card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            safeLink = `/ocean-freight#${slug}`;
                        }
                    }
                    return {
                        title: card.title || '',
                        description: card.description || '',
                        image: card.image || '',
                        link: safeLink,
                        hidden: card.hidden || false,
                    };
                });

                const logisticsServices = {
                    title: servicesSection?.title || defaultContent.logisticsServices.title,
                    description: servicesSection?.description || defaultContent.logisticsServices.description,
                    cards: cards.length > 0 ? cards : defaultContent.logisticsServices.cards,
                };

                // What Makes Different (text_block with points)
                const diffSection = findSection(sections, 'whatMakesDifferent');
                const whatMakesDifferent = {
                    title: diffSection?.title || defaultContent.whatMakesDifferent.title,
                    items: diffSection?.points || defaultContent.whatMakesDifferent.items,
                };

                // FAQs (faq_list)
                const faqSection = findSection(sections, 'faqs');
                const faqs: HomeFAQ[] = (faqSection?.faqs || []).map((faq: any) => ({
                    question: faq.question || '',
                    answer: faq.answer || '',
                }));
                if (faqs.length === 0) faqs.push(...defaultContent.faqs);

                // Connect Today
                const connectSection = findSection(sections, 'connectToday');
                const connectToday = {
                    title: connectSection?.title || defaultContent.connectToday.title,
                    subtitle: connectSection?.subtitle || defaultContent.connectToday.subtitle,
                    ctaText: connectSection?.cta_text || defaultContent.connectToday.ctaText,
                    backgroundImage: connectSection?.background_image || defaultContent.connectToday.backgroundImage,
                };

                setContent({
                    hero,
                    beReady,
                    logisticsServices,
                    whatMakesDifferent,
                    faqs,
                    connectToday,
                });
            }
        } catch (err) {
            console.error('Error loading home content:', err);
            setError('Failed to load content. Using default content.');
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Loading State
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading content...</p>
                </div>
            </div>
        );
    }

    // ============================================================
    // Render
    // ============================================================
    const diffIcons = [
        <ClockCircleOutlined style={{ fontSize: '40px', color: '#fff' }} />,
        <SafetyCertificateOutlined style={{ fontSize: '40px', color: '#fff' }} />,
        <EyeOutlined style={{ fontSize: '40px', color: '#fff' }} />,
        <GlobalOutlined style={{ fontSize: '40px', color: '#fff' }} />,
    ];

    const isVideo = (path: string) => {
        return path?.endsWith('.mp4') || path?.endsWith('.webm') || path?.endsWith('.mov');
    };

    return (
        <>
            {/* Hero Section */}
            <section
                className="relative h-screen md:h-[95vh] flex items-center justify-start overflow-hidden pb-16 md:pb-0"
            >
                <Navbar />
                <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                    {isVideo(content.hero.image) ? (
                        <LazyVideo src={getMediaUrl(content.hero.image)}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }} />
                    ) : (
                        <LazyImage src={getMediaUrl(content.hero.image)} alt="Hero"
                            className="absolute inset-0 w-full h-full"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectFit: 'cover' }} />
                    )}
                    <div className="absolute inset-0"
                        style={{
                            borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px',
                            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0) 100%)',
                        }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{ height: '45px', background: '#4c6860', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />

                <div className="relative z-10 text-left w-full px-5 sm:px-8 md:pl-[100px] md:pr-8 lg:pr-24 max-w-6xl">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[72px] text-white leading-snug md:leading-tight mb-5 md:mb-10 font-bold tracking-tight">
                        {content.hero.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                        <Link to="/ocean-freight" className="w-full sm:w-auto">
                            <Button type="primary" size="large"
                                className="h-11 md:h-14 px-6 md:px-10 text-sm sm:text-base md:text-lg font-semibold shadow-lg bg-white text-black hover:bg-gray-100 w-full">
                                {content.hero.button1Text}
                            </Button>
                        </Link>
                        <Link to="/contact" className="w-full sm:w-auto">
                            <Button size="large"
                                className="h-11 md:h-14 px-6 md:px-10 text-sm sm:text-base md:text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white/20 transition-all w-full">
                                {content.hero.button2Text}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Be Ready Section */}
            <section className="relative py-10 px-5 sm:px-8 md:px-16 lg:px-24 bg-white overflow-visible">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight mb-6 font-light">
                        {content.beReady.title}<br /><span className="font-light">{content.beReady.subtitle}</span>
                    </h2>
                    <div className="w-20 h-0.5 bg-[#4c6860] mx-auto mb-8"></div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                        {content.beReady.description}
                    </p>
                    <div className="relative inline-block w-full max-w-5xl mx-auto overflow-visible">
                        <div className="relative overflow-hidden" style={{ borderRadius: '60px' }}>
                            {isVideo(content.beReady.image) ? (
                                <LazyVideo src={getMediaUrl(content.beReady.image)} className="w-full h-auto object-cover" style={{ borderRadius: '60px' }} />
                            ) : (
                                <LazyImage src={getMediaUrl(content.beReady.image)} alt="Be Ready" className="w-full h-auto object-cover" style={{ borderRadius: '60px' }} />
                            )}
                        </div>
                        {/* Green decorative corners — scaled down so they fit mobile */}
                        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '80px', background: '#4c6860', borderBottomLeftRadius: '60px', zIndex: 15, left: '5px' }} />
                        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '80px', background: '#4c6860', borderBottomRightRadius: '60px', zIndex: 15, right: '5px' }} />
                        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', background: '#4c6860', left: '80px', right: '80px', zIndex: 15 }} />
                    </div>
                </div>
            </section>

            {/* Logistics Services */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="w-full px-5 sm:px-8 md:px-12 lg:px-24">
                    <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
                        {content.logisticsServices.title}
                    </h2>
                    <p className="text-center text-sm sm:text-base text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                        {content.logisticsServices.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        {content.logisticsServices.cards
                            .filter((card) => !card.hidden)
                            .map((card, index) => (
                                <div key={index} className="w-full max-w-[350px] sm:w-[300px] md:w-[350px] h-auto sm:h-[350px]">
                                    <Link to={card.link} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                                        <div className="w-full h-48 sm:h-[60%] bg-gray-100 flex items-center justify-center overflow-hidden">
                                            <LazyImage src={getMediaUrl(card.image)} alt={card.title} className="w-full h-full" style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div className="p-4 sm:h-[40%] flex flex-col justify-center">
                                            <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-semibold text-[#4c6860] mb-1">{card.title}</h3>
                                            <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#4c6860]">{card.description}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* What Makes Trident Different */}
            <section className="py-16 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-center text-gray-900 mb-12 md:mb-20 font-bold"
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        {content.whatMakesDifferent.title}
                    </motion.h2>
                    <div className="relative">
                        <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-[#4c6860]" style={{ top: '48px' }}></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {content.whatMakesDifferent.items.map((item, index) => (
                                <div key={index} className="flex flex-col items-center text-center relative z-10">
                                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#4c6860] rounded-full flex items-center justify-center mb-6 relative">
                                        <span className="absolute -top-3 -right-3 w-8 h-8 bg-[#4c6860] text-white rounded-full flex items-center justify-center text-lg font-bold">{index + 1}</span>
                                        {diffIcons[index] || diffIcons[0]}
                                    </div>
                                    <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-700 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-center text-gray-900 mb-10 md:mb-12 font-bold">
                        Frequently Asked Questions (FAQ)
                    </h2>
                    <div className="max-w-5xl mx-auto">
                        <div className="w-full h-0.5 bg-gray-300 mb-8"></div>
                        {content.faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200">
                                <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    className="w-full flex items-center justify-between py-5 md:py-6 text-left hover:bg-gray-50 transition-colors px-3 md:px-4 rounded-lg">
                                    <span className="text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-800 font-medium pr-4 md:pr-8">{faq.question}</span>
                                    <span className="flex-shrink-0 text-[#4c6860]">
                                        {openFAQ === index ? <MinusOutlined style={{ fontSize: '20px' }} /> : <PlusOutlined style={{ fontSize: '20px' }} />}
                                    </span>
                                </button>
                                {openFAQ === index && (
                                    <div className="pb-6 px-3 md:px-4">
                                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Connect Today */}
            <section className="py-12 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-center text-gray-900 mb-4 font-bold">
                        {content.connectToday.title}
                    </h2>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] text-center text-[#4c6860] font-bold">
                        {content.connectToday.subtitle}
                    </p>
                    <div className="w-24 h-0.5 bg-[#4c6860] mx-auto mt-6"></div>
                </div>
            </section>

            {/* Parallax CTA — bg-fixed only on md+ to avoid iOS mobile bug */}
            <div
                className="relative h-[60vh] md:h-screen flex items-center justify-center bg-scroll md:bg-fixed bg-center bg-cover"
                style={{ backgroundImage: `url(${getMediaUrl(content.connectToday.backgroundImage)})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-5 sm:px-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white font-bold mb-4">
                        {content.connectToday.ctaText}
                    </h2>
                    <Link to="/contact">
                        <button className="bg-transparent border-2 border-white text-white px-6 md:px-10 py-3 md:py-4 rounded-md hover:bg-white hover:text-gray-900 transition-all text-base md:text-xl font-semibold">
                            {content.connectToday.ctaText}
                        </button>
                    </Link>
                </div>
            </div>

            <Footer />

            {/* Horizontal Divider */}
            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-700"></div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-900 text-white py-6 text-center px-4">
              <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
            </div>

            {/* Horizontal Divider */}
            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-600"></div>
            </div>

            {/* Powered By */}
            <div className="bg-gray-900 text-gray-500 py-4 text-center px-4">
              <p className="text-xs">Powered by - ARK PANORAMA LAB</p>
            </div>
        </>
    );
};

export default HomePage;
