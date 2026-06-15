import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  DashboardOutlined,
  LineChartOutlined,
  RocketOutlined,
  ExperimentOutlined,
  StockOutlined,
  CustomerServiceOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

const Chemicals = () => {
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
              backgroundImage: `url('/chemical_05_hero.jpg')`,
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
            Chemicals Logistics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Be ready for new possibilities in a precision-focused world
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
            Contact us
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
              onClick={() => setActiveTab('services')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'services'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Services
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
          {/* Be ready for new possibilities */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Be ready for new possibilities in a precision-focused world
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    To compete in a world of uncertainties, the key is to adopt smarter, more resilient ways 
                    to deliver chemicals safely while staying fast and agile to react to supply chain challenges. 
                    Keep chemical inventories moving and costs in control with always-on digital visibility, a 
                    flexible mix of multimodal transport options and seamless end-to-end operations, so that 
                    you can go all the way.
                  </p>
                </div>
                <div>
                  <img src="/chemical_agrochemical-nitrogen.avif" alt="Chemicals Industry" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Industry overview */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Industry overview
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  In a world where 96% of all manufactured goods depend on chemicals in one way or another, 
                  there are ample opportunities for chemical companies to grow. Chemical manufacturers, 
                  striving to secure a larger share in the marketplace, have created an extremely competitive 
                  battleground.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Several industry trends – protectionist trade policies, tariff wars, and industry consolidation 
                  – are also pushing businesses to adopt new ways to stand out. As these trends permeate the 
                  chemical industry, many businesses are remodelling to drive growth and profitability. At the 
                  core of this transformation is the need to build resilience - with the ability to adapt, 
                  digitise, and modernise. Safety remains a high priority while decarbonisation has increasingly 
                  become a focus.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Chemical companies see their supply chains playing a crucial role in their business transformation. 
                  Whether they need to support continuous production lines with effective storage solutions; increase 
                  margins with supply chain cost-efficiencies; improve safety and compliance, or gain customer 
                  loyalty with greater visibility and on-time deliveries, they are making high demands of their 
                  supply chain partners to add value at every stage of their supply chain.
                </p>
              </div>
            </div>
          </section>

          {/* Six trends shaping the chemical industry */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Six trends are shaping the chemical industry
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <CustomerServiceOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer centricity</h3>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>Meeting the need for flexible supplies</li>
                    <li>Reducing lead times to support customer production</li>
                    <li>Customising supply chain solutions as per the need</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <SafetyOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cargo-based supply chains</h3>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>Extensive compliance expertise for dangerous cargo</li>
                    <li>Smart solutions that account for weight to value ratio</li>
                    <li>Optimised solutions for low margin products</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <EnvironmentOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>Delivering products for a circular economy</li>
                    <li>Reducing overall GHG emissions footprint</li>
                    <li>Meeting government regulations, locally</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <DashboardOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Push driven supply chains</h3>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>Managing inventory costs for made-to-stock (MTS) processes</li>
                    <li>Increasing customer loyalty for made-to-order (MTO) processes</li>
                    <li>Optimising working capital (despite low margins) with better logistics planning</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <LineChartOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Modernisation</h3>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>Digitalising for both operational and strategic purposes</li>
                    <li>Increasing speed of innovation</li>
                    <li>Increasing transparency for customers through integration</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <RocketOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Capturing new markets</h3>
                  <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                    <li>Responding to demand with agility</li>
                    <li>Reaching customers all over the world</li>
                    <li>Tapping into developing markets</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div>
          {/* Creating services tailored to you */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Creating services tailored to you
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From plastics to paint, beauty to home care products and even automotive parts, the chemical 
                  supply chain comprises a myriad of products. At Trident, our experts understand the unique 
                  requirements of your product and business and build a supply chain solution that is tailor-made 
                  for you.
                </p>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
                  We distinguish between three overarching types of chemicals:
                </p>
              </div>

              {/* Agrochemicals and fertilisers */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Agrochemicals and fertilisers</h3>
                    </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Your industry is in a state of constant growth. One of the primary driving factors behind 
                    this growth is that the global demand for food production will always be there. Thus, the 
                    need for agrochemicals and fertilisers will never cease to exist. However, just because 
                    there's demand doesn't mean that it's smooth sailing for your industry. Therefore, you need 
                    a trusted logistics integrator who can help boost your business and support conversion.
                  </p>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                    Learn more →
                  </button>
                </div>
                <div>
                  <img src="/chemical_agrochemical-nitrogen.avif" alt="Agrochemicals and fertilisers" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Agrochemicals – A green agricultural field and the N fertiliser ratio.</p>
                </div>
              </div>

              {/* Commodity Chemicals */}
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <StockOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Commodity Chemicals</h3>
                </div>
                <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Commodity chemicals are produced in large volumes where price is the main influencing factor 
                  as product differentiation within commodity chemicals is very low. At Trident, we divide 
                  commodity chemicals into three sub-groups:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-2">Petrochemicals</h4>
                    <p className="text-gray-600 text-sm">The chemical products obtained from petroleum or natural gas, including olefins, aromatics and synthetic gasses.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-2">Base Inorganics</h4>
                    <p className="text-gray-600 text-sm">Chemical substances used as starting materials including industrial gasses, fertilisers, acids, bases and chlorine.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-2">Polymers</h4>
                    <p className="text-gray-600 text-sm">Natural or synthetic materials including plastics, resin, rubber, fibres and elastomers.</p>
                  </div>
                </div>
                <div className="mt-6">
                  <img src="/commodity-chemicals.webp" alt="Commodity Chemicals" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>

              {/* Speciality Chemicals */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/speciality-chemicals.avif" alt="Speciality Chemicals" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ExperimentOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Speciality Chemicals</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Speciality chemicals cover a wide variety of chemicals and are generally known as performance 
                    chemicals, as they are used based on their performance or function. This group of chemicals 
                    is used as ingredients in finished products and to improve manufacturing processes with a 
                    wide variety of effects.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    They encompass two sub-groups: Consumer Chemicals include soaps, detergents, perfumes and 
                    cosmetics. Other chemical substances can be dedicated to agricultural purposes like crop 
                    protection, paint, inks, dyes and pigments. These types of chemicals are often produced in 
                    small volumes.
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
                Contact Our Chemicals Logistics Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our specialised chemicals logistics team for tailored supply chain solutions.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
                Contact us
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
              <span className="text-3xl">🌡️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">28°C</div>
                <div className="text-sm text-gray-500">Moderate</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to transform your chemicals logistics?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our chemicals industry specialists today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Contact us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Chemicals;

