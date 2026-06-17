import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';

interface ColdStorageContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; video?: string; image?: string; buttonText: string; };
  benefits: { title: string; description: string; description2: string; description3: string; image: string; };
  coldChainSupport: { title: string; steps: Array<{ name: string; icon: string; }>; };
  advantages: { title: string; subtitle: string; items: Array<{ title: string; description: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: ColdStorageContent = {
  isActive: true,
  hero: { title: "Cold Storage", subtitle: "Store, handle, and transport temperature-sensitive cargo through our network of strategically located cold storage facilities.", video: "/cold_storage.mp4", buttonText: "Contact us" },
  benefits: { title: "How can our Cold Storage benefit you?", description: "Your temperature-sensitive commodities must be stored and delivered in perfect condition. With Trident Cold Storage, you can be sure of a simplified cold chain that makes cargo quality and easy movement a reality.", description2: "How do we do this? Trident's cold storage solutions are powered by the latest technologies in refrigeration and remote management. They are also backed by decades of human expertise in commodities, logistics and end-to-end supply chain management. Our cold storage assets ensure that your cargo retains its quality, whether in cold storage or in transit across land, air, and ocean.", description3: "With Trident, you can always enjoy a simplified cold chain journey with solutions customised to your every need.", image: "/cold_storage.avif" },
  coldChainSupport: { title: "Supporting you across the cold chain", steps: [
    { name: "Producer", icon: "producer" }, { name: "Consolidation and storage", icon: "storage" }, { name: "Export haulage", icon: "haulage" }, { name: "Customs brokerage", icon: "customs" }, { name: "Terminal handling", icon: "terminal" }, { name: "Ocean", icon: "ocean" }, { name: "Terminal handling", icon: "terminal" }, { name: "Customs brokerage", icon: "customs" }, { name: "Import haulage", icon: "import" }, { name: "Cold storage cross-dock VAS", icon: "vas" }, { name: "Final destination", icon: "destination" }
  ]},
  advantages: { title: "The Trident Cold Storage advantage", subtitle: "How do our Cold Storage services provide the assurance of quality even in unpredictable environments?", items: [
    { title: "Connected Cold Chain", description: "Our owned assets and technology platforms assure you of support from end to end, giving your cold chain control over operations, costs and results." },
    { title: "Expertise", description: "Our cold storage experts leverage decades of experience with perishable cargo and the latest technologies to deliver optimal shelf life and minimise delays and wastage." },
    { title: "Agility", description: "With our owned assets serving your journey, a single point of contact for coordination and fewer handovers, you have the flexibility to pivot, even with any change in variables." },
    { title: "Visibility", description: "With our advanced monitoring system, you can remotely monitor container temperature and relative humidity in real time, empowering you with the control to take proactive action for your perishable cargo." }
  ]},
  contact: { title: "Contact Our Cold Storage Experts", subtitle: "Reach out to our temperature-controlled storage specialists for your perishable cargo needs.", buttonText: "Contact us" },
  cta: { title: "Ready to protect your temperature-sensitive cargo?", subtitle: "Contact our cold storage experts today", buttonText: "Contact us" }
};

const ColdStorage = () => {
  const [content, setContent] = useState<ColdStorageContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('cold-storage');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          benefits: { ...defaultContent.benefits, ...(pc.benefits || {}) },
          coldChainSupport: { ...defaultContent.coldChainSupport, ...(pc.coldChainSupport || {}), steps: pc.coldChainSupport?.steps || defaultContent.coldChainSupport.steps },
          advantages: { ...defaultContent.advantages, ...(pc.advantages || {}), items: pc.advantages?.items || defaultContent.advantages.items },
          contact: { ...defaultContent.contact, ...(pc.contact || {}) },
          cta: { ...defaultContent.cta, ...(pc.cta || {}) }
        });
      }
    } catch (err) { console.error('Error loading cold storage:', err); }
    finally { setLoading(false); }
  };

  const getMediaUrl = (p: string) => { if (!p) return ''; if (p.startsWith('http')) return p; if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`; return p; };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  const stepIcons: Record<string, JSX.Element> = {
    producer: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    storage: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    haulage: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375A1.125 1.125 0 012.25 17.25v-4.5m15 6a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h.75c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-1.5M2.25 12.75h15m0 0l-2.25-2.25m2.25 2.25l-2.25 2.25" /></svg>,
    customs: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    terminal: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375A1.125 1.125 0 012.25 17.25v-4.5m15 6a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h.75c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-1.5M2.25 12.75h15m0 0l-2.25-2.25m2.25 2.25l-2.25 2.25" /></svg>,
    ocean: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 9.75L12 3l8.25 6.75M3.75 9.75v8.25a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-8.25M3.75 9.75L12 16.5m0 0l8.25-6.75" /></svg>,
    import: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375A1.125 1.125 0 012.25 17.25v-4.5m15 6a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h.75c.621 0 1.125-.504 1.125-1.125v-4.5c0-.621-.504-1.125-1.125-1.125h-1.5M2.25 12.75h15m0 0l-2.25-2.25m2.25 2.25l-2.25 2.25" /></svg>,
    vas: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75A2.25 2.25 0 004.5 15h15a2.25 2.25 0 002.25-2.25v-1.5A2.25 2.25 0 0019.5 9h-15a2.25 2.25 0 00-2.25 2.25v1.5zM12 9v6m-3-3h6" /></svg>,
    destination: <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
  };

  const advIcons = [
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
    <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
  ];

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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button>
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

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.benefits.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.benefits.description}</p><p className="text-gray-600 leading-relaxed mb-4">{content.benefits.description2}</p><p className="text-gray-600 leading-relaxed">{content.benefits.description3}</p></div><div><img src={getMediaUrl(content.benefits.image)} alt="Cold Storage" className="w-full h-auto rounded-lg shadow-md" /></div></div></div></section>

        <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.coldChainSupport.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div></div><div className="overflow-x-auto"><div className="flex flex-wrap justify-center items-center gap-3 min-w-[900px]">{content.coldChainSupport.steps.map((step, i) => (<span key={i} className="flex items-center gap-3">{i > 0 && <span className="text-blue-500 text-2xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>}<div className="bg-white rounded-lg p-4 text-center shadow-md min-w-[130px] hover:shadow-lg transition-shadow"><div className="text-blue-600 mb-2">{stepIcons[step.icon] || stepIcons.producer}</div><span className="text-sm font-medium text-gray-700">{step.name}</span></div></span>))}</div></div></div></section>

        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.advantages.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.advantages.subtitle}</p></div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">{content.advantages.items.map((item, i) => (<div key={i} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"><div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">{advIcons[i]}</svg></div><h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3><p className="text-gray-600 text-sm">{item.description}</p></div>))}</div></div></section>
      </div>}

      {/* CONTACT TAB */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}

      {/* Weather Widget */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">❄️</span><div><div className="text-lg font-semibold text-gray-800">-5°C</div><div className="text-sm text-gray-500">Cold storage temperature</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>

      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default ColdStorage;
