import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import {
  GlobalOutlined, ApartmentOutlined, CarOutlined, RocketOutlined,
  EyeOutlined, SafetyCertificateOutlined, ContainerOutlined,
  ThunderboltOutlined, TruckOutlined,
} from '@ant-design/icons';

interface ProjectLogisticsContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; video?: string; image?: string; buttonText: string; };
  overview: { title: string; description: string; description2: string; image: string; imageCaption: string; };
  services: Array<{ title: string; description: string; image: string; icon: string; }>;
  whyChooseUs: { title: string; benefits: Array<{ title: string; description: string; icon: string; }>; };
  contact: { title: string; subtitle: string; buttonText: string; };
  cta: { title: string; subtitle: string; buttonText: string; };
}

const defaultContent: ProjectLogisticsContent = {
  isActive: true,
  hero: { title: "Project Logistics", subtitle: "Whatever your project, we have the logistics.", video: "/project.mp4", buttonText: "Contact us" },
  overview: { title: "Whatever your project, we have the logistics.", description: "No two high-stakes projects are the same. To mitigate the unique risks and complexities facing yours, you need access to tailored-yet-tested capabilities. And you need expert support, visibility, and control from planning to final delivery.", description2: "In Trident, you have one trusted partner: a project logistics integrator offering decades of expertise, vast assets, and a global network to reach even the most remote locations. From out-of-gauge shipments to intricate logistics partnerships, we're committed to ensuring every component for your project arrives on time, in full, and with the utmost care.", image: "/project_cargo.avif", imageCaption: "Trucks transporting yellow harvesters on a rural road near farmland." },
  services: [
    { title: "Project Ocean Transport", description: "Deliver oversized and breakbulk cargo across oceans with tailored vessels. We manage procurement, QC, and transport to ensure safe, flexible delivery beyond container yards.", image: "/project_cargo_02.avif", icon: "container" },
    { title: "Specialised Airlift", description: "Move project-bound or oversized cargo fast by air using short-range, heavy or ultra-heavy lift aircraft. We manage procurement and execution for smooth end-to-end delivery.", image: "/project_cargo_03.webp", icon: "thunderbolt" },
    { title: "Specialised Inland Transportation", description: "Deliver to places beyond the reach of standard trucks and trains. We provide specialised pre-, on-, and post-carriage solutions using trailers, wagons, and cranes for complex road and rail moves.", image: "/project_cargo_04.webp", icon: "car" },
    { title: "Vessel Chartering", description: "Access multipurpose, heavy-lift, offshore, and river vessels. Our team handles chartering, QC, and procurement to deliver specialised cargo safely where you need it.", image: "/project_cargo_02.avif", icon: "container" }
  ],
  whyChooseUs: { title: "Why Trident Project Logistics?", benefits: [
    { title: "Global reach, local expertise", description: "Tap into Trident's worldwide network and on-the-ground professionals in 130+ countries to execute projects seamlessly, wherever they are.", icon: "global" },
    { title: "End-to-end integration", description: "Work with a single trusted partner that combines owned assets, precision planning, logistics, and orchestration into one streamlined solution.", icon: "apartment" },
    { title: "Flexibility in ports and transport", description: "Overcome bottlenecks with access to a wide array of ports, routes, and transport modes – including feeder, inland, and offshore solutions.", icon: "truck" },
    { title: "Expertise in complex cargo", description: "Benefit from decades of experience, specialised equipment, and quality assurance processes to move heavy, hazardous, or oversized cargo safely.", icon: "rocket" },
    { title: "Real-time visibility and control", description: "Stay on top of every move with advanced technology, GPS tracking, and predictive insights that give you mission-critical visibility.", icon: "eye" },
    { title: "Certified quality standards", description: "Count on our global HSSE framework and compliance programme, backed by ISO certifications, to manage risks and safeguard your projects.", icon: "safety" }
  ]},
  contact: { title: "Contact Our Project Logistics Experts", subtitle: "Reach out to our specialised project cargo team for assistance with your complex logistics needs.", buttonText: "Contact us" },
  cta: { title: "Ready to start your project?", subtitle: "Contact our project logistics experts today", buttonText: "Contact us" }
};

