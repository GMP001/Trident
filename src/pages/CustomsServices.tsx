import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined, SafetyOutlined, ApiOutlined, TeamOutlined,
  RocketOutlined, FileProtectOutlined,
} from '@ant-design/icons';

interface CustomsContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; video?: string; image?: string; button1Text: string; button2Text: string; };
  localExpertise: { title: string; description: string; description2: string; image: string; imageCaption: string; buttonText: string; };
  whyChooseUs: { title: string; subtitle: string; benefits: Array<{ title: string; description: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; button1Text: string; button2Text: string; };
}

const defaultContent: CustomsContent = {
  isActive: true,
  hero: { title: "Trident Customs Services", subtitle: "Experience simplified global customs with local expertise.", video: "/customer_service.mp4", button1Text: "Book now", button2Text: "Contact us" },
  localExpertise: { title: "Local expertise, global reach", description: "To ensure seamless movement, prerequisites like compliance and clearances must be managed efficiently. A trusted partner who understands the complexities of your supply chain and local regulations can help in making the whole process easier.", description2: "With Trident Customs Services, you can simplify your imports and exports anywhere in the world. We provide visibility and efficiency, a smooth compliance process, and a global network of customs experts to help keep your goods moving round the clock. Additionally, you also get the flexibility of adding customs at the time of booking your ocean shipment or at a later stage, with the help of convenient online solutions through MyCustoms.", image: "/customer_service_01.jpg", imageCaption: "Business woman chat, digital learner, customer service desk", buttonText: "Book now" },
  whyChooseUs: { title: "Why choose Trident Customs Services?", subtitle: "Trident Customs Services proactively manages your import and export activities to save you time and manage exceptions by:", benefits: [
    { title: "Providing end-to-end integration", description: "Integrate your customs process with our Supply Chain Management (SCM) platform for export data management and downstream import benefits.", icon: "api" },
    { title: "Global Trade and Customs Consulting services", description: "Compliance experts and specialist trade consultants help you manoeuvre the complex world of tariff codes, taxes, duties and international trade regulations to help decrease costs and increase predictability.", icon: "global" },
    { title: "Offering more compliance control", description: "Dedicated compliance management teams to closely monitor your customs activity along with the latest changes in legislation.", icon: "safety" },
    { title: "Optimising your supply chain", description: "Keep your complex supply chain running smoothly by minimising downtime and reducing costs with a tailor-made approach that's unique to your business needs.", icon: "rocket" },
    { title: "Collaborating with Trident customs clearance agents", description: "A close working relationship with one customs service provider throughout your cargo journey; someone who understands your business needs and increases your supply chain efficiency and visibility.", icon: "team" },
    { title: "Managing risk and unpredictability", description: "A centralised team of experts to execute your customs process with compliance and efficiency.", icon: "protect" }
  ]},
  contact: { title: "Contact Our Customs Experts", subtitle: "Reach out to our customs clearance specialists for assistance with your import and export compliance needs.", buttonText: "Contact us" },
  cta: { title: "Ready to simplify your customs clearance?", subtitle: "Contact our customs experts today", button1Text: "Book now", button2Text: "Contact us" }
};

const iconMap: Record<string, React.ReactNode> = {
  api: <ApiOutlined className="text-2xl text-blue-600" />,
  global: <GlobalOutlined className="text-2xl text-blue-600" />,
  safety: <SafetyOutlined className="text-2xl text-blue-600" />,
  rocket: <RocketOutlined className="text-2xl text-blue-600" />,
  team: <TeamOutlined className="text-2xl text-blue-600" />,
  protect: <FileProtectOutlined className="text-2xl text-blue-600" />,
};

const CustomsServices = () => {
  const [content, setContent] = useState<CustomsContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('customs-services');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          localExpertise: { ...defaultContent.localExpertise, ...(pc.localExpertise || {}) },
          whyChooseUs: { ...defaultContent.whyChooseUs, ...(pc.whyChooseUs || {}), benefits: pc.whyChooseUs?.benefits || defaultContent.whyChooseUs.benefits },
          contact: { ...defaultContent.contact, ...(pc.contact || {}) },
          cta: { ...defaultContent.cta, ...(pc.cta || {}) }
        });
      }
    } catch (err) { console.error('Error loading customs:', err); }
    finally { setLoading(false); }
  };

  const getMediaUrl = (p: string) => { if (!p) return ''; if (p.startsWith('http')) return p; if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`; return p; };
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {content.hero.video?.endsWith('.mp4') ? <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}><source src={getMediaUrl(content.hero.video)} type="video/mp4" /></video> : <img src={getMediaUrl(content.hero.image || '')} alt={content.hero.title} className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }} />}
          <div className="absolute bg-black/55" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px' }} />
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.button1Text}</button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">{content.hero.button2Text}</button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}>
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'contact'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-1 text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>{tab}</button>)}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.localExpertise.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.localExpertise.description}</p><p className="text-gray-600 leading-relaxed mb-6">{content.localExpertise.description2}</p><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.localExpertise.buttonText}</button></div><div><img src={getMediaUrl(content.localExpertise.image)} alt="Customs" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.localExpertise.imageCaption}</p></div></div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whyChooseUs.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.whyChooseUs.subtitle}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{content.whyChooseUs.benefits.map((b, i) => (<div key={i} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">{iconMap[b.icon] || iconMap.api}</div><h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600 text-sm">{b.description}</p></div>))}</div></div></section>
      </div>}

      {/* CONTACT */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}

      {/* Weather */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">⛅</span><div><div className="text-lg font-semibold text-gray-800">31°C</div><div className="text-sm text-gray-500">Mostly cloudy</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>

      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><div className="flex gap-4 justify-center"><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.button1Text}</button><button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">{content.cta.button2Text}</button></div></div></section>
    </div>
  );
};

export default CustomsServices;
