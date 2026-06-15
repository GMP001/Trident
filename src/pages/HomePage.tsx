import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { contentAPI } from '../services/api';

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
  callUs: {
    phoneNumber: string;
    whatsappNumber: string;
  };
  eastWestNetwork: {
    title: string;
    description: string;
    image: string;
    buttonText: string;
  };
  logisticsTrendMap: {
    title: string;
    description: string;
    image: string;
    buttonText: string;
  };
  industrySectors: {
    title: string;
    description: string;
  };
}

// ========== DEFAULT CONTENT (FALLBACK) ==========
const defaultContent: HomeContent = {
  hero: {
    title: "Navigating Global Trade with Precision",
    subtitle: "Complete end-to-end logistics solutions from factory floor to customer door. Ocean Freight • Air Freight • Customs • Project Cargo • Trucking",
    image: "/Hero-Video.mp4",
    button1Text: "Explore Our Services",
    button2Text: "Get a Quote"
  },
  beReady: {
    title: "Be ready for anything",
    subtitle: "to go all the way",
    description: "Logistics can get messy fast. And just when you think you're done, another challenge appears. With Trident as your partner, you don't have to face challenges alone. We bring clarity where complexity builds. Whether it's one service or a complete solution, you stay ready for what comes next.",
    video: "/be_ready.mp4"
  },
  callUs: {
    phoneNumber: "+880 1234 567890",
    whatsappNumber: "+880 1234 567890"
  },
  eastWestNetwork: {
    title: "The Trident East-West Network",
    description: "With our East-West Network we are setting a new standard for reliability and service quality by reducing port calls on our mainliners, an extensive shuttle network and strategically located hubs delivering world class productivity.",
    image: "/East West Network.webp",
    buttonText: "Explore our Network"
  },
  logisticsTrendMap: {
    title: "The Logistics Trend Map",
    description: "When navigating the evolving world of logistics, knowing and acting on the top trends will help you go all the way.",
    image: "/glowing_world_map.avif",
    buttonText: "Discover new trends"
  },
  industrySectors: {
    title: "Industry sectors",
    description: "Regardless of your industry, your commodity, or your key markets, Trident offers global and local logistics solutions that enable small and large businesses to grow."
  }
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('transport');
  const [content, setContent] = useState<HomeContent>(defaultContent);
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
      const pageContent = await contentAPI.getPage('home');
      
      console.log('Loaded home page content:', pageContent);
      
      if (pageContent && Object.keys(pageContent).length > 0) {
        const mergedContent: HomeContent = {
          hero: { ...defaultContent.hero, ...(pageContent.hero || {}) },
          beReady: { ...defaultContent.beReady, ...(pageContent.beReady || {}) },
          callUs: { ...defaultContent.callUs, ...(pageContent.callUs || {}) },
          eastWestNetwork: { ...defaultContent.eastWestNetwork, ...(pageContent.eastWestNetwork || {}) },
          logisticsTrendMap: { ...defaultContent.logisticsTrendMap, ...(pageContent.logisticsTrendMap || {}) },
          industrySectors: { ...defaultContent.industrySectors, ...(pageContent.industrySectors || {}) }
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

        {/* Sky Blue Thick Border - Left side */}
        <div 
          className="absolute bottom-0 pointer-events-none"
          style={{
            height: '200px',
            width: '150px',
            background: 'transparent',
            borderBottom: '35px solid #38bdf8',
            borderBottomLeftRadius: '60px',
            zIndex: 15,
            left: '0px',
          }}
        />

        {/* Sky Blue Thick Border - Right side */}
        <div 
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            height: '200px',
            width: '150px',
            background: 'transparent',
            borderBottom: '35px solid #38bdf8',
            borderBottomRightRadius: '60px',
            zIndex: 15,
          }}
        />

        {/* Content - MOVED RIGHT by 300px */}
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-5xl md:text-6xl lg:text-5xl text-white leading-tight mb-10 tracking-tight">
            {content.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Button 
              type="primary" 
              size="large" 
              className="h-14 px-10 text-lg font-semibold shadow-lg bg-white text-black hover:bg-gray-100"
            >
              {content.hero.button1Text}
            </Button>
            
            <Button 
              size="large" 
              className="h-14 px-10 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white/20 transition-all"
            >
              {content.hero.button2Text}
            </Button>
          </div>
        </div>

        {/* White background strip */}
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '65px',
            background: 'white',
            marginLeft: '150px',
            marginRight: '150px',
            zIndex: 15,
          }}
        />
        
        {/* White Box / Call Section */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
          <div 
            className="bg-white flex flex-col items-center justify-center"
            style={{
              width: 'calc(100% - 100px)',
              height: '120px',
              marginLeft: '150px',
              marginRight: '150px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              position: 'relative',
              zIndex: 20,
            }}
          >
            <p className="text-gray-600 font-medium text-2xl mb-3">📞 Call us at</p>
            
            <div className="flex items-center justify-center gap-20">
              <a 
                href={`tel:${content.callUs.phoneNumber.replace(/\s/g, '')}`} 
                className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-colors cursor-pointer group"
                style={{ textDecoration: 'none' }}
              >
                <PhoneOutlined 
                  style={{ fontSize: '32px', color: 'currentColor' }} 
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xl font-medium">{content.callUs.phoneNumber}</span>
              </a>

              <a 
                href={`https://wa.me/${content.callUs.whatsappNumber.replace(/\s/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-gray-700 hover:text-green-500 transition-colors cursor-pointer group"
                style={{ textDecoration: 'none' }}
              >
                <WhatsAppOutlined 
                  style={{ fontSize: '32px', color: 'currentColor' }} 
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xl font-medium">{content.callUs.whatsappNumber}</span>
              </a>
            </div>
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

      {/* We Are Section with Cards */}
      <section className="relative py-10 px-8 md:px-16 lg:px-24 bg-white">
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-l-md shadow-lg transition-all duration-200"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              letterSpacing: '1px'
            }}
          >
            Feedback
          </button>
        </div>
      </section>

      {/* Logistics Services and Solutions Section */}
      <section className="py-10 px-8 md:px-16 lg:px-24 bg-gray-50">
        <h2 className="text-center text-3xl font-normal mb-4 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
          Logistics services and solutions
        </h2>
        <p className="text-center text-base text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          {content.industrySectors.description}
        </p>

        {/* Tabs - Keep as is (not editable from admin) */}
        <div className="flex justify-center gap-12 mb-8 border-b border-gray-200 max-w-4xl mx-auto">
          <button
            onClick={() => {
              setActiveTab('transport');
              const container = document.getElementById('cardsContainer');
              if (container) container.scrollLeft = 0;
            }}
            className={`flex flex-col items-center pb-3 transition-all duration-200 cursor-pointer ${
              activeTab === 'transport' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="w-8 h-8 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.04 15.04 0 0 0-2.922-2.25c-1.04-.643-2.272-.572-3.226.106a4.487 4.487 0 0 0-1.81 3.072 21.54 21.54 0 0 0-.677 4.09v1.302" />
              </svg>
            </div>
            <span className="text-sm font-medium">Transport</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('logistics');
              const container = document.getElementById('cardsContainer');
              if (container) container.scrollLeft = 0;
            }}
            className={`flex flex-col items-center pb-3 transition-all duration-200 cursor-pointer ${
              activeTab === 'logistics' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="w-8 h-8 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>
            </div>
            <span className="text-sm font-medium">Logistics Management</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('solutions');
              const container = document.getElementById('cardsContainer');
              if (container) container.scrollLeft = 0;
            }}
            className={`flex flex-col items-center pb-3 transition-all duration-200 cursor-pointer ${
              activeTab === 'solutions' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="w-8 h-8 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.87l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.87l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Solutions</span>
          </button>
        </div>

        {/* Cards Container - Keep as is (static cards - optional to make dynamic later) */}
        <div className="relative max-w-7xl mx-auto">
          <div 
            className="overflow-x-auto overflow-y-hidden px-12 scroll-smooth hide-scrollbar"
            id="cardsContainer"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-6 w-max">
            {activeTab === 'transport' && (
              <>
                <a href="/trident-rate" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/covered_truck.jpg" alt="Trident Rate" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Trident Rate</h3>
                    <p className="text-sm text-gray-600">Get fixed prices and guaranteed loading when booking your customers' shipments through sales.</p>
                  </div>
                </a>
                <a href="/ocean-contract" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/ocean_contract.jpg" alt="Ocean Contracts" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Ocean Contract</h3>
                    <p className="text-sm text-gray-600">Transport your goods with stable rates, choice of allocation and assured space.</p>
                  </div>
                </a>
                <a href="/air-freight" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/cargo_air_plain.webp" alt="Air Freight" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Air Freight</h3>
                    <p className="text-sm text-gray-600">Find online rates for Inland Transportation of Full Container Loads. Air Freight is a fast, reliable, and ideal service for supply chain challenges.</p>
                  </div>
                </a>
                <a href="/lcl" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/loading_on_truck.avif" alt="Less-than-Container Load" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Less-than-Container Load (LCL)</h3>
                    <p className="text-sm text-gray-600">Ship boxes and pallets via ocean with LCL. Book online and get prices instantly.</p>
                  </div>
                </a>
                <a href="/special-shipment" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/special_cargo_handling.jpg" alt="Special Cargo Shipment" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Special Cargo Shipment</h3>
                    <p className="text-sm text-gray-600">Request a special cargo shipment execution beyond our standard offerings.</p>
                  </div>
                </a>
              </>
            )}
            {activeTab === 'solutions' && (
              <>
                <a href="/cars-in-containers" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/car_in_container.png" alt="Cars in Containers" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Cars in Containers</h3>
                    <p className="text-sm text-gray-600">Flexible transportation of finished vehicles from your factory to your customers' doors.</p>
                  </div>
                </a>
                <a href="/flexibag-logistics" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/flexibag_logistics.avif" alt="Flexibag Logistics" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Flexibag Logistics</h3>
                    <p className="text-sm text-gray-600">Solution specialised for transporting bulk liquids efficiently and safely across the globe. Suitable for commodities such as...</p>
                  </div>
                </a>
                <a href="/industry/chemicals" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/chemical_logistics.webp" alt="Chemicals Logistics Management" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Chemicals Logistics Management</h3>
                    <p className="text-sm text-gray-600">Integrated chemical logistics with real-time visibility across the supply chain.</p>
                  </div>
                </a>
              </>
            )}
            {activeTab === 'logistics' && (
              <>
                <a href="/supply-chain-management" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/scm.avif" alt="Supply Chain Management" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Supply Chain Management</h3>
                    <p className="text-sm text-gray-600">Combine data and stakeholder systems for streamlined logistics.</p>
                  </div>
                </a>
                <a href="/cold-storage" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/cold_storage.png" alt="Cold Storage" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Cold Storage</h3>
                    <p className="text-sm text-gray-600">Reliable logistics for temperature-sensitive cargo.</p>
                  </div>
                </a>
                <a href="/cold-storage" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/cold_chain_logistics.png" alt="Cold Chain Logistics" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Cold Chain Logistics</h3>
                    <p className="text-sm text-gray-600">Reliable and responsive end-to-end logistics for your time and temperature sensitive cargo.</p>
                  </div>
                </a>
                <a href="/project-logistics" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/heavy_cargo_lifting.avif" alt="Trident Project Logistics" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Trident Project Logistics</h3>
                    <p className="text-sm text-gray-600">We plan, orchestrate and provide specialised transportation for project cargo.</p>
                  </div>
                </a>
                <a href="/garments-on-hanger" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src="/goh_container.jpg" alt="Garments on Hanger Container" className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Garments on Hanger Container</h3>
                    <p className="text-sm text-gray-600">Specialised container solution for ready-to-wear garments, ensuring wrinkle-free delivery with hanging storage during transit.</p>
                  </div>
                </a>
              </>
            )}
            </div>
          </div>

          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
            onClick={() => {
              const container = document.getElementById('cardsContainer');
              if (container) container.scrollBy({ left: -320, behavior: 'smooth' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
            onClick={() => {
              const container = document.getElementById('cardsContainer');
              if (container) container.scrollBy({ left: 320, behavior: 'smooth' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Two Column Blocks Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto space-y-20" style={{ marginLeft: '300px' }}>
          
          {/* Block 1 - The Trident East-West Network */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                {content.eastWestNetwork.title}
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.eastWestNetwork.description}
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2">
                {content.eastWestNetwork.buttonText} <span>→</span>
              </button>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={getMediaUrl(content.eastWestNetwork.image)} 
                alt="East-West Network" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Block 2 - The Logistics Trend Map */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src={getMediaUrl(content.logisticsTrendMap.image)} 
                alt="Logistics Trend Map" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                {content.logisticsTrendMap.title}
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.logisticsTrendMap.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Sectors Section */}
      <section className="py-10 px-8 md:px-16 lg:px-24 bg-gray-50">
        <h2 className="text-center text-3xl font-normal mb-4 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
          {content.industrySectors.title}
        </h2>
        <p className="text-center text-base text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Verdana, sans-serif' }}>
          {content.industrySectors.description}
        </p>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-x-auto overflow-y-hidden px-12 scroll-smooth hide-scrollbar" id="industryCardsContainer" style={{ scrollBehavior: 'smooth' }}>
            <div className="flex gap-6 w-max">
              <a href="/industry/fmcg" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src="/fmcg_card.avif" alt="FMCG" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">FMCG</h3>
                </div>
              </a>
              <a href="/industry/retail" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src="/retail_card.avif" alt="Retail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Retail</h3>
                </div>
              </a>
              <a href="/fashion-lifestyle" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src="/fashion_lifestyle_card.avif" alt="Fashion & Lifestyle" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Fashion & Lifestyle</h3>
                </div>
              </a>
              <a href="/industry/chemicals" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src="/chemical_card.jpg" alt="Chemical" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Chemicals</h3>
                </div>
              </a>
              <a href="/industry/automotive" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src="/automotive_card.avif" alt="Automotive" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Automotive</h3>
                </div>
              </a>
              <a href="/industry/pharma" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src="/pharma_healthcare_card.png" alt="Pharma & Healthcare" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Pharma & Healthcare</h3>
                </div>
              </a>
            </div>
          </div>

          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
            onClick={() => {
              const container = document.getElementById('industryCardsContainer');
              if (container) container.scrollBy({ left: -280, behavior: 'smooth' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
            onClick={() => {
              const container = document.getElementById('industryCardsContainer');
              if (container) container.scrollBy({ left: 280, behavior: 'smooth' });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer Section - Keep as is (static) */}
      <footer className="bg-gray-900 text-white py-10 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Transport Services</h3>
              <ul className="space-y-2">
                <li><a href="/ocean-transport" className="text-gray-400 hover:text-white transition-colors text-sm">Ocean Transport</a></li>
                <li><a href="/inland-transport" className="text-gray-400 hover:text-white transition-colors text-sm">Inland Transport</a></li>
                <li><a href="/lcl" className="text-gray-400 hover:text-white transition-colors text-sm">Less-than-Container Load (LCL)</a></li>
                <li><a href="/air-freight" className="text-gray-400 hover:text-white transition-colors text-sm">Air Freight</a></li>
                <li><a href="/ground-freight" className="text-gray-400 hover:text-white transition-colors text-sm">Ground Freight Transport</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Storage & Logistics</h3>
              <ul className="space-y-2">
                <li><a href="/warehousing" className="text-gray-400 hover:text-white transition-colors text-sm">Warehousing</a></li>
                <li><a href="/depot" className="text-gray-400 hover:text-white transition-colors text-sm">Depot</a></li>
                <li><a href="/cold-storage" className="text-gray-400 hover:text-white transition-colors text-sm">Cold Storage</a></li>
                <li><a href="/cold-storage" className="text-gray-400 hover:text-white transition-colors text-sm">Cold Chain Logistics</a></li>
                <li><a href="/customs-services" className="text-gray-400 hover:text-white transition-colors text-sm">Customs Services</a></li>
                <li><a href="/project-logistics" className="text-gray-400 hover:text-white transition-colors text-sm">Project Logistics</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Industry Sectors</h3>
              <ul className="space-y-2">
                <li><a href="/industry/fmcg" className="text-gray-400 hover:text-white transition-colors text-sm">FMCG</a></li>
                <li><a href="/fashion-lifestyle" className="text-gray-400 hover:text-white transition-colors text-sm">Fashion & Lifestyle</a></li>
                <li><a href="/industry/retail" className="text-gray-400 hover:text-white transition-colors text-sm">Retail</a></li>
                <li><a href="/industry/chemicals" className="text-gray-400 hover:text-white transition-colors text-sm">Chemicals</a></li>
                <li><a href="/industry/automotive" className="text-gray-400 hover:text-white transition-colors text-sm">Automotive</a></li>
                <li><a href="/industry/pharma" className="text-gray-400 hover:text-white transition-colors text-sm">Pharma & Healthcare</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">About & Support</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mb-8">
            <p className="text-gray-400 text-sm text-center">
              Follow our journey. <span className="text-white">tridentgloballogistics.com</span>
            </p>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-xs">© Trident Global Logistics</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms & conditions</a>
                <a href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/cookie-policy" className="text-gray-500 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