const serviceIcons: Record<string, React.ReactNode> = {
  container: <ContainerOutlined className="text-xl text-blue-600" />,
  thunderbolt: <ThunderboltOutlined className="text-xl text-blue-600" />,
  car: <CarOutlined className="text-xl text-blue-600" />,
};
const benefitIcons: Record<string, React.ReactNode> = {
  global: <GlobalOutlined className="text-2xl text-blue-600" />,
  apartment: <ApartmentOutlined className="text-2xl text-blue-600" />,
  truck: <TruckOutlined className="text-2xl text-blue-600" />,
  rocket: <RocketOutlined className="text-2xl text-blue-600" />,
  eye: <EyeOutlined className="text-2xl text-blue-600" />,
  safety: <SafetyCertificateOutlined className="text-2xl text-blue-600" />,
};

const ProjectLogistics = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('project-logistics');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          overview: { ...defaultContent.overview, ...(pc.overview || {}) },
          services: pc.services || defaultContent.services,
          whyChooseUs: { ...defaultContent.whyChooseUs, ...(pc.whyChooseUs || {}), benefits: pc.whyChooseUs?.benefits || defaultContent.whyChooseUs.benefits },
          contact: { ...defaultContent.contact, ...(pc.contact || {}) },
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
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {content.hero.video?.endsWith('.mp4') ? <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}><source src={gm(content.hero.video)} type="video/mp4" /></video> : <img src={gm(content.hero.image || '')} alt={content.hero.title} className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }} />}
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
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20"><div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}><div className="flex gap-8 overflow-x-auto">{['overview', 'contact'].map(t => <button key={t} onClick={() => setActiveTab(t)} className={`py-3 px-1 text-sm font-medium capitalize ${activeTab === t ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>{t}</button>)}</div></div></section>
      {/* OVERVIEW */}
      {activeTab === 'overview' && <div>
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed mb-4">{content.overview.description}</p><p className="text-gray-600 leading-relaxed">{content.overview.description2}</p></div><div><img src={gm(content.overview.image)} alt="Overview" className="w-full h-auto rounded-lg shadow-md" /><p className="text-sm text-gray-500 mt-2 text-center">{content.overview.imageCaption}</p></div></div></div></section>
        {content.services.map((svc, i) => {
          const isLeft = i % 2 === 0;
          return (
            <section key={i} className={`py-20 px-8 md:px-16 lg:px-24 ${i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={isLeft ? '' : 'order-2 md:order-1'}><img src={gm(svc.image)} alt={svc.title} className="w-full h-auto rounded-lg shadow-md" /></div>
              <div className={isLeft ? '' : 'order-1 md:order-2'}><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{serviceIcons[svc.icon] || serviceIcons.container}</div><h3 className="text-2xl font-semibold text-gray-900">{svc.title}</h3></div><div className="w-12 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{svc.description}</p></div>
            </div></div></section>
          );
        })}
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whyChooseUs.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{content.whyChooseUs.benefits.map((b, i) => (<div key={i} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">{benefitIcons[b.icon] || benefitIcons.global}</div><h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3><p className="text-gray-600 text-sm">{b.description}</p></div>))}</div></div></section>
      </div>}
      {/* CONTACT */}
      {activeTab === 'contact' && <section className="py-20 px-8 md:px-16 lg:px-24 bg-white"><div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div><p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p><button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button></div></section>}
      {/* Weather */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200"><div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}><div className="flex justify-between items-center flex-wrap gap-4"><div className="flex items-center gap-3"><span className="text-3xl">⛅</span><div><div className="text-lg font-semibold text-gray-800">31°C</div><div className="text-sm text-gray-500">Mostly cloudy</div></div></div><div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div></div></div></section>
      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600"><div className="max-w-4xl mx-auto text-center"><h3 className="text-3xl text-white mb-4 font-light">{content.cta.title}</h3><p className="text-xl text-blue-100 mb-8">{content.cta.subtitle}</p><button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">{content.cta.buttonText}</button></div></section>
    </div>
  );
};

export default ProjectLogistics;
