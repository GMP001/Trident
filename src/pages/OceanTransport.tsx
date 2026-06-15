import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { contentAPI } from '../services/api';

// ========== INTERFACE DEFINITIONS ==========
interface OceanTransportContent {
  isActive: boolean;
  hero: {
    title: string;
    subtitle: string;
    video: string;
  };
  predictableDeliveries: {
    title: string;
    description: string;
    description2: string;
    image: string;
  };
  eastWestNetwork: {
    title: string;
    description: string;
    description2: string;
    image: string;
    button1Text: string;
    button2Text: string;
  };
  gallery: {
    title: string;
    images: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

// ========== DEFAULT CONTENT (FALLBACK) ==========
const defaultContent: OceanTransportContent = {
  isActive: true,
  hero: {
    title: "Ocean Transport",
    subtitle: "We move your cargo across global waters with reliability, efficiency, and expertise",
    video: "/container_vessel_sailing.mp4"
  },
  predictableDeliveries: {
    title: "Predictable deliveries in dynamic markets",
    description: "Reliability is at the heart of every business. And when your goods move across the globe, uncertainty can disrupt your supply chain in many ways. Geopolitical shifts, weather conditions and inventory fluctuations, to name a few.",
    description2: "That's where our experience comes in. Trident Ocean Transport guarantees the reliability your business needs to deliver on time, consistently, to 500+ destinations around the world.",
    image: "/ship_at_port.jpg"
  },
  eastWestNetwork: {
    title: "East-West Network",
    description: "Learn more about our East-West Network, an innovative network powered by leaner loops with fewer port calls per service, an agile shuttle network and state-of-the-art hubs.",
    description2: "With the Trident East-West Network, we've developed a flexible and well-connected ocean network that delivers game-changing reliability.",
    image: "/ship_in_the_dusk.jpg",
    button1Text: "Find schedules",
    button2Text: "Ask prices"
  },
  gallery: {
    title: "Our Fleet in Action",
    images: [
      "/ship_under_dark-sky.jpg",
      "/ship-at_port-2.jpg",
      "/Ship_in_the_blue_water.jpg"
    ]
  },
  faqs: [
    {
      question: "What is ocean transport?",
      answer: "Ocean transport is the movement of goods and cargo across international waters using container ships, bulk carriers, or other vessels. It's the most common method for international trade, handling over 90% of global trade volume."
    },
    {
      question: "What are the various ocean transport services offered by Trident?",
      answer: "Trident's core shipping options include Ocean Transport, Less-than-Container Load (LCL), Full Container Load (FCL), and customised ocean solutions."
    },
    {
      question: "What additional services can I add to my ocean booking?",
      answer: "For added convenience, flexibility and efficiency, you can add a range of additional services to your ocean booking. Click below for the full list."
    },
    {
      question: "What is LCL in ocean shipping?",
      answer: "Less-than-Container Load (LCL) shipping allows multiple shippers to share space in a single container. You pay only for the space you use, measured in cubic metres (CBM)."
    },
    {
      question: "How long does ocean freight take?",
      answer: "Ocean shipping transit times vary widely depending on several factors. Overall, sea freight shipping can range from 20-45 days."
    },
    {
      question: "What are the limitations of ocean shipping?",
      answer: "Ocean shipping is considerably slower than air freight, with intercontinental routes often taking several weeks. Ocean shipping is also susceptible to disruptions such as port congestion, adverse weather conditions etc."
    }
  ],
  cta: {
    title: "Ready to ship with confidence?",
    subtitle: "Contact our ocean freight experts today",
    buttonText: "Request a quote"
  }
};

const OceanTransport = () => {
  const [content, setContent] = useState<OceanTransportContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, []);

  // ========== LOAD CONTENT FROM API ==========
  const loadContent = async () => {
    try {
      setError(null);
      const pageContent = await contentAPI.getPage('ocean-transport');
      
      console.log('Loaded ocean transport content:', pageContent);
      
      if (pageContent && Object.keys(pageContent).length > 0) {
        const mergedContent: OceanTransportContent = {
          isActive: pageContent.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pageContent.hero || {}) },
          predictableDeliveries: { ...defaultContent.predictableDeliveries, ...(pageContent.predictableDeliveries || {}) },
          eastWestNetwork: { ...defaultContent.eastWestNetwork, ...(pageContent.eastWestNetwork || {}) },
          gallery: { ...defaultContent.gallery, ...(pageContent.gallery || {}) },
          faqs: pageContent.faqs || defaultContent.faqs,
          cta: { ...defaultContent.cta, ...(pageContent.cta || {}) }
        };
        setContent(mergedContent);
      }
    } catch (error) {
      console.error('Error loading ocean transport content:', error);
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
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 fixed top-20 right-4 z-50 max-w-md shadow-lg">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      {/* Hero Section with Video Background and Curved Blue Border */}
      <section className="relative h-[70vh] flex items-center justify-start overflow-visible">
        
        {/* Background Video with Curve */}
        <div 
          className="absolute overflow-hidden"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderBottomRightRadius: '60px',
            borderBottomLeftRadius: '60px',
          }}
        >
          {content.hero.video && (content.hero.video.endsWith('.mp4') || content.hero.video.endsWith('.webm')) ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              key={content.hero.video}
              className="absolute w-full h-full object-cover"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
                objectPosition: 'center 40%',
              }}
            >
              <source src={getMediaUrl(content.hero.video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={getMediaUrl(content.hero.video)}
              alt={content.hero.title}
              className="absolute w-full h-full object-cover"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
              }}
              onError={(e) => {
                e.currentTarget.src = '/container_vessel_sailing.mp4';
              }}
            />
          )}
          
          {/* Dark Overlay */}
          <div 
            className="absolute bg-black/50" 
            style={{ 
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderBottomRightRadius: '50px',
              borderBottomLeftRadius: '50px',
            }} 
          /> 
        </div>

        {/* Sky Blue Thick Border - Left side */}
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: '0px',
            height: '35px',
            width: '150px',
            background: '#38bdf8',
            borderBottomLeftRadius: '50px',
            zIndex: 15,
            left: '7px',
          }}
        />

        {/* Sky Blue Thick Border - Right side */}
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: '0px',
            height: '35px',
            width: '150px',
            background: '#38bdf8',
            borderBottomRightRadius: '50px',
            zIndex: 15,
            right: '7px',
          }}
        />

        {/* Full Width Straight Blue Thick Border - Middle section */}
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: '0px',
            height: '35px',
            background: '#38bdf8',
            left: '150px',
            right: '150px',
            zIndex: 15,
          }}
        />
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 font-light tracking-wide">
            {content.hero.title}
          </h1>
          <div className="w-24 h-0.5 bg-blue-500 mb-8"></div>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-700 font-medium">Global Destinations</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">12M+</h3>
              <p className="text-gray-700 font-medium">Containers Yearly</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">30+</h3>
              <p className="text-gray-700 font-medium">Years of Experience</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              We move over 12 million containers every year, ensuring reliable deliveries to every corner around the globe.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all text-base font-medium">
                Check prices
              </button>
              <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-all text-base font-medium">
                Find schedules
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exceptional reliability</h3>
              <p className="text-gray-600">Industry-leading on-time performance you can count on</p>
            </div>
            <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Guaranteed space</h3>
              <p className="text-gray-600">Secure capacity even in peak seasons</p>
            </div>
            <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time visibility</h3>
              <p className="text-gray-600">Track your cargo every step of the way</p>
            </div>
          </div>
        </div>
      </section>

      {/* Predictable Deliveries Section */}
      <section className="relative py-24 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url(${getMediaUrl(content.predictableDeliveries.image)})`,
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6 font-light">
                {content.predictableDeliveries.title}
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-8"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {content.predictableDeliveries.description}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.predictableDeliveries.description2}
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={getMediaUrl(content.predictableDeliveries.image)} 
                alt="Container Ship at Port" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/ship_at_port.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services, Local Info, FAQs Navigation */}
      <section className="py-12 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-8 justify-center">
            <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-lg">
              Services
            </button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-lg">
              Local info
            </button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-lg">
              FAQs
            </button>
          </div>
        </div>
      </section>

      {/* East-West Network Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src={getMediaUrl(content.eastWestNetwork.image)} 
                alt="East-West Network" 
                className="w-full h-auto rounded-lg shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = '/ship_in_the_dusk.jpg';
                }}
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6 font-light">
                {content.eastWestNetwork.title}
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-8"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {content.eastWestNetwork.description}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.eastWestNetwork.description2}
              </p>
              <div className="flex gap-4 mt-8">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                  {content.eastWestNetwork.button1Text}
                </button>
                <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-all">
                  {content.eastWestNetwork.button2Text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <h2 className="text-3xl md:text-4xl text-gray-900 text-center mb-12 font-light">
            {content.gallery.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.gallery.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg h-64">
                <img 
                  src={getMediaUrl(image)} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/ship_under_dark-sky.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 px-8 md:px-16 lg:px-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Share</span>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                {content.eastWestNetwork.button1Text}
              </button>
              <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-all">
                {content.eastWestNetwork.button2Text}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {content.faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3>
          <p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p>
          <Link to="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
              {content.cta.buttonText}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OceanTransport;
