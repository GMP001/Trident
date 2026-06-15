import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined,
  ApartmentOutlined,
  CarOutlined,
  RocketOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  ContainerOutlined,
  ThunderboltOutlined,
  TruckOutlined,
  ProfileOutlined,
  SettingOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

const ProjectLogistics = () => {
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
            <source src="/project.mp4" type="video/mp4" />
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
            Project Logistics
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Whatever your project, we have the logistics.
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
          {/* Whatever your project section */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                    Whatever your project, we have the logistics.
                  </h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    No two high-stakes projects are the same. To mitigate the unique risks and complexities 
                    facing yours, you need access to tailored-yet-tested capabilities. And you need expert 
                    support, visibility, and control from planning to final delivery.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    In Trident, you have one trusted partner: a project logistics integrator offering decades 
                    of expertise, vast assets, and a global network to reach even the most remote locations. 
                    From out-of-gauge shipments to intricate logistics partnerships, we're committed to ensuring 
                    every component for your project arrives on time, in full, and with the utmost care.
                  </p>
                </div>
                <div>
                  <img src="/project_cargo.avif" alt="Project Logistics" className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-sm text-gray-500 mt-2 text-center">Trucks transporting yellow harvesters on a rural road near farmland.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Project Ocean Transport */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ContainerOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Project Ocean Transport</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Deliver oversized and breakbulk cargo across oceans with tailored vessels. We manage 
                    procurement, QC, and transport to ensure safe, flexible delivery beyond container yards.
                  </p>
                </div>
                <div>
                  <img src="/project_cargo_02.avif" alt="Project Ocean Transport" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Specialised Airlift */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/project_cargo_03.webp" alt="Specialised Airlift" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ThunderboltOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Specialised Airlift</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Move project-bound or oversized cargo fast by air using short-range, heavy or ultra-heavy 
                    lift aircraft. We manage procurement and execution for smooth end-to-end delivery.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Specialised Inland Transportation */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CarOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Specialised Inland Transportation</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Deliver to places beyond the reach of standard trucks and trains. We provide specialised 
                    pre-, on-, and post-carriage solutions using trailers, wagons, and cranes for complex 
                    road and rail moves.
                  </p>
                </div>
                <div>
                  <img src="/project_cargo_04.webp" alt="Specialised Inland Transportation" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Vessel Chartering */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <img src="/project_cargo_02.avif" alt="Vessel Chartering" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <ContainerOutlined className="text-xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Vessel Chartering</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Access multipurpose, heavy-lift, offshore, and river vessels. Our team handles chartering, 
                    QC, and procurement to deliver specialised cargo safely where you need it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Trident Project Logistics */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                  Why Trident Project Logistics?
                </h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 - Global reach, local expertise */}
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <GlobalOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Global reach, local expertise</h3>
                  <p className="text-gray-600 text-sm">
                    Tap into Trident's worldwide network and on-the-ground professionals in 130+ countries to 
                    execute projects seamlessly, wherever they are.
                  </p>
                </div>

                {/* Card 2 - End-to-end integration */}
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ApartmentOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-end integration</h3>
                  <p className="text-gray-600 text-sm">
                    Work with a single trusted partner that combines owned assets, precision planning, logistics, 
                    and orchestration into one streamlined solution.
                  </p>
                </div>

                {/* Card 3 - Flexibility in ports and transport */}
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <TruckOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexibility in ports and transport</h3>
                  <p className="text-gray-600 text-sm">
                    Overcome bottlenecks with access to a wide array of ports, routes, and transport modes – 
                    including feeder, inland, and offshore solutions.
                  </p>
                </div>

                {/* Card 4 - Expertise in complex cargo */}
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <RocketOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Expertise in complex cargo</h3>
                  <p className="text-gray-600 text-sm">
                    Benefit from decades of experience, specialised equipment, and quality assurance processes 
                    to move heavy, hazardous, or oversized cargo safely.
                  </p>
                </div>

                {/* Card 5 - Real-time visibility and control */}
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <EyeOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time visibility and control</h3>
                  <p className="text-gray-600 text-sm">
                    Stay on top of every move with advanced technology, GPS tracking, and predictive insights 
                    that give you mission-critical visibility.
                  </p>
                </div>

                {/* Card 6 - Certified quality standards */}
                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <SafetyCertificateOutlined className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified quality standards</h3>
                  <p className="text-gray-600 text-sm">
                    Count on our global HSSE framework and compliance programme, backed by ISO certifications, 
                    to manage risks and safeguard your projects.
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
                Contact Our Project Logistics Experts
              </h2>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Reach out to our specialised project cargo team for assistance with your complex logistics needs.
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to start your project?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our project logistics experts today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Contact us
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectLogistics;
