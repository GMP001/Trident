import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  ApiOutlined,
  ShopOutlined,
  TeamOutlined,
  RocketOutlined,
  FileProtectOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';

const CustomsServices = () => {
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
            <source src="/customer_service.mp4" type="video/mp4" />
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
            Trident Customs Services
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Experience simplified global customs with local expertise.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
              Book now
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">
              Contact us
            </button>
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
          {/* Local expertise, global reach Section */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Local expertise, global reach
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    To ensure seamless movement, prerequisites like compliance and clearances must be managed 
                    efficiently. A trusted partner who understands the complexities of your supply chain and 
                    local regulations can help in making the whole process easier.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    With Trident Customs Services, you can simplify your imports and exports anywhere in the world. 
                    We provide visibility and efficiency, a smooth compliance process, and a global network of 
                    customs experts to help keep your goods moving round the clock. Additionally, you also get 
                    the flexibility of adding customs at the time of booking your ocean shipment or at a later 
                    stage, with the help of convenient online solutions through MyCustoms.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                    Book now
                  </button>
                </div>
                <div>
                  <img src="/customer_service_01.jpg" alt="Customs Services" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Business woman chat, digital learner, customer service desk</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why choose Trident Customs Services */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Why choose Trident Customs Services?
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Trident Customs Services proactively manages your import and export activities to save you time 
                  and manage exceptions by:
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 - End-to-end integration */}
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ApiOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Providing end-to-end integration</h3>
                  <p className="text-gray-600 text-sm">
                    Integrate your customs process with our Supply Chain Management (SCM) platform for export data 
                    management and downstream import benefits.
                  </p>
                </div>

                {/* Card 2 - Global Trade and Customs Consulting */}
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <GlobalOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Trade and Customs Consulting services</h3>
                  <p className="text-gray-600 text-sm">
                    Compliance experts and specialist trade consultants help you manoeuvre the complex world of 
                    tariff codes, taxes, duties and international trade regulations to help decrease costs and 
                    increase predictability.
                  </p>
                </div>

                {/* Card 3 - More compliance control */}
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <SafetyOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Offering more compliance control</h3>
                  <p className="text-gray-600 text-sm">
                    Dedicated compliance management teams to closely monitor your customs activity along with the 
                    latest changes in legislation.
                  </p>
                </div>

                {/* Card 4 - Optimising your supply chain */}
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <RocketOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimising your supply chain</h3>
                  <p className="text-gray-600 text-sm">
                    Keep your complex supply chain running smoothly by minimising downtime and reducing costs with 
                    a tailor-made approach that's unique to your business needs.
                  </p>
                </div>

                {/* Card 5 - Collaborating with customs clearance agents */}
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <TeamOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborating with Trident customs clearance agents</h3>
                  <p className="text-gray-600 text-sm">
                    A close working relationship with one customs service provider throughout your cargo journey; 
                    someone who understands your business needs and increases your supply chain efficiency and visibility.
                  </p>
                </div>

                {/* Card 6 - Managing risk and unpredictability */}
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <FileProtectOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Managing risk and unpredictability</h3>
                  <p className="text-gray-600 text-sm">
                    A centralised team of experts to execute your customs process with compliance and efficiency.
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
                Contact Our Customs Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our customs clearance specialists for assistance with your import and export compliance needs.
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
              <span className="text-3xl">⛅</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">31°C</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to simplify your customs clearance?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our customs experts today</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
              Book now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomsServices;
