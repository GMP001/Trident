import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  CheckOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined,
  ContainerOutlined,
  PartitionOutlined,
  BarsOutlined,
  UngroupOutlined,
  ShareAltOutlined,
  LoginOutlined,
  SearchOutlined
} from '@ant-design/icons';

const GOH = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'systems', label: 'Systems' },
    { id: 'contact', label: 'Contact us' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      
      {/* Hero Section with Thick Blue Curved Border */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        {/* Background Image with Curve */}
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/garment-on-hanger-logistics_hero.jpg')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
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
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">Garments on Hangers</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">Specialised containers with built-in hangers.</p>
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
            {/* Designed to protect your garments all the way */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">Designed to protect your garments all the way</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    For fashion brands and stores, keeping clothes and any warehouse garment in top-notch condition during shipping is crucial. Meet Premium Garments on Hangers Containers: your go-to solution for smooth international transportation that ensures your clothes arrive without wrinkles and looking their best. These special containers come pre-fitted with hangers, making them perfect for safely transporting delicate garments.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Trident's Premium Garments on Hangers containers offer flexibility and can handle greater volume. It's the ideal solution for retailers who want a safe, affordable and hassle-free way to ship garments.
                  </p>
                  <p className="text-gray-500 text-sm italic">A worker uses a handheld scanner to scan the barcode on each garment to ship.</p>
                </div>
                <div>
                  <img 
                    src="/garments_on_hanger_02.jpg" 
                    alt="Designed to protect your garments all the way" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </section>

            {/* Blue Divider */}
            <div className="px-8 md:px-16 lg:px-24">
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            </div>

            {/* Why choose Garments on Hangers Containers? */}
            <section className="py-16 px-8 md:px-16 lg:px-24">
              <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Why choose Garments on Hangers Containers?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafetyCertificateOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium care</h3>
                  <p className="text-gray-600 text-sm">Special hanging systems and safe compartments to protect your clothes from wrinkles and damage.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EnvironmentOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect condition every time</h3>
                  <p className="text-gray-600 text-sm">Smart ventilation and temperature controls to safeguard against dampness, mold and extreme weather conditions.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThunderboltOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety first</h3>
                  <p className="text-gray-600 text-sm">Enhanced locks and tamper-evident seals ensure security of your garments when they're on the move.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ContainerOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Efficient and easy</h3>
                  <p className="text-gray-600 text-sm">Designed to optimise space usage inside the containers, which makes it easier to load and unload and saves time.</p>
                </div>
              </div>
            </section>

            {/* Blue Divider */}
            <div className="px-8 md:px-16 lg:px-24">
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            </div>

            {/* What our services include */}
            <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
              <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">What our services include</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Here's what you can expect from our Garments on Hangers services:</p>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Receiving</h3>
                  <p className="text-gray-600 text-sm">Accepting garments from different vendors.</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cargo check</h3>
                  <p className="text-gray-600 text-sm">Thoroughly inspecting each item, following our standard operating procedures.</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Consolidation</h3>
                  <p className="text-gray-600 text-sm">Merging multiple garment shipments into a single container for efficiency.</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <PartitionOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Partition</h3>
                  <p className="text-gray-600 text-sm">Organising nose-loaded and flat-packed cargo, giving each its own space in the container.</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ContainerOutlined className="text-xl text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Less-than-Container Load (LCL)</h3>
                  <p className="text-gray-600 text-sm">Ideal for smaller loads, featuring a handy horizontal bar inside smaller boxes.</p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl font-light text-gray-900 mb-8">Our Garments on Hangers Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Receiving</h3>
                <p className="text-gray-600">Accepting garments from different vendors with proper documentation and quality checks.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cargo Check</h3>
                <p className="text-gray-600">Thoroughly inspecting each item, following our standard operating procedures for quality assurance.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Consolidation</h3>
                <p className="text-gray-600">Merging multiple garment shipments into a single container for maximum efficiency.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Partition</h3>
                <p className="text-gray-600">Organising nose-loaded and flat-packed cargo, giving each its own space in the container.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Less-than-Container Load (LCL)</h3>
                <p className="text-gray-600">Ideal for smaller loads, featuring a handy horizontal bar inside smaller boxes.</p>
              </div>
            </div>
          </section>
        )}

        {/* SYSTEMS TAB */}
        {activeTab === 'systems' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl font-light text-gray-900 mb-8">Types of Garments on Hangers systems</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BarsOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Bar system</h3>
                <p className="text-gray-600 text-lg">Suitable for medium to high-value items like suits and jackets.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <UngroupOutlined className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">String system</h3>
                <p className="text-gray-600 text-lg">Ideal for lighter garments such as shirts and shorts.</p>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <section className="py-16 px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Contact Our Garments on Hangers Experts</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Ready to protect your garments during transit? Let our experts help you find the perfect solution for your fashion logistics needs.
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
              <span className="text-3xl">🌧️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">31°C</div>
                <div className="text-sm text-gray-500">Rainy days ahead</div>
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
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Ready to protect your garments?</h2>
            <p className="text-xl text-white/90 mb-8">Let our experts help you find the perfect Garments on Hangers solution</p>
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

export default GOH;

