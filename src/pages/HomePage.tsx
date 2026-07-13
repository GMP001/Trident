import { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../../src/pages/Footer';
import { PlusOutlined, MinusOutlined, ClockCircleOutlined, SafetyCertificateOutlined, EyeOutlined, GlobalOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ========== INTERFACE DEFINITIONS ==========
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
    video: string;
  };
  logisticsServices: {
    title: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
      image: string;
      link: string;
    }>;
  };
  whatMakesDifferent: {
    title: string;
    items: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  connectToday: {
    title: string;
    subtitle: string;
    heading: string;
    subheading: string;
    ctaText: string;
    backgroundImage: string;
  };
}

// ========== DEFAULT CONTENT (FALLBACK) ==========
const defaultContent: HomeContent = {
  hero: {
    title: "Navigating Global Trade with global and local experties.",
    subtitle: "",
    image: "/Hero-Video.mp4",
    button1Text: "Explore Our Services",
    button2Text: "Talk to Logistics Expert"
  },
  beReady: {
    title: "Be ready for anything",
    subtitle: "to go all the way",
    description: "Logistics can get messy fast. And just when you think you're done, another challenge appears. With Trident as your partner, you don't have to face challenges alone. We bring clarity where complexity builds. Whether it's one service or a complete solution, you stay ready for what comes next.",
    video: "/be_ready.mp4"
  },
  logisticsServices: {
    title: "Logistics services and solutions",
    description: "Regardless of your industry, your commodity, or your key markets, Trident offers global and local logistics solutions that enable small and large businesses to grow.",
    cards: [
      { title: "Trident Rate Quote", description: "Get fixed prices and guaranteed loading.", image: "/Get_a_rate.jpg", link: "/get-quote" },
      { title: "Ocean Freight", description: "FCL/LCL, Global Routing, Import & Export.", image: "/Ocean_freight.jpg", link: "/ocean-freight#ocean-freight" },
      { title: "Air Freight", description: "Air Fright and Charter Import and Export.", image: "/cargo_service.jpg", link: "/ocean-freight#air-freight" },
      { title: "Less-than-Container Load", description: "Ship boxes and pallets via ocean with LCL.", image: "/LCL_Stuffing_13.jpg", link: "/ocean-freight#lcl" },
      { title: "Special Cargo Shipment", description: "Special cargo execution beyond standard offerings.", image: "/special_cargo_shipment_01.jpg", link: "/ocean-freight#special-cargo" },
      { title: "Cars in Containers", description: "Flexible transportation of finished vehicles.", image: "/car_in_container.png", link: "/ocean-freight#cars-in-containers" },
      { title: "Flexibag Logistics", description: "Transporting bulk liquids efficiently and safely.", image: "/flexibag_logistics.avif", link: "/ocean-freight#flexibag" },
      { title: "Supply Chain Management", description: "Combine data and systems for streamlined logistics.", image: "/scm.avif", link: "/ocean-freight#supply-chain" },
      { title: "Cold Storage", description: "Reliable logistics for temperature-sensitive cargo.", image: "/cold_storage.jpg", link: "/ocean-freight#cold-storage" },
      { title: "Project Logistics", description: "Specialised transportation for project cargo.", image: "/project_cargo_05.jpg", link: "/ocean-freight#project-logistics" },
      { title: "Garments on Hanger", description: "Wrinkle-free delivery with hanging storage.", image: "/garments_on_hanger_02.jpg", link: "/ocean-freight#garments" }
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
    {
      question: "How do I request a quote for my shipment?",
      answer: "You can use our Request a Quote form on the homepage. Fill in your cargo details, destination, and preferred shipping mode. Our team will respond within 1 business day. Alternatively, please call us on +8801755 605033 & +8801713244029 and get a quote ASAP."
    },
    {
      question: "Is real-time shipment tracking available?",
      answer: "Yes, real-time tracking is available through our Cargo Aim system for all air and sea shipments. Our ERP-based tracking dashboard is currently in development and will launch soon."
    },
    {
      question: "Can I speak to a person for support?",
      answer: "Absolutely. Trident prides itself on real human support - 24/7. Use our \"Talk to a Logistics Expert\" button or the WhatsApp chat icon to connect directly."
    },
    {
      question: "How experienced is Trident?",
      answer: "Founded in 2025 by 30+ years experienced management body in the local market, Trident is growing into one of Bangladesh's most trusted freight forwarders gradually, handling over 2,000+ shipments globally with a track record of timely, compliant service."
    },
    {
      question: "Do you offer customs clearance services?",
      answer: "Yes - our licensed teams handle full customs clearance for both sea and air imports. We also assist with IGM handling, pre-arrival notifications, and ASYCUDA entries."
    },
    {
      question: "When will the client ERP portal be available?",
      answer: "Our ERP platform is currently under development. Expected features include document downloads, shipment history, invoicing, role-based access, auto notifications, and more."
    }
  ],
  connectToday: {
    title: "Connect Today",
    subtitle: "Driven by Communication",
    heading: "Talk to a Logistics Expert",
    subheading: "Talk to a Logistics Expert",
    ctaText: "Talk to Logistics Expert",
    backgroundImage: "/air_cargo_booking.jpg"
  },
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('transport');
  const [content, setContent] = useState<HomeContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);


  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, []);

  // ========== LOAD CONTENT FROM API ==========
  const loadContent = async () => {
    try {
      setError(null);
      const pageContent = await contentAPI.getPage('home');
      
      console.log('Loaded home page content:', pageContent);
      
      if (pageContent && Object.keys(pageContent).length > 0) {
        const mergedContent: HomeContent = {
          hero: { ...defaultContent.hero, ...(pageContent.hero || {}) },
          beReady: { ...defaultContent.beReady, ...(pageContent.beReady || {}) },
          logisticsServices: { 
            ...defaultContent.logisticsServices, 
            ...(pageContent.logisticsServices || {}),
            cards: pageContent.logisticsServices?.cards || defaultContent.logisticsServices.cards
          },
          whatMakesDifferent: { ...defaultContent.whatMakesDifferent, ...(pageContent.whatMakesDifferent || {}) },
          faqs: pageContent.faqs || defaultContent.faqs,
          connectToday: { ...defaultContent.connectToday, ...(pageContent.connectToday || {}) }
        };
        setContent(mergedContent);
      }
    } catch (error) {
      console.error('Error loading home content:', error);
      setError('Failed to load content. Using default content.');
    } finally {
      setLoading(false);
    }
  };

  // ========== IMAGE/VIDEO URL HELPER ==========
  const getMediaUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads/')) return `http://localhost:5000${path}`;
    return path;
  };

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

  return (
    <>
      {/* Hero Section with Maersk-style Curved Bottom Right */}
      <section className="relative h-[95vh] flex items-center justify-start overflow-hidden">
        <Navbar />
                
        {/* Background Video with Curve */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            borderBottomRightRadius: '60px',
            borderBottomLeftRadius: '60px',
          }}
        >
          {content.hero.image && (content.hero.image.endsWith('.mp4') || content.hero.image.endsWith('.webm') || content.hero.image.endsWith('.mov')) ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              key={content.hero.image}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
              }}
            >
              <source src={getMediaUrl(content.hero.image)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={getMediaUrl(content.hero.image)}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
              }}
              onError={(e) => {
                console.error('Hero image failed to load:', content.hero.image);
                e.currentTarget.src = '/Hero-Video.mp4';
              }}
            />
          )}
          {/* Dark Overlay */}
          <div 
            className="absolute inset-0 bg-black/55" 
            style={{ 
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px',
            }} 
          /> 
        </div>

        {/* Sky Blue Thick Border - Full Width */}
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

        {/* Content - Aligned with Navbar */}
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '100px' }}>
          <h1 className="text-[72px] text-white leading-tight mb-10 font-bold tracking-tight">
            {content.hero.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/ocean-freight">
              <Button 
                type="primary" 
                size="large" 
                className="h-14 px-10 text-lg font-semibold shadow-lg bg-white text-black hover:bg-gray-100"
              >
                {content.hero.button1Text}
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button 
                size="large" 
                className="h-14 px-10 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white/20 transition-all"
              >
                {content.hero.button2Text}
              </Button>
            </Link>
          </div>
        </div>

      </section>

      {/* Be Ready Section */}
      <section className="relative py-10 px-8 md:px-16 lg:px-24 bg-white overflow-visible">
        <div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-tight mb-6 font-light">
            {content.beReady.title}<br />
            <span className="font-light">{content.beReady.subtitle}</span>
          </h2>
          
          <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            {content.beReady.description}
          </p>

          {/* Video Container */}
          <div className="relative inline-block w-full max-w-5xl mx-auto overflow-visible">
            <div 
              className="relative overflow-hidden"
              style={{
                borderTopRightRadius: '60px',
                borderTopLeftRadius: '60px',
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
              }}
            >
            {content.beReady.video && (content.beReady.video.endsWith('.mp4') || content.beReady.video.endsWith('.webm')) ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                key={content.beReady.video}
                className="w-full h-auto object-cover"
                style={{
                  borderTopRightRadius: '60px',
                  borderTopLeftRadius: '60px',
                  borderBottomRightRadius: '60px',
                  borderBottomLeftRadius: '60px',
                }}
              >
                <source src={getMediaUrl(content.beReady.video)} type="video/mp4" />
              </video>
            ) : (
              <img
                src={getMediaUrl(content.beReady.video)}
                alt="Be Ready"
                className="w-full h-auto object-cover"
                style={{
                  borderTopRightRadius: '60px',
                  borderTopLeftRadius: '60px',
                  borderBottomRightRadius: '60px',
                  borderBottomLeftRadius: '60px',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/be_ready.mp4';
                }}
              />
            )}
            </div>

            <div 
              className="absolute bottom-0 pointer-events-none"
              style={{
                height: '35px',
                width: '150px',
                background: '#38bdf8',
                borderBottomLeftRadius: '60px',
                zIndex: 15,
                left: '5px',
              }}
            />

            <div 
              className="absolute bottom-0 pointer-events-none"
              style={{
                height: '35px',
                width: '150px',
                background: '#38bdf8',
                borderBottomRightRadius: '60px',
                zIndex: 15,
                right: '5px',
              }}
            />

            <div 
              className="absolute bottom-0 pointer-events-none"
              style={{
                height: '35px',
                background: '#38bdf8',
                left: '150px',
                right: '150px',
                zIndex: 15,
              }}
            />
          </div>
        </div>
      </section>

      {/* Logistics Services and Solutions Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <h2 className="text-center text-6xl font-normal mb-4 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
            {content.logisticsServices.title}
          </h2>
          <p className="text-center text-base text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {content.logisticsServices.description}
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {content.logisticsServices.cards
              .filter((card: any) => !card.hidden)
              .map((card: any, index: number) => (
                <div key={index} className="w-[350px] h-[350px]">
                  <a href={card.link} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="w-full h-[60%] bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img src={getMediaUrl(card.image)} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4 h-[40%] flex flex-col justify-center">
                      <h3 className="text-[22px] font-semibold text-sky-500 mb-1">{card.title}</h3>
                      <p className="text-[22px] text-sky-500">{card.description}</p>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* What Makes Trident Different Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <motion.h2 
            className="text-[72px] text-center text-gray-900 mb-20 font-bold"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {content.whatMakesDifferent.title}
          </motion.h2>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-sky-500" style={{ top: '48px' }}></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.whatMakesDifferent.items.map((item: string, index: number) => {
                const icons = [
                  <ClockCircleOutlined style={{ fontSize: '40px', color: '#fff' }} />,
                  <SafetyCertificateOutlined style={{ fontSize: '40px', color: '#fff' }} />,
                  <EyeOutlined style={{ fontSize: '40px', color: '#fff' }} />,
                  <GlobalOutlined style={{ fontSize: '40px', color: '#fff' }} />
                ];
                return (
                  <div key={index} className="flex flex-col items-center text-center relative z-10">
                    <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center mb-6 relative">
                      <span className="absolute -top-3 -right-3 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-lg font-bold">{index + 1}</span>
                      {icons[index]}
                    </div>
                    <p className="text-[22px] text-gray-700 leading-relaxed">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* IATA Carousel Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50 overflow-hidden">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <div className="relative overflow-hidden">
            <div className="flex gap-16 animate-scroll" style={{ width: 'max-content' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-16 flex-shrink-0">
                  <div className="flex items-center justify-center h-32 w-48">
                    <img 
                      src="/IATA_Logo.png" 
                      alt="IATA Logo" 
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-32 w-48">
                    <img 
                      src="/IATA_Logo-2.png" 
                      alt="IATA Logo" 
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-32 w-48">
                    <img 
                      src="/IATA_Logo_3.png" 
                      alt="IATA Logo" 
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center h-32 w-48">
                    <img 
                      src="/IATA_Logo_4.png" 
                      alt="IATA Logo" 
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <h2 className="text-[72px] text-center text-gray-900 mb-12 font-bold">
            Frequently Asked Questions (FAQ)
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="w-full h-0.5 bg-gray-300 mb-8"></div>
            
            {content.faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 transition-colors px-4 rounded-lg"
                >
                  <span className="text-[22px] text-gray-800 font-medium pr-8">{faq.question}</span>
                  <span className="flex-shrink-0 text-sky-500">
                    {openFAQ === index ? (
                      <MinusOutlined style={{ fontSize: '20px' }} />
                    ) : (
                      <PlusOutlined style={{ fontSize: '20px' }} />
                    )}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="pb-6 px-4">
                    <p className="text-[22px] text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Connect Today Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
          <h2 className="text-[72px] text-center text-gray-900 mb-4 font-bold">
            {content.connectToday.title}
          </h2>
          <p className="text-[42px] text-center text-sky-500 font-bold">
            {content.connectToday.subtitle}
          </p>
          <div className="w-24 h-0.5 bg-blue-500 mx-auto mt-6"></div>
        </div>
      </section>

      {/* Parallax Contact Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{ 
          backgroundImage: `url('/air_cargo_booking.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-8">
          <h2 className="text-[44px] text-white font-bold mb-4">
            {content.connectToday.heading}
          </h2>
          <p className="text-[20px] text-white font-bold mb-10">
            {content.connectToday.subheading}
          </p>
          <Link to="/contact">
            <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-md hover:bg-white hover:text-gray-900 transition-all text-xl font-semibold">
              {content.connectToday.ctaText}
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
      {/* Copyright */}
      <div className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
      </div>
    </>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 transition-colors px-4 rounded-lg"
      >
        <span className="text-[22px] text-gray-800 font-medium pr-8">{question}</span>
        <span className="flex-shrink-0 text-sky-500">
          {isOpen ? (
            <MinusOutlined style={{ fontSize: '20px' }} />
          ) : (
            <PlusOutlined style={{ fontSize: '20px' }} />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 px-4">
          <p className="text-[22px] text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
