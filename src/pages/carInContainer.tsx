import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import { 
  RocketOutlined, EnvironmentOutlined, GlobalOutlined,
  CarOutlined, SafetyOutlined, CalendarOutlined,
  ShareAltOutlined, LoginOutlined, SearchOutlined
} from '@ant-design/icons';

interface CarsInContainersContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  whatIsCiC: { title: string; description: string; description2: string; image: string; };
  whyComplement: { title: string; description: string; image: string; imageCaption: string; };
  whyNeedCiC: { title: string; benefits: Array<{ title: string; description: string; icon: string; }>; buttonText: string; };
  howItWorks: { title: string; description: string; processSteps: string[]; image: string; imageCaption: string; };
  benefits: { title: string; items: Array<{ title: string; description: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: CarsInContainersContent = {
  isActive: true,
  hero: { title: "Shift into higher gear to overcome automotive disruptions", subtitle: "Integrated logistics brings greater flexibility and agility to your supply chain.", image: "/car_in_container_hero_2.png", buttonText: "Contact us" },
  whatIsCiC: { title: "What is Cars in Containers?", description: "Cars in Containers (CiC) enables the transport of finished vehicles from manufacturing plants to global destinations using containers. This car transport solution works as a capable complement to traditional RoRo shipping.", description2: "Our innovative vehicle shipping service aims to provide a faster and more efficient path to market, enhancing cost efficiency and flexibility in your automotive supply chain. Stay ahead of the competition and optimise your Finished Vehicle Logistics, all the way.", image: "/car_in_container_01.jpg" },
  whyComplement: { title: "Why complement your supply chain with Cars in Containers?", description: "For OEMs looking to capture market share and enter new geographies, Cars in Containers is a viable auto transport solution which offers quick, efficient ways to get Completely Built-up Units (CBUs) to their target destinations. Further, our team performs a pre-trip inspection (PTI) and a pre-delivery inspection (PDI) to document the condition of the vehicles prior to final delivery to customers.", image: "/car_in_container_03.jpg", imageCaption: "Head shot of cars parked" },
  whyNeedCiC: { title: "Why do you need Cars in Containers?", benefits: [
    { title: "Flexible transport", description: "Choose weekly sailings from most key origins across our global multimodal network.", icon: "calendar" },
    { title: "Optimised logistics planning", description: "Cars in Containers is a great complementary option to RoRo which can enhance predictability and efficiency in logistics planning.", icon: "global" },
    { title: "No limitations to port access", description: "With access to a deep-water port not being mandatory in case of smaller vessels, OEMs can expand access to remote locations for smaller-volume consignments. This also allows us to significantly reduce the number of touchpoints.", icon: "environment" }
  ], buttonText: "Contact us now" },
  howItWorks: { title: "How does Cars in Containers work?", description: "Cars in Containers involves loading finished vehicles into standard dry containers. Each vehicle is positioned and immobilised (secured/lashed) within the container floor or racks. Since the cars are containerised, they can be moved using multiple modes of transport, which comes in handy especially before and after the ocean journey. Upon arrival at the depot, cars are carefully unloaded and shipped to their destinations.", processSteps: ["Shipment planning based on forecast, load planning and booking","Lashing + stuffing + inspection & value-added service (eg. fumigation, vehicle inspection)","Inland transport to port, customs clearance & ocean transit","Unloading and inspection","Inland delivery to the depot","Inland transportation by Trident to the end customer"], image: "/car_in_container_04.png", imageCaption: "Cars in Containers how does it work illustration" },
  benefits: { title: "What are the core benefits of Trident Cars in Containers?", items: [
    { title: "Flexibility", description: "Reduce inventory build-up at origin and order-to-delivery times with predictable weekly departures to destinations worldwide.", icon: "rocket" },
    { title: "Fastened cargo", description: "Our fastening and lashing techniques are designed to keep your vehicles (including EVs) firmly placed in the containers throughout journey, from origin to destination.", icon: "safety" },
    { title: "Expertise", description: "Optimise for smaller-volume consignments of vehicles with access to a greater number of remote locations at higher frequencies.", icon: "car" }
  ]},
  contact: { title: "Contact Our Cars in Containers Experts", subtitle: "Ready to optimize your finished vehicle logistics? Let our experts help you find the perfect Cars in Containers solution for your automotive supply chain.", buttonText: "Submit Inquiry" },
  cta: { title: "Ready to optimize your finished vehicle logistics?", subtitle: "Let our experts help you find the perfect Cars in Containers solution", buttonText: "Contact our team" }
};

const whyNeedIcons: Record<string, React.ReactNode> = {
  calendar: <CalendarOutlined className="text-2xl text-blue-600" />,
  global: <GlobalOutlined className="text-2xl text-blue-600" />,
  environment: <EnvironmentOutlined className="text-2xl text-blue-600" />,
};
const benefitIcons: Record<string, React.ReactNode> = {
  rocket: <RocketOutlined className="text-3xl text-blue-600" />,
  safety: <SafetyOutlined className="text-3xl text-blue-600" />,
  car: <CarOutlined className="text-3xl text-blue-600" />,
};

const CarInContainer = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('cars-in-containers');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          whatIsCiC: { ...defaultContent.whatIsCiC, ...(pc.whatIsCiC || {}) },
          whyComplement: { ...defaultContent.whyComplement, ...(pc.whyComplement || {}) },
          whyNeedCiC: { ...defaultContent.whyNeedCiC, ...(pc.whyNeedCiC || {}), benefits: pc.whyNeedCiC?.benefits || defaultContent.whyNeedCiC.benefits },
          howItWorks: { ...defaultContent.howItWorks, ...(pc.howItWorks || {}), processSteps: pc.howItWorks?.processSteps || defaultContent.howItWorks.processSteps },
          benefits: { ...defaultContent.benefits, ...(pc.benefits || {}), items: pc.benefits?.items || defaultContent.benefits.items },
          contact: { ...defaultContent.contact, ...(pc.contact || {}) },
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
  const tabs = [
    { id: 'overview', label: 'Overview' }, { id: 'how-it-works', label: 'How it Works' },
    { id: 'benefits', label: 'Benefits' }, { id: 'contact', label: 'Contact us' }
  ];

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
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button></Link>
        </div>
      </section>

      <div style={{ marginLeft: '300px' }}>
        {/* Tabs */}
        <div className="sticky top-20 z-20 bg-white border-b border-gray-200 px-8 md:px-16 lg:px-24">
          <div className="flex gap-8 overflow-x-auto">{tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`py-4 px-1 text-sm font-medium transition-all ${activeTab===t.id?'text-blue-600 border-b-2 border-blue-600':'text-gray-600 hover:text-gray-900'}`}>{t.label}</button>)}</div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && <>
          <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.whatIsCiC.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed mb-4">{content.whatIsCiC.description}</p><p className="text-gray-700 text-lg leading-relaxed">{content.whatIsCiC.description2}</p></div><div><img src={gm(content.whatIsCiC.image)} alt="CiC" className="w-full h-auto rounded-lg shadow-md" /></div></div></section>
          <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>
          <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="grid md:grid-cols-2 gap-12 items-center"><div><img src={gm(content.whyComplement.image)} alt="Why" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.whyComplement.imageCaption}</p></div><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.whyComplement.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed">{content.whyComplement.description}</p></div></div></section>
          <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>
          <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-12 text-center">{content.whyNeedCiC.title}</h2><div className="grid md:grid-cols-3 gap-8">{content.whyNeedCiC.benefits.map((b,i)=>(<div key={i} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{whyNeedIcons[b.icon]||whyNeedIcons.calendar}</div><h3 className="text-xl font-semibold text-gray-900 mb-3">{b.title}</h3><p className="text-gray-600">{b.description}</p></div>))}</div><div className="text-center mt-10"><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.whyNeedCiC.buttonText}</button></Link></div></section>
        </>}

        {/* HOW IT WORKS */}
        {activeTab === 'how-it-works' && <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-8">{content.howItWorks.title}</h2><div className="grid md:grid-cols-2 gap-12 items-start"><div><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.howItWorks.description}</p><div className="mt-8"><h3 className="text-xl font-semibold text-gray-900 mb-4">Process Flow:</h3><ul className="space-y-3">{content.howItWorks.processSteps.map((step,i)=>(<li key={i} className="flex items-start gap-3"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-blue-600 text-xs font-bold">{i+1}</span></div><span className="text-gray-700">{step}</span></li>))}</ul></div></div><div><img src={gm(content.howItWorks.image)} alt="How it works" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.howItWorks.imageCaption}</p></div></div></section>}

        {/* BENEFITS */}
        {activeTab === 'benefits' && <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-12 text-center">{content.benefits.title}</h2><div className="grid md:grid-cols-3 gap-8">{content.benefits.items.map((b,i)=>(<div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 text-center border border-blue-100"><div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{benefitIcons[b.icon]||benefitIcons.rocket}</div><h3 className="text-2xl font-semibold text-gray-900 mb-3">{b.title}</h3><p className="text-gray-600">{b.description}</p></div>))}</div></section>}

        {/* CONTACT */}
        {activeTab === 'contact' && <section className="py-16 px-8 md:px-16 lg:px-24"><div className="max-w-3xl"><h2 className="text-3xl font-light text-gray-900 mb-6">{content.contact.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed mb-8">{content.contact.subtitle}</p><div className="bg-gray-50 rounded-lg p-8"><form className="space-y-6">{["Full Name","Email Address","Company Name","Message"].map((f,i)=>(<div key={i}><label className="block text-sm font-medium text-gray-700 mb-2">{f}</label>{f==='Message'?<textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>:<input type={f==='Email Address'?'email':'text'} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />}</div>))}<button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.contact.buttonText}</button></form></div></div></section>}
      </div>

      {/* Weather - Full width */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">🌡️</span><div><div className="text-lg font-semibold text-gray-800">31°C</div><div className="text-sm text-gray-500">Hot days ahead</div></div></div><div className="flex items-center gap-4"><ShareAltOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><LoginOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><SearchOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div>
      </section>

      {/* CTA - Full width */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="text-center max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl font-light text-white mb-4">{content.cta.title}</h2><p className="text-xl text-white/90 mb-8">{content.cta.subtitle}</p><Link to="/contact"><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all text-sm font-medium">{content.cta.buttonText}</button></Link></div>
      </section>
    </div>
  );
};

export default CarInContainer;
