//D:/Trident Log/Trident-FE/src/pages/Careers.tsx

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { 
  RocketOutlined, 
  BulbOutlined, 
  ArrowUpOutlined, 
  TeamOutlined,
  DollarOutlined,
  RiseOutlined,
  GlobalOutlined,
  CarOutlined,
  UsergroupAddOutlined,
  TrophyOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import LazyVideo from '../pages/LazyVideo';
import LazyImage from '../pages/LazyImage';

// Icon mapping to components
const iconMap: { [key: string]: any } = {
  RocketOutlined, BulbOutlined, ArrowUpOutlined, TeamOutlined,
  DollarOutlined, RiseOutlined, GlobalOutlined, CarOutlined,
  UsergroupAddOutlined, TrophyOutlined
};

interface CareerFAQ {
  title: string;
  narration: string;
}

interface CareerContent {
  isActive: boolean;
  hero: { media?: string };
  intro: { title: string; description: string };
  culture: { title: string; description: string; icons: { icon: string; text: string }[] };
  responsibilityBanner: { title: string };
  faqSection: { image: string; faqs: CareerFAQ[] };
  jobOpenings: { backgroundImage: string; title: string; description: string };
  whyWork: { title: string; image: string; items: { icon: string; text: string }[] };
}

const defaultContent: CareerContent = {
  isActive: true,
  hero: { media: "/careers.mp4" },
  intro: {
    title: "Be Part of the Global Trade Journey.",
    description: "At Trident Global Logistics Limited, we do more than deliver cargo — we create opportunities. We're building a workplace where driven professionals can accelerate their careers, expand their global perspective, and make a meaningful impact in the fast-evolving world of logistics."
  },
  culture: {
    title: "Our Culture",
    description: "We know exceptional logistics starts with exceptional people. That's why we foster continuous learning, recognize performance, and empower every team member to grow, contribute, and succeed.",
    icons: [
      { icon: "RocketOutlined", text: "Career growth in a global industry" },
      { icon: "BulbOutlined", text: "Learning from the best hands-on training with SOPs, CRM tools, and carrier systems" },
      { icon: "ArrowUpOutlined", text: "Performance-driven bonuses and leadership tracks" },
      { icon: "TeamOutlined", text: "Teamwork, accountability, and transparent communication" }
    ]
  },
  responsibilityBanner: { title: "Your Goods, Our Responsibility – Flawless Logistics" },
  faqSection: {
    image: "/career_3.jpg",
    faqs: [
      { title: "Customs Brokerage", narration: "Customs brokers facilitate the clearance of goods..." },
      { title: "Last-Mile Delivery", narration: "Last-mile delivery focuses on the final leg..." },
      { title: "Reverse Logistics", narration: "Reverse logistics involves managing the return..." }
    ]
  },
  jobOpenings: {
    backgroundImage: "/careers_4.jpg",
    title: "Current Job Openings",
    description: "Browse open roles across departments: Sales Coordinator - Freight Solutions (Mid-Level)"
  },
  whyWork: {
    title: "Why work at Trident?",
    image: "/careers_05.jpg",
    items: [
      { icon: "DollarOutlined", text: "Competitive salary with performance bonuses" },
      { icon: "RiseOutlined", text: "Rapid promotion path for high performers" },
      { icon: "GlobalOutlined", text: "Exposure to international agents, clients, and systems" },
      { icon: "CarOutlined", text: "360° training in all freight modes: Air, Sea, Road" },
      { icon: "UsergroupAddOutlined", text: "Inclusive workplace culture with mentorship from senior leaders" },
      { icon: "TrophyOutlined", text: "Recognition programmes and awards for excellence" }
    ]
  }
};

const Careers = () => {
  const [content, setContent] = useState<CareerContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  useEffect(() => {
    if (location.hash && !loading) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.hash, loading]);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('careers');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          intro: { ...defaultContent.intro, ...(pc.intro || {}) },
          culture: { ...defaultContent.culture, ...(pc.culture || {}), icons: pc.culture?.icons || defaultContent.culture.icons },
          responsibilityBanner: { ...defaultContent.responsibilityBanner, ...(pc.responsibilityBanner || {}) },
          faqSection: { ...defaultContent.faqSection, ...(pc.faqSection || {}), faqs: pc.faqSection?.faqs || defaultContent.faqSection.faqs },
          jobOpenings: { ...defaultContent.jobOpenings, ...(pc.jobOpenings || {}) },
          whyWork: { ...defaultContent.whyWork, ...(pc.whyWork || {}), items: pc.whyWork?.items || defaultContent.whyWork.items }
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const gm = (p: string) => {
    if (!p) return '';
    if (p.startsWith('http')) return p;
    if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`;
    return p;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[78vh] flex items-center justify-start overflow-hidden mt-[150px]">
        <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          <LazyVideo
            src={gm(content.hero.media || '/careers.mp4')}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
          />
          
          {/* Gradient Overlay - Dark on left, transparent on right */}
          <div 
            className="absolute inset-0"
            style={{ 
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px',
              background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
            }} 
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '45px', background: '#38bdf8', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />
        
        <div className="relative z-10 w-full" style={{ paddingLeft: '180px' }}>
          <h1 className="text-[72px] text-white font-bold leading-tight">Careers</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '200px', paddingRight: '100px' }}>
          <h2 className="text-[72px] text-gray-900 leading-tight mb-4 font-bold">{content.intro.title}</h2>
          <div className="w-full h-[1px] bg-gray-300 my-8"></div>
          <p className="text-[22px] text-sky-900 leading-relaxed">{content.intro.description}</p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="w-full" style={{ paddingLeft: '200px', paddingRight: '100px' }}>
          <h2 className="text-[42px] text-sky-500 font-bold mb-6">{content.culture.title}</h2>
          <p className="text-[22px] text-gray-900 leading-relaxed mb-16">{content.culture.description}</p>
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-[2px] bg-sky-300" style={{ top: '48px' }}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(content.culture.icons || []).map((item, idx) => {
                const IconComponent = iconMap[item.icon] || RocketOutlined;
                return (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10">
                    <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center mb-6 relative">
                      <span className="absolute -top-3 -right-3 w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center text-lg font-bold">{idx + 1}</span>
                      <IconComponent style={{ fontSize: '40px', color: '#fff' }} />
                    </div>
                    <p className="text-[22px] text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Responsibility Banner */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '200px', paddingRight: '100px' }}>
          <h2 className="text-[42px] text-sky-500 font-bold">{content.responsibilityBanner.title}</h2>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="w-full" style={{ paddingLeft: '200px', paddingRight: '100px' }}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              {(content.faqSection.faqs || []).map((item, index) => (
                <div key={index} className="border-b border-gray-300">
                  <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-100 transition-colors px-4 rounded-lg">
                    <span className="text-[28px] text-gray-800 font-medium pr-8">{item.title}</span>
                    <span className="flex-shrink-0 text-sky-500">
                      {openFAQ === index ? <MinusOutlined style={{ fontSize: '20px' }} /> : <PlusOutlined style={{ fontSize: '20px' }} />}
                    </span>
                  </button>
                  {openFAQ === index && (
                    <div className="pb-6 px-4">
                      <p className="text-[24px] text-gray-600 leading-relaxed">{item.narration}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <motion.div className="rounded-lg overflow-hidden shadow-xl w-full" initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
                <LazyImage 
                  src={gm(content.faqSection.image)} 
                  alt="Careers" 
                  className="w-full h-auto"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Parallax */}
      <div className="relative h-screen flex items-center justify-center" style={{ backgroundImage: `url('${gm(content.jobOpenings.backgroundImage)}')`, backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-8">
          <h2 className="text-[72px] text-white font-bold mb-6">{content.jobOpenings.title}</h2>
          <p className="text-[36px] text-white font-bold max-w-4xl mx-auto">{content.jobOpenings.description}</p>
        </div>
      </div>

      {/* Why Work Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="w-full" style={{ paddingLeft: '200px', paddingRight: '100px' }}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <motion.div className="rounded-lg overflow-hidden shadow-xl w-full" initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
                <LazyImage 
                  src={gm(content.whyWork.image)} 
                  alt="Why work at Trident" 
                  className="w-full h-auto"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </div>
            <div>
              <h2 className="text-[56px] text-sky-500 font-bold mb-8">{content.whyWork.title}</h2>
              <div className="space-y-6">
                {(content.whyWork.items || []).map((item, idx) => {
                  const IconComponent = iconMap[item.icon] || TrophyOutlined;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <IconComponent style={{ fontSize: '28px', color: '#38bdf8' }} />
                      <p className="text-[22px] text-gray-700 leading-relaxed">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <div className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Careers;
