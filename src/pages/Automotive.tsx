import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  ThunderboltOutlined,
  EyeOutlined,
  SafetyOutlined,
  RocketOutlined,
  CarOutlined,
  ToolOutlined,
  ThunderboltOutlined as ElectricOutlined,
  BulbOutlined,
} from '@ant-design/icons';

const Automotive = () => {
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
              backgroundImage: `url('/car_making_in_factory_white.jpg')`,
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
            Automotive Logistics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Shift gears in automotive logistics for uninterrupted flow. Navigate disruptions confidently by enhancing adaptability and flexibility with integrated logistics solutions.
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
              onClick={() => setActiveTab('sectors')}
              className={`py-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === 'sectors'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Industry Sectors
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
          {/* Future-proofing global automotive supply chains */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Future-proofing global automotive supply chains
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Significant changes in the automotive industry are driving a greater focus on connectivity 
                    and the need for a resilient supply chain to ensure all automotive components—from tyres 
                    to OEMs to industrial machinery to EVs and battery manufacturers—arrive on time for production. 
                    The right logistics partner can play a significant role in helping forecast trends and create 
                    new market opportunities.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    With digital visibility tools and proactive integrated solutions, Trident empowers your 
                    automotive supply chain to stay adaptive and keep meeting production flows and deadlines, 
                    helping you go all the way.
                  </p>
                </div>
                <div>
                  <img src="/car_engine.jpg" alt="Automotive Supply Chain" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A factory scene showing a man working on a car, surrounded by tools and automotive equipment.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Lead with automotive supply chain strategy */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Lead with automotive supply chain strategy
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Ensure that your components, technology, and raw materials are always available to maintain 
                  continuous operations—whether you're an automotive OEM or a tyre, industrial vehicle, or EV 
                  or battery manufacturer. To achieve this, it's imperative to build your strategies around 
                  flexibility, visibility, reliability, and efficiency.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThunderboltOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexibility</h3>
                  <p className="text-gray-600 text-sm">
                    Navigate complexities and adapt to changes in demand by adjusting inventory flow to respond 
                    to customer needs more effectively.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EyeOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visibility</h3>
                  <p className="text-gray-600 text-sm">
                    Better decision-making through access to real-time data and actionable insights to build 
                    future-forward systems.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafetyOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliability</h3>
                  <p className="text-gray-600 text-sm">
                    Greater operational control and precision in production through deep integrated logistics 
                    expertise and Trident owned assets.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RocketOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Efficiency</h3>
                  <p className="text-gray-600 text-sm">
                    Meet speed-to-market needs by ensuring all components arrive on time for production with 
                    processes that drive faster decision-making and cost-optimisation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* INDUSTRY SECTORS TAB */}
      {activeTab === 'sectors' && (
        <div>
          {/* Fuelling automotive and industrial supply chains */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Fuelling automotive and industrial supply chains
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  In the automotive and industrial vehicle sectors, understanding operational dynamics is essential 
                  for efficient inventory management, cost control, navigating market challenges, and building a 
                  resilient supply chain. Leverage our tailored logistics processes to ensure timely delivery of 
                  components and finished goods across all vehicle segments.
                </p>
              </div>

              {/* Automotive OEMs */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CarOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Automotive OEMs</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Original Equipment Manufacturers (OEMs) are central to the production of automotives and 
                    industrial machinery. Their supply chains require precise Just-in-Time (JIT) and Just-in-Sequence 
                    (JIS) models, calling for minute-level synchronisation. OEMs need reliable networks, visibility, 
                    and flexibility to adapt quickly, ensuring seamless assembly line operations.
                  </p>
                </div>
                <div>
                  <img src="/car_alloy.jpg" alt="Automotive OEMs" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A display rack filled with various car wheels showcasing different styles and sizes.</p>
                </div>
              </div>

              {/* Tyre and component logistics */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 md:order-1">
                  <img src="/car_tyre.jpg" alt="Tyre and component logistics" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A man in an auto parts store holding a clipboard and reviewing inventory among shelves filled with car parts.</p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ToolOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Tyre and component logistics</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Tyre logistics is vital for OEMs and aftermarket operations, managing flow of raw materials 
                    like rubber and steel, production schedules, and timely delivery to assembly plants and 
                    distribution hubs. Just-In-Time (JIT) requirements demand precision, while traceability is 
                    important for compliance. Real-time tracking and AI-driven forecasting optimise processes, 
                    cut costs, and boost timely operations.
                  </p>
                </div>
              </div>

              {/* EVs and battery manufacturers */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ElectricOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">EVs and battery manufacturers</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    EVs and battery logistics add complexity to automotive supply chains, requiring special handling, 
                    strict safety compliance, and sometimes temperature control for battery cells. Digital solutions 
                    like real-time tracking and AI forecasting ensure precision and visibility. Risk management 
                    relies on nearshoring, dual sourcing, and inventory buffers.
                  </p>
                </div>
                <div>
                  <img src="/car_engine.jpg" alt="EVs and battery manufacturers" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">A man performing car maintenance in a garage, using tools and equipment to work on the vehicle.</p>
                </div>
              </div>

              {/* Industrial vehicle logistics */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/excavator.jpg" alt="Industrial vehicle logistics" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">An industrial excavator parked on a mountainside, surrounded by rocky terrain and greenery.</p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <BulbOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Industrial vehicle logistics</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Logistics for industrial and agricultural vehicles involve specialised handling of heavy and 
                    out-of-gauge components. With long production cycles and operations in diverse regions, 
                    industrial vehicles need contract logistics hubs near manufacturing sites, inland transport 
                    networks, and customs expertise to ensure timely delivery and optimise costs.
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
                Contact Our Automotive Logistics Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our specialised automotive logistics team for tailored supply chain solutions.
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
                <div className="text-lg font-semibold text-gray-800">27°C</div>
                <div className="text-sm text-gray-500">Mostly cloudy</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to transform your automotive logistics?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our automotive industry specialists today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default Automotive;
