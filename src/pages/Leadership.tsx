import { useEffect } from 'react';
import Navbar from '../components/Navbar';

const Leadership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-start overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/About Us-2.jpg')`,
            backgroundPosition: 'center 30%',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-5xl md:text-6xl lg:text-6xl text-white leading-tight mb-6 tracking-tight font-light">
            Our Leadership
          </h1>
          <div className="w-20 h-1 bg-blue-500 mb-8"></div>
          <p className="text-xl text-white/90 max-w-2xl">
            Meet the leaders who are setting our course for transformation
          </p>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
              Leadership Team
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At the heart of our success is a leadership team with unmatched experience, vision, and dedication to advancing global logistics in Bangladesh. Together, they bring decades of industry knowledge, strategic foresight, and a deep understanding of the freight forwarding business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="h-80 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
                <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                  <img src="/raihan-haidar-2.jpg" alt="Raihan Haidar" className="w-full h-full rounded-full object-cover scale-110" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">Raihan Haidar</h3>
                <p className="text-blue-600 font-medium mb-4">Chairman</p>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  As Chairman, Raihan Haidar provides the strategic vision and leadership that guides the company's long-term growth.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="h-80 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center relative overflow-hidden">
                <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                  <img src="/md-nazrul-islam.jpg" alt="Md. Nazrul Islam" className="w-full h-full rounded-full object-cover scale-110" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">Md. Nazrul Islam</h3>
                <p className="text-blue-600 font-medium mb-4">Managing Director</p>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With over 30 years of experience in global shipping and logistics, Md. Nazrul Islam has built bridges between companies and governments across Asia and Europe.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="h-80 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center relative overflow-hidden">
                <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                  <img src="/asif-ahmed-2.jpg" alt="Asif Ahmed" className="w-full h-full rounded-full object-cover scale-110" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">Asif Ahmed</h3>
                <p className="text-blue-600 font-medium mb-4">Director</p>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Asif Ahmed brings over 32 years of experience in global shipping and logistics, having held senior positions with leading organizations including CMA-CGM, P&O, and Maersk.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-transparent border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium">
              Meet the full team →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
