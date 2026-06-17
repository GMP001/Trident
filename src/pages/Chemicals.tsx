import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined, SafetyOutlined, EnvironmentOutlined,
  DashboardOutlined, LineChartOutlined, RocketOutlined,
  ExperimentOutlined, StockOutlined, CustomerServiceOutlined, ShoppingOutlined,
} from '@ant-design/icons';

interface ChemicalsContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  overview: { title: string; description: string; image: string; };
  industryOverview: { title: string; subtitle: string; description: string; description2: string; };
  trends: { title: string; items: Array<{ title: string; points: string[]; icon: string; }>; };
  servicesOverview: { title: string; subtitle: string; subtitle2: string; };
  chemicalTypes: Array<{ title: string; description: string; image: string; imageCaption?: string; icon: string; buttonText?: string; subGroups?: Array<{ title: string; description: string; }>; description2?: string; }>;
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: ChemicalsContent = {
  isActive: true,
  hero: { title: "Chemicals Logistics", subtitle: "Be ready for new possibilities in a precision-focused world", image: "/chemical_05_hero.jpg", buttonText: "Contact us" },
  overview: { title: "Be ready for new possibilities in a precision-focused world", description: "To compete in a world of uncertainties, the key is to adopt smarter, more resilient ways to deliver chemicals safely while staying fast and agile to react to supply chain challenges. Keep chemical inventories moving and costs in control with always-on digital visibility, a flexible mix of multimodal transport options and seamless end-to-end operations, so that you can go all the way.", image: "/chemical_agrochemical-nitrogen.avif" },
  industryOverview: { title: "Industry overview", subtitle: "In a world where 96% of all manufactured goods depend on chemicals in one way or another, there are ample opportunities for chemical companies to grow. Chemical manufacturers, striving to secure a larger share in the marketplace, have created an extremely competitive battleground.", description: "Several industry trends – protectionist trade policies, tariff wars, and industry consolidation – are also pushing businesses to adopt new ways to stand out. As these trends permeate the chemical industry, many businesses are remodelling to drive growth and profitability. At the core of this transformation is the need to build resilience - with the ability to adapt, digitise, and modernise. Safety remains a high priority while decarbonisation has increasingly become a focus.", description2: "Chemical companies see their supply chains playing a crucial role in their business transformation. Whether they need to support continuous production lines with effective storage solutions; increase margins with supply chain cost-efficiencies; improve safety and compliance, or gain customer loyalty with greater visibility and on-time deliveries, they are making high demands of their supply chain partners to add value at every stage of their supply chain." },
  trends: { title: "Six trends are shaping the chemical industry", items: [
    { title: "Customer centricity", points: ["Meeting the need for flexible supplies","Reducing lead times to support customer production","Customising supply chain solutions as per the need"], icon: "customer" },
    { title: "Cargo-based supply chains", points: ["Extensive compliance expertise for dangerous cargo","Smart solutions that account for weight to value ratio","Optimised solutions for low margin products"], icon: "safety" },
    { title: "Sustainability", points: ["Delivering products for a circular economy","Reducing overall GHG emissions footprint","Meeting government regulations, locally"], icon: "environment" },
    { title: "Push driven supply chains", points: ["Managing inventory costs for made-to-stock (MTS) processes","Increasing customer loyalty for made-to-order (MTO) processes","Optimising working capital (despite low margins) with better logistics planning"], icon: "dashboard" },
    { title: "Modernisation", points: ["Digitalising for both operational and strategic purposes","Increasing speed of innovation","Increasing transparency for customers through integration"], icon: "linechart" },
    { title: "Capturing new markets", points: ["Responding to demand with agility","Reaching customers all over the world","Tapping into developing markets"], icon: "rocket" }
  ]},
  servicesOverview: { title: "Creating services tailored to you", subtitle: "From plastics to paint, beauty to home care products and even automotive parts, the chemical supply chain comprises a myriad of products. At Trident, our experts understand the unique requirements of your product and business and build a supply chain solution that is tailor-made for you.", subtitle2: "We distinguish between three overarching types of chemicals:" },
  chemicalTypes: [
    { title: "Agrochemicals and fertilisers", description: "Your industry is in a state of constant growth. One of the primary driving factors behind this growth is that the global demand for food production will always be there. Thus, the need for agrochemicals and fertilisers will never cease to exist. However, just because there's demand doesn't mean that it's smooth sailing for your industry. Therefore, you need a trusted logistics integrator who can help boost your business and support conversion.", image: "/chemical_agrochemical-nitrogen.avif", imageCaption: "Agrochemicals – A green agricultural field and the N fertiliser ratio.", icon: "shopping", buttonText: "Learn more" },
    { title: "Commodity Chemicals", description: "Commodity chemicals are produced in large volumes where price is the main influencing factor as product differentiation within commodity chemicals is very low. At Trident, we divide commodity chemicals into three sub-groups:", image: "/commodity-chemicals.webp", icon: "stock", subGroups: [{ title: "Petrochemicals", description: "The chemical products obtained from petroleum or natural gas, including olefins, aromatics and synthetic gasses." },{ title: "Base Inorganics", description: "Chemical substances used as starting materials including industrial gasses, fertilisers, acids, bases and chlorine." },{ title: "Polymers", description: "Natural or synthetic materials including plastics, resin, rubber, fibres and elastomers." }] },
    { title: "Speciality Chemicals", description: "Speciality chemicals cover a wide variety of chemicals and are generally known as performance chemicals, as they are used based on their performance or function. This group of chemicals is used as ingredients in finished products and to improve manufacturing processes with a wide variety of effects.", description2: "They encompass two sub-groups: Consumer Chemicals include soaps, detergents, perfumes and cosmetics. Other chemical substances can be dedicated to agricultural purposes like crop protection, paint, inks, dyes and pigments. These types of chemicals are often produced in small volumes.", image: "/speciality-chemicals.avif", icon: "experiment" }
  ],
  contact: { title: "Contact Our Chemicals Logistics Experts", subtitle: "Reach out to our specialised chemicals logistics team for tailored supply chain solutions.", buttonText: "Contact us" },
  cta: { title: "Ready to transform your chemicals logistics?", subtitle: "Contact our chemicals industry specialists today", buttonText: "Contact us" }
};

