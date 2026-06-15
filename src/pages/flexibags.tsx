import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  CheckOutlined,
  SafetyOutlined,
  EyeOutlined,
  TeamOutlined,
  ContainerOutlined,
  CalendarOutlined,
  DropboxOutlined,
  ShareAltOutlined,
  LoginOutlined,
  SearchOutlined
} from '@ant-design/icons';

const Flexibags = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How it Works' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'contact', label: 'Contact us' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      
      {/* Hero Section with Thick Blue Curved Border */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        {/* Background Image with Curve */}
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/lubricant_01_hero.jpg')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
            <div className="absolute inset-0 bg-black/55" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}></div>
          </div>
        </div>

        {/* Sky Blue Thick Border - Left side */}
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />

        {/* Sky Blue Thick Border - Right side */}
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />

        {/* Full Width Straight Blue Thick Border */}
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        
        {/* Content */}
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">Flexibag Logistics</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">Transport bulk liquids safely and efficiently.</p>
          <Link to="/contact">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Contact us</button>
          </Link>
        </div>
      </section>

      {/* Main Content with marginLeft alignment */}
      <div style={{ marginLeft: '300px' }}>
        
        {/* Tab Navigation - Sticky */}
        <div className="sticky top-20 z-20 bg-white border-b border-gray-200 px-8 md:px-16 lg:px-24">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 text-sm font-medium transition-all relative ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* What is Flexibag Logistics? */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">What is Flexibag Logistics?</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    If you are in the need of transporting your liquid cargo in bulk efficiently and safely, the risks of spillage and contamination due to container quality and sub-optimal safety procedures can be challenging. Flexibag Logistics is a specialised solution for transporting bulk liquid cargo efficiently and safely.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    It is achieved with a packaging method that involves flexibags placed inside high-quality containers. It is an ideal choice to move bulk wine, edible oils, or industrial chemicals. Our Flexibag system is designed to ensure that your valuable liquids remain in top condition from origin to destination.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our experts can help you streamline your bulk liquid logistics, right from booking, container selection and preparation, to final delivery.
                  </p>
                </div>
                <div>
                  <img 
                    src="/lubrican_02.jpg" 
                    alt="Flexibag Logistics" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">A busy cargo port with multiple Trident shipping containers.</p>
                </div>
              </div>
            </section>

            {/* Blue Divider */}
            <div className="px-8 md:px-16 lg:px-24">
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            </div>

            {/* The ideal choice for bulk liquid transport */}
            <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
              <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">The ideal choice for bulk liquid transport</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Most liquids can be transported in a flexibag. Our solutions work best with:</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Chemical lubricants */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src="/lubricant_03_lubricant.jpg" 
                    alt="Chemical lubricants" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <DropboxOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Chemical lubricants</h3>
                    <p className="text-gray-600">
                      Minimise your risks of spills and cross-contamination and ensure compliance with all applicable safety standards while shipping chemicals. 
                      <span className="text-gray-500 text-sm block mt-2">Example commodities: Lubricants, additives, surfactants</span>
                    </p>
                  </div>
                </div>

                {/* Edible oil */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src="/lubricant_04_edable_oil.jpg" 
                    alt="Edible oil" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <DropboxOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Edible oil</h3>
                    <p className="text-gray-600">
                      We adhere to strict food grade compliance to ensure that every drop of oil remains untouched by oxidation and contamination.
                      <span className="text-gray-500 text-sm block mt-2">Example commodities: Olive oil, palm oil, fish oil</span>
                    </p>
                  </div>
                </div>

                {/* Wines */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src="/lubricant_05_wine.jpg" 
                    alt="Wines" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <DropboxOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Wines</h3>
                    <p className="text-gray-600">
                      Move your wine all the way from the vineyard to the glass while preserving its quality and unique characteristics. Manage the seasonal fluctuations and deliver your wine to your end consumers on time.
                      <span className="text-gray-500 text-sm block mt-2">Example commodity: Bulk wine</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Blue Divider */}
            <div className="px-8 md:px-16 lg:px-24">
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            </div>

            {/* What are Flexibags? */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">What are Flexibags?</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Flexibags (also known as Flexitanks) are a practical method for transporting bulk liquids in containers. These durable, FDA-approved bags are made from multiple layers of polyethylene and polypropylene, which ensure strength and safety. They are placed inside high-quality containers and are capable of holding large volumes of non-hazardous liquids.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Advanced multi-layer technology enhances quality control, ensuring non-hazardous liquids are transported safely. Our flexibag-equipped containers can hold up to 24,000 litres of liquid, reducing the risk of contamination and improving cargo flow within your supply chain.
                  </p>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-600 italic">Flexibag being installed in a Trident Premium Quality Container</p>
                  </div>
                </div>
                <div>
                  <img 
                    src="/what-are-flexibags.avif" 
                    alt="What are Flexibags illustration" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>

            {/* Need more information? */}
            <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-50">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-light text-gray-900 mb-4">Need more information?</h2>
                <p className="text-gray-600 mb-6">Please reach out to our expert team for more details about Flexibag Logistics.</p>
                <Link to="/contact">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Contact us →</button>
                </Link>
              </div>
            </section>
          </>
        )}

        {/* HOW IT WORKS TAB */}
        {activeTab === 'how-it-works' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl font-light text-gray-900 mb-8">How does Flexibag Logistics work?</h2>
            <p className="text-gray-600 mb-8 text-lg">Streamline your bulk liquid logistics, right from container selection and preparation to booking and final delivery.</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <img 
                  src="/flexibag_loading diagram.jpg" 
                  alt="How does flexibag work illustration" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Flexibag procurement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Shipment order placed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Pick up empty container inspection and audit of proper container selection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Flexibag installation including fitting, bulkhead, valve key or heating pads if required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Arrival at the loading site</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Loading</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Delivery to terminal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Export customs clearance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">International ocean transportation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Import customs clearance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Inland haulage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Optional full container storage at depot</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* BENEFITS TAB */}
        {activeTab === 'benefits' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Benefits of Flexibag Logistics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CalendarOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Management of capacity fluctuations</h3>
                <p className="text-gray-600">Leverage our scalable logistics solutions which are designed to provide flexible options regarding space allocations. Handle higher or unanticipated volumes and demand during peak seasons with ease.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <EyeOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Visibility and traceability</h3>
                <p className="text-gray-600">Enhance your decision-making capabilities with single-source door-to-door visibility and easy access to all milestones, allowing you to track and trace your cargo seamlessly.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TeamOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">One logistics partner from start to finish</h3>
                <p className="text-gray-600">Work with one reliable vendor that coordinates your entire cargo flow from origin to destination, which helps enable more efficiency in your operations.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <SafetyOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Improved safety and compliance</h3>
                <p className="text-gray-600">With high-quality multi-layer flexibags featuring an outer polypropylene layer made from advanced aramid fiber, we provide the reliability and protection your bulk liquid cargo deserves.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <ContainerOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Greater container availability and ocean access</h3>
                <p className="text-gray-600">Get access to containers that match your production output, with greater control over your delivery timelines with our owned and operated assets.</p>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Contact Our Flexibag Logistics Experts</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Ready to optimize your bulk liquid logistics? Let our experts help you find the perfect Flexibag solution for your liquid cargo needs.
              </p>
              <div className="bg-gray-50 rounded-lg p-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Weather Widget */}
        <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌤️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">31°C</div>
                <div className="text-sm text-gray-500">Partly sunny</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShareAltOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
              <LoginOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
              <SearchOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
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
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Ready to optimize your bulk liquid logistics?</h2>
            <p className="text-xl text-white/90 mb-8">Let our experts help you find the perfect Flexibag solution</p>
            <Link to="/contact">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all text-sm font-medium">
                Contact our team
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Flexibags;
