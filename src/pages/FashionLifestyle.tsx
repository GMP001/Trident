import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  ThunderboltOutlined,
  EyeOutlined,
  SafetyOutlined,
  GlobalOutlined,
  SolutionOutlined,
  RocketOutlined,
  ShoppingOutlined,
  SkinOutlined,
  CompassOutlined,
} from '@ant-design/icons';

const FashionLifestyle = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section with Video Background and Curved Blue Border */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        
        {/* Background Video with Curve - EXTEND BELOW SECTION */}
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
          <video
            autoPlay
            loop
            muted
            playsInline
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
            <source src="/life_style_02.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark Overlay */}
          <div 
            className="absolute bg-black/55" 
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
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">
            Fashion & Lifestyle Logistics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Lead the way with fashion and lifestyle logistics. Seize every new trend efficiently with logistics that drives resilience.
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
            <span className="text-blue-600 font-medium text-base">One logistics partner</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-base">Tailored solutions</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-base">Global network</span>
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
              onClick={() => setActiveTab('industries')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'industries'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Industries
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
          {/* Lifestyle logistics to stay responsive */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Lifestyle logistics to stay responsive
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Winning in the ever-evolving lifestyle landscape means constantly reimagining how to stay 
                    ahead of the curve. Trends get formed in a day, putting pressure on brands like you to 
                    keep up with them.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    For you, the ideal fashion and lifestyle supply chain has an end-to-end logistics partner 
                    with the capability to customise solutions as per your on-demand production cycles, make 
                    sure that your product reaches the market on time, add to your omnichannel presence, and 
                    provide insights to prepare you for every new wave.
                  </p>
                </div>
                <div>
                  <img src="/life_style-07.jpg" alt="Lifestyle Logistics" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A woman sits on the floor with a laptop beside a box of clothes, focused on her work.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Grow as a fashion and lifestyle industry leader */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Grow as a fashion and lifestyle industry leader
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  To excel in this dynamic industry, no matter how successful you've been in the past, your 
                  way of working needs to evolve continuously. It's imperative to build your strategies around 
                  agility, visibility, and reliability to prepare your supply chain for every new wave.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThunderboltOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Agility</h3>
                  <p className="text-gray-600 text-sm">
                    As consumers shift to prioritising availability over brand loyalty, versatile modern supply 
                    chain processes can help adapt swiftly.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EyeOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visibility</h3>
                  <p className="text-gray-600 text-sm">
                    Experience automation processes to get the visibility to take critical decisions even when 
                    demand is at its peak.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafetyOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliability</h3>
                  <p className="text-gray-600 text-sm">
                    Reduce friction within your supply chain with fewer handovers thanks to a reliable partner 
                    who ensures cost-efficiency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tailored fashion and lifestyle logistics solutions */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Tailored fashion and lifestyle logistics solutions
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  At Trident, we help the lifestyle industry with seamless solutions, led by experts who 
                  understand the unique requirements and standards of your industry. We leverage this knowledge 
                  to build our supply chain solutions around customer needs, allowing us to serve some of the 
                  world's most visible brands.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* INDUSTRIES TAB */}
      {activeTab === 'industries' && (
        <div>
          {/* Fashion Retail */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Fashion retail</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    This category is characterised by multiple seasons, bi-weekly launches, and varied 
                    order-to-cash cycles. It requires seamless integration across the supply chain and the 
                    ability to operate at multiple speeds to meet market demands. The right logistics partner 
                    is one that enables speed to market in line with shifting consumer needs.
                  </p>
                </div>
                <div>
                  <img src="/Fashion_retail.jpg" alt="Fashion Retail" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A man examines a jacket while standing in a clothing store.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Apparel and footwear */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/apparel_footware-08.jpg" alt="Apparel and Footwear" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A woman examines various shoes displayed in a retail store.</p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <SkinOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Apparel and footwear</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    This segment requires a logistics partner capable of managing multiple market complexities, 
                    including fragmented supply chains, coordination across numerous origins and destinations, 
                    and varied sales channels.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sports and outdoor */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CompassOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Sports and outdoor</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Sports and outdoor brands compete in fast-moving, event-driven markets. Our logistics 
                    solutions are designed to give you an edge—supporting peak moments such as major sporting 
                    events—while connecting you to global markets. By leveraging digital data, we enhance 
                    real-time supply chain visibility and end-to-end control.
                  </p>
                </div>
                <div>
                  <img src="/sports_outdoor.jpg" alt="Sports and Outdoor" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A man and woman running side by side on a sandy beach.</p>
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
                Contact Our Fashion & Lifestyle Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our specialised fashion and lifestyle logistics team for tailored supply chain solutions.
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
              <span className="text-3xl">🌧️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">30°C</div>
                <div className="text-sm text-gray-500">Light rain</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to transform your fashion & lifestyle logistics?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our industry specialists today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default FashionLifestyle;
