import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import { 
  CheckOutlined, SafetyOutlined, EyeOutlined, TeamOutlined,
  ContainerOutlined, CalendarOutlined, DropboxOutlined,
  ShareAltOutlined, LoginOutlined, SearchOutlined
} from '@ant-design/icons';

interface FlexibagsContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  whatIsFlexibag: { title: string; description: string; description2: string; description3: string; image: string; imageCaption: string; };
  idealChoice: { title: string; subtitle: string; categories: Array<{ title: string; description: string; exampleCommodities: string; image: string; icon: string; }>; };
  whatAreFlexibags: { title: string; description: string; description2: string; callout: string; image: string; };
  needMoreInfo: { title: string; description: string; buttonText: string; };
  howItWorks: { title: string; subtitle: string; steps: string[]; image: string; };
  benefits: { title: string; items: Array<{ title: string; description: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: FlexibagsContent = {
  isActive: true,
  hero: { title: "Flexibag Logistics", subtitle: "Transport bulk liquids safely and efficiently.", image: "/lubricant_01_hero.jpg", buttonText: "Contact us" },
  whatIsFlexibag: { title: "What is Flexibag Logistics?", description: "If you are in the need of transporting your liquid cargo in bulk efficiently and safely, the risks of spillage and contamination due to container quality and sub-optimal safety procedures can be challenging. Flexibag Logistics is a specialised solution for transporting bulk liquid cargo efficiently and safely.", description2: "It is achieved with a packaging method that involves flexibags placed inside high-quality containers. It is an ideal choice to move bulk wine, edible oils, or industrial chemicals. Our Flexibag system is designed to ensure that your valuable liquids remain in top condition from origin to destination.", description3: "Our experts can help you streamline your bulk liquid logistics, right from booking, container selection and preparation, to final delivery.", image: "/lubrican_02.jpg", imageCaption: "A busy cargo port with multiple Trident shipping containers." },
  idealChoice: { title: "The ideal choice for bulk liquid transport", subtitle: "Most liquids can be transported in a flexibag. Our solutions work best with:", categories: [
    { title: "Chemical lubricants", description: "Minimise your risks of spills and cross-contamination and ensure compliance with all applicable safety standards while shipping chemicals.", exampleCommodities: "Lubricants, additives, surfactants", image: "/lubricant_03_lubricant.jpg", icon: "dropbox" },
    { title: "Edible oil", description: "We adhere to strict food grade compliance to ensure that every drop of oil remains untouched by oxidation and contamination.", exampleCommodities: "Olive oil, palm oil, fish oil", image: "/lubricant_04_edable_oil.jpg", icon: "dropbox" },
    { title: "Wines", description: "Move your wine all the way from the vineyard to the glass while preserving its quality and unique characteristics. Manage the seasonal fluctuations and deliver your wine to your end consumers on time.", exampleCommodities: "Bulk wine", image: "/lubricant_05_wine.jpg", icon: "dropbox" }
  ]},
  whatAreFlexibags: { title: "What are Flexibags?", description: "Flexibags (also known as Flexitanks) are a practical method for transporting bulk liquids in containers. These durable, FDA-approved bags are made from multiple layers of polyethylene and polypropylene, which ensure strength and safety. They are placed inside high-quality containers and are capable of holding large volumes of non-hazardous liquids.", description2: "Advanced multi-layer technology enhances quality control, ensuring non-hazardous liquids are transported safely. Our flexibag-equipped containers can hold up to 24,000 litres of liquid, reducing the risk of contamination and improving cargo flow within your supply chain.", callout: "Flexibag being installed in a Trident Premium Quality Container", image: "/what-are-flexibags.avif" },
  needMoreInfo: { title: "Need more information?", description: "Please reach out to our expert team for more details about Flexibag Logistics.", buttonText: "Contact us →" },
  howItWorks: { title: "How does Flexibag Logistics work?", subtitle: "Streamline your bulk liquid logistics, right from container selection and preparation to booking and final delivery.", steps: ["Flexibag procurement","Shipment order placed","Pick up empty container inspection and audit of proper container selection","Flexibag installation including fitting, bulkhead, valve key or heating pads if required","Arrival at the loading site","Loading","Delivery to terminal","Export customs clearance","International ocean transportation","Import customs clearance","Inland haulage","Optional full container storage at depot"], image: "/flexibag_loading diagram.jpg" },
  benefits: { title: "Benefits of Flexibag Logistics", items: [
    { title: "Management of capacity fluctuations", description: "Leverage our scalable logistics solutions which are designed to provide flexible options regarding space allocations. Handle higher or unanticipated volumes and demand during peak seasons with ease.", icon: "calendar" },
    { title: "Visibility and traceability", description: "Enhance your decision-making capabilities with single-source door-to-door visibility and easy access to all milestones, allowing you to track and trace your cargo seamlessly.", icon: "eye" },
    { title: "One logistics partner from start to finish", description: "Work with one reliable vendor that coordinates your entire cargo flow from origin to destination, which helps enable more efficiency in your operations.", icon: "team" },
    { title: "Improved safety and compliance", description: "With high-quality multi-layer flexibags featuring an outer polypropylene layer made from advanced aramid fiber, we provide the reliability and protection your bulk liquid cargo deserves.", icon: "safety" },
    { title: "Greater container availability and ocean access", description: "Get access to containers that match your production output, with greater control over your delivery timelines with our owned and operated assets.", icon: "container" }
  ]},
  contact: { title: "Contact Our Flexibag Logistics Experts", subtitle: "Ready to optimize your bulk liquid logistics? Let our experts help you find the perfect Flexibag solution for your liquid cargo needs.", buttonText: "Submit Inquiry" },
  cta: { title: "Ready to optimize your bulk liquid logistics?", subtitle: "Let our experts help you find the perfect Flexibag solution", buttonText: "Contact our team" }
};

const benefitIcons: Record<string, React.ReactNode> = {
  calendar: <CalendarOutlined className="text-2xl text-blue-600" />,
  eye: <EyeOutlined className="text-2xl text-blue-600" />,
  team: <TeamOutlined className="text-2xl text-blue-600" />,
  safety: <SafetyOutlined className="text-2xl text-blue-600" />,
  container: <ContainerOutlined className="text-2xl text-blue-600" />,
};

const Flexibags = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('flexibags');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          whatIsFlexibag: { ...defaultContent.whatIsFlexibag, ...(pc.whatIsFlexibag || {}) },
          idealChoice: { ...defaultContent.idealChoice, ...(pc.idealChoice || {}), categories: pc.idealChoice?.categories || defaultContent.idealChoice.categories },
          whatAreFlexibags: { ...defaultContent.whatAreFlexibags, ...(pc.whatAreFlexibags || {}) },
          needMoreInfo: { ...defaultContent.needMoreInfo, ...(pc.needMoreInfo || {}) },
          howItWorks: { ...defaultContent.howItWorks, ...(pc.howItWorks || {}), steps: pc.howItWorks?.steps || defaultContent.howItWorks.steps },
          benefits: { ...defaultContent.benefits, ...(pc.benefits || {}), items: pc.benefits?.items || defaultContent.benefits.items },
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
    { id: 'overview', label: 'Overview' }, { id: 'how-it-works', label: 'How it Works' },
    { id: 'benefits', label: 'Benefits' }, { id: 'contact', label: 'Contact us' }
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
          <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.whatIsFlexibag.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed mb-4">{content.whatIsFlexibag.description}</p><p className="text-gray-700 text-lg leading-relaxed mb-4">{content.whatIsFlexibag.description2}</p><p className="text-gray-700 text-lg leading-relaxed">{content.whatIsFlexibag.description3}</p></div><div><img src={gm(content.whatIsFlexibag.image)} alt="Flexibag" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.whatIsFlexibag.imageCaption}</p></div></div></section>
          <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>
          <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50"><h2 className="text-3xl font-light text-gray-900 mb-8 text-center">{content.idealChoice.title}</h2><p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{content.idealChoice.subtitle}</p><div className="grid md:grid-cols-3 gap-8">{content.idealChoice.categories.map((cat,i)=>(<div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"><img src={gm(cat.image)} alt={cat.title} className="w-full h-48 object-cover" /><div className="p-6"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"><DropboxOutlined className="text-xl text-blue-600" /></div><h3 className="text-xl font-semibold text-gray-900 mb-3">{cat.title}</h3><p className="text-gray-600">{cat.description}<span className="text-gray-500 text-sm block mt-2">Example commodities: {cat.exampleCommodities}</span></p></div></div>))}</div></section>
          <div className="px-8 md:px-16 lg:px-24"><div className="w-16 h-0.5 bg-blue-500 mb-6"></div></div>
          <section className="py-16 px-8 md:px-16 lg:px-24"><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-light text-gray-900 mb-6">{content.whatAreFlexibags.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed mb-4">{content.whatAreFlexibags.description}</p><p className="text-gray-700 text-lg leading-relaxed">{content.whatAreFlexibags.description2}</p><div className="mt-6 p-4 bg-blue-50 rounded-lg"><p className="text-gray-600 italic">{content.whatAreFlexibags.callout}</p></div></div><div><img src={gm(content.whatAreFlexibags.image)} alt="Flexibags" className="w-full h-auto rounded-lg shadow-md" /></div></div></section>
          <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-50"><div className="text-center max-w-2xl mx-auto"><h2 className="text-2xl font-light text-gray-900 mb-4">{content.needMoreInfo.title}</h2><p className="text-gray-600 mb-6">{content.needMoreInfo.description}</p><Link to="/contact"><button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.needMoreInfo.buttonText}</button></Link></div></section>
        </>}

        {/* HOW IT WORKS */}
        {activeTab === 'how-it-works' && <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-8">{content.howItWorks.title}</h2><p className="text-gray-600 mb-8 text-lg">{content.howItWorks.subtitle}</p><div className="grid md:grid-cols-2 gap-12"><div><img src={gm(content.howItWorks.image)} alt="How it works" className="w-full h-auto rounded-lg shadow-md" /></div><div><ul className="space-y-3">{content.howItWorks.steps.map((step,i)=>(<li key={i} className="flex items-start gap-3"><CheckOutlined className="text-blue-500 mt-1" /><span className="text-gray-700">{step}</span></li>))}</ul></div></div></section>}

        {/* BENEFITS */}
        {activeTab === 'benefits' && <section className="py-16 px-8 md:px-16 lg:px-24"><h2 className="text-3xl font-light text-gray-900 mb-12 text-center">{content.benefits.title}</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{content.benefits.items.map((b,i)=>(<div key={i} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">{benefitIcons[b.icon]||benefitIcons.calendar}</div><h3 className="text-lg font-semibold text-gray-900 mb-3">{b.title}</h3><p className="text-gray-600">{b.description}</p></div>))}</div></section>}

        {/* CONTACT */}
        {activeTab === 'contact' && <section className="py-16 px-8 md:px-16 lg:px-24"><div className="max-w-3xl"><h2 className="text-3xl font-light text-gray-900 mb-6">{content.contact.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-700 text-lg leading-relaxed mb-8">{content.contact.subtitle}</p><div className="bg-gray-50 rounded-lg p-8"><form className="space-y-6">{["Full Name","Email Address","Company Name","Message"].map((f,i)=>(<div key={i}><label className="block text-sm font-medium text-gray-700 mb-2">{f}</label>{f==='Message'?<textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>:<input type={f==='Email Address'?'email':'text'} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />}</div>))}<button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.contact.buttonText}</button></form></div></div></section>}
      </div>

      {/* Weather - Full width */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto"><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">🌤️</span><div><div className="text-lg font-semibold text-gray-800">31°C</div><div className="text-sm text-gray-500">Partly sunny</div></div></div><div className="flex items-center gap-4"><ShareAltOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><LoginOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /><SearchOutlined className="text-gray-600 text-xl cursor-pointer hover:text-blue-600" /></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div>
      </section>

      {/* CTA - Full width */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="text-center max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl font-light text-white mb-4">{content.cta.title}</h2><p className="text-xl text-white/90 mb-8">{content.cta.subtitle}</p><Link to="/contact"><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all text-sm font-medium">{content.cta.buttonText}</button></Link></div>
      </section>
    </div>
  );
};

export default Flexibags;
