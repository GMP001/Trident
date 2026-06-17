// D:\Trident Log\Trident-FE\src\pages\Warehousing.tsx

import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';

interface WarehousingContent {
  isActive: boolean;
  hero: {
    title: string;
    subtitle: string;
    video?: string;
    image?: string;
    buttonText: string;
  };
  featuresStrip?: {
    items: string[];
  };
  buildSupplyChain: {
    title: string;
    description: string;
    description2: string;
    description3: string;
    image: string;
  };
  whyTrident: {
    title: string;
    subtitle: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
  };
  servicesOffer: {
    title: string;
    services: Array<{
      title: string;
      description: string;
      image: string;
    }>;
  };
  wmsSupport: {
    title: string;
    description: string;
    video: string;
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

const defaultContent: WarehousingContent = {
  isActive: true,
  hero: {
    title: "Warehousing & Distribution",
    subtitle: "Your end-to-end warehousing and distribution needs, managed seamlessly through our global network of strategically located storage facilities.",
    video: "/warehouse_stuff_working.mp4",
    buttonText: "Contact us"
  },
  featuresStrip: {
    items: ["Consolidation", "Deconsolidation", "Fulfilment"]
  },
  buildSupplyChain: {
    title: "Build a supply chain that matches the pace of your business",
    description: "Ever-changing customer needs require businesses to be resilient and having access to strategically located warehouses goes a long way in establishing a strong global and regional presence. With facilities that receive, store, process and dispatch cargo quickly, you can build flexibility and resilience throughout your supply chain.",
    description2: "Trident's warehousing and distribution services provide lean, fast and efficient methods for the consolidation, deconsolidation and fulfilment of your goods. With specialised solutions like bonded storage facilities, omni-channel fulfilment centres and regional hubs, we have the capabilities to meet the needs of your global supply chain.",
    description3: "With over 30 years of experience in building highly agile warehousing and distribution services, Trident Contract Logistics can be your global logistics partner.",
    image: "/warehouse_staff.jpg"
  },
  whyTrident: {
    title: "Why Trident?",
    subtitle: "With Trident, you can enhance the efficiency of your supply chain and get your products to market faster. Our scalable warehousing and distribution services can help you transport, fulfil, manage and power your logistics from end to end, and make your products easily accessible to your customers.",
    benefits: [
      { title: "Flexibility", description: "Speed up or slow down your supply chain to meet market demands efficiently across seasons." },
      { title: "Visibility", description: "A globally available Warehouse Management System (WMS) gives you a unified platform to operate across multiple sites and markets, enhancing end-to-end visibility." },
      { title: "Efficiency", description: "Globally standardised operations and localised support help get your goods to the right place at the right time, every time." },
      { title: "Value added services", description: "Optimise your supply chain and minimise go to market efforts with sorting, labelling, co-packing and other value-added services." }
    ]
  },
  servicesOffer: {
    title: "Here's what Trident Contract Logistics services offer:",
    services: [
      { title: "Warehousing services", description: "Keep your goods moving with flexible, tech-driven warehousing designed for speed, visibility, and reliability.", image: "/warehouse_service-01.jpg" },
      { title: "Distribution Services", description: "Deliver faster with integrated distribution that connects your products to customers efficiently and reliably.", image: "/warehouse_staff.jpg" },
      { title: "Value added services", description: "Add flexibility and reduce lead times with value-added warehousing services like packing, labelling, and kitting.", image: "/warehouse_service-02.jpg" },
      { title: "Cold Storage", description: "Store, handle, and transport temperature-sensitive cargo through a network of strategically located cold storage facilities.", image: "/cold_storage.jpg" }
    ]
  },
  wmsSupport: {
    title: "How does Trident's WMS support you?",
    description: "Our Warehouse Management System (WMS) is a platform that offers you comprehensive visibility to operate – not just at a single warehouse, but across multiple sites and markets. With rapid deployment powered by pre-configured templates and proven interfaces, your business can scale efficiently while maintaining consistency.",
    video: "/warehouse_management_service.mp4"
  },
  cta: {
    title: "Ready to optimise your warehousing & distribution?",
    subtitle: "Contact our contract logistics experts today",
    buttonText: "Contact us"
  }
};

const Warehousing = () => {
  const [content, setContent] = useState<WarehousingContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const pageContent = await contentAPI.getPage('warehousing');
      if (pageContent && Object.keys(pageContent).length > 0) {
        setContent({
          isActive: pageContent.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pageContent.hero || {}) },
          featuresStrip: pageContent.featuresStrip || defaultContent.featuresStrip,
          buildSupplyChain: { ...defaultContent.buildSupplyChain, ...(pageContent.buildSupplyChain || {}) },
          whyTrident: {
            ...defaultContent.whyTrident,
            ...(pageContent.whyTrident || {}),
            benefits: pageContent.whyTrident?.benefits || defaultContent.whyTrident.benefits
          },
          servicesOffer: {
            ...defaultContent.servicesOffer,
            ...(pageContent.servicesOffer || {}),
            services: pageContent.servicesOffer?.services || defaultContent.servicesOffer.services
          },
          wmsSupport: { ...defaultContent.wmsSupport, ...(pageContent.wmsSupport || {}) },
          cta: { ...defaultContent.cta, ...(pageContent.cta || {}) }
        });
      }
    } catch (error) {
      console.error('Error loading warehousing content:', error);
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

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {content.hero.video?.endsWith('.mp4') ? (
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover"
              style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}>
              <source src={getMediaUrl(content.hero.video)} type="video/mp4" />
            </video>
          ) : (
            <img src={getMediaUrl(content.hero.image || '')} alt={content.hero.title}
              className="absolute w-full h-full object-cover"
              style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }} />
          )}
          <div className="absolute bg-black/55" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px' }} />
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button>
        </div>
      </section>

      {/* Features Strip */}
      {content.featuresStrip && (
        <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
            <div className="flex flex-wrap gap-8 justify-start items-center">
              {content.featuresStrip.items.map((item, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="text-blue-600 font-medium text-base">{item}</span>
                  {i < content.featuresStrip!.items.length - 1 && <span className="text-gray-300">|</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Secondary Nav (static) */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-6 overflow-x-auto">
            {["Overview", "Warehousing services", "Distribution Services", "Value added services", "Global coverage", "Contact us"].map(tab => (
              <button key={tab} className={`py-3 px-1 text-sm font-medium ${tab === "Overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600 transition-colors"}`}>{tab}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Build Supply Chain */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.buildSupplyChain.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">{content.buildSupplyChain.description}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{content.buildSupplyChain.description2}</p>
              <p className="text-gray-600 leading-relaxed">{content.buildSupplyChain.description3}</p>
            </div>
            <div><img src={getMediaUrl(content.buildSupplyChain.image)} alt="Supply Chain" className="w-full h-auto rounded-lg shadow-md" /></div>
          </div>
        </div>
      </section>

      {/* Why Trident */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whyTrident.title}</h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.whyTrident.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {content.whyTrident.benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                    {i === 1 && <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>}
                    {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offer */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.servicesOffer.title}</h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.servicesOffer.services.map((svc, i) => (
              <div key={i} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img src={getMediaUrl(svc.image)} alt={svc.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{svc.title}</h3>
                  <p className="text-gray-600 text-sm">{svc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WMS Support */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.wmsSupport.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed">{content.wmsSupport.description}</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              {content.wmsSupport.video?.endsWith('.mp4') ? (
                <video autoPlay loop muted playsInline className="w-full h-auto object-cover">
                  <source src={getMediaUrl(content.wmsSupport.video)} type="video/mp4" />
                </video>
              ) : (
                <img src={getMediaUrl(content.wmsSupport.video)} alt="WMS" className="w-full h-auto object-cover" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Weather Widget (static) */}
      <section className="py-8 px-8 md:px-16 lg:px-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">☀️</div>
              <div><div className="text-2xl font-bold text-gray-800">Hot days ahead</div><div className="text-lg text-gray-600">30°C</div></div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-gray-600">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3>
          <p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button>
        </div>
      </section>
    </div>
  );
};

export default Warehousing;
