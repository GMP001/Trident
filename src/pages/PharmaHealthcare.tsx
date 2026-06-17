import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  EyeOutlined, ExperimentOutlined, ThunderboltOutlined, SafetyOutlined,
  MedicineBoxOutlined, HeartOutlined, DesktopOutlined, CloudOutlined,
} from '@ant-design/icons';

interface PharmaContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  featuresStrip: { items: string[]; };
  overview: { title: string; description: string; description2: string; image: string; };
  strategy: { title: string; subtitle: string; pillars: Array<{ title: string; description: string; icon: string; }>; };
  segments: { title: string; subtitle: string; categories: Array<{ title: string; description: string; image: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: PharmaContent = {
  isActive: true,
  hero: { title: "Pharma & Healthcare Logistics", subtitle: "Built for pharma and healthcare logistics needs. Strengthen access, efficiency and accountability with specialised logistics solutions.", image: "/pharma_healthcare_hero.jpg", buttonText: "Get in touch" },
  featuresStrip: { items: ["Pharma expertise", "GDP compliance", "Quality management system"] },
  overview: { title: "Deliver with the responsibility healthcare demands", description: "Global pharmaceutical and healthcare supply chains are becoming more complex. Stricter regulations, temperature-sensitive products, and higher expectations for speed and reliability demand greater resilience. This requires precise temperature control, compliant handling, and end-to-end visibility.", description2: "Trident delivers these capabilities through end-to-end pharma logistics solutions that protect product integrity at scale. This helps support resilient, compliant and high-performing supply chains worldwide.", image: "/pharma_healthcare_02.jpg" },
  strategy: { title: "Powering what's next in essential healthcare", subtitle: "A resilient, end-to-end pharma logistics ecosystem is essential to safeguard product integrity and ensure timely access to critical medicines. Building strategies around agility, compliance, visibility and expertise is key to maintaining precision, reliability, and patient trust in an increasingly complex logistics environment.", pillars: [
    { title: "Visibility", description: "Real-time tracking and temperature monitoring, powered by intelligent alerts, help supply chain professionals anticipate risks.", icon: "eye" },
    { title: "Expertise", description: "Our dedicated cold chain team designs innovative solutions to increase visibility, preserve shelf life, optimise energy use, and reduce delays.", icon: "experiment" },
    { title: "Agility", description: "Backed by owned assets, our pharma logistics solutions provide the resilience and flexibility needed to respond to disruptions.", icon: "thunderbolt" },
    { title: "Connected cold chain", description: "By combining asset ownership with technology, we deliver an end-to-end cold chain that enhances control, cost efficiency, and performance.", icon: "safety" }
  ]},
  segments: { title: "Built for every pharma and healthcare segment", subtitle: "From biopharma and vaccines to generics, APIs, medical devices, diagnostics and consumer healthcare, the pharma and healthcare industry relies on logistics solutions tailored to very specific requirements. Trident's integrated supply chain offerings support each segment with innovation and industry expertise.", categories: [
    { title: "APIs and raw material suppliers", description: "Effective logistics for API and pharmaceutical raw material suppliers must centre on integrated solutions that ensure GDP compliance, provide in-transit visibility, and balance cost and speed. The industry requires seamless coordination across air and ocean freight, cold storage, landside transport and customs clearance to enable reliable end-to-end movement of critical inputs.", image: "/pharma_healthcare_03.jpg", icon: "medicine" },
    { title: "Pharmaceuticals", description: "The industry requires finished pharmaceutical, biopharmaceutical, and vaccine products be brought securely to market through integrated, end-to-end logistics. Pharma cold chain management must integrate air and ocean freight, cold storage, customs clearance, and Control Tower visibility to ensure compliant, reliable delivery across global markets.", image: "/pharma_healthcare_04.jpg", icon: "heart" },
    { title: "Consumer healthcare", description: "The consumer healthcare industry requires reliable, patient-ready delivery of products through integrated logistics. Inventory management, warehousing and distribution, and real-time visibility are key to reducing waste and protecting short shelf lives, while digital and e-commerce capabilities support evolving, patient-centric delivery models.", image: "/pharma_healthcare_08.jpg", icon: "desktop" },
    { title: "MedTech", description: "In this segment, it is necessary to protect the high-value, sensitive devices while ensuring speed, reliability and regulatory compliance. This means precise handling and end-to-end visibility across complex global supply chains. Just as critical are deep regulatory expertise, proactive risk management and the ability to scale seamlessly, so devices reach hospitals, clinics and patients on time.", image: "/pharma_healthcare_06.jpg", icon: "cloud" },
    { title: "Animal health", description: "Whether delivering to farms, clinics or distributors, animal health companies must protect product integrity, meet regulatory requirements, and deliver on time. From pharmaceuticals and vaccines to diagnostics and nutritional supplements, streamline your complex supply chain with integrated transport, temperature-controlled solutions and secure warehousing.", image: "/pharma_healthcare_07.jpg", icon: "safety" }
  ]},
  contact: { title: "Contact Our Pharma & Healthcare Experts", subtitle: "Reach out to our specialised pharma and healthcare logistics team for tailored supply chain solutions.", buttonText: "Get in touch" },
  cta: { title: "Ready to transform your pharma & healthcare logistics?", subtitle: "Contact our healthcare industry specialists today", buttonText: "Get in touch" }
};

const pillarIcons: Record<string, React.ReactNode> = {
  eye: <EyeOutlined className="text-2xl text-blue-600" />,
  experiment: <ExperimentOutlined className="text-2xl text-blue-600" />,
  thunderbolt: <ThunderboltOutlined className="text-2xl text-blue-600" />,
  safety: <SafetyOutlined className="text-2xl text-blue-600" />,
};
const catIcons: Record<string, React.ReactNode> = {
  medicine: <MedicineBoxOutlined className="text-xl text-blue-600" />,
  heart: <HeartOutlined className="text-xl text-blue-600" />,
  desktop: <DesktopOutlined className="text-xl text-blue-600" />,
  cloud: <CloudOutlined className="text-xl text-blue-600" />,
  safety: <SafetyOutlined className="text-xl text-blue-600" />,
};

const PharmaHealthcare = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('pharma-healthcare');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          featuresStrip: pc.featuresStrip || defaultContent.featuresStrip,
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          strategy: { ...defaultContent.strategy, ...(pc.strategy || {}), pillars: pc.strategy?.pillars || defaultContent.strategy.pillars },
          segments: { ...defaultContent.segments, ...(pc.segments || {}), categories: pc.segments?.categories || defaultContent.segments.categories },
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

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {isHeroVideo ? <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}><source src={gm(heroMedia)} type="video/mp4" /></video> : <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${gm(heroMedia)}')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }} />}
          <div className="absolute bg-black/55" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px' }} />
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex flex-wrap gap-8 justify-start items-center">{content.featuresStrip.items.map((item,i)=>(<span key={i} className="flex items-center gap-8"><span className="text-blue-600 font-medium text-base">{item}</span>{i<content.featuresStrip.items.length-1&&<span className="text-gray-300">|</span>}</span>))}</div></div></section>

      {/* Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20"><div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}><div className="flex gap-8 overflow-x-auto">{['overview','segments','contact'].map(t=><button key={t} onClick={()=>setActiveTab(t)} className={`py-3 px-1 text-sm font-medium capitalize ${activeTab===t?'text-blue-600 border-b-2 border-blue-600':'text-gray-600 hover:text-blue-600'}`}>{t==='segments'?'Industry Segments':t}</button>)}</div></div></section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.overview.description}</p><p className="text-gray-600 leading-relaxed">{content.overview.description2}</p></div><div><img src={gm(content.overview.image)} alt="Pharma" className="w-full h-auto rounded-lg shadow-md" /></div></div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.strategy.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.strategy.subtitle}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">{content.strategy.pillars.map((p,i)=>(<div key={i} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{pillarIcons[p.icon]||pillarIcons.eye}</div><h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3><p className="text-gray-600 text-sm">{p.description}</p></div>))}</div></div></section>
      </div>}

      {/* SEGMENTS */}
      {activeTab === 'segments' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.segments.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.segments.subtitle}</p></div>
        {content.segments.categories.map((cat,i)=>{
          const isLeft = i%2===0;
          return (
            <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i<content.segments.categories.length-1?'mb-16':''}`}>
              <div className={isLeft?'':'order-2 md:order-1'}><img src={gm(cat.image)} alt={cat.title} className="w-full h-auto rounded-lg shadow-md" /></div>
              <div className={isLeft?'':'order-1 md:order-2'}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{catIcons[cat.icon]||catIcons.medicine}</div><h3 className="text-2xl font-semibold text-gray-900">{cat.title}</h3></div><div className="w-12 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{cat.description}</p></div>
            </div>
          );
        })}
      </div></section>}

      {/* CONTACT */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}

      {/* Weather & CTA */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">⛅</span><div><div className="text-lg font-semibold text-gray-800">26°C</div><div className="text-sm text-gray-500">Partly cloudy</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default PharmaHealthcare;
