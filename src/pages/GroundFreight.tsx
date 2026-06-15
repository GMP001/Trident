import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const GroundFreight = () => {
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
            <source src="/container_on_truck_video_02.mp4" type="video/mp4" />
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 font-light tracking-wide">
            Trident Ground Freight
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Get seamless and reliable non-containerised ground transportation with integrated trucking services.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
              Our services
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex flex-wrap gap-8 justify-start items-center">
            <span className="text-blue-600 font-medium text-base">Full Truckload (FTL)</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-base">Less-than-Truckload (LTL)</span>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 font-medium text-base">Cross-Border FTL and LTL</span>
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
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
            Our FTL and LTL ground freight services complement our portfolio of global shipping, port, 
            and fulfilment services to ensure your cargo is handled with the utmost care and efficiency 
            from origin all the way to your end customer.
          </p>
        </div>
      </section>

      {/* Full Truckload (FTL) Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Full Truckload (FTL)
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                By combining cutting-edge transportation technology with extensive trucking services, 
                we help you reach every point in your supply chain with ease, ensuring hassle-free 
                shipping every time. Choose from a range of value-added services, such as multi-stop 
                deliveries, and customisable service levels to meet your specific needs.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Contact us →
              </button>
            </div>
            <div>
              <img src="/full_truck_load.jpg" alt="Full Truckload FTL" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Less-than-Truckload (LTL) Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img src="/loose_truck_load.jpg" alt="Less-than-Truckload LTL" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Less-than-Truckload (LTL)
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Get the flexibility and convenience you need for goods that don't require a full truckload. 
                With our intricate trucking network, we'll move your low cargo volumes from end-to-end 
                with care, precision, and reliability. Enjoy value-added-services such as time-definite 
                trucking, expedited services, and groupage options.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Contact us →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Border FTL and LTL Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Cross-Border FTL and LTL
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                With our long history of international trade and customs expertise, you can rely on our 
                efficient cross-border FTL and LTL services to transport your goods seamlessly between 
                countries. We can help you set up recurring trade flows or explore entering new geographies 
                with smaller shipments, from pick up through to delivery.
              </p>
              <div className="flex gap-4">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                  Contact us →
                </button>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                  Learn more →
                </button>
              </div>
            </div>
            <div>
              <img src="/cross_border_truck.jpg" alt="Cross-Border FTL and LTL" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Trident Ground Freight Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Why Trident Ground Freight?
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimised pricing</h3>
              <p className="text-gray-600 text-sm">
                Streamline your trucking spend through our smart routing, precise planning, and efficient 
                asset utilisation – ensuring every kilometre delivers maximum value.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Speed and network efficiency</h3>
              <p className="text-gray-600 text-sm">
                Accelerate your cargo flow with dynamically optimised lanes and expedited routes that 
                minimise distance, cut dwell time, and keep operations moving without delay.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery reliability</h3>
              <p className="text-gray-600 text-sm">
                Count on consistent, on‑schedule performance backed by Trident's proven track record – 
                ensuring your cargo arrives safely and predictably every time.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible capacity</h3>
              <p className="text-gray-600 text-sm">
                Stay agile during market fluctuations with strong asset utilisation and a resilient partner 
                network that ensures dependable capacity when and where you need it.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">State-of-the-art technology</h3>
              <p className="text-gray-600 text-sm">
                Gain full end‑to‑end visibility with a powerful digital platform offering seamless integration, 
                real‑time tracking, and complete control across every inland milestone.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer support</h3>
              <p className="text-gray-600 text-sm">
                Resolve issues quickly with fast, expert assistance from trusted local professionals who 
                understand your routes, regulations, and operational realities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Our Sales Team Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Contact our sales team
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reach out to our team of experts for any further assistance with your trucking needs.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get in touch</h3>
              <p className="text-gray-600 text-sm">Head to our contact form to start an enquiry.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Select your enquiry</h3>
              <p className="text-gray-600 text-sm">Pick enquiry type. For new customers, select 'booking'.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit your request</h3>
              <p className="text-gray-600 text-sm">Fill in your contact information and submit.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get local assistance</h3>
              <p className="text-gray-600 text-sm">Our regional sales team will respond shortly.</p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Need Support Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                Need support? Our experts are here to help
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Find answers to your questions and get in touch with our experts for support.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
                Contact us
              </button>
            </div>
            <div>
              <img src="/call_us_staff.jpg" alt="Customer Support" className="w-full h-auto rounded-lg shadow-md" />
            </div>
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
                What is ground freight?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ground freight refers to the transportation of goods via trucks or other vehicles over land. 
                It's a flexible and efficient way to move cargo from one location to another, whether locally, 
                regionally, or across borders.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How is a full-truckload (FTL) different from Less Than Truckload (LTL)?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                FTL and LTL are both non-containerised ground transportation. FTL uses the whole trailer for 
                one customer, while LTL combines multiple shipments from different customers in one truck 
                for smaller shipping volumes.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 3 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                When should I use Less-than-Truckload (LTL)?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Less-than-Truckload shipping is ideal for shipments less than 12 pallets.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 4 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can Trident accommodate specialised trucking requirements, such as temperature-controlled or hazardous materials?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                As of now, we do not offer temperature-controlled or hazardous materials transportation options.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 5 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I get a Full Truckload (FTL) quote?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can get an instant FTL quote by contacting our sales team or using our online booking platform. 
                Simply provide your shipment details, origin, destination, and preferred pickup date.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 6 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What are the coverage areas for Trident Full Truckload (FTL) and Less-than-Truckload (LTL) services?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our trucking services are available in regions across the globe. To learn more about the services 
                we offer in your regions, please contact our sales team.
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
          <h3 className="text-3xl mb-4 font-light">Ready to ship with ground freight?</h3>
          <p className="text-xl text-gray-300 mb-8">Contact our trucking experts for a customized solution</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
              Get a quote
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

export default GroundFreight;
