import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  CheckOutlined, CalendarOutlined, DollarOutlined,
  FileTextOutlined, RocketOutlined, SafetyOutlined,
} from '@ant-design/icons';

interface OceanContractContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  overview: { title: string; description: string; description2: string; image: string; imageCaption: string; };
  whyChooseUs: { title: string; subtitle: string; benefits: Array<{ title: string; description: string; icon: string; }>; };
  contractProducts: { title: string; subtitle: string; subtitle2: string; products: { fixed: { title: string; description: string; features: string[]; icon: string; }; seasonal: { title: string; description: string; features: string[]; icon: string; }; block: { title: string; description: string; features: string[]; icon: string; }; }; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: OceanContractContent = {
  isActive: true,
  hero: { title: "Ocean Contract", subtitle: "Get guaranteed space and market relevant rates for your ocean cargo, all year round.", image: "/ocean_contract_hero.jpg", buttonText: "Contact us" },
  overview: { title: "Get your cargo moving with Ocean Contract", description: "Whether you need to make sure that production capabilities can be fully utilised or need to get time-sensitive goods into the right markets – with Ocean Contract, you can streamline your supply chain for the best flow. Our cargo services offer more agility from the contract product setup, certainty from operations insights and reliability on delivery, anywhere across the globe.", description2: "Ocean Contract provides you with access to real-time data on all your ocean lanes with its Allocation Portal. This helps you to get insight into your volume availability, consumption data and more information that can help you optimise your contract utilisation.", image: "/ocean_contract_02.jpg", imageCaption: "Man signing on contract" },
  whyChooseUs: { title: "Why choose Ocean Contract?", subtitle: "We offer you contract products that are best suited to meet your shipping requirements and reflect the changing needs of the business.", benefits: [
    { title: "Simple base allocations", description: "We understand the struggle to predict market demands. Moreover, it's impossible to predict black swan events. That's why we offer increased clarity and simplicity when it comes to base allocation agreements.", icon: "file" },
    { title: "Tiered contracts for seasonality", description: "Choose reliable products to tackle planned and unplanned seasonality. Our tiered contracts are designed to cover black swan events, if any, while still offering competitively priced base products.", icon: "calendar" },
    { title: "Market relevant rates", description: "Enjoy competitive pricing and the flexibility to overcome disruptions with fixed prices subject to floating surcharges, and monthly indexed rates that are not subject to floating charges.", icon: "dollar" },
    { title: "Clear mutual commitments", description: "We are committed to delivering on our promises. We assure you clear and transparent agreements upfront that set expectations as per your requirements. We also outline the level of mutual commitment beforehand.", icon: "safety" }
  ]},
  contractProducts: { title: "A wider range of contract products", subtitle: "With changing business needs, the demand for contracts that offer more specificity is essential. Ocean Contract has evolved to feature four distinct contract products that meet specific business requirements. Each of them offers certainty with regard to space availability on our vessels.", subtitle2: "They are differentiated by volume planning flexibility to meet supply chain operations and seasonal demands.", products: {
    fixed: { title: "Ocean Contract Fixed", description: "This offering provides a set number of containers per lane every week at market relevant rates.", features: ["You get access to a weekly committed volume for your stable ocean logistics needs.", "Choose between Fixed pricing or monthly indexed pricing.", "Fixed contracts are for 3 months and above.", "Monthly access to reserve extra space via Space Reserve or Instant Space."], icon: "teu" },
    seasonal: { title: "Ocean Contract Seasonal", description: "This product is ideal for supply chains that need to synchronise allocation with production fluctuations.", features: ["Weekly committed volume with 20% extra seasonality for up to 4 months per year.", "Choose fixed pricing or monthly indexed pricing.", "Fixed contracts are for 3 months and above.", "Monthly access to reserve extra space via Space Reserve or Instant Space."], icon: "calendar" },
    block: { title: "Ocean Contract Block Space", description: "This is ideal for stable ocean logistics needs. You can purchase fixed space guarantee on a market-to-market basis.", features: ["Get weekly committed volume, based on MQC divided by number of weeks in agreement.", "Weekly indexed pricing, not subject to emergency or peak season surcharge.", "Contracts for 3 months and above.", "Committed to 90% of MQC; we are committed to 100% of MQC."], icon: "rocket" }
  }},
  cta: { title: "Ready to secure your ocean contract?", subtitle: "Contact our ocean contract specialists today", buttonText: "Contact us" }
};

const benefitIcons: Record<string, React.ReactNode> = {
  file: <FileTextOutlined className="text-2xl text-blue-600" />,
  calendar: <CalendarOutlined className="text-2xl text-blue-600" />,
  dollar: <DollarOutlined className="text-2xl text-blue-600" />,
  safety: <SafetyOutlined className="text-2xl text-blue-600" />,
};
const productIcons: Record<string, React.ReactNode> = {
  teu: <><div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-white text-2xl font-bold">TEU</span></div><p className="text-gray-700 font-medium">Fixed Space Allocation</p><p className="text-gray-500 text-sm">Guaranteed volume per week</p></>,
  calendar: <><div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><CalendarOutlined className="text-white text-3xl" /></div><p className="text-gray-700 font-medium">Seasonal Flexibility</p><p className="text-gray-500 text-sm">Adapt to production fluctuations</p></>,
  rocket: <><div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><RocketOutlined className="text-white text-3xl" /></div><p className="text-gray-700 font-medium">Block Space Guarantee</p><p className="text-gray-500 text-sm">Fixed space with market rates</p></>,
};

const OceanContract = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState('fixed');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('ocean-contract');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          whyChooseUs: { ...defaultContent.whyChooseUs, ...(pc.whyChooseUs || {}), benefits: pc.whyChooseUs?.benefits || defaultContent.whyChooseUs.benefits },
          contractProducts: { ...defaultContent.contractProducts, ...(pc.contractProducts || {}), products: { ...defaultContent.contractProducts.products, ...(pc.contractProducts?.products || {}) } },
          cta: { ...defaultContent.cta, ...(pc.cta || {}) }
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const gm = (p: string) => { if (!p) return ''; if (p.startsWith('http')) return p; if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`; return p; };
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  const productKeys = ['fixed', 'seasonal', 'block'] as const;
  const activeProductData = content.contractProducts.products[activeProduct as keyof typeof content.contractProducts.products];
  // Hero media: admin saves everything to hero.image, check if it's a video by extension
  const heroMedia = content.hero.image || content.hero.video || '';
  const isHeroVideo = heroMedia.endsWith('.mp4');

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero - Supports both video (MP4) and image */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {isHeroVideo ? (
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover"
              style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}>
              <source src={gm(heroMedia)} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${gm(heroMedia)}')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }} />
          )}
          <div className="absolute inset-0 bg-black/55" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }} />
        </div>
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.overview.description}</p><p className="text-gray-600 leading-relaxed">{content.overview.description2}</p></div><div><img src={gm(content.overview.image)} alt="Ocean Contract" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.overview.imageCaption}</p></div></div></div></section>

      {/* Why Choose Us */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whyChooseUs.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.whyChooseUs.subtitle}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">{content.whyChooseUs.benefits.map((b, i) => (<div key={i} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">{benefitIcons[b.icon] || benefitIcons.file}</div><h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600 text-sm">{b.description}</p></div>))}</div></div></section>

      {/* Contract Products */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contractProducts.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.contractProducts.subtitle}</p><p className="text-md text-gray-500 mt-2">{content.contractProducts.subtitle2}</p></div>
        <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-gray-200 pb-4">
          {productKeys.map(pk => (<button key={pk} onClick={() => setActiveProduct(pk)} className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${activeProduct === pk ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{content.contractProducts.products[pk].title}</button>))}
        </div>
        <div className="bg-gray-50 rounded-2xl p-8"><div className="grid md:grid-cols-2 gap-8"><div><h3 className="text-2xl font-semibold text-gray-900 mb-4">{activeProductData.title}</h3><p className="text-gray-600 leading-relaxed mb-4">{activeProductData.description}</p><ul className="space-y-2 mb-6">{activeProductData.features.map((f, i) => (<li key={i} className="flex items-start gap-2"><CheckOutlined className="text-blue-600 mt-1" /><span className="text-gray-600">{f}</span></li>))}</ul></div><div className="bg-blue-100 rounded-xl p-6 flex items-center justify-center"><div className="text-center">{productIcons[activeProductData.icon] || productIcons.teu}</div></div></div></div>
      </div></section>

      {/* Weather */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">🌧️</span><div><div className="text-sm text-gray-500">Rain to stop</div><div className="text-lg font-semibold text-gray-800">In about 1 hour</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>

      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default OceanContract;
