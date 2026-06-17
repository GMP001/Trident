import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  ThunderboltOutlined, EyeOutlined, SafetyOutlined,
  ShoppingOutlined, SkinOutlined, CompassOutlined,
} from '@ant-design/icons';

interface FashionContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; video?: string; image?: string; buttonText: string; };
  featuresStrip: { items: string[]; };
  overview: { title: string; description: string; description2: string; image: string; imageCaption: string; };
  growStrategy: { title: string; subtitle: string; pillars: Array<{ title: string; description: string; icon: string; }>; };
  tailoredSolutions: { title: string; subtitle: string; };
  industries: { categories: Array<{ title: string; description: string; image: string; imageCaption: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: FashionContent = {
  isActive: true,
  hero: { title: "Fashion & Lifestyle Logistics", subtitle: "Lead the way with fashion and lifestyle logistics. Seize every new trend efficiently with logistics that drives resilience.", video: "/life_style_02.mp4", buttonText: "Get in touch" },
  featuresStrip: { items: ["One logistics partner", "Tailored solutions", "Global network"] },
  overview: { title: "Lifestyle logistics to stay responsive", description: "Winning in the ever-evolving lifestyle landscape means constantly reimagining how to stay ahead of the curve. Trends get formed in a day, putting pressure on brands like you to keep up with them.", description2: "For you, the ideal fashion and lifestyle supply chain has an end-to-end logistics partner with the capability to customise solutions as per your on-demand production cycles, make sure that your product reaches the market on time, add to your omnichannel presence, and provide insights to prepare you for every new wave.", image: "/life_style-07.jpg", imageCaption: "A woman sits on the floor with a laptop beside a box of clothes, focused on her work." },
  growStrategy: { title: "Grow as a fashion and lifestyle industry leader", subtitle: "To excel in this dynamic industry, no matter how successful you've been in the past, your way of working needs to evolve continuously. It's imperative to build your strategies around agility, visibility, and reliability to prepare your supply chain for every new wave.", pillars: [
    { title: "Agility", description: "As consumers shift to prioritising availability over brand loyalty, versatile modern supply chain processes can help adapt swiftly.", icon: "thunderbolt" },
    { title: "Visibility", description: "Experience automation processes to get the visibility to take critical decisions even when demand is at its peak.", icon: "eye" },
    { title: "Reliability", description: "Reduce friction within your supply chain with fewer handovers thanks to a reliable partner who ensures cost-efficiency.", icon: "safety" }
  ]},
  tailoredSolutions: { title: "Tailored fashion and lifestyle logistics solutions", subtitle: "At Trident, we help the lifestyle industry with seamless solutions, led by experts who understand the unique requirements and standards of your industry. We leverage this knowledge to build our supply chain solutions around customer needs, allowing us to serve some of the world's most visible brands." },
  industries: { categories: [
    { title: "Fashion retail", description: "This category is characterised by multiple seasons, bi-weekly launches, and varied order-to-cash cycles. It requires seamless integration across the supply chain and the ability to operate at multiple speeds to meet market demands. The right logistics partner is one that enables speed to market in line with shifting consumer needs.", image: "/Fashion_retail.jpg", imageCaption: "A man examines a jacket while standing in a clothing store.", icon: "shopping" },
    { title: "Apparel and footwear", description: "This segment requires a logistics partner capable of managing multiple market complexities, including fragmented supply chains, coordination across numerous origins and destinations, and varied sales channels.", image: "/apparel_footware-08.jpg", imageCaption: "A woman examines various shoes displayed in a retail store.", icon: "skin" },
    { title: "Sports and outdoor", description: "Sports and outdoor brands compete in fast-moving, event-driven markets. Our logistics solutions are designed to give you an edge—supporting peak moments such as major sporting events—while connecting you to global markets. By leveraging digital data, we enhance real-time supply chain visibility and end-to-end control.", image: "/sports_outdoor.jpg", imageCaption: "A man and woman running side by side on a sandy beach.", icon: "compass" }
  ]},
  contact: { title: "Contact Our Fashion & Lifestyle Experts", subtitle: "Reach out to our specialised fashion and lifestyle logistics team for tailored supply chain solutions.", buttonText: "Get in touch" },
  cta: { title: "Ready to transform your fashion & lifestyle logistics?", subtitle: "Contact our industry specialists today", buttonText: "Get in touch" }
};

const pillarIcons: Record<string, React.ReactNode> = {
  thunderbolt: <ThunderboltOutlined className="text-2xl text-blue-600" />,
  eye: <EyeOutlined className="text-2xl text-blue-600" />,
  safety: <SafetyOutlined className="text-2xl text-blue-600" />,
};
const catIcons: Record<string, React.ReactNode> = {
  shopping: <ShoppingOutlined className="text-xl text-blue-600" />,
  skin: <SkinOutlined className="text-xl text-blue-600" />,
  compass: <CompassOutlined className="text-xl text-blue-600" />,
};

const FashionLifestyle = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('fashion-lifestyle');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          featuresStrip: pc.featuresStrip || defaultContent.featuresStrip,
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          growStrategy: { ...defaultContent.growStrategy, ...(pc.growStrategy || {}), pillars: pc.growStrategy?.pillars || defaultContent.growStrategy.pillars },
          tailoredSolutions: { ...defaultContent.tailoredSolutions, ...(pc.tailoredSolutions || {}) },
          industries: { categories: pc.industries?.categories || defaultContent.industries.categories },
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

      {/* Features Strip */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex flex-wrap gap-8 justify-start items-center">{content.featuresStrip.items.map((item,i)=>(<span key={i} className="flex items-center gap-8"><span className="text-blue-600 font-medium text-base">{item}</span>{i<content.featuresStrip.items.length-1&&<span className="text-gray-300">|</span>}</span>))}</div></div></section>

      {/* Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20"><div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}><div className="flex gap-8 overflow-x-auto">{['overview','industries','contact'].map(t=><button key={t} onClick={()=>setActiveTab(t)} className={`py-3 px-1 text-sm font-medium capitalize ${activeTab===t?'text-blue-600 border-b-2 border-blue-600':'text-gray-600 hover:text-blue-600'}`}>{t}</button>)}</div></div></section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.overview.description}</p><p className="text-gray-600 leading-relaxed">{content.overview.description2}</p></div><div><img src={gm(content.overview.image)} alt="Fashion" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.overview.imageCaption}</p></div></div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.growStrategy.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.growStrategy.subtitle}</p></div><div className="grid md:grid-cols-3 gap-8 mt-8">{content.growStrategy.pillars.map((p,i)=>(<div key={i} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{pillarIcons[p.icon]||pillarIcons.thunderbolt}</div><h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3><p className="text-gray-600 text-sm">{p.description}</p></div>))}</div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.tailoredSolutions.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.tailoredSolutions.subtitle}</p></div></div></section>
      </div>}

      {/* INDUSTRIES */}
      {activeTab === 'industries' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
        {content.industries.categories.map((cat,i)=>{
          const isLeft = i%2===0;
          return (
            <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i<content.industries.categories.length-1?'mb-16':''} ${i%2===1?'bg-gray-50 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 py-20':''}`}>
              <div className={isLeft?'':'order-2 md:order-1'}><img src={gm(cat.image)} alt={cat.title} className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{cat.imageCaption}</p></div>
              <div className={isLeft?'':'order-1 md:order-2'}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{catIcons[cat.icon]||catIcons.shopping}</div><h3 className="text-2xl font-semibold text-gray-900">{cat.title}</h3></div><div className="w-12 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{cat.description}</p></div>
            </div>
          );
        })}
      </div></section>}

      {/* CONTACT */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}

      {/* Weather & CTA */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">🌧️</span><div><div className="text-lg font-semibold text-gray-800">30°C</div><div className="text-sm text-gray-500">Light rain</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default FashionLifestyle;
