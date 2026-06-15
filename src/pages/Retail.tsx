import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  ThunderboltOutlined,
  RocketOutlined,
  EyeOutlined,
  ExpandOutlined,
  ShoppingOutlined,
  HomeOutlined,
  GlobalOutlined,
  ShopOutlined,
} from '@ant-design/icons';

const Retail = () => {
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
              backgroundImage: `url('/retail_hero.jpg')`,
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
            Retail Logistics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Retail logistics that drives growth
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
              onClick={() => setActiveTab('categories')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'categories'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Retail Categories
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
          {/* Retail logistics that drives growth */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Retail logistics that drives growth
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The retail industry is evolving at an unprecedented pace, fuelled by the rapid growth of 
                    e-commerce and the challenge of meeting changing seasonal demands. To keep up, businesses 
                    must respond faster and adapt quickly. Retail supply chains have needed to transform to 
                    seamlessly integrate omnichannel solutions while also optimising stocks and maintaining 
                    inventory flow.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Businesses that want to stay in the lead of this evolving landscape should prioritise 
                    working with a strategic logistics partner who can give enhanced visibility and flexibility, 
                    empowering you to go all the way and secure your competitive edge.
                  </p>
                </div>
                <div>
                  <img src="/retail_01.jpg" alt="Retail Logistics" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A warehouse worker using a tablet to verify inventory, surrounded by storage shelves and boxes.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Stay ahead with Trident retail supply chain strategy */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Stay ahead with Trident retail supply chain strategy
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A resilient omnichannel ecosystem is essential for retailers to deliver a personalised and 
                  seamless buying experience across a retail supply chain process flow. It's imperative to 
                  build your strategies around agility, efficiency, visibility, and flexibility—the strongest 
                  drivers of precision in a complex logistics world.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThunderboltOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Agility</h3>
                  <p className="text-gray-600 text-sm">
                    Respond quickly to disruptions, changes in demand, and market dynamics to maintain an 
                    optimal flow of inventory without delay.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RocketOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Efficiency</h3>
                  <p className="text-gray-600 text-sm">
                    Move forward with growth ambitions for your retail business while keeping costs in check 
                    and maintaining operational efficiency.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EyeOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visibility</h3>
                  <p className="text-gray-600 text-sm">
                    Stay one step ahead in this bumpy retail landscape with full visibility at every step of 
                    your supply chain to drive precision and eliminate uncertainty.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExpandOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexibility</h3>
                <p className="text-gray-600 text-sm">
                    Seamlessly switch gears when needed to optimise business operations and handle the 
                    ever-evolving seasonal demands of the retail industry.
                </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* RETAIL CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <div>
          {/* Navigating the retail market */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Navigating the retail market
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  As a retailer, you need a deep understanding of seasonal demands and customer behaviour to 
                  ensure your goods are available on the right channels, at the right time, in the right quantity. 
                  Take advantage of Trident's retail expertise and other value-added services that help you meet 
                  the unique requirements of various retail categories.
                </p>
              </div>

              {/* Supermarkets and hypermarkets */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Supermarkets and hypermarkets</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Supermarkets, hypermarkets, and discounters all face fierce competition and must operate 
                    on slim margins, making it essential for them to adapt quickly to changing demand. 
                    Integrated logistics synchronises inventory across all channels, with real-time visibility 
                    to streamline distribution and keep operations in check. A connected supply chain ensures 
                    accurate inventory flow for seasonal demands and full cost transparency.
                  </p>
                </div>
                <div>
                  <img src="/retail_02.jpg" alt="Supermarkets and hypermarkets" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A woman examining a shelf filled with various food items in a grocery store.</p>
                </div>
              </div>

              {/* Homeware and home improvement */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1">
                  <img src="/home-improvement.avif" alt="Homeware and home improvement" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A woman standing in a store, thoughtfully looking at a couch on display.</p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <HomeOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Homeware and home improvement</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Dealing with small to heavy demand-based inventory requires precision to accommodate 
                    transportation and storage challenges. This, combined with demand fluctuations, requires 
                    visibility and agility to adapt to trends and seasonality. The right logistics partner 
                    streamlines inventory processes so that products are on the shelves when customers need 
                    them most.
                  </p>
                </div>
              </div>

              {/* E-tailers */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <GlobalOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">E-tailers</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    E-tailers must keep up with the need for speed and personalisation to enhance the online 
                    shopping experience across multiple channels, in terms of product availability, swift 
                    deliveries, and easy returns. This calls for a flexible and digitally advanced supply chain 
                    with strategic warehousing and distribution solutions to carry out order fulfilment with 
                    precision.
                  </p>
                </div>
                <div>
                  <img src="/retail_04.jpg" alt="E-tailers" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A woman in a business suit holding a tablet, appearing focused and engaged in her work.</p>
                </div>
              </div>

              {/* Department stores */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/retail_05.jpg" alt="Department stores" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Woman choosing from a range of products in a department store.</p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShopOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Department stores</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Department stores need flexibility to ensure product availability and visibility for better 
                    inventory planning. While for certain stores it's quality that takes precedence, for some 
                    affordability must take the forefront to stay competitive in a margin-driven industry. With 
                    Trident, you can identify cost-optimisation opportunities and apply exception management 
                    to optimise stock levels.
                  </p>
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
                Contact Our Retail Logistics Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our specialised retail logistics team for tailored supply chain solutions.
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
              <span className="text-3xl">☀️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">31°C</div>
                <div className="text-sm text-gray-500">Sunny</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to transform your retail logistics?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our retail industry specialists today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default Retail;
