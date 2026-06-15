import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const InlandTransport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section with Video Background and Curved Blue Border */}
      <section className="relative h-[70vh] flex items-center justify-start overflow-visible">
        
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
            <source src="/container_moving_on_truck.mp4" type="video/mp4" />
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
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-5xl md:text-6xl lg:text-6xl text-white leading-tight mb-6 font-light tracking-wide">
            Inland Transport
          </h1>
          <div className="w-24 h-0.5 bg-blue-500 mb-8"></div>
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            Streamline your supply chain with seamless inland transport for scalable regional efficiency.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all text-base font-medium">
              Book now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all text-base font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">One logistics partner</h3>
              <p className="text-gray-600">Simplify your supply chain with a single point of contact</p>
            </div>
            <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For all business needs</h3>
              <p className="text-gray-600">Scalable solutions for businesses of any size</p>
            </div>
            <div className="text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global network</h3>
              <p className="text-gray-600">Connected infrastructure across regions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Description Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight mb-6 font-light">
                Services
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-8"></div>
              <p className="text-xl text-gray-600 leading-relaxed">
                We offer comprehensive services for smooth end-to-end inland transport of your containerised 
                and non-containerised cargo. Whatever the size and type of your shipments, we collect from 
                and deliver to inland locations with precision and care.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="/container_on_tuck_05.jpg" alt="Inland Transport Services" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <h2 className="text-3xl md:text-4xl text-gray-900 text-center mb-12 font-light">
            Our Inland Transport Solutions
          </h2>
          
          <div className="space-y-12">
            {/* Intermodal - Carrier Haulage */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-80 overflow-hidden">
                <img src="/container_on_truck_hero.jpg" alt="Intermodal Carrier Haulage" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Intermodal - Carrier Haulage</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Simplify end-to-end transport by connecting containerised cargo shipped with Trident Ocean services to inland locations.
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                    Book now
                  </button>
                  <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-all text-sm font-medium">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            {/* Intermodal - Multi Carrier */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="order-2 md:order-1 p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Intermodal - Multi Carrier</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Streamline containerised inland delivery from any ocean carrier's terminal with integrated road, rail, and barge connections.
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                    Book now
                  </button>
                  <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-all text-sm font-medium">
                    Learn more
                  </button>
                </div>
              </div>
              <div className="order-1 md:order-2 h-80 overflow-hidden">
                <img src="/container_stack_at_port.jpg" alt="Intermodal Multi Carrier" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Intercontinental Rail Transportation */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-80 overflow-hidden">
                <img src="/container_on_train_01.jpg" alt="Intercontinental Rail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Intercontinental Rail Transportation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Move your cargo between Asia and Europe with fast, reliable and cost-effective containerised rail services.
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                    Book now
                  </button>
                  <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-all text-sm font-medium">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            {/* Trident Ground Freight */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="order-2 md:order-1 p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Trident Ground Freight</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Connect your logistics network with reliable ground freight for full or partial truckloads across all distances.
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                    Book now
                  </button>
                  <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-all text-sm font-medium">
                    Learn more
                  </button>
                </div>
              </div>
              <div className="order-1 md:order-2 h-80 overflow-hidden">
                <img src="/container_on_truck_06.jpg" alt="Trident Ground Freight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Links */}
      <section className="py-12 px-8 md:px-16 lg:px-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Services</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Local info</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">FAQs</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Contact us</button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">Book now</button>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-8 px-8 md:px-16 lg:px-24 bg-white">
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

      {/* CTA Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl text-white mb-4 font-light">Ready to streamline your inland transport?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our logistics experts today</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
              Contact us
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">
              Book now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InlandTransport;
