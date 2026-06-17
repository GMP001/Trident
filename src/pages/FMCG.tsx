import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  EyeOutlined, ThunderboltOutlined, RocketOutlined,
  GlobalOutlined, CoffeeOutlined, HeartOutlined,
} from '@ant-design/icons';

interface FMCGContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; video?: string; image?: string; buttonText: string; };
  overview: { title: string; description: string; description2: string; image: string; imageCaption: string; };
  strategy: { title: string; subtitle: string; pillars: Array<{ title: string; description: string; icon: string; }>; };
  segments: { title: string; subtitle: string; categories: Array<{ title: string; description: string; image: string; imageCaption: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: FMCGContent = {
  isActive: true,
  hero: { title: "FMCG Logistics", subtitle: "FMCG supply chains, connected and powered up. Integrated logistics for visibility, agility and efficiency in a fast-changing world.", video: "/fmcg_hero.mp4", buttonText: "Get in touch" },
  overview: { title: "Unlock new possibilities in FMCG supply chain management", description: "On-time in-full delivery is everything in the FMCG business. In a world that is witnessing disruptions, raw material shortages and increasing costs, it is critical for the FMCG supply chain to be efficient, resilient and agile.", description2: "Stay ahead with an integrated logistics solution: one that optimises the flow of every aspect of your FMCG supply chain, supports efforts to reduce GHG emissions, and helps you go all the way.", image: "/fmcg_01.jpg", imageCaption: "Warehouse workers in safety vests sorting packages on a conveyor belt for distribution" },
  strategy: { title: "Level up your FMCG supply chain strategy", subtitle: "In today's dynamic FMCG landscape, a robust supply chain, connected across functions to optimise flow, is key to growth and meeting consumer demands. The strongest strategies hinge on visibility, agility, and efficiency.", pillars: [
    { title: "Visibility", description: "Stay informed to take the right decisions and ensure products are available across every channel.", icon: "eye" },
    { title: "Agility", description: "Maintain flexibility to navigate risks, meet evolving demand, and ensure on-time, in-full delivery everywhere.", icon: "thunderbolt" },
    { title: "Efficiency", description: "Drive cost efficiency in fragmented, low-margin markets through supply chain connectivity.", icon: "rocket" }
  ]},
  segments: { title: "Navigating the FMCG market segment", subtitle: "Diving into the FMCG market segment requires deep understanding of consumer behaviour, category nuances, and demand patterns. To help with this, we offer Lead Logistics solutions designed to meet the unique requirements of key FMCG categories.", categories: [
    { title: "Beer, wine, spirits and tobacco", description: "International compliance is a complex process when it comes to delivering alcoholic beverages to different parts of the world. To reach your markets on time, you need to streamline your supply chain operations with a partner who is an expert at handling compliance. Lead Logistics helps you plan ahead to ensure your products move efficiently across borders.", image: "/fmcg_08.jpg", imageCaption: "Smiling customer in denim jacket choosing a wine bottle in liquor store aisle.", icon: "global" },
    { title: "Food & Beverages", description: "When it comes to moving your F&B products, there are often tight deadlines. To meet them, you must ensure smooth flow of products, even during disruptions. Lead Logistics helps you plan your warehousing requirements and product flows, so that you focus on what you do best – producing exceptional food and beverage products.", image: "/fmcg_03.jpg", imageCaption: "Retail worker organizing jars on a store shelf with focus and attention.", icon: "coffee" },
    { title: "Home & Personal Care", description: "The personal care industry is extremely fast paced. A product that's trending one day may not be the next day. Being competitive in a market where demand changes constantly, optimising supply chains becomes absolutely critical. With Lead Logistics, you can plan ahead to meet shifting market demands and ensure on-time deliveries.", image: "/fmcg_04.jpg", imageCaption: "Customer selecting lipstick from a cosmetics store display.", icon: "heart" }
  ]},
  contact: { title: "Contact Our FMCG Logistics Experts", subtitle: "Reach out to our specialised FMCG logistics team for tailored supply chain solutions.", buttonText: "Get in touch" },
  cta: { title: "Ready to transform your FMCG logistics?", subtitle: "Contact our FMCG industry specialists today", buttonText: "Get in touch" }
};

const pillarIcons: Record<string, React.ReactNode> = {
  eye: <EyeOutlined className="text-2xl text-blue-600" />,
  thunderbolt: <ThunderboltOutlined className="text-2xl text-blue-600" />,
  rocket: <RocketOutlined className="text-2xl text-blue-600" />,
};
const catIcons: Record<string, React.ReactNode> = {
  global: <GlobalOutlined className="text-xl text-blue-600" />,
  coffee: <CoffeeOutlined className="text-xl text-blue-600" />,
  heart: <HeartOutlined className="text-xl text-blue-600" />,
};

const FMCG = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('fmcg');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
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
          {isHeroVideo ? <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}><source src={gm(heroMedia)} type="video/mp4" /></video> : <img src={gm(heroMedia)} alt={content.hero.title} className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }} />}
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

      {/* Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20"><div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}><div className="flex gap-8 overflow-x-auto">{['overview','segments','contact'].map(t=><button key={t} onClick={()=>setActiveTab(t)} className={`py-3 px-1 text-sm font-medium capitalize ${activeTab===t?'text-blue-600 border-b-2 border-blue-600':'text-gray-600 hover:text-blue-600'}`}>{t==='segments'?'FMCG Segments':t}</button>)}</div></div></section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.overview.description}</p><p className="text-gray-600 leading-relaxed">{content.overview.description2}</p></div><div><img src={gm(content.overview.image)} alt="FMCG" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.overview.imageCaption}</p></div></div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.strategy.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.strategy.subtitle}</p></div><div className="grid md:grid-cols-3 gap-8 mt-8">{content.strategy.pillars.map((p,i)=>(<div key={i} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{pillarIcons[p.icon]||pillarIcons.eye}</div><h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3><p className="text-gray-600 text-sm">{p.description}</p></div>))}</div></div></section>
      </div>}

      {/* SEGMENTS */}
      {activeTab === 'segments' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.segments.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-4xl mx-auto">{content.segments.subtitle}</p></div>
        {content.segments.categories.map((cat,i)=>{
          const isLeft = i%2===0;
          return (
            <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i<content.segments.categories.length-1?'mb-16':''}`}>
              <div className={isLeft?'':'order-2 md:order-1'}><img src={gm(cat.image)} alt={cat.title} className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{cat.imageCaption}</p></div>
              <div className={isLeft?'':'order-1 md:order-2'}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{catIcons[cat.icon]||catIcons.global}</div><h3 className="text-2xl font-semibold text-gray-900">{cat.title}</h3></div><div className="w-12 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{cat.description}</p></div>
            </div>
          );
        })}
      </div></section>}

      {/* CONTACT */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}

      {/* Weather & CTA - Full width */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">💧</span><div><div className="text-lg font-semibold text-gray-800">Very humid</div><div className="text-sm text-gray-500">Now</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default FMCG;
