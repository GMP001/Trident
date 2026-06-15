import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  CheckOutlined,
  ShareAltOutlined,
  LoginOutlined,
  SearchOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  LinkOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  DatabaseOutlined,
  CarryOutOutlined
} from '@ant-design/icons';

const SCM = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      
      {/* Hero Section with Thick Blue Curved Border */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        {/* Background Image with Curve */}
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/supply_chain_hero.jpg')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
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
          <h1 className="text-5xl md:text-6xl lg:text-6xl text-white leading-tight mb-4 font-light tracking-wide">Global Supply Chain Management</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">Get unprecedented control over end-to-end supply chain.</p>
          <Link to="/contact">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Contact us</button>
          </Link>
        </div>
      </section>

      {/* Main Content with marginLeft alignment */}
      <div style={{ marginLeft: '300px' }}>
        
        {/* Section 1: Control, visibility, efficiency */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            <h2 className="text-4xl font-light text-gray-900 mb-6">Control, visibility, efficiency – from start to finish</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Supply chains can be complicated. That's why we have designed our Supply Chain Management (SCM) services to help cater to your logistics complexities. Our local expertise along with our global infrastructure and Supply Chain Platform provides you with a strong supply chain backbone that will help you grow your business and exceed customer expectations.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                The broad range of value added capabilities provided under the SCM services can help achieve your business objectives with reliability, speed, agility, resilience, cost efficiencies and decarbonisation. Our expert supply chain teams can handle your logistics process, allowing you more time to concentrate on your core business.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4 font-medium">Know more in our SCM services section.</p>
            <Link to="/contact">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Learn more</button>
            </Link>
            </div>
            <div>
            <img 
                src="/supply_chain_01.jpg" 
                alt="Supply Chain Management" 
                className="w-full h-auto rounded-lg shadow-md"
            />
            </div>
        </div>
        </section>

        {/* Blue Divider */}
        <div className="px-8 md:px-16 lg:px-24">
          <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
        </div>

        {/* Section 2: Connecting and simplifying global supply chains with Image Below */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
        {/* Writeup on top - Left aligned */}
        <div className="max-w-4xl mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Connecting and simplifying global supply chains</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We have innovated our supply chain management solutions to enable our customers to stay ahead every time. Trident SCM solutions combine shipment data and stakeholder management systems to streamline your logistics end-to-end. The solutions are digitally enabled by modern technology platforms making supply chains simpler and better connected all the way. Here's how it works:
            </p>
            
            {/* Two-column bullet points - Left aligned */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
            <div>
                <ul className="space-y-3">
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Purchase order management</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Customer KPI management and visibility</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Booking management</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Shipment planning</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Load planning and cargo consolidation</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Document management</span>
                </li>
                </ul>
            </div>
            <div>
                <ul className="space-y-3">
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Destination management</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Vendor management</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Carrier management</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Account management</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">Business implementation</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckOutlined className="text-blue-500 mt-1" />
                    <span className="text-gray-700">System integration and data integration</span>
                </li>
                </ul>
            </div>
            </div>
            
            <Link to="/contact">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Learn more</button>
            </Link>
        </div>
        
        {/* Image below - Left aligned */}
        <div className="mt-12">
            <img 
            src="/illustration-connecting-and-simplifying-global-supply-chains.svg" 
            alt="Connecting and simplifying global supply chains" 
            className="w-full max-w-4xl h-auto"
            />
        </div>
        </section>

        {/* Blue Divider */}
        <div className="px-8 md:px-16 lg:px-24">
          <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
        </div>

        {/* Section 3: End-to-end services for your unique business needs */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
        <h2 className="text-3xl font-light text-gray-900 mb-6">End-to-end services for your unique business needs</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-4xl">
            Your business is like no other. Supply Chain Management gives you an intricate ecosystem designed to make your supply chain work exactly like you want it to. Trident SCM gives you a set of tools to continuously improve, digitise and optimise your global supply chain while actively managing exceptions.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start">
            <GlobalOutlined className="text-3xl text-blue-500 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global partner with local solutions</h3>
                <p className="text-gray-600">Our global and local know-how helps improve your supply chain while keeping your overall goals in mind.</p>
            </div>
            </div>
            
            <div className="flex gap-4 items-start">
            <AppstoreOutlined className="text-3xl text-blue-500 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customisation</h3>
                <p className="text-gray-600">Navigate through complexities of businesses and supply chains comfortably with our well-fitted solutions.</p>
            </div>
            </div>
            
            <div className="flex gap-4 items-start">
            <LinkOutlined className="text-3xl text-blue-500 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Supply chain connector</h3>
                <p className="text-gray-600">We offer solutions as an integrator of container logistics, that handles every step in your logistics on your behalf.</p>
            </div>
            </div>
            
            <div className="flex gap-4 items-start">
            <EyeOutlined className="text-3xl text-blue-500 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visibility and actionable insights</h3>
                <p className="text-gray-600">We create and manage just-in-time supply chains with visibility, enabling you to speed up or slow down as per the need.</p>
            </div>
            </div>
            
            <div className="flex gap-4 items-start">
            <ThunderboltOutlined className="text-3xl text-blue-500 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enhanced continuity</h3>
                <p className="text-gray-600">Faster and smoother handling of exceptions. This ensures constant movement of your cargo – even when the unexpected happens.</p>
            </div>
            </div>
            
            <div className="flex gap-4 items-start">
            <TeamOutlined className="text-3xl text-blue-500 mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">A trusted partner</h3>
                <p className="text-gray-600">We foster partnerships with our customers by building in-house solutions and strategic alliances.</p>
            </div>
            </div>
        </div>
        </section>

        {/* Blue Divider */}
        <div className="px-8 md:px-16 lg:px-24">
          <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
        </div>

        {/* NEW BLOCK 1: Building solutions that meet your diverse business needs */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl">
            {/* Image for this block - Full curved version like hero */}
            <div className="relative mb-12 overflow-visible">
            {/* Image with all four corners curved */}
            <div className="relative overflow-hidden" style={{ borderRadius: '60px' }}>
                <img 
                src="/supply_chain_05.jpg" 
                alt="Building solutions that meet your diverse business needs" 
                className="w-full h-auto"
                />
            </div>
            
            {/* Sky Blue Thick Border - Left side */}
            <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '5px' }} />
            
            {/* Sky Blue Thick Border - Right side */}
            <div className="absolute bottom-0 right-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '5px' }} />
            
            {/* Full Width Straight Blue Thick Border */}
            <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', background: '#38bdf8', left: '143px', right: '143px', zIndex: 15 }} />
            </div>
            
            <h3 className="text-2xl font-light text-gray-900 mb-8">Managing your supply chain on three fronts</h3>
            
            {/* Three columns for Data Management, Stakeholder Management, Shipment Management */}
            <div className="grid md:grid-cols-3 gap-8">
            
            {/* Column 1: Data Management */}
            <div>
                <h4 className="text-xl font-semibold text-blue-600 mb-4">1. Data Management</h4>
                <p className="text-gray-600 mb-4">Technology to maximise your supply chain with flexible solutions that fits your budget and needs.</p>
                <ul className="space-y-3">
                <li>
                    <span className="font-semibold text-gray-800">Logistics visibility</span>
                    <p className="text-gray-600 text-sm mt-1">A multi-enterprise network connecting all stakeholders and displaying the status of your supply chain from end to end.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Inventory optimisation</span>
                    <p className="text-gray-600 text-sm mt-1">Optimise materials and finished goods at all stocking echelons while improving customer service and operating efficiencies.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Inventory collaboration</span>
                    <p className="text-gray-600 text-sm mt-1">Gain multi-tier visibility into materials, manage exceptions and meet customer demands consistently.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Order collaboration</span>
                    <p className="text-gray-600 text-sm mt-1">Collaborate with suppliers to automate procure-to-pay processes and streamline workflows.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">EDI/API integration</span>
                    <p className="text-gray-600 text-sm mt-1">Data interchanges in formats and frequencies as required by customers.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Demand sensing</span>
                    <p className="text-gray-600 text-sm mt-1">Create accurate near-term forecasts that reflect current market realities.</p>
                </li>
                </ul>
            </div>
            
            {/* Column 2: Stakeholder Management */}
            <div>
                <h4 className="text-xl font-semibold text-blue-600 mb-4">2. Stakeholder Management</h4>
                <p className="text-gray-600 mb-4">Visibility to link with your logistics stakeholders to recognise issues and plan cost-effective SCM solutions.</p>
                <ul className="space-y-3">
                <li>
                    <span className="font-semibold text-gray-800">Supplier and Vendor management</span>
                    <p className="text-gray-600 text-sm mt-1">Collaborate with suppliers in every step for seamless flow of cargo, information and documents.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Carrier management</span>
                    <p className="text-gray-600 text-sm mt-1">Track and drive carriers' performance to secure a satisfying service level for customers.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Customer KPI excellence</span>
                    <p className="text-gray-600 text-sm mt-1">Provide KPIs that help customers manage and optimize their business.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Performance reviews</span>
                    <p className="text-gray-600 text-sm mt-1">Conduct regular business review and continuously drive for improvement.</p>
                </li>
                </ul>
            </div>
            
            {/* Column 3: Shipment Management */}
            <div>
                <h4 className="text-xl font-semibold text-blue-600 mb-4">3. Shipment Management</h4>
                <p className="text-gray-600 mb-4">Integration capabilities to monitor and manage orders, right from order generation until delivery.</p>
                <ul className="space-y-3">
                <li>
                    <span className="font-semibold text-gray-800">Booking management</span>
                    <p className="text-gray-600 text-sm mt-1">Taking and validating suppliers' booking through an automated online platform.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Labelling and scanning</span>
                    <p className="text-gray-600 text-sm mt-1">Label printing, affixing, monitoring and data validation.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Shipment planning</span>
                    <p className="text-gray-600 text-sm mt-1">Dynamic shipment planning helps customers to optimize shipping mode, route and schedule.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Loading plan</span>
                    <p className="text-gray-600 text-sm mt-1">Optimise customer's transportation cost through carefully planned loading and consolidation.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Garments-on-hanger handling</span>
                    <p className="text-gray-600 text-sm mt-1">Provide tailored Garment-on-hanger services to meet customers' specific business needs.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Destination services</span>
                    <p className="text-gray-600 text-sm mt-1">Comprehensive destination services for efficient handover and end-to-end control.</p>
                </li>
                <li>
                    <span className="font-semibold text-gray-800">Quality checks</span>
                    <p className="text-gray-600 text-sm mt-1">Customised cargo inspection as per customers' requirements.</p>
                </li>
                </ul>
            </div>
            
            </div>
        </div>
        </section>

        {/* Blue Divider */}
        <div className="px-8 md:px-16 lg:px-24">
        <div className="w-16 h-0.5 bg-blue-500 my-6"></div>
        </div>

        {/* NEW BLOCK 2: Supply Chain Resilience Model */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            <h2 className="text-3xl font-light text-gray-900 mb-6">Supply Chain Resilience Model</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                In today's rapidly changing world, maintaining a smooth and reliable flow of goods is crucial. The Trident Supply Chain Resilience Model helps businesses stay agile and flexible, even during uncertainties.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                By combining innovative technology, risk management expertise, and Trident's global network, our consulting solution supports companies in identifying vulnerabilities, developing practical strategies, and enhancing overall supply chain resilience from end to end.
            </p>
            <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                <CheckOutlined className="text-blue-500 mt-1" />
                <span className="text-gray-700">Tailor resilience strategies through in-depth analysis of risks and dependencies within your supply chain.</span>
                </li>
                <li className="flex items-start gap-2">
                <CheckOutlined className="text-blue-500 mt-1" />
                <span className="text-gray-700">Leverage advanced analytics for proactive supply chain management — adaptable across carriers and transport modes.</span>
                </li>
                <li className="flex items-start gap-2">
                <CheckOutlined className="text-blue-500 mt-1" />
                <span className="text-gray-700">Stabilize operations by reducing risks, improving efficiency, and providing continuous support for resilience and crisis management.</span>
                </li>
            </ul>
            <Link to="/contact">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Learn more</button>
            </Link>
            </div>
            <div>
            <img 
                src="/supply_chain_06.jpg" 
                alt="Supply Chain Resilience Model" 
                className="w-full h-auto rounded-lg shadow-md"
            />
            </div>
        </div>
        </section>

        {/* Blue Divider */}
        <div className="px-8 md:px-16 lg:px-24">
        <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
        </div>

        {/* Section 4: Trident Supply Chain Platform with Image */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Trident Supply Chain Platform</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                The Trident Supply Chain Platform is designed to save time and simplify complexity, enabling you to manage your entire supply chain whenever needed. By providing holistic control through near real-time visibility, actionable recommendations, and seamless execution, our solutions address end-to-end supply chain requirements.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                This interactive platform empowers you to monitor, manage, and optimize your supply chain with just a few clicks—bringing efficiency and clarity to every step of the process.
              </p>
              <Link to="/contact">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Learn more</button>
              </Link>
            </div>
            <div>
              <img 
                src="/supply_chain_02.jpg" 
                alt="Trident Supply Chain Platform" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500 mt-3 text-center">A team of employees looking at SCM dashboard on a laptop</p>
            </div>
          </div>
        </section>

        {/* Blue Divider */}
        <div className="px-8 md:px-16 lg:px-24">
          <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
        </div>

        {/* Section 5: Gartner Recognition */}
        <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/supply_chain_03.jpg" 
                alt="Warehouse with cargo arranged in shelves" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Leading the way to future-ready supply chains</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                A.P. Moller-Trident was recognized as a Leader in 2025 Gartner® Magic Quadrant™ for Third-party Logistics, Worldwide for the fourth time in a row.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                For more details on why A. P. Moller-Trident was named a Leader yet again and what it means for your business, read our latest piece.
              </p>
              <Link to="/contact">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Learn more</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Blue Divider */}
        <div className="px-8 md:px-16 lg:px-24">
          <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
        </div>

        {/* Section 6: Build smarter, stronger supply chains */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Build smarter, stronger supply chains through digital transformation</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Global supply chains are more complex now than ever before. In order to adapt quickly and respond effectively to disruptions, businesses need to move from outdated manual processes to AI-powered decision making.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                In this article, explore the challenges that businesses face today and discuss how digital transformation is the key to unlocking long-term success. From enhanced visibility and data-driven insights to predictive logistics, discover how digitisation empowers you to plan, adapt, and deliver with greater precision and confidence.
              </p>
              <Link to="/contact">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">Learn more</button>
              </Link>
            </div>
            <div>
              <img 
                src="/supply_chain_04_warehouse.jpg" 
                alt="Warehouse with cargo arranged in shelves" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500 mt-3 text-center">A warehouse with cargo arranged in shelves</p>
            </div>
          </div>
        </section>

        {/* Weather Widget */}
        <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌤️</span>
              <div>
                <div className="text-lg font-semibold text-gray-800">28°C</div>
                <div className="text-sm text-gray-500">Partly sunny</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShareAltOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
              <LoginOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
              <SearchOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section with Blue Background */}
        <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Ready to transform your supply chain?</h2>
            <p className="text-xl text-white/90 mb-8">Let our experts help you build a smarter, more resilient logistics network</p>
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

export default SCM;
