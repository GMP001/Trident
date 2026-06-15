import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  CheckOutlined,
  RocketOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  CarOutlined,
  SafetyOutlined,
  CalendarOutlined,
  ShareAltOutlined,
  LoginOutlined,
  SearchOutlined
} from '@ant-design/icons';

const CarInContainer = () => {
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
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/car_in_container_hero_2.png')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
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
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">Shift into higher gear to overcome automotive disruptions</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">Integrated logistics brings greater flexibility and agility to your supply chain.</p>
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
            {/* What is Cars in Containers? */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">What is Cars in Containers?</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Cars in Containers (CiC) enables the transport of finished vehicles from manufacturing plants to global destinations using containers. This car transport solution works as a capable complement to traditional RoRo shipping.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our innovative vehicle shipping service aims to provide a faster and more efficient path to market, enhancing cost efficiency and flexibility in your automotive supply chain. Stay ahead of the competition and optimise your Finished Vehicle Logistics, all the way.
                  </p>
                </div>
                <div>
                  <img 
                    src="/car_in_container_01.jpg" 
                    alt="Cars in Containers" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>

            {/* Blue Divider */}
            <div className="px-8 md:px-16 lg:px-24">
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            </div>

            {/* Why complement your supply chain with Cars in Containers? */}
            <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                    src="/car_in_container_03.jpg" 
                    alt="Cars parked" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">Head shot of cars parked</p>
                </div>
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">Why complement your supply chain with Cars in Containers?</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    For OEMs looking to capture market share and enter new geographies, Cars in Containers is a viable auto transport solution which offers quick, efficient ways to get Completely Built-up Units (CBUs) to their target destinations. Further, our team performs a pre-trip inspection (PTI) and a pre-delivery inspection (PDI) to document the condition of the vehicles prior to final delivery to customers.
                  </p>
                </div>
              </div>
            </section>

            {/* Blue Divider */}
            <div className="px-8 md:px-16 lg:px-24">
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            </div>

            {/* Why do you need Cars in Containers? */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
              <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Why do you need Cars in Containers?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible transport</h3>
                  <p className="text-gray-600">Choose weekly sailings from most key origins across our global multimodal network.</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GlobalOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Optimised logistics planning</h3>
                  <p className="text-gray-600">Cars in Containers is a great complementary option to RoRo which can enhance predictability and efficiency in logistics planning.</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EnvironmentOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No limitations to port access</h3>
                  <p className="text-gray-600">With access to a deep-water port not being mandatory in case of smaller vessels, OEMs can expand access to remote locations for smaller-volume consignments. This also allows us to significantly reduce the number of touchpoints.</p>
                </div>
              </div>
              <div className="text-center mt-10">
                <Link to="/contact">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Contact us now</button>
                </Link>
              </div>
            </section>
          </>
        )}

        {/* HOW IT WORKS TAB */}
        {activeTab === 'how-it-works' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl font-light text-gray-900 mb-8">How does Cars in Containers work?</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Cars in Containers involves loading finished vehicles into standard dry containers. Each vehicle is positioned and immobilised (secured/lashed) within the container floor or racks. Since the cars are containerised, they can be moved using multiple modes of transport, which comes in handy especially before and after the ocean journey. Upon arrival at the depot, cars are carefully unloaded and shipped to their destinations.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Process Flow:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">1</span>
                      </div>
                      <span className="text-gray-700">Shipment planning based on forecast, load planning and booking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">2</span>
                      </div>
                      <span className="text-gray-700">Lashing + stuffing + inspection & value-added service (eg. fumigation, vehicle inspection)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">3</span>
                      </div>
                      <span className="text-gray-700">Inland transport to port, customs clearance & ocean transit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">4</span>
                      </div>
                      <span className="text-gray-700">Unloading and inspection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">5</span>
                      </div>
                      <span className="text-gray-700">Inland delivery to the depot</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">6</span>
                      </div>
                      <span className="text-gray-700">Inland transportation by Trident to the end customer</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <img 
                  src="/car_in_container_04.png" 
                  alt="Cars in Containers how it works illustration" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">Cars in Containers how does it work illustration</p>
              </div>
            </div>
          </section>
        )}

        {/* BENEFITS TAB */}
        {activeTab === 'benefits' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">What are the core benefits of Trident Cars in Containers?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 text-center border border-blue-100">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RocketOutlined className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Flexibility</h3>
                <p className="text-gray-600">Reduce inventory build-up at origin and order-to-delivery times with predictable weekly departures to destinations worldwide.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 text-center border border-blue-100">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafetyOutlined className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Fastened cargo</h3>
                <p className="text-gray-600">Our fastening and lashing techniques are designed to keep your vehicles (including EVs) firmly placed in the containers throughout journey, from origin to destination.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 text-center border border-blue-100">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CarOutlined className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Expertise</h3>
                <p className="text-gray-600">Optimise for smaller-volume consignments of vehicles with access to a greater number of remote locations at higher frequencies.</p>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Contact Our Cars in Containers Experts</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Ready to optimize your finished vehicle logistics? Let our experts help you find the perfect Cars in Containers solution for your automotive supply chain.
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
              <span className="text-3xl">🌡️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">31°C</div>
                <div className="text-sm text-gray-500">Hot days ahead</div>
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
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Ready to optimize your finished vehicle logistics?</h2>
            <p className="text-xl text-white/90 mb-8">Let our experts help you find the perfect Cars in Containers solution</p>
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

export default CarInContainer;