const trendIcons: Record<string, React.ReactNode> = {
  customer: <CustomerServiceOutlined className="text-xl text-blue-600" />,
  safety: <SafetyOutlined className="text-xl text-blue-600" />,
  environment: <EnvironmentOutlined className="text-xl text-blue-600" />,
  dashboard: <DashboardOutlined className="text-xl text-blue-600" />,
  linechart: <LineChartOutlined className="text-xl text-blue-600" />,
  rocket: <RocketOutlined className="text-xl text-blue-600" />,
};
const typeIcons: Record<string, React.ReactNode> = {
  shopping: <ShoppingOutlined className="text-xl text-blue-600" />,
  stock: <StockOutlined className="text-xl text-blue-600" />,
  experiment: <ExperimentOutlined className="text-xl text-blue-600" />,
};

const Chemicals = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('chemicals');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          industryOverview: { ...defaultContent.industryOverview, ...(pc.industryOverview || {}) },
          trends: { ...defaultContent.trends, ...(pc.trends || {}), items: pc.trends?.items || defaultContent.trends.items },
          servicesOverview: { ...defaultContent.servicesOverview, ...(pc.servicesOverview || {}) },
          chemicalTypes: pc.chemicalTypes || defaultContent.chemicalTypes,
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
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}><div className="flex gap-8 overflow-x-auto">{['overview','services','contact'].map(t=><button key={t} onClick={()=>setActiveTab(t)} className={`py-3 px-1 text-sm font-medium transition-colors capitalize ${activeTab===t?'text-blue-600 border-b-2 border-blue-600':'text-gray-600 hover:text-blue-600'}`}>{t}</button>)}</div></div>
      </section>

      {/* OVERVIEW */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{content.overview.description}</p></div><div><img src={gm(content.overview.image)} alt="Chemicals" className="w-full h-auto rounded-lg shadow-md" /></div></div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.industryOverview.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-4xl mx-auto">{content.industryOverview.subtitle}</p></div><div className="mt-8"><p className="text-gray-600 leading-relaxed mb-6">{content.industryOverview.description}</p><p className="text-gray-600 leading-relaxed">{content.industryOverview.description2}</p></div></div></section>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.trends.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{content.trends.items.map((item,i)=>(<div key={i} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">{trendIcons[item.icon]||trendIcons.customer}</div><h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3><ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">{item.points.map((pt,j)=>(<li key={j}>{pt}</li>))}</ul></div>))}</div></div></section>
      </div>}

      {/* SERVICES */}
      {activeTab === 'services' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.servicesOverview.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.servicesOverview.subtitle}</p><p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">{content.servicesOverview.subtitle2}</p></div>
          {content.chemicalTypes.map((ct,i)=>{
            const isLeft = i%2===0;
            const isCommodity = ct.subGroups && ct.subGroups.length>0;
            if(isCommodity) return (
              <div key={i} className="mb-20"><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{typeIcons[ct.icon]||typeIcons.stock}</div><h3 className="text-2xl font-semibold text-gray-900">{ct.title}</h3></div><div className="w-12 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-6">{ct.description}</p><div className="grid md:grid-cols-3 gap-6">{ct.subGroups!.map((sg,j)=>(<div key={j} className="bg-gray-50 rounded-lg p-5"><h4 className="font-semibold text-gray-900 mb-2">{sg.title}</h4><p className="text-gray-600 text-sm">{sg.description}</p></div>))}</div><div className="mt-6"><img src={gm(ct.image)} alt={ct.title} className="w-full h-auto rounded-lg shadow-md" /></div></div>
            );
            return (
              <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i<content.chemicalTypes.length-1?'mb-20':''}`}>
                <div className={isLeft?'':'order-2 md:order-1'}><img src={gm(ct.image)} alt={ct.title} className="w-full h-auto rounded-lg shadow-md" />{ct.imageCaption&&<p className="text-sm text-gray-500 mt-2 text-center">{ct.imageCaption}</p>}</div>
                <div className={isLeft?'':'order-1 md:order-2'}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{typeIcons[ct.icon]||typeIcons.experiment}</div><h3 className="text-2xl font-semibold text-gray-900">{ct.title}</h3></div><div className="w-12 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{ct.description}</p>{ct.description2&&<p className="text-gray-600 leading-relaxed">{ct.description2}</p>}{ct.buttonText&&<button className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">{ct.buttonText} →</button>}</div>
              </div>
            );
          })}
        </div></section>
      </div>}

      {/* CONTACT */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}

      {/* Weather & CTA - Full width */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">🌡️</span><div><div className="text-lg font-semibold text-gray-800">28°C</div><div className="text-sm text-gray-500">Moderate</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default Chemicals;
