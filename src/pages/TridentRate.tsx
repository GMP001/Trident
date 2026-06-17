import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  DollarOutlined, ThunderboltOutlined, EditOutlined,
  ApartmentOutlined, BellOutlined, GlobalOutlined,
} from '@ant-design/icons';

interface TridentRateContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; button1Text: string; button2Text: string; };
  shippingMadeSimple: { title: string; description: string; description2: string; image: string; imageCaption: string; };
  whyTridentRate: { title: string; subtitle: string; benefits: Array<{ title: string; description: string; icon: string; }>; };
  cta: { title: string; subtitle: string; button1Text: string; button2Text: string; };
}

const defaultContent: TridentRateContent = {
  isActive: true,
  hero: { title: "Trident Rate", subtitle: "Handle the complexity of logistics with speed and certainty. Book and manage shipments online – all from one simple platform.", image: "/trident_rate_query_hero.jpg", button1Text: "Check prices", button2Text: "Create free account" },
  shippingMadeSimple: { title: "Shipping made simple and efficient", description: "As markets constantly change, Trident Rate helps you stay prepared for any opportunity and execute with full clarity on costs and capacity.", description2: "One platform is all it takes to manage your logistics from end to end. Ship with flexible booking options and the certainty of instant prices and guaranteed loading, so you can quickly deliver on customer needs with greater control every step of the way.", image: "/trident_rate_query.jpg", imageCaption: "Smiling professional wearing glasses working on a laptop at a desk with a coffee mug nearby" },
  whyTridentRate: { title: "Why Trident Rate?", subtitle: "Take the uncertainty out of shipping with one convenient platform.", benefits: [
    { title: "Transparent prices", description: "Get all costs up front for the full shipping journey. Book with instant prices and no hidden charges.", icon: "dollar" },
    { title: "Speedy bookings", description: "Get instant availability, booking, and confirmation, and a full overview of departures, arrivals, and transit time.", icon: "thunderbolt" },
    { title: "Modify shipments online", description: "Amend bookings online when plans change and get an instant revised booking confirmation.", icon: "edit" },
    { title: "End-to-end services", description: "Upgrade your logistics with extra services for simple, safe, and hassle-free shipping from end to end.", icon: "apartment" },
    { title: "Secure your rate", description: "Sign up for Trident Rate Alerts to be among the first to know when your required routes become available.", icon: "bell" },
    { title: "Global reach", description: "Reach nearly every local market across the globe with expert handling all the way.", icon: "global" }
  ]},
  cta: { title: "Ready to simplify your shipping?", subtitle: "Get started with Trident Rate today", button1Text: "Check prices", button2Text: "Create free account" }
};

const iconMap: Record<string, React.ReactNode> = {
  dollar: <DollarOutlined className="text-2xl text-blue-600" />,
  thunderbolt: <ThunderboltOutlined className="text-2xl text-blue-600" />,
  edit: <EditOutlined className="text-2xl text-blue-600" />,
  apartment: <ApartmentOutlined className="text-2xl text-blue-600" />,
  bell: <BellOutlined className="text-2xl text-blue-600" />,
  global: <GlobalOutlined className="text-2xl text-blue-600" />,
};

const TridentRate = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('trident-rate');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          shippingMadeSimple: { ...defaultContent.shippingMadeSimple, ...(pc.shippingMadeSimple || {}) },
          whyTridentRate: { ...defaultContent.whyTridentRate, ...(pc.whyTridentRate || {}), benefits: pc.whyTridentRate?.benefits || defaultContent.whyTridentRate.benefits },
          cta: { ...defaultContent.cta, ...(pc.cta || {}) }
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const gm = (p: string) => { if (!p) return ''; if (p.startsWith('http')) return p; if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`; return p; };
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      {/* Hero with background image */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${gm(content.hero.image || content.hero.video || '')}')`, backgroundPosition: 'center 40%', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
            <div className="absolute inset-0 bg-black/55" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}></div>
          </div>
        </div>
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute bottom-0 pointer-events-none" style={{ height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.button1Text}</button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">{content.hero.button2Text}</button>
          </div>
        </div>
      </section>

      {/* Nav links */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex flex-wrap gap-8"><button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Services</button><button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Local info</button><button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">FAQs</button></div></div></section>

      {/* Shipping made simple */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.shippingMadeSimple.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.shippingMadeSimple.description}</p><p className="text-gray-600 leading-relaxed">{content.shippingMadeSimple.description2}</p></div><div><img src={gm(content.shippingMadeSimple.image)} alt="Trident Rate" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.shippingMadeSimple.imageCaption}</p></div></div></div></section>

      {/* Why Trident Rate */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whyTridentRate.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.whyTridentRate.subtitle}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{content.whyTridentRate.benefits.map((b, i) => (<div key={i} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">{iconMap[b.icon] || iconMap.dollar}</div><h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600 text-sm">{b.description}</p></div>))}</div></div></section>

      {/* Weather */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">☀️</span><div><div className="text-lg font-semibold text-gray-800">Hot days ahead</div><div className="text-sm text-gray-500">28°C</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>

      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><div className="flex gap-4 justify-center"><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.button1Text}</button><button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">{content.cta.button2Text}</button></div></div></section>
    </div>
  );
};

export default TridentRate;
