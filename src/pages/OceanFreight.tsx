// D:/Trident Log/Trident-FE/src/pages/OceanFreight.tsx

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
    hero: { media: '/service_hero.webp' },
    segments: []
};

// ============================================================
// Helper Functions (From ChatGPT)
// ============================================================
const decodeFragment = (hash: string): string => {
    const fragment = hash.startsWith('#') ? hash.slice(1) : hash;
    try {
        return decodeURIComponent(fragment);
    } catch {
        return fragment;
    }
};

const getSegmentId = (card: any): string => {
    const link = typeof card?.link === 'string' ? card.link.trim() : '';
    const hashIndex = link.indexOf('#');

    if (hashIndex !== -1) {
        const fragment = decodeFragment(link.slice(hashIndex));
        if (fragment) return fragment;
    }

    const title = typeof card?.title === 'string' ? card.title : '';
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return slug || 'service-section';
};

// ============================================================
// Component
// ============================================================
const OceanFreight = () => {
    const [content, setContent] = useState<OceanFreightContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const location = useLocation();

    // 1. Data Loading Effect
    useEffect(() => {
        let active = true;

        const loadContent = async () => {
            setLoading(true);
            setLoadError(null);

            try {
                const response = await contentAPI.getPage('ocean-freight');

                if (!response?.success || !response?.page) {
                    throw new Error('The Ocean Freight API returned no valid page.');
                }

                const page = response.page;
                const sections = Array.isArray(page.sections) ? page.sections : [];
                const segmentsSection = sections.find((s: any) => s.section_key === 'segments');

                if (!segmentsSection || !Array.isArray(segmentsSection.cards)) {
                    throw new Error('The segments section does not contain a valid cards array.');
                }

                const segments: SegmentCard[] = segmentsSection.cards
                    .filter((card: any) => card && !card.hidden)
                    .map((card: any) => ({
                        id: getSegmentId(card), // Using ChatGPT's robust ID parser
                        title: card.title || '',
                        subtitle: card.description || '',
                        image: card.image || '',
                        imageLeft: card.reverse || false,
                        points: card.points || [],
                        processLabel: card.process_label || undefined,
                        process: card.process || undefined,
                        hidden: card.hidden || false,
                    }));

                if (!active) return;

                setContent({
                    isActive: page.is_active ?? defaultContent.isActive,
                    hero: { media: page.hero?.media || defaultContent.hero.media },
                    segments: segments,
                });

                // DEBUGGING TOOL: This will print the exact IDs to your browser console!
                if (import.meta.env.DEV) {
                    console.table(
                        segments.map((segment: any) => ({
                            Title: segment.title,
                            Generated_ID: segment.id,
                        }))
                    );
                }
            } catch (error: any) {
                console.error('Failed to load Ocean Freight content:', error);
                if (active) {
                    setContent({ ...defaultContent, segments: [] });
                    setLoadError(error.message || 'Ocean Freight content could not be loaded.');
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadContent();
        return () => { active = false; };
    }, []);

    // 2. Scrolling Effect (Retry Loop to handle layout shifts)
    useEffect(() => {
        if (loading || loadError || !location.hash || content.segments.length === 0) return;

        const targetId = decodeFragment(location.hash);
        let attempts = 0;
        const maxAttempts = 15; // Keep trying for 1.5 seconds (15 * 100ms)

        const scrollToElement = () => {
            const element = document.getElementById(targetId);
            
            if (element) {
                // Calculate position and subtract 100px for the fixed Navbar
                const yOffset = -100; 
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                // Scroll smoothly
                window.scrollTo({ top: y, behavior: 'smooth' });

                // If layout shifted because an image loaded, try again
                if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(scrollToElement, 100);
                }
            } else if (attempts < maxAttempts) {
                // If the element hasn't rendered yet, wait and try again
                attempts++;
                setTimeout(scrollToElement, 100);
            }
        };

        // Start the scroll sequence
        const timer = setTimeout(scrollToElement, 200);
        
        return () => clearTimeout(timer);
    }, [location.hash, loading, loadError, content.segments]);

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
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[78vh] flex items-center justify-start overflow-hidden mt-16 md:mt-[150px]">
                <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                    <LazyImage
                        src={getMediaUrl(content.hero.media || '/service_hero.webp')}
                        alt="Services Hero"
                        className="absolute inset-0 w-full h-full"
                        style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectFit: 'cover' }}
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
                <div className="relative z-10 w-full px-5 sm:px-8 md:pl-[180px] md:pr-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-white font-bold leading-tight">
                        Services
                    </h1>
                </div>
            </section>

            {/* Error / Empty State Handling */}
            {loadError ? (
                <section className="py-16 md:py-24 px-5 sm:px-8 text-center">
                    <p className="text-red-600 text-base sm:text-lg font-semibold" role="alert">
                        {loadError}
                    </p>
                </section>
            ) : content.segments.length === 0 ? (
                <section className="py-16 md:py-24 px-5 sm:px-8 text-center">
                    <p className="text-gray-500 text-base sm:text-lg">No services found. Please add content from the admin panel.</p>
                </section>
            ) : null}

            {/* Dynamic Segments */}
            {!loadError && content.segments.map((segment, index) => {
                const isLeft = segment.imageLeft;
                return (
                    <section
                        key={segment.id || `${segment.title}-${index}`}
                        id={segment.id}
                        className={`py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 scroll-mt-28 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <div className="w-full">
                            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

                                {!isLeft && (
                                    <div className="order-2 md:order-1">
                                        <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-gray-900 leading-tight mb-3 md:mb-4 font-light" initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                                            {segment.title}
                                        </motion.h2>
                                        {segment.subtitle && (
                                            <motion.p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#4c6860] leading-tight mb-4 md:mb-6 font-bold" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}>
                                                {segment.subtitle}
                                            </motion.p>
                                        )}
                                        <motion.div className="w-16 h-0.5 bg-[#4c6860] mb-5 md:mb-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }} />
                                        {segment.processLabel && <motion.p className="text-base sm:text-lg text-gray-900 font-semibold mb-3 md:mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}>{segment.processLabel}</motion.p>}
                                        {segment.process && <motion.p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-3 md:mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}>{segment.process}</motion.p>}
                                        {segment.points.length > 0 && (
                                            <motion.ol className="space-y-3 md:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed list-decimal list-inside" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}>
                                                {segment.points.map((point, pIdx) => <li key={pIdx}>{point}</li>)}
                                            </motion.ol>
                                        )}
                                    </div>
                                )}

                                <div className={`flex items-center justify-center ${!isLeft ? 'order-1 md:order-2' : ''}`}>
                                    <div className="rounded-lg overflow-hidden shadow-xl w-full border-4 border-[#4c6860] p-2">
                                        {/* Added bg-white to fill empty space and changed objectFit to 'contain' */}
                                        <div className="w-full aspect-[4/3] relative bg-white flex items-center justify-center">
                                            <LazyImage 
                                                src={getMediaUrl(segment.image)} 
                                                alt={segment.title} 
                                                className="w-full h-full rounded-lg absolute inset-0" 
                                                style={{ objectFit: 'contain' }} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {isLeft && (
                                    <div className="order-2 md:order-2">
                                        <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-gray-900 leading-tight mb-3 md:mb-4 font-light" initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                                            {segment.title}
                                        </motion.h2>
                                        {segment.subtitle && (
                                            <motion.p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#4c6860] leading-tight mb-4 md:mb-6 font-bold" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}>
                                                {segment.subtitle}
                                            </motion.p>
                                        )}
                                        <motion.div className="w-16 h-0.5 bg-[#4c6860] mb-5 md:mb-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }} />
                                        {segment.processLabel && <motion.p className="text-base sm:text-lg text-gray-900 font-semibold mb-3 md:mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}>{segment.processLabel}</motion.p>}
                                        {segment.process && <motion.p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-3 md:mb-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}>{segment.process}</motion.p>}
                                        {segment.points.length > 0 && (
                                            <motion.ol className="space-y-3 md:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed list-decimal list-inside" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}>
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

            <div className="bg-gray-900"><div className="w-full h-px bg-gray-700"></div></div>
            <div className="bg-gray-900 text-white py-6 text-center px-4"><p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p></div>
            <div className="bg-gray-900"><div className="w-full h-px bg-gray-600"></div></div>
            <div className="bg-gray-900 text-gray-500 py-4 text-center px-4"><p className="text-xs">Powered by - ARK PANORAMA LAB</p></div>
        </div>
    );
};

export default OceanFreight;
