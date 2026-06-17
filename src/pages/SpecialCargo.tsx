import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined, ToolOutlined, TeamOutlined, LaptopOutlined,
  CalendarOutlined, RocketOutlined, CheckCircleOutlined, ThunderboltOutlined,
} from '@ant-design/icons';

interface SpecialCargoContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  overview: { title: string; description: string; description2: string; image: string; };
  oneStopShop: { title: string; subtitle: string; benefits: Array<{ title: string; description: string; icon: string; }>; };
  cargoTypes: { title: string; subtitle: string; types: { ingauge: { title: string; description: string; description2: string; description3: string; image: string; }; outgauge: { title: string; description: string; description2: string; image: string; }; breakbulk: { title: string; description: string; description2: string; image: string; }; }; };
  containerSpecs: { title: string; note: string; specs: Array<{ type: string; length: string; width: string; height: string; payload: string; }>; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: SpecialCargoContent = {
  isActive: true,
  hero: { title: "Special Cargo", subtitle: "We provide tailored and efficient solutions for shipping your Out of Gauge, In Gauge and Break Bulk cargo.", image: "/special_cargo_shipment_hero.jpg", buttonText: "Find a price" },
  overview: { title: "We take special care of your special cargo", description: "At Trident, we recognise that handling special cargo is different from traditional container shipping.", description2: "With more than 40 years of experience in transporting oversized and heavy shipments and an unparalleled global network, we have the capacity to deliver your special cargo to any part of the world. Our international team of special cargo experts have an in-depth knowledge and understanding of the challenges involved, and are there to help throughout the entire process.", image: "/special_cargo_shipment_01.jpg" },
  oneStopShop: { title: "Experience the ease and convenience of dealing with a one-stop shop", subtitle: "Spend your time and efforts on your business and not on coordinating with multiple qualified sub-tier vendors and suppliers to accomplish your project cargo goals.", benefits: [
    { title: "Global Network", description: "A global network of ships, trucks, trains, barges and air service", icon: "global" },
    { title: "Space and special equipment", description: "Quick and easy access to equipment, space and skills, just when you need them", icon: "tool" },
    { title: "International expertise", description: "Our international team of project cargo experts are here to help you every step of the way", icon: "team" },
    { title: "Market-leading online tools", description: "Get quotes, routes and schedules at your fingertips", icon: "laptop" },
    { title: "Multiple weekly departures", description: "Take advantage of flexibility to seize business opportunities", icon: "calendar" },
    { title: "Constantly bettering services", description: "We continuously invest in Flat Rack and Open Top containers, as well as human and digital capabilities", icon: "rocket" },
    { title: "Guaranteed Loading", description: "Ensure your special cargo is loaded even during peak season", icon: "check" },
    { title: "Quote Speed", description: "Plan your project better, with rates quoted within 4 hours", icon: "thunderbolt" }
  ]},
  cargoTypes: { title: "We ship all types of special cargo", subtitle: "Oversized and overweight cargo is characterised by exceeding the proportions and capabilities of a single standard container. Whether you are shipping a 350-ton tugboat, a 46-metre crane arm or a 17-metre propeller, we have the expertise and equipment available to deliver.", types: {
    ingauge: { title: "In Gauge cargo", description: "The dimensions of the cargo are smaller than or equal to those of the flat rack or open top container (i.e. it requires special equipment but does not displace additional slots on the vessel).", description2: "Examples of In Gauge shipments: machinery or large trees that can be lowered into an open top container.", description3: "If you are shipping In Gauge cargo, you can book your shipment in just a few minutes on Trident.com.", image: "/in-gauge-special-cargo.avif" },
    outgauge: { title: "Out of Gauge cargo", description: "The dimensions of the cargo exceed the flat rack or open top container by length, width or height, but can still be unitised in containers.", description2: "Examples of Out of Gauge shipments: propellers, flanges or trucks.", image: "/out-of-gauge-banner.webp" },
    breakbulk: { title: "Break Bulk cargo", description: "Vastly exceeds the size and/or weight of a standard container and is therefore handled as non-unitised cargo and normally placed on a bed of flat racks with a large number of lashing points.", description2: "Examples of common Break Bulk shipments: yachts, masts, industrial machines or train carriages.", image: "/break-bulk-special-cargo.avif" }
  }},
  containerSpecs: { title: "Container Specifications", note: "*Subject to terminal acceptance", specs: [
    { type: "20' OT", length: "5,491", width: "2,221", height: "234", payload: "28,200" },
    { type: "40' OT", length: "11,811", width: "2,191", height: "234", payload: "28,600" },
    { type: "40' OT HC", length: "11,811", width: "2,191", height: "265", payload: "28,600" },
    { type: "40' FR", length: "11,630", width: "2,440", height: "194", payload: "47,000" },
    { type: "40' FR HC", length: "11,630", width: "2,440", height: "226", payload: "47,000" }
  ]},
  cta: { title: "Ready to ship your special cargo?", subtitle: "Contact our special cargo experts today", buttonText: "Find a price" }
};

const benefitIcons: Record<string, React.ReactNode> = {
  global: <GlobalOutlined className="text-2xl text-blue-600" />,
  tool: <ToolOutlined className="text-2xl text-blue-600" />,
  team: <TeamOutlined className="text-2xl text-blue-600" />,
  laptop: <LaptopOutlined className="text-2xl text-blue-600" />,
  calendar: <CalendarOutlined className="text-2xl text-blue-600" />,
  rocket: <RocketOutlined className="text-2xl text-blue-600" />,
  check: <CheckCircleOutlined className="text-2xl text-blue-600" />,
  thunderbolt: <ThunderboltOutlined className="text-2xl text-blue-600" />,
};

const SpecialCargo = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeCargoType, setActiveCargoType] = useState('ingauge');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('special-cargo');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          oneStopShop: { ...defaultContent.oneStopShop, ...(pc.oneStopShop || {}), benefits: pc.oneStopShop?.benefits || defaultContent.oneStopShop.benefits },
          cargoTypes: { ...defaultContent.cargoTypes, ...(pc.cargoTypes || {}), types: { ...defaultContent.cargoTypes.types, ...(pc.cargoTypes?.types || {}) } },
          containerSpecs: { ...defaultContent.containerSpecs, ...(pc.containerSpecs || {}), specs: pc.containerSpecs?.specs || defaultContent.containerSpecs.specs },
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
  const activeType = content.cargoTypes.types[activeCargoType as keyof typeof content.cargoTypes.types];

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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.overview.description}</p><p className="text-gray-600 leading-relaxed">{content.overview.description2}</p></div><div><img src={gm(content.overview.image)} alt="Special Cargo" className="w-full h-auto rounded-lg shadow-md" /></div></div></div></section>

      {/* One Stop Shop */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.oneStopShop.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.oneStopShop.subtitle}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">{content.oneStopShop.benefits.map((b, i) => (<div key={i} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">{benefitIcons[b.icon] || benefitIcons.global}</div><h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600 text-sm">{b.description}</p></div>))}</div></div></section>

      {/* Cargo Types */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.cargoTypes.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.cargoTypes.subtitle}</p></div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['ingauge', 'outgauge', 'breakbulk'] as const).map(ct => <button key={ct} onClick={() => setActiveCargoType(ct)} className={`px-6 py-3 text-base font-medium rounded-lg transition-all ${activeCargoType === ct ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{content.cargoTypes.types[ct].title}</button>)}
        </div>
        <div className="bg-gray-50 rounded-2xl p-8"><div className="grid md:grid-cols-2 gap-8"><div><h3 className="text-2xl font-semibold text-gray-900 mb-4">{activeType.title}</h3><p className="text-gray-600 leading-relaxed mb-4">{activeType.description}</p><p className="text-gray-600 leading-relaxed mb-4">{activeType.description2}</p>{'description3' in activeType && (activeType as any).description3 && <p className="text-gray-600 leading-relaxed">{(activeType as any).description3}</p>}</div><div><img src={gm(activeType.image)} alt={activeType.title} className="w-full h-auto rounded-lg shadow-md" /></div></div></div>
      </div></section>

      {/* Container Specs Table */}
      <section className="pb-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="mt-12"><h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">{content.containerSpecs.title}</h3><div className="overflow-x-auto"><table className="min-w-full bg-white border border-gray-200 rounded-lg"><thead className="bg-gray-100"><tr><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Equipment type</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Length (CM)</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Width (CM)</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Height (CM)</th><th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Maximum Payload (KG)</th></tr></thead><tbody>{content.containerSpecs.specs.map((s, i) => (<tr key={i} className="border-b hover:bg-gray-50"><td className="px-4 py-3 text-sm text-gray-700">{s.type}</td><td className="px-4 py-3 text-sm text-gray-700">{s.length}</td><td className="px-4 py-3 text-sm text-gray-700">{s.width}</td><td className="px-4 py-3 text-sm text-gray-700">{s.height}</td><td className="px-4 py-3 text-sm text-gray-700">{s.payload}{s.type.includes('FR') ? '*' : ''}</td></tr>))}</tbody></table><p className="text-xs text-gray-500 mt-2">{content.containerSpecs.note}</p></div></div></div></section>

      {/* Weather */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">☀️</span><div><div className="text-lg font-semibold text-gray-800">32°C</div><div className="text-sm text-gray-500">Mostly sunny</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>

      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default SpecialCargo;
