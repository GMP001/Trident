import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import { 
  CheckOutlined, ShareAltOutlined, LoginOutlined, SearchOutlined,
  GlobalOutlined, AppstoreOutlined, LinkOutlined, EyeOutlined,
  ThunderboltOutlined, TeamOutlined
} from '@ant-design/icons';

interface SCMContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  section1: { title: string; description: string; description2: string; description3: string; image: string; buttonText: string; };
  section2: { title: string; description: string; points: string[]; image: string; buttonText: string; };
  section3: { title: string; description: string; benefits: Array<{ title: string; description: string; icon: string; }>; };
  buildingSolutions: { title: string; description: string; image: string; sectionTitle: string; columns: { dataManagement: { title: string; description: string; features: string[]; }; stakeholderManagement: { title: string; description: string; features: string[]; }; shipmentManagement: { title: string; description: string; features: string[]; }; }; };
  resilienceModel: { title: string; description: string; description2: string; points: string[]; image: string; buttonText: string; };
  supplyChainPlatform: { title: string; description: string; description2: string; image: string; imageCaption: string; buttonText: string; };
  gartnerRecognition: { title: string; description: string; description2: string; image: string; buttonText: string; };
  digitalTransformation: { title: string; description: string; description2: string; image: string; imageCaption: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: SCMContent = {
  isActive: true,
  hero: { title: "Global Supply Chain Management", subtitle: "Get unprecedented control over end-to-end supply chain.", image: "/supply_chain_hero.jpg", buttonText: "Contact us" },
  section1: { title: "Control, visibility, efficiency – from start to finish", description: "Supply chains can be complicated. That's why we have designed our Supply Chain Management (SCM) services to help cater to your logistics complexities. Our local expertise along with our global infrastructure and Supply Chain Platform provides you with a strong supply chain backbone that will help you grow your business and exceed customer expectations.", description2: "The broad range of value added capabilities provided under the SCM services can help achieve your business objectives with reliability, speed, agility, resilience, cost efficiencies and decarbonisation. Our expert supply chain teams can handle your logistics process, allowing you more time to concentrate on your core business.", description3: "Know more in our SCM services section.", image: "/supply_chain_01.jpg", buttonText: "Learn more" },
  section2: { title: "Connecting and simplifying global supply chains", description: "We have innovated our supply chain management solutions to enable our customers to stay ahead every time. Trident SCM solutions combine shipment data and stakeholder management systems to streamline your logistics end-to-end. The solutions are digitally enabled by modern technology platforms making supply chains simpler and better connected all the way. Here's how it works:", points: ["Purchase order management","Customer KPI management and visibility","Booking management","Shipment planning","Load planning and cargo consolidation","Document management","Destination management","Vendor management","Carrier management","Account management","Business implementation","System integration and data integration"], image: "/illustration-connecting-and-simplifying-global-supply-chains.svg", buttonText: "Learn more" },
  section3: { title: "End-to-end services for your unique business needs", description: "Your business is like no other. Supply Chain Management gives you an intricate ecosystem designed to make your supply chain work exactly like you want it to. Trident SCM gives you a set of tools to continuously improve, digitise and optimise your global supply chain while actively managing exceptions.", benefits: [
    { title: "Global partner with local solutions", description: "Our global and local know-how helps improve your supply chain while keeping your overall goals in mind.", icon: "global" },
    { title: "Customisation", description: "Navigate through complexities of businesses and supply chains comfortably with our well-fitted solutions.", icon: "appstore" },
    { title: "Supply chain connector", description: "We offer solutions as an integrator of container logistics, that handles every step in your logistics on your behalf.", icon: "link" },
    { title: "Visibility and actionable insights", description: "We create and manage just-in-time supply chains with visibility, enabling you to speed up or slow down as per the need.", icon: "eye" },
    { title: "Enhanced continuity", description: "Faster and smoother handling of exceptions. This ensures constant movement of your cargo – even when the unexpected happens.", icon: "thunderbolt" },
    { title: "A trusted partner", description: "We foster partnerships with our customers by building in-house solutions and strategic alliances.", icon: "team" }
  ]},
  buildingSolutions: { title: "Building solutions that meet your diverse business needs", description: "As a Trident SCM customer, you can get your global supply chain in sync by letting us handle the movement of goods from production to distribution to their final destinations. Moreover, the integrated supply chain management technology also allows us to tailor our services whenever you need it. We meet your needs and go beyond, taking care of your cargo and data flows.", image: "/supply_chain_05.jpg", sectionTitle: "Managing your supply chain on three fronts", columns: {
    dataManagement: { title: "1. Data Management", description: "Technology to maximise your supply chain with flexible solutions that fits your budget and needs.", features: ["Logistics visibility: A multi-enterprise network connecting all stakeholders and displaying the status of your supply chain from end to end.","Inventory optimisation: Optimise materials and finished goods at all stocking echelons while improving customer service and operating efficiencies.","Inventory collaboration: Gain multi-tier visibility into materials, manage exceptions and meet customer demands consistently.","Order collaboration: Collaborate with suppliers to automate procure-to-pay processes and streamline workflows.","EDI/API integration: Data interchanges in formats and frequencies as required by customers.","Demand sensing: Create accurate near-term forecasts that reflect current market realities."] },
    stakeholderManagement: { title: "2. Stakeholder Management", description: "Visibility to link with your logistics stakeholders to recognise issues and plan cost-effective SCM solutions.", features: ["Supplier and Vendor management: Collaborate with suppliers in every step for seamless flow of cargo, information and documents.","Carrier management: Track and drive carriers' performance to secure a satisfying service level for customers.","Customer KPI excellence: Provide KPIs that help customers manage and optimize their business.","Performance reviews: Conduct regular business review and continuously drive for improvement."] },
    shipmentManagement: { title: "3. Shipment Management", description: "Integration capabilities to monitor and manage orders, right from order generation until delivery.", features: ["Booking management: Taking and validating suppliers' booking through an automated online platform.","Labelling and scanning: Label printing, affixing, monitoring and data validation.","Shipment planning: Dynamic shipment planning helps customers to optimize shipping mode, route and schedule.","Loading plan: Optimise customer's transportation cost through carefully planned loading and consolidation.","Garments-on-hanger handling: Provide tailored Garment-on-hanger services to meet customers' specific business needs.","Destination services: Comprehensive destination services for efficient handover and end-to-end control.","Quality checks: Customised cargo inspection as per customers' requirements."] }
  }},
  resilienceModel: { title: "Supply Chain Resilience Model", description: "In today's rapidly changing world, maintaining a smooth and reliable flow of goods is crucial. The Trident Supply Chain Resilience Model helps businesses stay agile and flexible, even during uncertainties.", description2: "By combining innovative technology, risk management expertise, and Trident's global network, our consulting solution supports companies in identifying vulnerabilities, developing practical strategies, and enhancing overall supply chain resilience from end to end.", points: ["Tailor resilience strategies through in-depth analysis of risks and dependencies within your supply chain.","Leverage advanced analytics for proactive supply chain management — adaptable across carriers and transport modes.","Stabilize operations by reducing risks, improving efficiency, and providing continuous support for resilience and crisis management."], image: "/supply_chain_06.jpg", buttonText: "Learn more" },
  supplyChainPlatform: { title: "Trident Supply Chain Platform", description: "The Trident Supply Chain Platform is designed to save time and simplify complexity, enabling you to manage your entire supply chain whenever needed. By providing holistic control through near real-time visibility, actionable recommendations, and seamless execution, our solutions address end-to-end supply chain requirements.", description2: "This interactive platform empowers you to monitor, manage, and optimize your supply chain with just a few clicks—bringing efficiency and clarity to every step of the process.", image: "/supply_chain_02.jpg", imageCaption: "A team of employees looking at SCM dashboard on a laptop", buttonText: "Learn more" },
  gartnerRecognition: { title: "Leading the way to future-ready supply chains", description: "A.P. Moller-Trident was recognized as a Leader in 2025 Gartner® Magic Quadrant™ for Third-party Logistics, Worldwide for the fourth time in a row.", description2: "For more details on why A. P. Moller-Trident was named a Leader yet again and what it means for your business, read our latest piece.", image: "/supply_chain_03.jpg", buttonText: "Learn more" },
  digitalTransformation: { title: "Build smarter, stronger supply chains through digital transformation", description: "Global supply chains are more complex now than ever before. In order to adapt quickly and respond effectively to disruptions, businesses need to move from outdated manual processes to AI-powered decision making.", description2: "In this article, explore the challenges that businesses face today and discuss how digital transformation is the key to unlocking long-term success. From enhanced visibility and data-driven insights to predictive logistics, discover how digitisation empowers you to plan, adapt, and deliver with greater precision and confidence.", image: "/supply_chain_04_warehouse.jpg", imageCaption: "A warehouse with cargo arranged in shelves", buttonText: "Learn more" },
  cta: { title: "Ready to transform your supply chain?", subtitle: "Let our experts help you build a smarter, more resilient logistics network", buttonText: "Contact our team" }
};

const section3Icons: Record<string, React.ReactNode> = {
  global: <GlobalOutlined className="text-3xl text-blue-500 mt-1" />,
  appstore: <AppstoreOutlined className="text-3xl text-blue-500 mt-1" />,
  link: <LinkOutlined className="text-3xl text-blue-500 mt-1" />,
  eye: <EyeOutlined className="text-3xl text-blue-500 mt-1" />,
  thunderbolt: <ThunderboltOutlined className="text-3xl text-blue-500 mt-1" />,
  team: <TeamOutlined className="text-3xl text-blue-500 mt-1" />,
};

const SCM = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('scm');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          section1: { ...defaultContent.section1, ...(pc.section1 || {}) },
          section2: { ...defaultContent.section2, ...(pc.section2 || {}), points: pc.section2?.points || defaultContent.section2.points },
          section3: { ...defaultContent.section3, ...(pc.section3 || {}), benefits: pc.section3?.benefits || defaultContent.section3.benefits },
          buildingSolutions: { ...defaultContent.buildingSolutions, ...(pc.buildingSolutions || {}), columns: { ...defaultContent.buildingSolutions.columns, ...(pc.buildingSolutions?.columns || {}) } },
          resilienceModel: { ...defaultContent.resilienceModel, ...(pc.resilienceModel || {}), points: pc.resilienceModel?.points || defaultContent.resilienceModel.points },
          supplyChainPlatform: { ...defaultContent.supplyChainPlatform, ...(pc.supplyChainPlatform || {}) },
          gartnerRecognition: { ...defaultContent.gartnerRecognition, ...(pc.gartnerRecognition || {}) },
          digitalTransformation: { ...defaultContent.digitalTransformation, ...(pc.digitalTransformation || {}) },
          cta: { ...defaultContent.cta, ...(pc.cta || {}) }
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const gm = (p: string) => { if (!p) return ''; if (p.startsWith('http')) return p; if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`; return p; };
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  const heroMedia = content.hero.image || content.hero.video || '';
  const isHeroVideo = heroMedia.endsWith('.mp4');

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {isHeroVideo ? <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}><source src={gm(heroMedia)} type="video/mp4" /></video> : <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${gm(heroMedia)}')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }} />}
          <div className="absolute inset-0 bg-black/55" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }} />
        </div>
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-5xl md:text-6xl lg:text-6xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button></Link>
        </div>
      </section>

      <div style={{ marginLeft: '300px' }}>
        {/* Section 1 */}
        <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-4xl font-light text-gray-900 mb-6">{content.section1.title}</h2><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.section1.description}</p><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.section1.description2}</p><p className="text-gray-700 text-lg leading-relaxed mb-4 font-medium">{content.section1.description3}</p><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.section1.buttonText}</button></Link></div><div><img src={gm(content.section1.image)} alt="SCM" className="w-full h-auto rounded-lg shadow-md" /></div></div></section>
        <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>

        {/* Section 2 */}
        <section className="py-16 px-8 md:px-16 lg:px-24"><div className="max-w-4xl mb-12"><h2 className="text-3xl font-light text-gray-900 mb-6">{content.section2.title}</h2><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.section2.description}</p><div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-8">{[0,1].map(col => (<div key={col}><ul className="space-y-3">{content.section2.points.filter((_,i) => i % 2 === col).map((pt,i) => (<li key={i} className="flex items-start gap-2"><CheckOutlined className="text-blue-500 mt-1" /><span className="text-gray-700">{pt}</span></li>))}</ul></div>))}</div><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.section2.buttonText}</button></Link></div><div className="mt-12"><img src={gm(content.section2.image)} alt="Connecting" className="w-full max-w-4xl h-auto" /></div></section>
        <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>

        {/* Section 3 */}
        <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-6">{content.section3.title}</h2><p className="text-gray-700 text-lg leading-relaxed mb-10 max-w-4xl">{content.section3.description}</p><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{content.section3.benefits.map((b,i) => (<div key={i} className="flex gap-4 items-start">{section3Icons[b.icon] || section3Icons.global}<div><h3 className="text-xl font-semibold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600">{b.description}</p></div></div>))}</div></section>
        <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>

        {/* Building Solutions */}
        <section className="py-16 px-8 md:px-16 lg:px-24"><div className="max-w-6xl"><div className="relative mb-12 overflow-visible"><div className="relative overflow-hidden" style={{ borderRadius: '60px' }}><img src={gm(content.buildingSolutions.image)} alt="Building" className="w-full h-auto" /></div><div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '5px' }} /><div className="absolute bottom-0 right-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '5px' }} /><div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', background: '#38bdf8', left: '143px', right: '143px', zIndex: 15 }} /></div><h3 className="text-2xl font-light text-gray-900 mb-8">{content.buildingSolutions.sectionTitle}</h3><div className="grid md:grid-cols-3 gap-8">{['dataManagement','stakeholderManagement','shipmentManagement'].map((key,i) => { const col = content.buildingSolutions.columns[key as keyof typeof content.buildingSolutions.columns]; return (<div key={i}><h4 className="text-xl font-semibold text-blue-600 mb-4">{col.title}</h4><p className="text-gray-600 mb-4">{col.description}</p><ul className="space-y-3">{col.features.map((f,j) => { const [title, ...desc] = f.split(': '); return (<li key={j}><span className="font-semibold text-gray-800">{title}</span><p className="text-gray-600 text-sm mt-1">{desc.join(': ')}</p></li>); })}</ul></div>); })}</div></div></section>
        <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 my-6"></div></div>

        {/* Resilience Model */}
        <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.resilienceModel.title}</h2><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.resilienceModel.description}</p><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.resilienceModel.description2}</p><ul className="space-y-3 mb-8">{content.resilienceModel.points.map((p,i) => (<li key={i} className="flex items-start gap-2"><CheckOutlined className="text-blue-500 mt-1" /><span className="text-gray-700">{p}</span></li>))}</ul><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.resilienceModel.buttonText}</button></Link></div><div><img src={gm(content.resilienceModel.image)} alt="Resilience" className="w-full h-auto rounded-lg shadow-md" /></div></div></section>
        <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>

        {/* Supply Chain Platform */}
        <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.supplyChainPlatform.title}</h2><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.supplyChainPlatform.description}</p><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.supplyChainPlatform.description2}</p><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.supplyChainPlatform.buttonText}</button></Link></div><div><img src={gm(content.supplyChainPlatform.image)} alt="Platform" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-3 text-center">{content.supplyChainPlatform.imageCaption}</p></div></div></section>
        <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>

        {/* Gartner */}
        <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-50"><div className="grid md:grid-cols-2 gap-12 items-center"><div><img src={gm(content.gartnerRecognition.image)} alt="Gartner" className="w-full h-auto rounded-lg shadow-md" /></div><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.gartnerRecognition.title}</h2><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.gartnerRecognition.description}</p><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.gartnerRecognition.description2}</p><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.gartnerRecognition.buttonText}</button></Link></div></div></section>
        <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>

        {/* Digital Transformation */}
        <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.digitalTransformation.title}</h2><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.digitalTransformation.description}</p><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.digitalTransformation.description2}</p><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.digitalTransformation.buttonText}</button></Link></div><div><img src={gm(content.digitalTransformation.image)} alt="Digital" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-3 text-center">{content.digitalTransformation.imageCaption}</p></div></div></section>

        {/* Weather */}
        <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">🌤️</span><div><div className="text-lg font-semibold text-gray-800">28°C</div><div className="text-sm text-gray-500">Partly sunny</div></div></div><div className="flex items-center gap-4"><ShareAltOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><LoginOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><SearchOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></section>

        {/* CTA */}
        <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="text-center max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl font-light text-white mb-4">{content.cta.title}</h2><p className="text-xl text-white/90 mb-8">{content.cta.subtitle}</p><Link to="/contact"><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all text-sm font-medium">{content.cta.buttonText}</button></Link></div></section>
      </div>
    </div>
  );
};

export default SCM;
