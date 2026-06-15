import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  EyeOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  GlobalOutlined,
  CoffeeOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const FMCG = () => {
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
            <source src="/fmcg_hero.mp4" type="video/mp4" />
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
            FMCG Logistics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            FMCG supply chains, connected and powered up. Integrated logistics for visibility, agility and efficiency in a fast-changing world.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
            Get in touch
          </button>
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
              FMCG Segments
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
          {/* Unlock new possibilities in FMCG supply chain management */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Unlock new possibilities in FMCG supply chain management
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    On-time in-full delivery is everything in the FMCG business. In a world that is witnessing 
                    disruptions, raw material shortages and increasing costs, it is critical for the FMCG supply 
                    chain to be efficient, resilient and agile.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Stay ahead with an integrated logistics solution: one that optimises the flow of every aspect 
                    of your FMCG supply chain, supports efforts to reduce GHG emissions, and helps you go all the way.
                  </p>
                </div>
                <div>
                  <img src="/fmcg_01.jpg" alt="FMCG Supply Chain" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Warehouse workers in safety vests sorting packages on a conveyor belt for distribution</p>
                </div>
              </div>
            </div>
          </section>

          {/* Level up your FMCG supply chain strategy */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Level up your FMCG supply chain strategy
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  In today's dynamic FMCG landscape, a robust supply chain, connected across functions to optimise 
                  flow, is key to growth and meeting consumer demands. The strongest strategies hinge on visibility, 
                  agility, and efficiency.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EyeOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visibility</h3>
                  <p className="text-gray-600 text-sm">
                    Stay informed to take the right decisions and ensure products are available across every channel.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThunderboltOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Agility</h3>
                  <p className="text-gray-600 text-sm">
                    Maintain flexibility to navigate risks, meet evolving demand, and ensure on-time, in-full 
                    delivery everywhere.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RocketOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Efficiency</h3>
                  <p className="text-gray-600 text-sm">
                    Drive cost efficiency in fragmented, low-margin markets through supply chain connectivity.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* FMCG SEGMENTS TAB */}
      {activeTab === 'segments' && (
        <div>
          {/* Navigating the FMCG market segment */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Navigating the FMCG market segment
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Diving into the FMCG market segment requires deep understanding of consumer behaviour, category 
                  nuances, and demand patterns. To help with this, we offer Lead Logistics solutions designed to 
                  meet the unique requirements of key FMCG categories. So, harness the power of our global operations 
                  networks, owned-asset control, digital technology, multiple provider coordination and solutions 
                  that can be tailored to your needs.
                </p>
              </div>

              {/* Beer, wine, spirits and tobacco */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <GlobalOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Beer, wine, spirits and tobacco</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    International compliance is a complex process when it comes to delivering alcoholic beverages 
                    to different parts of the world. To reach your markets on time, you need to streamline your 
                    supply chain operations with a partner who is an expert at handling compliance. Lead Logistics 
                    helps you plan ahead to ensure your products move efficiently across borders.
                  </p>
                </div>
                <div>
                  <img src="/fmcg_08.jpg" alt="Beer, wine, spirits and tobacco" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Smiling customer in denim jacket choosing a wine bottle in liquor store aisle.</p>
                </div>
              </div>

              {/* Food & Beverages */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1">
                  <img src="/fmcg_03.jpg" alt="Food & Beverages" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Retail worker organizing jars on a store shelf with focus and attention.</p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CoffeeOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Food & Beverages</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    When it comes to moving your F&B products, there are often tight deadlines. To meet them, 
                    you must ensure smooth flow of products, even during disruptions. Lead Logistics helps you 
                    plan your warehousing requirements and product flows, so that you focus on what you do best 
                    – producing exceptional food and beverage products.
                  </p>
                </div>
              </div>

              {/* Home & Personal Care */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <HeartOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Home & Personal Care</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    The personal care industry is extremely fast paced. A product that's trending one day may 
                    not be the next day. Being competitive in a market where demand changes constantly, 
                    optimising supply chains becomes absolutely critical. With Lead Logistics, you can plan 
                    ahead to meet shifting market demands and ensure on-time deliveries.
                  </p>
                </div>
                <div>
                  <img src="/fmcg_04.jpg" alt="Home & Personal Care" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Customer selecting lipstick from a cosmetics store display.</p>
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
                Contact Our FMCG Logistics Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our specialised FMCG logistics team for tailored supply chain solutions.
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
              <span className="text-3xl">💧</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">Very humid</div>
                <div className="text-sm text-gray-500">Now</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to transform your FMCG logistics?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our FMCG industry specialists today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default FMCG;
