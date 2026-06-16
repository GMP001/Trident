// D:\Trident Log\Trident-FE\src\pages\InlandTransport.tsx

import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';

interface InlandTransportContent {
  isActive: boolean;
  hero: {
    title: string;
    subtitle: string;
    video?: string;
    image?: string;
    button1Text: string;
    button2Text: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  servicesDescription: {
    title: string;
    description: string;
    image: string;
  };
  solutions: Array<{
    title: string;
    description: string;
    image: string;
    button1Text: string;
    button2Text: string;
    imagePosition: string;
  }>;
  cta: {
    title: string;
    subtitle: string;
    button1Text: string;
    button2Text: string;
  };
}

const defaultContent: InlandTransportContent = {
  isActive: true,
  hero: {
    title: "Inland Transport",
    subtitle: "Streamline your supply chain with seamless inland transport for scalable regional efficiency.",
    video: "/container_moving_on_truck.mp4",
    button1Text: "Book now",
    button2Text: "Contact us"
  },
  features: [
    {
      title: "One logistics partner",
      description: "Simplify your supply chain with a single point of contact",
      icon: "users"
    },
    {
      title: "For all business needs",
      description: "Scalable solutions for businesses of any size",
      icon: "building"
    },
    {
      title: "Global network",
      description: "Connected infrastructure across regions",
      icon: "globe"
    }
  ],
  servicesDescription: {
    title: "Services",
    description: "We offer comprehensive services for smooth end-to-end inland transport of your containerised and non-containerised cargo. Whatever the size and type of your shipments, we collect from and deliver to inland locations with precision and care.",
    image: "/container_on_tuck_05.jpg"
  },
  solutions: [
    {
      title: "Intermodal - Carrier Haulage",
      description: "Simplify end-to-end transport by connecting containerised cargo shipped with Trident Ocean services to inland locations.",
      image: "/container_on_truck_hero.jpg",
      button1Text: "Book now",
      button2Text: "Learn more",
      imagePosition: "left"
    },
    {
      title: "Intermodal - Multi Carrier",
      description: "Streamline containerised inland delivery from any ocean carrier's terminal with integrated road, rail, and barge connections.",
      image: "/container_stack_at_port.jpg",
      button1Text: "Book now",
      button2Text: "Learn more",
      imagePosition: "right"
    },
    {
      title: "Intercontinental Rail Transportation",
      description: "Move your cargo between Asia and Europe with fast, reliable and cost-effective containerised rail services.",
      image: "/container_on_train_01.jpg",
      button1Text: "Book now",
      button2Text: "Learn more",
      imagePosition: "left"
    },
    {
      title: "Trident Ground Freight",
      description: "Connect your logistics network with reliable ground freight for full or partial truckloads across all distances.",
      image: "/container_on_truck_06.jpg",
      button1Text: "Book now",
      button2Text: "Learn more",
      imagePosition: "right"
    }
  ],
  cta: {
    title: "Ready to streamline your inland transport?",
    subtitle: "Contact our logistics experts today",
    button1Text: "Contact us",
    button2Text: "Book now"
  }
};

const InlandTransport = () => {
  const [content, setContent] = useState<InlandTransportContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setError(null);
      const pageContent = await contentAPI.getPage('inland-transport');
      
      if (pageContent && Object.keys(pageContent).length > 0) {
        const mergedContent: InlandTransportContent = {
          isActive: pageContent.isActive !== undefined ? pageContent.isActive : defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pageContent.hero || {}) },
          features: Array.isArray(pageContent.features) && pageContent.features.length > 0 
            ? pageContent.features 
            : defaultContent.features,
          servicesDescription: { ...defaultContent.servicesDescription, ...(pageContent.servicesDescription || {}) },
          solutions: Array.isArray(pageContent.solutions) && pageContent.solutions.length > 0
            ? pageContent.solutions.map((sol: any, i: number) => ({
                ...defaultContent.solutions[i] || {},
                ...sol
              }))
            : defaultContent.solutions,
          cta: { ...defaultContent.cta, ...(pageContent.cta || {}) }
        };
        setContent(mergedContent);
      }
    } catch (error) {
      console.error('Error loading inland transport content:', error);
      setError('Failed to load content. Using default content.');
    } finally {
      setLoading(false);
    }
  };

  const getMediaUrl = (path: string): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads/')) return `http://localhost:5000${path}`;
    return path;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Icon renderer for features
  const renderFeatureIcon = (icon: string) => {
    switch (icon) {
      case 'users':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'building':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'globe':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-start overflow-visible">
        <div 
          className="absolute overflow-hidden"
          style={{
            top: 0, left: 0, right: 0, bottom: 0,
            borderBottomRightRadius: '60px',
            borderBottomLeftRadius: '60px',
          }}
        >
          {content.hero.video?.endsWith('.mp4') ? (
            <video
              autoPlay loop muted playsInline
              className="absolute w-full h-full object-cover"
              style={{
                top: 0, left: 0, right: 0, bottom: 0,
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
                objectPosition: 'center 40%',
              }}
            >
              <source src={getMediaUrl(content.hero.video)} type="video/mp4" />
            </video>
          ) : (
            <img
              src={getMediaUrl(content.hero.image || content.hero.video || '')}
              alt={content.hero.title}
              className="absolute w-full h-full object-cover"
              style={{
                top: 0, left: 0, right: 0, bottom: 0,
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
                objectPosition: 'center 40%',
              }}
            />
          )}
          <div 
            className="absolute bg-black/55" 
            style={{ 
              top: 0, left: 0, right: 0, bottom: 0,
              borderBottomRightRadius: '50px',
              borderBottomLeftRadius: '50px',
            }} 
          /> 
        </div>

        {/* Sky Blue Borders */}
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-5xl md:text-6xl lg:text-6xl text-white leading-tight mb-6 font-light tracking-wide">
            {content.hero.title}
          </h1>
          <div className="w-24 h-0.5 bg-blue-500 mb-8"></div>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            {content.hero.subtitle}
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all text-base font-medium">
              {content.hero.button1Text}
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all text-base font-medium">
              {content.hero.button2Text}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {renderFeatureIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Description Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6 font-light">
                {content.servicesDescription.title}
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-8"></div>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content.servicesDescription.description}
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={getMediaUrl(content.servicesDescription.image)} 
                alt={content.servicesDescription.title} 
                className="w-full h-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions/Service Cards Section - FIXED LAYOUT */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <h2 className="text-3xl md:text-4xl text-gray-900 text-center mb-12 font-light">
            Our Inland Transport Solutions
          </h2>
          
          <div className="space-y-12">
            {content.solutions.map((solution, index) => {
              const isImageRight = solution.imagePosition === 'right';
              
              return (
                <div key={index} className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  
                  {/* ===== FIXED: Image column ===== */}
                  {/* If imagePosition is 'right': Image appears SECOND on mobile, SECOND on desktop */}
                  {/* If imagePosition is 'left': Image appears SECOND on mobile, FIRST on desktop */}
                  <div className={`h-80 overflow-hidden ${
                    isImageRight 
                      ? 'order-2 md:order-2'  // Right: second on both mobile & desktop
                      : 'order-2 md:order-1'  // Left: second on mobile, first on desktop
                  }`}>
                    <img 
                      src={getMediaUrl(solution.image)} 
                      alt={solution.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* ===== FIXED: Content column ===== */}
                  {/* If imagePosition is 'right': Content appears FIRST on mobile, FIRST on desktop */}
                  {/* If imagePosition is 'left': Content appears FIRST on mobile, SECOND on desktop */}
                  <div className={`p-8 ${
                    isImageRight 
                      ? 'order-1 md:order-1'  // Right: first on both mobile & desktop
                      : 'order-1 md:order-2'  // Left: first on mobile, second on desktop
                  }`}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{solution.description}</p>
                    <div className="flex gap-4">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                        {solution.button1Text}
                      </button>
                      <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-all text-sm font-medium">
                        {solution.button2Text}
                      </button>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Navigation Links */}
      <section className="py-12 px-8 md:px-16 lg:px-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Services</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Local info</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">FAQs</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Contact us</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Book now</button>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-8 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Share</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3>
          <p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
              {content.cta.button1Text}
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">
              {content.cta.button2Text}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InlandTransport;
