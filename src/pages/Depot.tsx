import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Depot = () => {
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
            <source src="/deport_operation.mp4" type="video/mp4" />
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
            Trident Depot Services
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Pitstops for your cargo.
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
          {/* Add a little speed and flexibility section */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Add a little speed and flexibility to your supply chain
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Container depots are essential nodes that act as key connectors expediting the import and 
                    export of your cargo. Think of them as quick stops fulfilling critical container and cargo 
                    needs in a well-oiled supply chain. Our experts are on hand with industry-leading import/export 
                    management processes and a range of value-added services to ensure your supply chain is 
                    running seamlessly. You can now reach more customers in remote or inland locations with our 
                    inland container depots supporting your logistics needs.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our depots give you the flexibility to absorb disruptions and uncertainties with solutions 
                    designed to address your specific requirements, including building dedicated container depots 
                    closer to your factories or transport nodes.
                  </p>
                </div>
                <div>
                  <img src="/depot_operation_01.avif" alt="Depot Operations" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Key benefits
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Trident Depots are designed to give you greater control, flexibility and visibility of your supply chain, from end to end.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">One-stop shop</h3>
                  <p className="text-gray-600 text-sm">Our integrated logistics solutions are designed for end-to-end servicing of your depot needs.</p>
                </div>
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Agility and efficiency</h3>
                  <p className="text-gray-600 text-sm">Respond to uncertainties and changes with ease and keep fulfilling orders seamlessly via a single logistics partner.</p>
                </div>
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Container quality preservation</h3>
                  <p className="text-gray-600 text-sm">The quality of your cargo is maintained throughout its journey with our industry-leading container preparation protocols.</p>
                </div>
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Configurable solutions</h3>
                  <p className="text-gray-600 text-sm">Get solutions that cater to your industry needs, so you can rest assured that your cargo is being handled with the best protocols applicable.</p>
                </div>
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Inland connectivity</h3>
                  <p className="text-gray-600 text-sm">Transport your cargo to locations away from transportation centres through our growing network of inland container depots.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Depot Services Section */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Depot Services
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Choose from a range of services and products for your cargo at Trident Depots, from import 
                    and export to full container storage services. Learn more on how we can help move your cargo 
                    quickly and efficiently through a Trident Depot.
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
                    Explore our services
                  </button>
                </div>
                <div>
                  <img src="/depot-services_02.avif" alt="Depot Services" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Expanding our global reach */}
          <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}>
              <h2 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">
                Expanding our global reach
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">
                Leverage our growing network to simplify and optimise your supply chain.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div>
          {/* Simplify your supply chain */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Simplify your supply chain
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Trident container depot services give you the opportunity to:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">1.</span>
                      <span className="text-gray-600">Import/Export your cargo efficiently and on time with the highest quality standards.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">2.</span>
                      <span className="text-gray-600">Prepare containers and load your cargo optimally for maximum transit readiness.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">3.</span>
                      <span className="text-gray-600">Navigate uncertainties with the flexibility to control your supply chain's pace.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">4.</span>
                      <span className="text-gray-600">Seamlessly connect to remote customers through our inland container depot network.</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed">
                    Get end-to-end import/export cargo services at our depots, whether it is preparing containers, 
                    cargo stuffing and destuffing, receiving and stowing full containers, facilitating customs 
                    clearances in the bonded yard, or shunting full containers to port closer to vessel arrival. 
                    You gain the reliable handling of your container cargo from one integrated logistics solutions 
                    partner at origin and destination.
                  </p>
                </div>
                <div>
                  <img src="/deport-supply-chain.svg" alt="Supply Chain" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* Customer dedicated depot */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/maersk-depot-illustr-01.svg" alt="Customer dedicated depot" className="w-full h-auto" />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Customer dedicated depot
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    We offer dedicated facilities tailored for your exact container and cargo needs. You get an 
                    all-in-one solution in close proximity to your facility that ensures not only empty container 
                    availability but optimised cargo stuffing. Equip your dedicated depot with basic services, such 
                    as container Equipment Management and Repair (EMR), to complex tasks such as container 
                    preparation, cargo loading, yard management for full and empty containers. You can focus on 
                    your core business knowing that your cargo is being handled by experts safely and securely, 
                    all the way.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Full container storage */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Full container storage
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Our storage areas hold full containers at origin or destination in both bonded and non-bonded 
                    conditions. Whether your in-transit cargo is awaiting customs clearances or an unexpected 
                    disruption requires slowing your shipment down, you get increased flexibility to manage your 
                    supply chain. With a low cost of storage, you can also use our depots to lower inventories at 
                    your factory or distribution centres.
                  </p>
                </div>
                <div>
                  <img src="/trident-depot-illustration-full-container-storage.svg" alt="Full container storage" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* Container preparation */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/trident-depot-illustration-container-preparation.svg" alt="Container preparation" className="w-full h-auto" />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Container preparation
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Every single container is thoroughly checked and prepared for its cargo, whether it is dry or 
                    refrigerated. We offer flexi-tanks, bulkheads, probes, liner solutions, paper/craft paper or 
                    cardboard linings for the interior walls of the container for export cargo. Once the containers 
                    are cleared, we help properly secure high-value cargo and ensure quality is preserved for the 
                    entire journey.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stuffing and destuffing */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Stuffing and destuffing
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    We ensure optimised container stuffing and destuffing of various types of cargo, from dry 
                    bulk and commodities in big bags to case or palletised goods and over-dimension and outsized 
                    cargo. Save time and costs by dealing with only one logistics partner.
                  </p>
                </div>
                <div>
                  <img src="/trident-depot-illustration-stuffing-and-destuffing.svg" alt="Stuffing and destuffing" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </section>

          {/* Value-added services section */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Value-added services
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Get exactly what you need. As a one-stop logistics shop, we offer a range of value-added services 
                  in-house for all your container requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Empty container management</h3>
                  <p className="text-gray-600 text-sm">Ensuring the equipment of the right type and size is available for container stuffing as per your needs.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Shunting</h3>
                  <p className="text-gray-600 text-sm">Trucking containers to and from customer's site.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Labelling</h3>
                  <p className="text-gray-600 text-sm">Complete printing, placing and removal of labels, marking and re-marking of pallets or cartons.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Cargo packaging</h3>
                  <p className="text-gray-600 text-sm">We ensure your cargo is packed optimally and safely.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Customer inspection</h3>
                  <p className="text-gray-600 text-sm">Facilitating inspections for customers at requested dates and times.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Cargo photography</h3>
                  <p className="text-gray-600 text-sm">High-resolution imagery of cargo for claims processing/avoidance available on request.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">VIP services</h3>
                  <p className="text-gray-600 text-sm">Priority lane and special stacking of containers to expedite pickup and delivery.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Refrigerated cargo monitoring</h3>
                  <p className="text-gray-600 text-sm">Temperature and condition checks during plug-in to ensure the cold cargo set temperature is maintained.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Customs inspection (Bonded yard)</h3>
                  <p className="text-gray-600 text-sm">Customs assessment of cargo type and quantity to ascertain legal requirements on duties.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Verified Gross Mass (VGM)</h3>
                  <p className="text-gray-600 text-sm">Weighing of container in line with SOLAS 1978.</p>
                </div>
                <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-1">Storage</h3>
                  <p className="text-gray-600 text-sm">Bulk cargo, packaging material or any other cargo suitable for storage needs.</p>
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
                Contact our Depot Services Team
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our depot experts for any assistance with your container and cargo needs.
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
                <div className="text-lg font-semibold text-gray-800">30°C</div>
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
    </div>
  );
};

export default Depot;
