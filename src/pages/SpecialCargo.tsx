import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined,
  ToolOutlined,
  TeamOutlined,
  LaptopOutlined,
  CalendarOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const SpecialCargo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCargoType, setActiveCargoType] = useState('ingauge');
  const [selectedContainer, setSelectedContainer] = useState('20ot');

  const containerSpecs = {
    '20ot': { length: 5491, width: 2221, height: 234, payload: 28200 },
    '40ot': { length: 11811, width: 2191, height: 234, payload: 28600 },
    '40othc': { length: 11811, width: 2191, height: 265, payload: 28600 },
    '40fr': { length: 11630, width: 2440, height: 194, payload: 47000 },
    '40frhc': { length: 11630, width: 2440, height: 226, payload: 47000 },
  };

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
              backgroundImage: `url('/special_cargo_shipment_hero.jpg')`,
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
            Special Cargo
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            We provide tailored and efficient solutions for shipping your Out of Gauge, In Gauge and Break Bulk cargo.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
            Find a price
          </button>
        </div>
      </section>

      {/* We take special care of your special cargo */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                We take special care of your special cargo
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Trident, we recognise that handling special cargo is different from traditional container shipping.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With more than 40 years of experience in transporting oversized and heavy shipments and an 
                unparalleled global network, we have the capacity to deliver your special cargo to any part 
                of the world. Our international team of special cargo experts have an in-depth knowledge and 
                understanding of the challenges involved, and are there to help throughout the entire process.
              </p>
            </div>
            <div>
              <img src="/special_cargo_shipment_01.jpg" alt="Special Cargo" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Experience the ease and convenience */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Experience the ease and convenience of dealing with a one-stop shop
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Spend your time and efforts on your business and not on coordinating with multiple qualified 
              sub-tier vendors and suppliers to accomplish your project cargo goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GlobalOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600 text-sm">A global network of ships, trucks, trains, barges and air service</p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ToolOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Space and special equipment</h3>
              <p className="text-gray-600 text-sm">Quick and easy access to equipment, space and skills, just when you need them</p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TeamOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">International expertise</h3>
              <p className="text-gray-600 text-sm">Our international team of project cargo experts are here to help you every step of the way</p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <LaptopOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market-leading online tools</h3>
              <p className="text-gray-600 text-sm">Get quotes, routes and schedules at your fingertips</p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CalendarOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple weekly departures</h3>
              <p className="text-gray-600 text-sm">Take advantage of flexibility to seize business opportunities</p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <RocketOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Constantly bettering services</h3>
              <p className="text-gray-600 text-sm">We continuously invest in Flat Rack and Open Top containers, as well as human and digital capabilities</p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircleOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guaranteed Loading</h3>
              <p className="text-gray-600 text-sm">Ensure your special cargo is loaded even during peak season</p>
            </div>

            <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ThunderboltOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quote Speed</h3>
              <p className="text-gray-600 text-sm">Plan your project better, with rates quoted within 4 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* We ship all types of special cargo */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              We ship all types of special cargo
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oversized and overweight cargo is characterised by exceeding the proportions and capabilities 
              of a single standard container. Whether you are shipping a 350-ton tugboat, a 46-metre crane 
              arm or a 17-metre propeller, we have the expertise and equipment available to deliver.
            </p>
          </div>

          {/* Cargo Type Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCargoType('ingauge')}
              className={`px-6 py-3 text-base font-medium rounded-lg transition-all ${
                activeCargoType === 'ingauge'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Gauge Cargo
            </button>
            <button
              onClick={() => setActiveCargoType('outgauge')}
              className={`px-6 py-3 text-base font-medium rounded-lg transition-all ${
                activeCargoType === 'outgauge'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Out of Gauge Cargo
            </button>
            <button
              onClick={() => setActiveCargoType('breakbulk')}
              className={`px-6 py-3 text-base font-medium rounded-lg transition-all ${
                activeCargoType === 'breakbulk'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Break Bulk Cargo
            </button>
          </div>

          {/* In Gauge Content */}
          {activeCargoType === 'ingauge' && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">In Gauge cargo</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The dimensions of the cargo are smaller than or equal to those of the flat rack or open 
                    top container (i.e. it requires special equipment but does not displace additional slots 
                    on the vessel).
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Examples of In Gauge shipments: machinery or large trees that can be lowered into an open top container.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    If you are shipping In Gauge cargo, you can book your shipment in just a few minutes on Trident.com.
                  </p>
                </div>
                <div>
                  <img src="/in-gauge-special-cargo.avif" alt="In Gauge Cargo" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          )}

          {/* Out of Gauge Content */}
          {activeCargoType === 'outgauge' && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Out of Gauge cargo</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The dimensions of the cargo exceed the flat rack or open top container by length, width 
                    or height, but can still be unitised in containers.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Examples of Out of Gauge shipments: propellers, flanges or trucks.
                  </p>
                </div>
                <div>
                  <img src="/out-of-gauge-banner.webp" alt="Out of Gauge Cargo" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          )}

          {/* Break Bulk Content */}
          {activeCargoType === 'breakbulk' && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Break Bulk cargo</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Vastly exceeds the size and/or weight of a standard container and is therefore handled as 
                    non-unitised cargo and normally placed on a bed of flat racks with a large number of lashing points.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Examples of common Break Bulk shipments: yachts, masts, industrial machines or train carriages.
                  </p>
                </div>
                <div>
                  <img src="/break-bulk-special-cargo.avif" alt="Break Bulk Cargo" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          )}

          {/* Container Specifications Table */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Container Specifications
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Equipment type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Length (CM)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Width (CM)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Height (CM)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Maximum Payload (KG)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">20' OT</td>
                    <td className="px-4 py-3 text-sm text-gray-700">5,491</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2,221</td>
                    <td className="px-4 py-3 text-sm text-gray-700">234</td>
                    <td className="px-4 py-3 text-sm text-gray-700">28,200</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">40' OT</td>
                    <td className="px-4 py-3 text-sm text-gray-700">11,811</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2,191</td>
                    <td className="px-4 py-3 text-sm text-gray-700">234</td>
                    <td className="px-4 py-3 text-sm text-gray-700">28,600</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">40' OT HC</td>
                    <td className="px-4 py-3 text-sm text-gray-700">11,811</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2,191</td>
                    <td className="px-4 py-3 text-sm text-gray-700">265</td>
                    <td className="px-4 py-3 text-sm text-gray-700">28,600</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">40' FR</td>
                    <td className="px-4 py-3 text-sm text-gray-700">11,630</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2,440</td>
                    <td className="px-4 py-3 text-sm text-gray-700">194</td>
                    <td className="px-4 py-3 text-sm text-gray-700">47,000*</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">40' FR HC</td>
                    <td className="px-4 py-3 text-sm text-gray-700">11,630</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2,440</td>
                    <td className="px-4 py-3 text-sm text-gray-700">226</td>
                    <td className="px-4 py-3 text-sm text-gray-700">47,000*</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">*Subject to terminal acceptance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Widget */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">☀️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">32°C</div>
                <div className="text-sm text-gray-500">Mostly sunny</div>
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
          <h3 className="text-3xl text-white mb-4 font-light">Ready to ship your special cargo?</h3>
          <p className="text-xl text-blue-100 mb-8">Contact our special cargo experts today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Find a price
          </button>
        </div>
      </section>
    </div>
  );
};

export default SpecialCargo;
