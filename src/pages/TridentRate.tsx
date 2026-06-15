import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  DollarOutlined,
  ThunderboltOutlined,
  EditOutlined,
  ApartmentOutlined,
  BellOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const TridentRate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section with Curved Blue Border */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        
        {/* Background Image with Curve */}
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
              backgroundImage: `url('/trident_rate_query_hero.jpg')`,
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
          className="absolute bottom-0 pointer-events-none"
          style={{
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
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
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
          className="absolute bottom-0 pointer-events-none"
          style={{
            height: '35px',
            background: '#38bdf8',
            left: '150px',
            right: '150px',
            zIndex: 15,
          }}
        />
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">
            Trident Rate
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Handle the complexity of logistics with speed and certainty. Book and manage shipments online – all from one simple platform.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
              Check prices
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">
              Create free account
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-8">
            <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
              Services
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              Local info
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Shipping made simple and efficient */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                Shipping made simple and efficient
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                As markets constantly change, Trident Rate helps you stay prepared for any opportunity and 
                execute with full clarity on costs and capacity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                One platform is all it takes to manage your logistics from end to end. Ship with flexible 
                booking options and the certainty of instant prices and guaranteed loading, so you can 
                quickly deliver on customer needs with greater control every step of the way.
              </p>
            </div>
            <div>
              <img src="/trident_rate_query.jpg" alt="Trident Rate Platform" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">Smiling professional wearing glasses working on a laptop at a desk with a coffee mug nearby</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trident Rate Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Why Trident Rate?
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take the uncertainty out of shipping with one convenient platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Transparent prices */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <DollarOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent prices</h3>
              <p className="text-gray-600 text-sm">
                Get all costs up front for the full shipping journey. Book with instant prices and no hidden charges.
              </p>
            </div>

            {/* Card 2 - Speedy bookings */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ThunderboltOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Speedy bookings</h3>
              <p className="text-gray-600 text-sm">
                Get instant availability, booking, and confirmation, and a full overview of departures, 
                arrivals, and transit time.
              </p>
            </div>

            {/* Card 3 - Modify shipments online */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <EditOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modify shipments online</h3>
              <p className="text-gray-600 text-sm">
                Amend bookings online when plans change and get an instant revised booking confirmation.
              </p>
            </div>

            {/* Card 4 - End-to-end services */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ApartmentOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-end services</h3>
              <p className="text-gray-600 text-sm">
                Upgrade your logistics with extra services for simple, safe, and hassle-free shipping from end to end.
              </p>
            </div>

            {/* Card 5 - Secure your rate */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BellOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure your rate</h3>
              <p className="text-gray-600 text-sm">
                Sign up for Trident Rate Alerts to be among the first to know when your required routes become available.
              </p>
            </div>

            {/* Card 6 - Global reach */}
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GlobalOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global reach</h3>
              <p className="text-gray-600 text-sm">
                Reach nearly every local market across the globe with expert handling all the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">☀️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">Hot days ahead</div>
                <div className="text-sm text-gray-500">28°C</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to simplify your shipping?</h3>
          <p className="text-xl text-blue-100 mb-8">Get started with Trident Rate today</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
              Check prices
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">
              Create free account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TridentRate;
