import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import { 
  CheckOutlined, SafetyCertificateOutlined, ThunderboltOutlined,
  EnvironmentOutlined, ContainerOutlined, PartitionOutlined,
  BarsOutlined, UngroupOutlined, ShareAltOutlined, LoginOutlined, SearchOutlined
} from '@ant-design/icons';

interface GOHContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  overview: { title: string; description: string; description2: string; imageCaption: string; image: string; };
  whyChooseUs: { title: string; benefits: Array<{ title: string; description: string; icon: string; }>; };
  servicesInclude: { title: string; subtitle: string; services: Array<{ title: string; description: string; icon: string; }>; };
  services: { title: string; items: Array<{ title: string; description: string; }>; };
  systems: { title: string; systems: Array<{ title: string; description: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; formFields: string[]; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: GOHContent = {
  isActive: true,
  hero: { title: "Garments on Hangers", subtitle: "Specialised containers with built-in hangers.", image: "/garment-on-hanger-logistics_hero.jpg", buttonText: "Contact us" },
  overview: { title: "Designed to protect your garments all the way", description: "For fashion brands and stores, keeping clothes and any warehouse garment in top-notch condition during shipping is crucial. Meet Premium Garments on Hangers Containers: your go-to solution for smooth international transportation that ensures your clothes arrive without wrinkles and looking their best. These special containers come pre-fitted with hangers, making them perfect for safely transporting delicate garments.", description2: "Trident's Premium Garments on Hangers containers offer flexibility and can handle greater volume. It's the ideal solution for retailers who want a safe, affordable and hassle-free way to ship garments.", imageCaption: "A worker uses a handheld scanner to scan the barcode on each garment to ship.", image: "/garments_on_hanger_02.jpg" },
  whyChooseUs: { title: "Why choose Garments on Hangers Containers?", benefits: [
    { title: "Premium care", description: "Special hanging systems and safe compartments to protect your clothes from wrinkles and damage.", icon: "safety" },
    { title: "Perfect condition every time", description: "Smart ventilation and temperature controls to safeguard against dampness, mold and extreme weather conditions.", icon: "environment" },
    { title: "Safety first", description: "Enhanced locks and tamper-evident seals ensure security of your garments when they're on the move.", icon: "thunderbolt" },
    { title: "Efficient and easy", description: "Designed to optimise space usage inside the containers, which makes it easier to load and unload and saves time.", icon: "container" }
  ]},
  servicesInclude: { title: "What our services include", subtitle: "Here's what you can expect from our Garments on Hangers services:", services: [
    { title: "Receiving", description: "Accepting garments from different vendors.", icon: "check" },
    { title: "Cargo check", description: "Thoroughly inspecting each item, following our standard operating procedures.", icon: "check" },
    { title: "Consolidation", description: "Merging multiple garment shipments into a single container for efficiency.", icon: "check" },
    { title: "Partition", description: "Organising nose-loaded and flat-packed cargo, giving each its own space in the container.", icon: "partition" },
    { title: "Less-than-Container Load (LCL)", description: "Ideal for smaller loads, featuring a handy horizontal bar inside smaller boxes.", icon: "container" }
  ]},
  services: { title: "Our Garments on Hangers Services", items: [
    { title: "Receiving", description: "Accepting garments from different vendors with proper documentation and quality checks." },
    { title: "Cargo Check", description: "Thoroughly inspecting each item, following our standard operating procedures for quality assurance." },
    { title: "Consolidation", description: "Merging multiple garment shipments into a single container for maximum efficiency." },
    { title: "Partition", description: "Organising nose-loaded and flat-packed cargo, giving each its own space in the container." },
    { title: "Less-than-Container Load (LCL)", description: "Ideal for smaller loads, featuring a handy horizontal bar inside smaller boxes." }
  ]},
  systems: { title: "Types of Garments on Hangers systems", systems: [
    { title: "Bar system", description: "Suitable for medium to high-value items like suits and jackets.", icon: "bars" },
    { title: "String system", description: "Ideal for lighter garments such as shirts and shorts.", icon: "ungroup" }
  ]},
  contact: { title: "Contact Our Garments on Hangers Experts", subtitle: "Ready to protect your garments during transit? Let our experts help you find the perfect solution for your fashion logistics needs.", buttonText: "Submit Inquiry", formFields: ["Full Name","Email Address","Company Name","Message"] },
  cta: { title: "Ready to protect your garments?", subtitle: "Let our experts help you find the perfect Garments on Hangers solution", buttonText: "Contact our team" }
};

const whyIcons: Record<string, React.ReactNode> = {
  safety: <SafetyCertificateOutlined className="text-2xl text-blue-600" />,
  environment: <EnvironmentOutlined className="text-2xl text-blue-600" />,
  thunderbolt: <ThunderboltOutlined className="text-2xl text-blue-600" />,
  container: <ContainerOutlined className="text-2xl text-blue-600" />,
};
const serviceIcons: Record<string, React.ReactNode> = {
  check: <CheckOutlined className="text-xl text-blue-600" />,
  partition: <PartitionOutlined className="text-xl text-blue-600" />,
  container: <ContainerOutlined className="text-xl text-blue-600" />,
};
const systemIcons: Record<string, React.ReactNode> = {
  bars: <BarsOutlined className="text-2xl text-blue-600" />,
  ungroup: <UngroupOutlined className="text-2xl text-blue-600" />,
};

const GOH = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('goh');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          whyChooseUs: { ...defaultContent.whyChooseUs, ...(pc.whyChooseUs || {}), benefits: pc.whyChooseUs?.benefits || defaultContent.whyChooseUs.benefits },
          servicesInclude: { ...defaultContent.servicesInclude, ...(pc.servicesInclude || {}), services: pc.servicesInclude?.services || defaultContent.servicesInclude.services },
          services: { ...defaultContent.services, ...(pc.services || {}), items: pc.services?.items || defaultContent.services.items },
          systems: { ...defaultContent.systems, ...(pc.systems || {}), systems: pc.systems?.systems || defaultContent.systems.systems },
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
    { id: 'overview', label: 'Overview' }, { id: 'services', label: 'Services' },
    { id: 'systems', label: 'Systems' }, { id: 'contact', label: 'Contact us' }
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
          <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.overview.description}</p><p className="text-gray-700 text-lg leading-relaxed mb-6">{content.overview.description2}</p><p className="text-gray-500 text-sm italic">{content.overview.imageCaption}</p></div><div><img src={gm(content.overview.image)} alt="GOH" className="w-full h-auto rounded-lg shadow-md" /></div></div></section>
          <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>
          <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-12 text-center">{content.whyChooseUs.title}</h2><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">{content.whyChooseUs.benefits.map((b,i)=>(<div key={i} className="text-center"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">{whyIcons[b.icon]||whyIcons.safety}</div><h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600 text-sm">{b.description}</p></div>))}</div></section>
          <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>
          <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50"><h2 className="text-3xl font-light text-gray-900 mb-12 text-center">{content.servicesInclude.title}</h2><p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{content.servicesInclude.subtitle}</p><div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">{content.servicesInclude.services.map((s,i)=>(<div key={i} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">{serviceIcons[s.icon]||serviceIcons.check}</div><h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3><p className="text-gray-600 text-sm">{s.description}</p></div>))}</div></section>
        </>}

        {/* SERVICES */}
        {activeTab === 'services' && <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-8">{content.services.title}</h2><div className="grid md:grid-cols-2 gap-8">{content.services.items.map((item,i)=>(<div key={i} className="bg-gray-50 rounded-lg p-6"><h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3><p className="text-gray-600">{item.description}</p></div>))}</div></section>}

        {/* SYSTEMS */}
        {activeTab === 'systems' && <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-8">{content.systems.title}</h2><div className="grid md:grid-cols-2 gap-8">{content.systems.systems.map((sys,i)=>(<div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8 border border-blue-100"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">{systemIcons[sys.icon]||systemIcons.bars}</div><h3 className="text-2xl font-semibold text-gray-900 mb-3">{sys.title}</h3><p className="text-gray-600 text-lg">{sys.description}</p></div>))}</div></section>}

        {/* CONTACT */}
        {activeTab === 'contact' && <section className="py-16 px-8 md:px-16 lg:px-24"><div className="max-w-3xl"><h2 className="text-3xl font-light text-gray-900 mb-6">{content.contact.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed mb-8">{content.contact.subtitle}</p><div className="bg-gray-50 rounded-lg p-8"><form className="space-y-6">{content.contact.formFields.map((f,i)=>(<div key={i}><label className="block text-sm font-medium text-gray-700 mb-2">{f}</label>{f==='Message'?<textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>:<input type={f==='Email Address'?'email':'text'} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />}</div>))}<button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.contact.buttonText}</button></form></div></div></section>}
      </div>
              {/* Weather */}
        <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">🌧️</span><div><div className="text-lg font-semibold text-gray-800">31°C</div><div className="text-sm text-gray-500">Rainy days ahead</div></div></div><div className="flex items-center gap-4"><ShareAltOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><LoginOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><SearchOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></section>

        {/* CTA */}
        <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="text-center max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl font-light text-white mb-4">{content.cta.title}</h2><p className="text-xl text-white/90 mb-8">{content.cta.subtitle}</p><Link to="/contact"><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all text-sm font-medium">{content.cta.buttonText}</button></Link></div></section>
    </div>
  );
};

export default GOH;
