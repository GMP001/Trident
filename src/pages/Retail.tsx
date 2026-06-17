import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  ThunderboltOutlined, RocketOutlined, EyeOutlined, ExpandOutlined,
  ShoppingOutlined, HomeOutlined, GlobalOutlined, ShopOutlined,
} from '@ant-design/icons';

interface RetailContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  overview: { title: string; description: string; description2: string; image: string; imageCaption: string; };
  strategy: { title: string; subtitle: string; pillars: Array<{ title: string; description: string; icon: string; }>; };
  categories: { title: string; subtitle: string; items: Array<{ title: string; description: string; image: string; imageCaption: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: RetailContent = {
  isActive: true,
  hero: { title: "Retail Logistics", subtitle: "Retail logistics that drives growth", image: "/retail_hero.jpg", buttonText: "Get in touch" },
  overview: { title: "Retail logistics that drives growth", description: "The retail industry is evolving at an unprecedented pace, fuelled by the rapid growth of e-commerce and the challenge of meeting changing seasonal demands. To keep up, businesses must respond faster and adapt quickly. Retail supply chains have needed to transform to seamlessly integrate omnichannel solutions while also optimising stocks and maintaining inventory flow.", description2: "Businesses that want to stay in the lead of this evolving landscape should prioritise working with a strategic logistics partner who can give enhanced visibility and flexibility, empowering you to go all the way and secure your competitive edge.", image: "/retail_01.jpg", imageCaption: "A warehouse worker using a tablet to verify inventory, surrounded by storage shelves and boxes." },
  strategy: { title: "Stay ahead with Trident retail supply chain strategy", subtitle: "A resilient omnichannel ecosystem is essential for retailers to deliver a personalised and seamless buying experience across a retail supply chain process flow. It's imperative to build your strategies around agility, efficiency, visibility, and flexibility—the strongest drivers of precision in a complex logistics world.", pillars: [
    { title: "Agility", description: "Respond quickly to disruptions, changes in demand, and market dynamics to maintain an optimal flow of inventory without delay.", icon: "thunderbolt" },
    { title: "Efficiency", description: "Move forward with growth ambitions for your retail business while keeping costs in check and maintaining operational efficiency.", icon: "rocket" },
    { title: "Visibility", description: "Stay one step ahead in this bumpy retail landscape with full visibility at every step of your supply chain to drive precision and eliminate uncertainty.", icon: "eye" },
    { title: "Flexibility", description: "Seamlessly switch gears when needed to optimise business operations and handle the ever-evolving seasonal demands of the retail industry.", icon: "expand" }
  ]},
  categories: { title: "Navigating the retail market", subtitle: "As a retailer, you need a deep understanding of seasonal demands and customer behaviour to ensure your goods are available on the right channels, at the right time, in the right quantity. Take advantage of Trident's retail expertise and other value-added services that help you meet the unique requirements of various retail categories.", items: [
    { title: "Supermarkets and hypermarkets", description: "Supermarkets, hypermarkets, and discounters all face fierce competition and must operate on slim margins, making it essential for them to adapt quickly to changing demand. Integrated logistics synchronises inventory across all channels, with real-time visibility to streamline distribution and keep operations in check. A connected supply chain ensures accurate inventory flow for seasonal demands and full cost transparency.", image: "/retail_02.jpg", imageCaption: "A woman examining a shelf filled with various food items in a grocery store.", icon: "shopping" },
    { title: "Homeware and home improvement", description: "Dealing with small to heavy demand-based inventory requires precision to accommodate transportation and storage challenges. This, combined with demand fluctuations, requires visibility and agility to adapt to trends and seasonality. The right logistics partner streamlines inventory processes so that products are on the shelves when customers need them most.", image: "/home-improvement.avif", imageCaption: "A woman standing in a store, thoughtfully looking at a couch on display.", icon: "home" },
    { title: "E-tailers", description: "E-tailers must keep up with the need for speed and personalisation to enhance the online shopping experience across multiple channels, in terms of product availability, swift deliveries, and easy returns. This calls for a flexible and digitally advanced supply chain with strategic warehousing and distribution solutions to carry out order fulfilment with precision.", image: "/retail_04.jpg", imageCaption: "A woman in a business suit holding a tablet, appearing focused and engaged in her work.", icon: "global" },
    { title: "Department stores", description: "Department stores need flexibility to ensure product availability and visibility for better inventory planning. While for certain stores it's quality that takes precedence, for some affordability must take the forefront to stay competitive in a margin-driven industry. With Trident, you can identify cost-optimisation opportunities and apply exception management to optimise stock levels.", image: "/retail_05.jpg", imageCaption: "Woman choosing from a range of products in a department store.", icon: "shop" }
  ]},
  contact: { title: "Contact Our Retail Logistics Experts", subtitle: "Reach out to our specialised retail logistics team for tailored supply chain solutions.", buttonText: "Get in touch" },
  cta: { title: "Ready to transform your retail logistics?", subtitle: "Contact our retail industry specialists today", buttonText: "Get in touch" }
};

const pillarIcons: Record<string, React.ReactNode> = {
  thunderbolt: <ThunderboltOutlined className="text-2xl text-blue-600" />,
  rocket: <RocketOutlined className="text-2xl text-blue-600" />,
  eye: <EyeOutlined className="text-2xl text-blue-600" />,
  expand: <ExpandOutlined className="text-2xl text-blue-600" />,
};
const catIcons: Record<string, React.ReactNode> = {
  shopping: <ShoppingOutlined className="text-xl text-blue-600" />,
  home: <HomeOutlined className="text-xl text-blue-600" />,
  global: <GlobalOutlined className="text-xl text-blue-600" />,
  shop: <ShopOutlined className="text-xl text-blue-600" />,
};

const Retail = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('retail');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          strategy: { ...defaultContent.strategy, ...(pc.strategy || {}), pillars: pc.strategy?.pillars || defaultContent.strategy.pillars },
          categories: { ...defaultContent.categories, ...(pc.categories || {}), items: pc.categories?.items || defaultContent.categories.items },
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

      {/* Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20"><div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}><div className="flex gap-8 overflow-x-auto">{['overview','categories','contact'].map(t=><button key={t} onClick={()=>setActiveTab(t)} className={`py-3 px-1 text-sm font-medium capitalize ${activeTab===t?'text-blue-600 border-b-2 border-blue-600':'text-gray-600 hover:text-blue-600'}`}>{t==='categories'?'Retail Categories':t}</button>)}</div></div></section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.overview.description}</p><p className="text-gray-600 leading-relaxed">{content.overview.description2}</p></div><div><img src={gm(content.overview.image)} alt="Retail" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.overview.imageCaption}</p></div></div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.strategy.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.strategy.subtitle}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">{content.strategy.pillars.map((p,i)=>(<div key={i} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{pillarIcons[p.icon]||pillarIcons.thunderbolt}</div><h3 className="text-xl font-semibold text-gray-900 mb-2">{p.title}</h3><p className="text-gray-600 text-sm">{p.description}</p></div>))}</div></div></section>
      </div>}

      {/* CATEGORIES */}
      {activeTab === 'categories' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.categories.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.categories.subtitle}</p></div>
        {content.categories.items.map((item,i)=>{
          const isLeft = i%2===0;
          return (
            <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i<content.categories.items.length-1?'mb-16':''}`}>
              <div className={isLeft?'':'order-2 md:order-1'}><img src={gm(item.image)} alt={item.title} className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{item.imageCaption}</p></div>
              <div className={isLeft?'':'order-1 md:order-2'}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{catIcons[item.icon]||catIcons.shopping}</div><h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3></div><div className="w-12 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{item.description}</p></div>
            </div>
          );
        })}
      </div></section>}

      {/* CONTACT */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}

      {/* Weather & CTA */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">☀️</span><div><div className="text-lg font-semibold text-gray-800">31°C</div><div className="text-sm text-gray-500">Sunny</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default Retail;
