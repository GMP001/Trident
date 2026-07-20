import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../../src/pages/Footer';
import { motion } from 'framer-motion';
import LazyVideo from '../pages/LazyVideo';
import LazyImage from '../pages/LazyImage';

interface Segment {
  id?: string;
  title: string;
  subtitle: string;
  image: string;
  imageLeft: boolean;
  points: string[];
  processLabel?: string;
  process?: string;
}

interface OceanFreightContent {
  isActive: boolean;
  hero: { media?: string; };
  segments: Segment[];
}

const defaultContent: OceanFreightContent = {
  isActive: true,
  hero: { media: "/ocean_freight.mp4" },
  segments: []
};

const OceanFreight = () => {
  const [content, setContent] = useState<OceanFreightContent>(defaultContent);
  const [loading, setLoading] = useState(true);
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
      const pc = await contentAPI.getPage('ocean-freight');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          segments: pc.segments || defaultContent.segments
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const gm = (p: string) => { if (!p) return ''; if (p.startsWith('http')) return p; if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`; return p; };
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[78vh] flex items-center justify-start overflow-hidden mt-[150px]">
        <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          <LazyVideo
            src={gm(content.hero.media || '/ocean_freight.mp4')}
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
          <h1 className="text-[72px] text-white font-bold leading-tight">Services</h1>
        </div>
      </section>

      {/* Dynamic Segments */}
      {content.segments.map((segment, index) => {
        const isLeft = segment.imageLeft;
        return (
          <section key={index} id={segment.id || undefined} className={`py-24 px-8 md:px-16 lg:px-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {!isLeft && (
                  <div>
                    <motion.h2 className="text-[72px] text-gray-900 leading-tight mb-4 font-light" initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>{segment.title}</motion.h2>
                    {segment.subtitle && (
                      <motion.p className="text-[42px] text-sky-500 leading-tight mb-6 font-bold" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>{segment.subtitle}</motion.p>
                    )}
                    <motion.div className="w-16 h-0.5 bg-blue-500 mb-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}></motion.div>
                    {segment.processLabel && <motion.p className="text-lg text-gray-900 font-semibold mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}>{segment.processLabel}</motion.p>}
                    {segment.process && <motion.p className="text-lg text-gray-600 leading-relaxed mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}>{segment.process}</motion.p>}
                    {segment.points.length > 0 && (
                      <motion.ol className="space-y-4 text-lg text-gray-600 leading-relaxed list-decimal list-inside" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}>
                        {segment.points.map((point, pIdx) => <li key={pIdx}>{point}</li>)}
                      </motion.ol>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-center">
                  <div className="rounded-lg overflow-hidden shadow-xl w-full">
                    <LazyImage 
                      src={gm(segment.image)} 
                      alt={segment.title} 
                      className="w-full h-auto"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                {isLeft && (
                  <div>
                    <motion.h2 className="text-[72px] text-gray-900 leading-tight mb-4 font-light" initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>{segment.title}</motion.h2>
                    {segment.subtitle && (
                      <motion.p className="text-[42px] text-sky-500 leading-tight mb-6 font-bold" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>{segment.subtitle}</motion.p>
                    )}
                    <motion.div className="w-16 h-0.5 bg-blue-500 mb-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}></motion.div>
                    {segment.processLabel && <motion.p className="text-lg text-gray-900 font-semibold mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}>{segment.processLabel}</motion.p>}
                    {segment.process && <motion.p className="text-lg text-gray-600 leading-relaxed mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}>{segment.process}</motion.p>}
                    {segment.points.length > 0 && (
                      <motion.ol className="space-y-4 text-lg text-gray-600 leading-relaxed list-decimal list-inside" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}>
                        {segment.points.map((point, pIdx) => <li key={pIdx}>{point}</li>)}
                      </motion.ol>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
      <div className="bg-gray-900 text-white py-6 text-center"><p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p></div>
    </div>
  );
};

export default OceanFreight;