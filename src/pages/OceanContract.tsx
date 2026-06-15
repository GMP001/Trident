import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  CheckOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  RocketOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const OceanContract = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeProduct, setActiveProduct] = useState('fixed');

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section with Curved Blue Border */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        
        {/* Background Image with Curve */}
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
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/ocean_contract_hero.jpg')`,
              backgroundPosition: 'center 40%',
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
            ></div>
          </div>
        </div>

        {/* Sky Blue Thick Border - Left side */}
        <div 
          className="absolute bottom-0 pointer-events-none"
          style={{
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
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
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
          className="absolute bottom-0 pointer-events-none"
          style={{
            height: '35px',
            background: '#38bdf8',
            left: '150px',
            right: '150px',
            zIndex: 15,
          }}
        />
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">
            Ocean Contract
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Get guaranteed space and market relevant rates for your ocean cargo, all year round.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
            Contact us
          </button>
        </div>
      </section>

      {/* Get your cargo moving with Ocean Contract */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                Get your cargo moving with Ocean Contract
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Whether you need to make sure that production capabilities can be fully utilised or need to 
                get time-sensitive goods into the right markets – with Ocean Contract, you can streamline 
                your supply chain for the best flow. Our cargo services offer more agility from the contract 
                product setup, certainty from operations insights and reliability on delivery, anywhere 
                across the globe.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ocean Contract provides you with access to real-time data on all your ocean lanes with its 
                Allocation Portal. This helps you to get insight into your volume availability, consumption 
                data and more information that can help you optimise your contract utilisation.
              </p>
            </div>
            <div>
              <img src="/ocean_contract_02.jpg" alt="Ocean Contract" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">Man signing on contract</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose Ocean Contract */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Why choose Ocean Contract?
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer you contract products that are best suited to meet your shipping requirements and 
              reflect the changing needs of the business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileTextOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple base allocations</h3>
              <p className="text-gray-600 text-sm">
                We understand the struggle to predict market demands. Moreover, it's impossible to predict 
                black swan events. That's why we offer increased clarity and simplicity when it comes to 
                base allocation agreements.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CalendarOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tiered contracts for seasonality</h3>
              <p className="text-gray-600 text-sm">
                Choose reliable products to tackle planned and unplanned seasonality. Our tiered contracts 
                are designed to cover black swan events, if any, while still offering competitively priced 
                base products.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <DollarOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market relevant rates</h3>
              <p className="text-gray-600 text-sm">
                Enjoy competitive pricing and the flexibility to overcome disruptions with fixed prices 
                subject to floating surcharges, and monthly indexed rates that are not subject to floating charges.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <SafetyOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear mutual commitments</h3>
              <p className="text-gray-600 text-sm">
                We are committed to delivering on our promises. We assure you clear and transparent agreements 
                upfront that set expectations as per your requirements. We also outline the level of mutual 
                commitment beforehand.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* A wider range of contract products */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              A wider range of contract products
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With changing business needs, the demand for contracts that offer more specificity is essential. 
              Ocean Contract has evolved to feature four distinct contract products that meet specific business 
              requirements. Each of them offers certainty with regard to space availability on our vessels.
            </p>
            <p className="text-md text-gray-500 mt-2">
              They are differentiated by volume planning flexibility to meet supply chain operations and seasonal demands.
            </p>
          </div>

          {/* Product Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveProduct('fixed')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeProduct === 'fixed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ocean Contract Fixed
            </button>
            <button
              onClick={() => setActiveProduct('seasonal')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeProduct === 'seasonal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ocean Contract Seasonal
            </button>
            <button
              onClick={() => setActiveProduct('block')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeProduct === 'block'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ocean Contract Block Space
            </button>
          </div>

          {/* Fixed Contract Content */}
          {activeProduct === 'fixed' && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ocean Contract Fixed</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This offering provides a set number of containers per lane every week at market relevant rates.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">You get access to a weekly committed volume for your stable ocean logistics needs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Choose between Fixed pricing or monthly indexed pricing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Fixed contracts are for 3 months and above.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Monthly access to reserve extra space via Space Reserve or Instant Space.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-100 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">TEU</span>
                    </div>
                    <p className="text-gray-700 font-medium">Fixed Space Allocation</p>
                    <p className="text-gray-500 text-sm">Guaranteed volume per week</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Seasonal Contract Content */}
          {activeProduct === 'seasonal' && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ocean Contract Seasonal</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This product is ideal for supply chains that need to synchronise allocation with production fluctuations.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Weekly committed volume with 20% extra seasonality for up to 4 months per year.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Choose fixed pricing or monthly indexed pricing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Fixed contracts are for 3 months and above.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Monthly access to reserve extra space via Space Reserve or Instant Space.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-100 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarOutlined className="text-white text-3xl" />
                    </div>
                    <p className="text-gray-700 font-medium">Seasonal Flexibility</p>
                    <p className="text-gray-500 text-sm">Adapt to production fluctuations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Block Space Contract Content */}
          {activeProduct === 'block' && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ocean Contract Block Space</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This is ideal for stable ocean logistics needs. You can purchase fixed space guarantee on a market-to-market basis.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Get weekly committed volume, based on MQC divided by number of weeks in agreement.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Weekly indexed pricing, not subject to emergency or peak season surcharge.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Contracts for 3 months and above.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckOutlined className="text-blue-600 mt-1" />
                      <span className="text-gray-600">Committed to 90% of MQC; we are committed to 100% of MQC.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-100 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RocketOutlined className="text-white text-3xl" />
                    </div>
                    <p className="text-gray-700 font-medium">Block Space Guarantee</p>
                    <p className="text-gray-500 text-sm">Fixed space with market rates</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌧️</span>
              <div>
                <div className="text-sm text-gray-500">Rain to stop</div>
                <div className="text-lg font-semibold text-gray-800">In about 1 hour</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to secure your ocean contract?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our ocean contract specialists today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Contact us
          </button>
        </div>
      </section>
    </div>
  );
};

export default OceanContract;
