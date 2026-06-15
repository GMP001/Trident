import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AirFreight = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <source src="/take_off_02.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark Overlay */}
          <div 
            className="absolute bg-black/50" 
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 font-light tracking-wide">
            Trident Air Freight
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Bypass disruptions with a faster, more frequent, and reliable service.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
              Get instant prices
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-8 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-8 justify-start items-center">
            <span className="text-blue-600 font-medium text-lg">Global</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-lg">Reliable</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-lg">Owned Fleet</span>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-50 border-b border-gray-200">
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

      {/* Services Title Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
            Services
          </h2>
          <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Take control and resilience-proof your supply chain with our fast and flexible air freight services.
          </p>
        </div>
      </section>

      {/* Air Freight Section */}
      <section className="py-12 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Air Freight
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Speed and global reach are just the beginning. Be ready for price transparency, reliability, 
                and cost efficiency with Trident flying your cargo all the way.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">Transparent real-time prices for routes across 75,000+ trade lanes worldwide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">First-class reliability – enabled by Trident-owned fleet combined with a strategic network of partner airlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">Accurate, real-time status of your shipments via air cargo tracking</span>
                </li>
              </ul>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>
            <div>
              <img src="/air_freight.avif" alt="Air Freight" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Trident Air Cargo Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src="/air_freight_02.jpg" alt="Trident Air Cargo" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Trident Air Cargo
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Enjoy preferred rates, reliability, and flexibility with our in-house carrier and growing flight network.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With decades of air freight experience and a fleet operated entirely under Trident control, 
                we deliver dependable capacity on key trade lanes. Our network is designed for speed and 
                efficiency. By using less congested airports and Trident-owned hubs, we bypass bottlenecks 
                and reduce transit times.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sea-Air Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Sea-Air
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Reduce costs, save time, and minimise your shipment's greenhouse gas emissions by leveraging 
                our integrated Sea-Air services.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Trident Sea-Air connects global ports and airports via our transhipment hubs to align cargo 
                flow with your production needs. By moving your cargo to the right place at the right time, 
                we avoid congestion and reduce storage costs.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>
            <div>
              <img src="/air_freight_04.avif" alt="Sea-Air Service" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Air Charter Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src="/air_freight_05.avif" alt="Air Charter" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Air Charter
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Get an entire freighter dedicated to your cargo for complete control of schedules, cargo size, 
                and security. With Trident Air Charter, you benefit from:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">A dedicated team of charter experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">Highly customisable solutions to and from any destination, 24/7/365</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">Live tracking and proactive status updates</span>
                </li>
              </ul>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Trident Air Freight Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Why Trident Air Freight Services?
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Increased flexibility</h3>
              <p className="text-gray-600 text-sm">Tackle disruptions effortlessly with our own-controlled assets and global partnerships</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced agility</h3>
              <p className="text-gray-600 text-sm">Get better control by slowing down or speeding up your supply chain as per your needs</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure movement</h3>
              <p className="text-gray-600 text-sm">Best-in-class ground handling protocols, limiting risks of theft and damage</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">More reliability</h3>
              <p className="text-gray-600 text-sm">More lead time transparency with on-time arrival and departure schedules</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wider reach</h3>
              <p className="text-gray-600 text-sm">Leverage our global network to reach more locations and customers globally</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">One-stop shop</h3>
              <p className="text-gray-600 text-sm">Integrate with our other services (Ocean, Customs) for true end-to-end transportation</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}>
          <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
            Need air transport? Here's how it works
          </h2>
          <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
              Book
            </button>
            <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-all font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Weather/Time Widget */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⛈️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">T-storms</div>
                <div className="text-sm text-gray-500">At night</div>
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

      {/* Share Section */}
      <section className="py-8 px-8 md:px-16 lg:px-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Share</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

            {/* FAQ Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {/* FAQ 1 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What are the benefits of using air freight services?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Using air freight services has various benefits, particularly for time-sensitive or 
                high-value shipments. Think speed, reliability, global access, and real-time tracking.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 2 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What types of air freight services are available through Trident?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer air freight with three service levels, air charter, sea-air, and Trident Air Cargo. 
                We also have specialist services for shipping dangerous goods or special cargo. Find the 
                ideal combination of speed, cost, and frequency of flights for your supply chain.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 3 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I track my air cargo shipment?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can get the status of your Trident air freight shipment via our online air tracking portal.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl mb-4 font-light">Ready to ship with air freight?</h3>
          <p className="text-xl text-gray-300 mb-8">Contact our air freight experts for a customized solution</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
              Get instant prices
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

export default AirFreight;
