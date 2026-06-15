import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  EyeOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  DesktopOutlined,
  CloudOutlined,
} from '@ant-design/icons';

const PharmaHealthcare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section with Background Image and Curved Blue Border */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        
        {/* Background Image with Curve - EXTEND BELOW SECTION */}
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
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/pharma_healthcare_hero.jpg')`,
              backgroundPosition: 'center 40%',
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px',
            }}
          >
            <div 
              className="absolute inset-0 bg-black/55"
              style={{
                borderBottomRightRadius: '60px',
                borderBottomLeftRadius: '60px',
              }}
            ></div>
          </div>
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
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">
            Pharma & Healthcare Logistics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Built for pharma and healthcare logistics needs. Strengthen access, efficiency and accountability with specialised logistics solutions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
            Get in touch
          </button>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-8 justify-start items-center">
            <span className="text-blue-600 font-medium text-base">Pharma expertise</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-base">GDP compliance</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-base">Quality management system</span>
          </div>
        </div>
      </section>

      {/* Secondary Navigation Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}>
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('segments')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'segments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Industry Segments
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div>
          {/* Deliver with the responsibility healthcare demands */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Deliver with the responsibility healthcare demands
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Global pharmaceutical and healthcare supply chains are becoming more complex. Stricter 
                    regulations, temperature-sensitive products, and higher expectations for speed and reliability 
                    demand greater resilience. This requires precise temperature control, compliant handling, 
                    and end-to-end visibility.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Trident delivers these capabilities through end-to-end pharma logistics solutions that protect 
                    product integrity at scale. This helps support resilient, compliant and high-performing supply 
                    chains worldwide.
                  </p>
                </div>
                <div>
                  <img src="/pharma_healthcare_02.jpg" alt="Pharma Healthcare" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Powering what's next in essential healthcare */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Powering what's next in essential healthcare
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A resilient, end-to-end pharma logistics ecosystem is essential to safeguard product integrity 
                  and ensure timely access to critical medicines. Building strategies around agility, compliance, 
                  visibility and expertise is key to maintaining precision, reliability, and patient trust in an 
                  increasingly complex logistics environment.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EyeOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visibility</h3>
                  <p className="text-gray-600 text-sm">
                    Real-time tracking and temperature monitoring, powered by intelligent alerts, help supply 
                    chain professionals anticipate risks.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExperimentOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise</h3>
                  <p className="text-gray-600 text-sm">
                    Our dedicated cold chain team designs innovative solutions to increase visibility, preserve 
                    shelf life, optimise energy use, and reduce delays.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThunderboltOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Agility</h3>
                  <p className="text-gray-600 text-sm">
                    Backed by owned assets, our pharma logistics solutions provide the resilience and flexibility 
                    needed to respond to disruptions.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafetyOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Connected cold chain</h3>
                  <p className="text-gray-600 text-sm">
                    By combining asset ownership with technology, we deliver an end-to-end cold chain that 
                    enhances control, cost efficiency, and performance.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* INDUSTRY SEGMENTS TAB */}
      {activeTab === 'segments' && (
        <div>
          {/* Built for every pharma and healthcare segment */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Built for every pharma and healthcare segment
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From biopharma and vaccines to generics, APIs, medical devices, diagnostics and consumer healthcare, 
                  the pharma and healthcare industry relies on logistics solutions tailored to very specific requirements. 
                  Trident's integrated supply chain offerings support each segment with innovation and industry expertise.
                </p>
              </div>

              {/* APIs and raw material suppliers */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <MedicineBoxOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">APIs and raw material suppliers</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Effective logistics for API and pharmaceutical raw material suppliers must centre on integrated 
                    solutions that ensure GDP compliance, provide in-transit visibility, and balance cost and speed. 
                    The industry requires seamless coordination across air and ocean freight, cold storage, landside 
                    transport and customs clearance to enable reliable end-to-end movement of critical inputs.
                  </p>
                </div>
                <div>
                  <img src="/pharma_healthcare_03.jpg" alt="APIs and raw material suppliers" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>

              {/* Pharmaceuticals */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1">
                  <img src="/pharma_healthcare_04.jpg" alt="Pharmaceuticals" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <HeartOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Pharmaceuticals</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    The industry requires finished pharmaceutical, biopharmaceutical, and vaccine products be 
                    brought securely to market through integrated, end-to-end logistics. Pharma cold chain 
                    management must integrate air and ocean freight, cold storage, customs clearance, and 
                    Control Tower visibility to ensure compliant, reliable delivery across global markets.
                  </p>
                </div>
              </div>

              {/* Consumer healthcare */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <DesktopOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Consumer healthcare</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    The consumer healthcare industry requires reliable, patient-ready delivery of products through 
                    integrated logistics. Inventory management, warehousing and distribution, and real-time 
                    visibility are key to reducing waste and protecting short shelf lives, while digital and 
                    e-commerce capabilities support evolving, patient-centric delivery models.
                  </p>
                </div>
                <div>
                  <img src="/pharma_healthcare_08.jpg" alt="Consumer healthcare" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>

              {/* MedTech */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1">
                  <img src="/pharma_healthcare_06.jpg" alt="MedTech" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CloudOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">MedTech</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    In this segment, it is necessary to protect the high-value, sensitive devices while ensuring 
                    speed, reliability and regulatory compliance. This means precise handling and end-to-end 
                    visibility across complex global supply chains. Just as critical are deep regulatory expertise, 
                    proactive risk management and the ability to scale seamlessly, so devices reach hospitals, 
                    clinics and patients on time.
                  </p>
                </div>
              </div>

              {/* Animal health */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <SafetyOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Animal health</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Whether delivering to farms, clinics or distributors, animal health companies must protect 
                    product integrity, meet regulatory requirements, and deliver on time. From pharmaceuticals 
                    and vaccines to diagnostics and nutritional supplements, streamline your complex supply chain 
                    with integrated transport, temperature-controlled solutions and secure warehousing.
                  </p>
                </div>
                <div>
                  <img src="/pharma_healthcare_07.jpg" alt="Animal health" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CONTACT TAB */}
      {activeTab === 'contact' && (
        <div>
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                Contact Our Pharma & Healthcare Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our specialised pharma and healthcare logistics team for tailored supply chain solutions.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
                Get in touch
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Weather Widget */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⛅</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">26°C</div>
                <div className="text-sm text-gray-500">Partly cloudy</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-800">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl text-white mb-4 font-light">Ready to transform your pharma & healthcare logistics?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our healthcare industry specialists today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default PharmaHealthcare;
