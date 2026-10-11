//D:/Trident Log/Trident-FE/src/pages/OceanFreight.tsx

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../../src/pages/Footer';
import { motion } from 'framer-motion';
import LazyVideo from '../pages/LazyVideo';
import LazyImage from '../pages/LazyImage';
import { getMediaUrl } from '../utils/urlHelper';

// ============================================================
// Types
// ============================================================
interface SegmentCard {
    id?: string;
    title: string;
    subtitle: string;
    image: string;
    imageLeft: boolean;
    points: string[];
    processLabel?: string;
    process?: string;
    hidden?: boolean;
}

interface OceanFreightContent {
    isActive: boolean;
    hero: { media?: string };
    segments: SegmentCard[];
}

const defaultContent: OceanFreightContent = {
    isActive: true,
    hero: { media: '/ocean_freight.mp4' },
    segments: []
};

// ============================================================
// Component
// ============================================================
const OceanFreight = () => {
    const [content, setContent] = useState<OceanFreightContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        loadContent();
    }, []);

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
            const response = await contentAPI.getPage('ocean-freight');

            if (response.success && response.page) {
                const page = response.page;

                // Extract hero
                const hero = {
                    media: page.hero?.media || defaultContent.hero.media,
                };

                // Extract segments from sections array
                const segmentsSection = page.sections?.find(
                    (s: any) => s.section_key === 'segments'
                );

                // Map cards to SegmentCard format
                const segments: SegmentCard[] = (segmentsSection?.cards || []).map((card: any) => ({
                    id: card.link?.includes('#') ? card.link.split('#')[1] : undefined,
                    title: card.title || '',
                    subtitle: card.description || '',
                    image: card.image || '',
                    imageLeft: card.reverse || false,
                    points: card.points || [],
                    processLabel: card.process_label || undefined,
                    process: card.process || undefined,
                    hidden: card.hidden || false,
                }));

                // If segments section has points at section level, add them to first card or create general
                if (segmentsSection?.points && segmentsSection.points.length > 0 && segments.length === 0) {
                    // If no cards but section has points, create a single segment
                    segments.push({
                        title: segmentsSection.title || 'Services',
                        subtitle: segmentsSection.subtitle || '',
                        image: segmentsSection.image || '',
                        imageLeft: segmentsSection.image_left || false,
                        points: segmentsSection.points || [],
                        processLabel: segmentsSection.process_label || undefined,
                        process: segmentsSection.process || undefined,
                    });
                }

                setContent({
                    isActive: page.is_active ?? defaultContent.isActive,
                    hero,
                    segments: segments.filter((s: SegmentCard) => !s.hidden),
                });
            }
        } catch (err) {
            console.error('Failed to load ocean-freight content:', err);
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Render
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4c6860]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ fontFamily: 'Verdana, sans-serif' }}>
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[78vh] flex items-center justify-start overflow-hidden mt-[150px]">
                <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                    <LazyVideo
                        src={getMediaUrl(content.hero.media || '/ocean_freight.mp4')}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            borderBottomRightRadius: '60px',
                            borderBottomLeftRadius: '60px',
                            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
                        }}
                    />
                </div>
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{ height: '45px', background: '#4c6860', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />
                <div className="relative z-10 w-full" style={{ paddingLeft: '180px' }}>
                    <h1 className="text-[72px] text-white font-bold leading-tight">Services</h1>
                </div>
            </section>

            {/* Dynamic Segments */}
            {content.segments.length === 0 && (
                <section className="py-24 px-8 text-center">
                    <p className="text-gray-500 text-lg">No services found. Please add content from the admin panel.</p>
                </section>
            )}

            {content.segments.map((segment, index) => {
                const isLeft = segment.imageLeft;
                return (
                    <section
                        key={index}
                        id={segment.id || undefined}
                        className={`py-24 px-8 md:px-16 lg:px-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <div className="w-full" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                {/* Text on left, Image on right */}
                                {!isLeft && (
                                    <div>
                                        <motion.h2
                                            className="text-[42px] text-gray-900 leading-tight mb-4 font-light"
                                            initial={{ opacity: 0, x: -300 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                        >
                                            {segment.title}
                                        </motion.h2>
                                        {segment.subtitle && (
                                            <motion.p
                                                className="text-[28px] text-[#4c6860] leading-tight mb-6 font-bold"
                                                initial={{ opacity: 0, y: 80 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                                            >
                                                {segment.subtitle}
                                            </motion.p>
                                        )}
                                        <motion.div
                                            className="w-16 h-0.5 bg-[#4c6860] mb-8"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                                        />
                                        {segment.processLabel && (
                                            <motion.p
                                                className="text-lg text-gray-900 font-semibold mb-4"
                                                initial={{ opacity: 0, y: 60 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                                            >
                                                {segment.processLabel}
                                            </motion.p>
                                        )}
                                        {segment.process && (
                                            <motion.p
                                                className="text-lg text-gray-600 leading-relaxed mb-4"
                                                initial={{ opacity: 0, y: 60 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
                                            >
                                                {segment.process}
                                            </motion.p>
                                        )}
                                        {segment.points.length > 0 && (
                                            <motion.ol
                                                className="space-y-4 text-lg text-gray-600 leading-relaxed list-decimal list-inside"
                                                initial={{ opacity: 0, y: 60 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                                            >
                                                {segment.points.map((point, pIdx) => (
                                                    <li key={pIdx}>{point}</li>
                                                ))}
                                            </motion.ol>
                                        )}
                                    </div>
                                )}

                                {/* Image */}
                                <div className="flex items-center justify-center">
                                    <div className="rounded-lg overflow-hidden shadow-xl w-full">
                                        <LazyImage
                                            src={getMediaUrl(segment.image)}
                                            alt={segment.title}
                                            className="w-full h-auto"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>

                                {/* Image on left, Text on right */}
                                {isLeft && (
                                    <div>
                                        <motion.h2
                                            className="text-[42px] text-gray-900 leading-tight mb-4 font-light"
                                            initial={{ opacity: 0, x: 300 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                        >
                                            {segment.title}
                                        </motion.h2>
                                        {segment.subtitle && (
                                            <motion.p
                                                className="text-[28px] text-[#4c6860] leading-tight mb-6 font-bold"
                                                initial={{ opacity: 0, y: 80 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                                            >
                                                {segment.subtitle}
                                            </motion.p>
                                        )}
                                        <motion.div
                                            className="w-16 h-0.5 bg-[#4c6860] mb-8"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-100px' }}
                                            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                                        />
                                        {segment.processLabel && (
                                            <motion.p
                                                className="text-lg text-gray-900 font-semibold mb-4"
                                                initial={{ opacity: 0, y: 60 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                                            >
                                                {segment.processLabel}
                                            </motion.p>
                                        )}
                                        {segment.process && (
                                            <motion.p
                                                className="text-lg text-gray-600 leading-relaxed mb-4"
                                                initial={{ opacity: 0, y: 60 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
                                            >
                                                {segment.process}
                                            </motion.p>
                                        )}
                                        {segment.points.length > 0 && (
                                            <motion.ol
                                                className="space-y-4 text-lg text-gray-600 leading-relaxed list-decimal list-inside"
                                                initial={{ opacity: 0, y: 60 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-100px' }}
                                                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                                            >
                                                {segment.points.map((point, pIdx) => (
                                                    <li key={pIdx}>{point}</li>
                                                ))}
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
            
            {/* Horizontal Divider */}
            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-700"></div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-900 text-white py-6 text-center">
              <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
            </div>

            {/* Horizontal Divider */}
            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-600"></div>
            </div>

            {/* Powered By */}
            <div className="bg-gray-900 text-gray-500 py-4 text-center">
              <p className="text-xs">Powered by - ARK PANORAMA LAB</p>
            </div>
        </div>
    );
};

export default OceanFreight;
