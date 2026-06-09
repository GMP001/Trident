//D:/Trident Log/Trident-FE/src/App.tsx

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Button } from 'antd';
import { ArrowRight } from 'lucide-react';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';

function App() {

  const [activeTab, setActiveTab] = useState('transport');
    
  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

        {/* Hero Section with Maersk-style Curved Bottom Right */}
        <section className="relative h-[95vh] flex items-center justify-start overflow-hidden">
        
        {/* Background Image with Curve */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
            backgroundImage: `url('/future-ready-shipping_1024x576.avif')`,
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
            /> 
        </div>

        {/* Sky Blue Thick Border - Left side - FIXED to match original position relative to white strip */}
        <div 
            className="absolute bottom-0 pointer-events-none"
            style={{
            height: '200px',
            width: '150px',
            background: 'transparent',
            borderBottom: '35px solid #38bdf8',
            borderBottomLeftRadius: '60px',
            zIndex: 15,
            left: '0px', // RESTORED: Back to original left position
            }}
        />

        {/* Sky Blue Thick Border - Right side - UNCHANGED */}
        <div 
            className="absolute bottom-0 right-0 pointer-events-none"
            style={{
            height: '200px',
            width: '150px',
            background: 'transparent',
            borderBottom: '35px solid #38bdf8',
            borderBottomRightRadius: '60px',
            zIndex: 15,
            }}
        />

        {/* Content - MOVED RIGHT by 300px (only text and buttons) */}
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
            <h1 className="text-5xl md:text-6xl lg:text-5xl text-white leading-tight mb-10 tracking-tight">
            Navigating Global Trade with Precision
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            Complete end-to-end logistics solutions from factory floor to customer door. 
            Ocean Freight • Air Freight • Customs • Project Cargo • Trucking
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
            <Button 
                type="primary" 
                size="large" 
                className="h-14 px-10 text-lg font-semibold shadow-lg bg-white text-black hover:bg-gray-100"
            >
                Explore Our Services
            </Button>
            
            <Button 
                size="large" 
                className="h-14 px-10 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white/20 transition-all"
            >
                Get a Quote
            </Button>
            </div>
        </div>

        {/* White background strip - UNCHANGED */}
        <div 
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
            height: '65px',
            background: 'white',
            marginLeft: '150px',
            marginRight: '150px',
            zIndex: 15,
            }}
        />
        
        {/* White Box / Call Section - UNCHANGED */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
          <div 
            className="bg-white flex flex-col items-center justify-center"
            style={{
              width: 'calc(100% - 100px)',
              height: '120px',
              marginLeft: '150px',
              marginRight: '150px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              position: 'relative',
              zIndex: 20,
            }}
          >
            {/* Call us at message */}
            <p className="text-gray-600 font-medium text-2xl mb-3">📞 Call us at</p>
            
            {/* Icons and Numbers Row */}
            <div className="flex items-center justify-center gap-20">
              <a 
                href="tel:+8801234567890" 
                className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-colors cursor-pointer group"
                style={{ textDecoration: 'none' }}
              >
                <PhoneOutlined 
                  style={{ fontSize: '32px', color: 'currentColor' }} 
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xl font-medium">+880 1234 567890</span>
              </a>

              <a 
                href="https://wa.me/8801234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-gray-700 hover:text-green-500 transition-colors cursor-pointer group"
                style={{ textDecoration: 'none' }}
              >
                <WhatsAppOutlined 
                  style={{ fontSize: '32px', color: 'currentColor' }} 
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-xl font-medium">+880 1234 567890</span>
              </a>
            </div>
          </div>
        </div>
        </section>
        {/* We Are Section with Cards */}
        <section className="relative py-20 px-8 md:px-16 lg:px-24 bg-white">
            
            {/* Mick Icon */}
            <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
            </div>
            </div>

            {/* Headline */}
            <h2 className="text-center text-3xl font-normal mb-4 text-gray-900">
            We Are
            </h2>

            {/* Narrating Headline - Read button removed */}
            <p className="text-center text-xl font-normal text-gray-700 mb-16 max-w-3xl mx-auto">
            Stay up to date with our latest products and services, links and guidance here.
            </p>

        {/* Three Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Card 1 - LOGISTICS */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex h-full">
              {/* Left side icon column */}
              <div className="w-16 bg-gray-50 flex-shrink-0 flex items-start justify-center pt-6">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                  </svg>
                </div>
              </div>
              
              {/* Right side content column */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-2xl font-normal text-gray-900 mb-4">LOGISTICS</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Ex-works, FCA, FOB Operations, Warehouse Management, Trucking, Freight, Inland Operations, Stuffing/Destuffing, Air Freight Operations.
                </p>
                <div className="mt-auto">
                  <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all text-base font-medium w-full">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - VAS */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex h-full">
              {/* Left side icon column */}
              <div className="w-16 bg-gray-50 flex-shrink-0 flex items-start justify-center pt-6">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                  </svg>
                </div>
              </div>
              
              {/* Right side content column */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-2xl font-normal text-gray-900 mb-4">VAS</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Drayage, Customs, Terminal Co-ordinations.
                </p>
                <div className="mt-auto">
                  <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all text-base font-medium w-full">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - AIR & Ocean */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex h-full">
              {/* Left side icon column */}
              <div className="w-16 bg-gray-50 flex-shrink-0 flex items-start justify-center pt-6">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                  </svg>
                </div>
              </div>
              
              {/* Right side content column */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-2xl font-normal text-gray-900 mb-4">AIR & Ocean</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  Premium Air and Ocean Solutions Offering.
                </p>
                <div className="mt-auto">
                  <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all text-base font-medium w-full">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Sticky Orange Feedback Button */}
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
            <button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-l-md shadow-lg transition-all duration-200"
                style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                letterSpacing: '1px'
                }}
            >
                Feedback
            </button>
            </div>
        </section>

        {/* Logistics Services and Solutions Section */}
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            
            {/* Header */}
            <h2 className="text-center text-3xl font-normal mb-4 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Logistics services and solutions
            </h2>
            
            {/* Narration */}
            <p className="text-center text-base text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Regardless of your industry, your commodity, or your key markets, Trident offers global and local logistics solutions that enable small and large businesses to grow.
            </p>

            {/* Tabs with Icons */}
            {/* Tabs with Icons */}
            <div className="flex justify-center gap-12 mb-8 border-b border-gray-200 max-w-4xl mx-auto">
              
              {/* Transport Tab */}
              <button
                onClick={() => {
                  setActiveTab('transport');
                  // Reset scroll position when switching tabs
                  const container = document.getElementById('cardsContainer');
                  if (container) container.scrollLeft = 0;
                }}
                className={`flex flex-col items-center pb-3 transition-all duration-200 cursor-pointer ${
                  activeTab === 'transport' 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="w-8 h-8 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={activeTab === 'transport' ? 'text-blue-500' : 'text-gray-500'}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.04 15.04 0 0 0-2.922-2.25c-1.04-.643-2.272-.572-3.226.106a4.487 4.487 0 0 0-1.81 3.072 21.54 21.54 0 0 0-.677 4.09v1.302" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Transport</span>
              </button>

              {/* Logistics Management Tab */}
              <button
                onClick={() => {
                  setActiveTab('logistics');
                  const container = document.getElementById('cardsContainer');
                  if (container) container.scrollLeft = 0;
                }}
                className={`flex flex-col items-center pb-3 transition-all duration-200 cursor-pointer ${
                  activeTab === 'logistics' 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="w-8 h-8 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={activeTab === 'logistics' ? 'text-blue-500' : 'text-gray-500'}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Logistics Management</span>
              </button>

              {/* Solutions Tab */}
              <button
                onClick={() => {
                  setActiveTab('solutions');
                  const container = document.getElementById('cardsContainer');
                  if (container) container.scrollLeft = 0;
                }}
                className={`flex flex-col items-center pb-3 transition-all duration-200 cursor-pointer ${
                  activeTab === 'solutions' 
                    ? 'border-b-2 border-blue-500 text-blue-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="w-8 h-8 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={activeTab === 'solutions' ? 'text-blue-500' : 'text-gray-500'}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.87l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.87l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Solutions</span>
              </button>
            </div>

            {/* Cards Row with Left/Right Navigation Buttons - Simplified Working Version */}
            <div className="relative max-w-7xl mx-auto">
              {/* Cards Container - Horizontal Scroll */}
              <div 
                className="overflow-x-auto overflow-y-hidden px-12 scroll-smooth hide-scrollbar"
                id="cardsContainer"
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex gap-6 w-max">
                  
                  {/* TRANSPORT TAB CARDS - All 8 cards */}
                  {activeTab === 'transport' && (
                    <>
                      {/* Card 1 - Trident Spot */}
                      <a href="/trident-spot" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img 
                            src="/trident-spot-3.1.svg" 
                            alt="trident spot" 
                            className="w-full h-full object-contain"
                        />
                        </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Trident Spot</h3>
                          <p className="text-sm text-gray-600">
                            Get fixed prices and guaranteed loading when booking your customers' shipments online.
                          </p>
                        </div>
                      </a>

                      {/* Card 2 - Ocean Contract */}
                      <a href="/ocean-contract" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img 
                            src="/ocena-contracts.svg" 
                            alt="Ocean Contracts" 
                            className="w-full h-full object-contain"
                        />
                        </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Ocean Contract</h3>
                          <p className="text-sm text-gray-600">
                            Transport your goods with stable rates, choice of allocation and assured space.
                          </p>
                        </div>
                      </a>

                      {/* Card 3 - Ocean quote request */}
                      <a href="/ocean-quote-request" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <img 
                            src="/shipping-quote.svg" 
                            alt="Shipping Quote" 
                            className="w-full h-full object-contain"
                            />
                        </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Ocean quote request</h3>
                          <p className="text-sm text-gray-600">
                            Get a freight quote for standard, oversized, and LCL shipments.
                          </p>
                        </div>
                      </a>

                      {/* Card 4 - Maersk Go */}
                      <a href="/maersk-go" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-orange-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Maersk Go</h3>
                          <p className="text-sm text-gray-600">
                            Book and manage your own deliveries from door to door with a simple online platform.
                          </p>
                        </div>
                      </a>

                      {/* Card 5 - Air Freight */}
                      <a href="/air-freight" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-cyan-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Air Freight</h3>
                          <p className="text-sm text-gray-600">
                            Find online rates for Inland Transportation of Full Container Loads. Maersk Air Freight is a fast, reliable, and ideal service for supply chain challenges.
                          </p>
                        </div>
                      </a>

                      {/* Card 6 - LCL */}
                      <a href="/lcl" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-indigo-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Less-than-Container Load (LCL)</h3>
                          <p className="text-sm text-gray-600">
                            Ship boxes and pallets via ocean with LCL. Book online and get prices instantly.
                          </p>
                        </div>
                      </a>

                      {/* Card 7 - Freetime Extension */}
                      <a href="/freetime-extension" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-amber-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Freetime Extension</h3>
                          <p className="text-sm text-gray-600">
                            Extend cargo hold days beyond the agreed freetime.
                          </p>
                        </div>
                      </a>

                      {/* Card 8 - Special Shipment */}
                      <a href="/special-shipment" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-rose-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.086-6.803l-3.39 3.393-1.065-1.065 3.39-3.393a4.5 4.5 0 0 0-6.803 4.086c.048.58.024 1.193-.14 1.743m3.567 1.031-3.392 3.392" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Special Shipment</h3>
                          <p className="text-sm text-gray-600">
                            Request a special shipment execution beyond our standard offerings.
                          </p>
                        </div>
                      </a>
                    </>
                  )}

                  {/* SOLUTIONS TAB CARDS - 3 new cards from the image */}
                  {activeTab === 'solutions' && (
                    <>
                      {/* Card 1 - Cars in Containers */}
                      <a href="/cars-in-containers" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-blue-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.22-1.113-.615-1.53a15.04 15.04 0 0 0-2.922-2.25c-1.04-.643-2.272-.572-3.226.106a4.487 4.487 0 0 0-1.81 3.072 21.54 21.54 0 0 0-.677 4.09v1.302" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Cars in Containers</h3>
                          <p className="text-sm text-gray-600">
                            Flexible transportation of finished vehicles from your factory to your customers' doors.
                          </p>
                        </div>
                      </a>

                      {/* Card 2 - Flexibag Logistics */}
                      <a href="/flexibag-logistics" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-green-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Flexibag Logistics</h3>
                          <p className="text-sm text-gray-600">
                            Solution specialised for transporting bulk liquids efficiently and safely across the globe. Suitable for commodities such as...
                          </p>
                        </div>
                      </a>

                      {/* Card 3 - Chemicals Logistics Management */}
                      <a href="/chemicals-logistics" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-purple-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.083m.75-.083a24.301 24.301 0 0 0 4.5 0m-4.5 0a24.3 24.3 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.083M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.087 3.611C18.106 20.509 15.095 21 12 21c-3.095 0-6.106-.491-8.115-.687-1.737-.293-2.32-2.379-1.087-3.611L5 14.5" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Chemicals Logistics Management</h3>
                          <p className="text-sm text-gray-600">
                            Integrated chemical logistics with real-time visibility across the supply chain.
                          </p>
                        </div>
                      </a>
                    </>
                  )}

                  {/* LOGISTICS MANAGEMENT TAB CARDS */}
                  {activeTab === 'logistics' && (
                    <>
                      {/* Card 1 - Supply Chain Management */}
                      <a href="/supply-chain-management" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-blue-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Supply Chain Management</h3>
                          <p className="text-sm text-gray-600">
                            Combine data and stakeholder systems for streamlined logistics.
                          </p>
                        </div>
                      </a>

                      {/* Card 2 - Maersk E-Commerce */}
                      <a href="/maersk-ecommerce" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-green-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Maersk E-Commerce</h3>
                          <p className="text-sm text-gray-600">
                            Optimise your e-commerce supply chain with fast and reliable parcel deliveries.
                          </p>
                        </div>
                      </a>

                      {/* Card 3 - EDI Solutions */}
                      <a href="/edi-solutions" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-purple-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.25-4.5V3.75" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">EDI Solutions</h3>
                          <p className="text-sm text-gray-600">
                            Reduce paperwork and increase efficiency with faster communication.
                          </p>
                        </div>
                      </a>

                      {/* Card 4 - API Solutions */}
                      <a href="/api-solutions" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-cyan-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">API Solutions</h3>
                          <p className="text-sm text-gray-600">
                            The future of data integrations to update B2B information in real-time.
                          </p>
                        </div>
                      </a>

                      {/* Card 5 - Cold Chain */}
                      <a href="/cold-chain" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-orange-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Cold Chain</h3>
                          <p className="text-sm text-gray-600">
                            Reliable and logistics for sensitive cargo.
                          </p>
                        </div>
                      </a>
                                            {/* Card 6 - Cold Chain Logistics */}
                      <a href="/cold-chain-logistics" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-teal-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Cold Chain Logistics</h3>
                          <p className="text-sm text-gray-600">
                            Reliable and responsive end-to-end logistics for your time and temperature sensitive cargo.
                          </p>
                        </div>
                      </a>

                      {/* Card 7 - Maersk Project Logistics */}
                      <a href="/maersk-project-logistics" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-amber-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Maersk Project Logistics</h3>
                          <p className="text-sm text-gray-600">
                            We plan, orchestrate and provide specialised transportation for project cargo.
                          </p>
                        </div>
                      </a>

                      {/* Card 8 - Booking Services */}
                      <a href="/booking-services" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-rose-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.25-4.5V3.75" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Booking Services</h3>
                          <p className="text-sm text-gray-600">
                            Single point of contact for bookings and communication with suppliers and carriers.
                          </p>
                        </div>
                      </a>

                      {/* Card 9 - Supply Chain Resilience Model */}
                      <a href="/supply-chain-resilience" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-emerald-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Supply Chain Resilience Model</h3>
                          <p className="text-sm text-gray-600">
                            Manage disruptions and keep your business running smoothly.
                          </p>
                        </div>
                      </a>

                      {/* Card 10 - Emissions Studio */}
                      <a href="/emissions-studio" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-indigo-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Emissions Studio</h3>
                          <p className="text-sm text-gray-600">
                            Get visibility into greenhouse gas emissions across carriers and transport modes.
                          </p>
                        </div>
                      </a>

                      {/* Card 11 - Destination Coordination Services */}
                      <a href="/destination-coordination" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-pink-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Destination Coordination Services</h3>
                          <p className="text-sm text-gray-600">
                            From container release to final delivery, one place to manage your entire import ecosystem.
                          </p>
                        </div>
                      </a>

                      {/* Card 12 - Maersk Visibility Studio */}
                      <a href="/visibility-studio" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-sky-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Maersk Visibility Studio</h3>
                          <p className="text-sm text-gray-600">
                            Get multi-modal, multi-carrier, multi-regional shipment visibility on a single platform.
                          </p>
                        </div>
                      </a>

                      {/* Card 13 - Maersk Risk Management */}
                      <a href="/risk-management" className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0">
                        <div className="h-40 bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-violet-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Maersk Risk Management</h3>
                          <p className="text-sm text-gray-600">
                            Stay ahead with early warnings and clear actions. Powered by expert insights and AI.
                          </p>
                        </div>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Left Arrow Button */}
              <button 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
                onClick={() => {
                  const container = document.getElementById('cardsContainer');
                  if (container) container.scrollBy({ left: -320, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
                onClick={() => {
                  const container = document.getElementById('cardsContainer');
                  if (container) container.scrollBy({ left: 320, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
        </section>
                {/* Trident East-West Network & Logistics Trend Map Section */}
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            
            {/* First Row - Trident East-West Network */}
            <div className="flex flex-col md:flex-row gap-12 mb-20">
              {/* Left side - Text Content */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-normal mb-6 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
                  Trident East-West Network
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8" style={{ fontFamily: 'Verdana, sans-serif' }}>
                  With our East-West Network we are setting a new standard for reliability and service quality by reducing port calls on our mainliners, an extensive shuttle network and strategically located hubs delivering world class productivity.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-all text-base font-medium">
                  Our Network
                </button>
              </div>
              
              {/* Right side - Image */}
              <div className="flex-1">
                <img 
                  src="/our-network_1024x576.avif" 
                  alt="Trident East-West Network"
                  className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>

            {/* Second Row - The Logistics Trend Map */}
            <div className="flex flex-col md:flex-row-reverse gap-12">
              {/* Left side - Image */}
              <div className="flex-1">
                <img 
                  src="/logistics_trend-map-banner_1300x650.avif" 
                  alt="The Logistics Trend Map"
                  className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              
              {/* Right side - Text Content */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-normal mb-6 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
                  The Logistics Trend Map
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8" style={{ fontFamily: 'Verdana, sans-serif' }}>
                  When navigating the evolving world of logistics, knowing and acting on the top trends will help you go all the way.
                </p>
                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-all text-base font-medium">
                  Discover New Trend
                </button>
              </div>
            </div>
          </div>
        </section>

                {/* Industry Sectors Section */}
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
          
          {/* Header */}
          <h2 className="text-center text-3xl font-normal mb-4 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Industry sectors
          </h2>
          
          {/* Narration */}
          <p className="text-center text-base text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Verdana, sans-serif' }}>
            Regardless of your industry, your commodity, or your key markets, Trident offers global and local logistics solutions that enable small and large businesses to grow.
          </p>

          {/* Cards Carousel */}
          <div className="relative max-w-7xl mx-auto">
            {/* Cards Container - Horizontal Scroll */}
            <div 
              className="overflow-x-auto overflow-y-hidden px-12 scroll-smooth hide-scrollbar"
              id="industryCardsContainer"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex gap-6 w-max">
                
                {/* Card 1 - FMCG */}
                <a href="/industry/fmcg" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/fmcg.svg" 
                      alt="FMCG"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">FMCG</h3>
                  </div>
                </a>

                {/* Card 2 - Retail */}
                <a href="/industry/retail" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/retail.svg" 
                      alt="Retail"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Retail</h3>
                  </div>
                </a>

                {/* Card 3 - Fashion & Lifestyle */}
                <a href="/industry/fashion-lifestyle" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/fashion-and-lifestyle.svg" 
                      alt="Fashion & Lifestyle"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Fashion & Lifestyle</h3>
                  </div>
                </a>

                {/* Card 4 - Chemical */}
                <a href="/industry/chemical" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/chemical.svg" 
                      alt="Chemical"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Chemical</h3>
                  </div>
                </a>

                {/* Card 6 - Refrigerated Goods */}
                <a href="/industry/refrigerated-goods" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/refregirated-goods.svg" 
                      alt="Refrigerated Goods"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Refrigerated Goods</h3>
                  </div>
                </a>

                {/* Card 7 - Automotive */}
                <a href="/industry/automotive" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/automotive.svg" 
                      alt="Automotive"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Automotive</h3>
                  </div>
                </a>

                {/* Card 8 - Pharma & Healthcare */}
                <a href="/industry/pharma-healthcare" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/pharma-and-healthcare.svg" 
                      alt="Pharma & Healthcare"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Pharma & Healthcare</h3>
                  </div>
                </a>

                {/* Card 9 - Technology */}
                <a href="/industry/technology" className="cursor-pointer group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-64 flex-shrink-0">
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                    <img 
                      src="/technology.svg" 
                      alt="Technology"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Technology</h3>
                  </div>
                </a>

              </div>
            </div>

            {/* Left Arrow Button */}
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
              onClick={() => {
                const container = document.getElementById('industryCardsContainer');
                if (container) container.scrollBy({ left: -280, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition-all flex items-center justify-center z-10"
              onClick={() => {
                const container = document.getElementById('industryCardsContainer');
                if (container) container.scrollBy({ left: 280, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </section>

                {/* Board of Directors Section - 2026 Modern Style */}
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-normal mb-6 text-gray-900" style={{ fontFamily: 'Verdana, sans-serif' }}>
                Leadership Team
              </h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                At the heart of our success is a leadership team with unmatched experience, vision, and dedication to advancing global logistics in Bangladesh. Together, they bring decades of industry knowledge, strategic foresight, and a deep understanding of the freight forwarding business.
              </p>
            </div>

            {/* Board Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Member 1 - Raihan Haidar */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
                {/* Image Placeholder - Replace with actual image */}
                    <div className="h-80 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
                    <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                        <img 
                        src="/raihan-haidar-2.jpg" 
                        alt="Raihan Haidar" 
                        className="w-full h-full rounded-full object-cover scale-110"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                    </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">Raihan Haidar</h3>
                  <p className="text-blue-600 font-medium mb-4">Chairman</p>
                  <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    As Chairman, Raihan Haidar provides the strategic vision and leadership that guides the company's long-term growth. With a strong focus on innovation, governance, and sustainable business practices, he ensures that the organization remains aligned with its mission to deliver excellence in logistics solutions.
                  </p>
                </div>
              </div>

              {/* Member 2 - Md. Nazrul Islam */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
                {/* Image Placeholder - Replace with actual image */}
                <div className="h-80 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center relative overflow-hidden">
                <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                    <img 
                    src="/md-nazrul-islam.jpg" 
                    alt="Md. Nazrul Islam" 
                    className="w-full h-full rounded-full object-cover scale-110"
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">Md. Nazrul Islam</h3>
                  <p className="text-blue-600 font-medium mb-4">Managing Director</p>
                  <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    With over 30 years of experience in global shipping and logistics, Md. Nazrul Islam has built bridges between companies and governments across Asia and Europe. Having served in senior leadership positions at Maersk, Safmarine, and Meghna Group, he is widely recognized for his strategic acumen and customer relationships.
                  </p>
                </div>
              </div>

              {/* Member 3 - Asif Ahmed */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
                {/* Image Placeholder - Replace with actual image */}
                <div className="h-80 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center relative overflow-hidden">
                <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                    <img 
                    src="/asif-ahmed-2.jpg" 
                    alt="Asif Ahmed" 
                    className="w-full h-full rounded-full object-cover scale-110"
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">Asif Ahmed</h3>
                  <p className="text-blue-600 font-medium mb-4">Director</p>
                  <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Asif Ahmed brings over 32 years of experience in global shipping and logistics, having held senior positions with leading organizations including CMA-CGM, P&O, and Maersk. His vast industry knowledge and strong leadership continue to strengthen the company's strategic partnerships and market presence.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional: Add a CTA button */}
            <div className="text-center mt-12">
              <button className="bg-transparent border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium">
                Meet the full team →
              </button>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-white py-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              
              {/* Column 1 - Plan & Book */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Plan & Book</h3>
                <ul className="space-y-2">
                  <li><a href="/prices" className="text-gray-400 hover:text-white transition-colors text-sm">Prices</a></li>
                  <li><a href="/book" className="text-gray-400 hover:text-white transition-colors text-sm">Book</a></li>
                  <li><a href="/container-tracking" className="text-gray-400 hover:text-white transition-colors text-sm">Container Tracking</a></li>
                  <li><a href="/vessel-schedules" className="text-gray-400 hover:text-white transition-colors text-sm">Vessel Schedules</a></li>
                </ul>
                
                <h3 className="text-lg font-semibold mt-6 mb-4 text-white">Help</h3>
                <ul className="space-y-2">
                  <li><a href="/local-offices" className="text-gray-400 hover:text-white transition-colors text-sm">Local Offices & Information</a></li>
                  <li><a href="/support" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
                </ul>
              </div>

              {/* Column 2 - Logistics Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Logistics Services</h3>
                <ul className="space-y-2">
                  <li><a href="/ocean-transport" className="text-gray-400 hover:text-white transition-colors text-sm">Ocean Transport</a></li>
                  <li><a href="/customs-services" className="text-gray-400 hover:text-white transition-colors text-sm">Trident Customs Services</a></li>
                  <li><a href="/inland-transport" className="text-gray-400 hover:text-white transition-colors text-sm">Inland Transport</a></li>
                  <li><a href="/lead-logistics" className="text-gray-400 hover:text-white transition-colors text-sm">Lead Logistics</a></li>
                  <li><a href="/warehousing" className="text-gray-400 hover:text-white transition-colors text-sm">Warehousing</a></li>
                  <li><a href="/air-freight-footer" className="text-gray-400 hover:text-white transition-colors text-sm">Air Freight</a></li>
                  <li><a href="/ecommerce-logistics" className="text-gray-400 hover:text-white transition-colors text-sm">E-Commerce Logistics</a></li>
                  <li><a href="/lcl-footer" className="text-gray-400 hover:text-white transition-colors text-sm">Less-than-Container Load (LCL)</a></li>
                  <li><a href="/cold-chain-logistics" className="text-gray-400 hover:text-white transition-colors text-sm">Cold Chain Logistics</a></li>
                  <li><a href="/project-logistics" className="text-gray-400 hover:text-white transition-colors text-sm">Trident Project Logistics</a></li>
                  <li><a href="/depot" className="text-gray-400 hover:text-white transition-colors text-sm">Depot</a></li>
                  <li><a href="/cold-storage" className="text-gray-400 hover:text-white transition-colors text-sm">Cold Storage</a></li>
                  <li><a href="/ground-freight" className="text-gray-400 hover:text-white transition-colors text-sm">Trident Ground Freight Transport</a></li>
                  <li><a href="/decarbonising" className="text-gray-400 hover:text-white transition-colors text-sm">Decarbonising Logistics</a></li>
                  <li><a href="/value-protect" className="text-gray-400 hover:text-white transition-colors text-sm">Value Protect</a></li>
                  <li><a href="/all-services" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">View all →</a></li>
                </ul>
              </div>

              {/* Column 3 - Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="/news-advisories" className="text-gray-400 hover:text-white transition-colors text-sm">News & Advisories</a></li>
                  <li><a href="/industry-sectors" className="text-gray-400 hover:text-white transition-colors text-sm">Industry Sectors</a></li>
                  <li><a href="/insights" className="text-gray-400 hover:text-white transition-colors text-sm">Insights</a></li>
                  <li><a href="/logistics-explained" className="text-gray-400 hover:text-white transition-colors text-sm">Logistics Explained</a></li>
                </ul>
                
                <h3 className="text-lg font-semibold mt-6 mb-4 text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/my-finance" className="text-gray-400 hover:text-white transition-colors text-sm">MyFinance</a></li>
                  <li><a href="/trident-app" className="text-gray-400 hover:text-white transition-colors text-sm">Trident App</a></li>
                  <li><a href="/data-integrations" className="text-gray-400 hover:text-white transition-colors text-sm">Data Integrations</a></li>
                  <li><a href="/captain-peter" className="text-gray-400 hover:text-white transition-colors text-sm">Captain Peter</a></li>
                  <li><a href="/emissions-studio-footer" className="text-gray-400 hover:text-white transition-colors text-sm">Emissions Studio</a></li>
                </ul>
              </div>

              {/* Column 4 - About */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">About</h3>
                <ul className="space-y-2">
                  <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                  <li><a href="/about-us" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                  <li><a href="/investors" className="text-gray-400 hover:text-white transition-colors text-sm">Investors</a></li>
                  <li><a href="/procurement" className="text-gray-400 hover:text-white transition-colors text-sm">Procurement</a></li>
                  <li><a href="/container-sales" className="text-gray-400 hover:text-white transition-colors text-sm">Container Sales</a></li>
                  <li><a href="/press" className="text-gray-400 hover:text-white transition-colors text-sm">Press</a></li>
                  <li><a href="/sustainability" className="text-gray-400 hover:text-white transition-colors text-sm">Sustainability</a></li>
                  <li><a href="/accessibility" className="text-gray-400 hover:text-white transition-colors text-sm">Accessibility</a></li>
                  <li><a href="/growth" className="text-gray-400 hover:text-white transition-colors text-sm">Trident Growth</a></li>
                </ul>
              </div>
            </div>

            {/* Social Media / Follow Section */}
            <div className="border-t border-gray-800 pt-8 mb-8">
              <p className="text-gray-400 text-sm text-center">
                Follow our journey. <span className="text-white">#AllTheWayToZero</span>
              </p>
            </div>

            {/* Copyright and Legal Links */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-xs">
                  © A.P. Moller - Trident
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs">
                  <a href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms & conditions</a>
                  <a href="/whistleblower" className="text-gray-500 hover:text-white transition-colors">Whistleblower</a>
                  <a href="/privacy" className="text-gray-500 hover:text-white transition-colors">Data Privacy Notification</a>
                  <a href="/cookie-policy" className="text-gray-500 hover:text-white transition-colors">Cookie policy</a>
                  <a href="/cookie-preferences" className="text-gray-500 hover:text-white transition-colors">Cookie preferences</a>
                  <a href="/brand-protection" className="text-gray-500 hover:text-white transition-colors">Brand protection</a>
                  <a href="/unsolicited-submissions" className="text-gray-500 hover:text-white transition-colors">Unsolicited Submissions Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default App;
