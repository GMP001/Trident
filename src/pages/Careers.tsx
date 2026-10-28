// D:/Trident Log/Trident-FE/src/pages/Careers.tsx

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
import { getMediaUrl } from '../utils/urlHelper';

// ============================================================
// Icon mapping
// ============================================================
const iconMap: Record<string, any> = {
    RocketOutlined, BulbOutlined, ArrowUpOutlined, TeamOutlined,
    DollarOutlined, RiseOutlined, GlobalOutlined, CarOutlined,
    UsergroupAddOutlined, TrophyOutlined
};

// ============================================================
// Types
// ============================================================
interface CareerFAQ {
    title: string;
    narration: string;
}

interface CareerIcon {
    icon: string;
    text: string;
}

interface CareerContent {
    isActive: boolean;
    hero: { media?: string };
    intro: { title: string; description: string };
    culture: { title: string; description: string; icons: CareerIcon[] };
    responsibilityBanner: { title: string };
    faqSection: { image: string; faqs: CareerFAQ[] };
    jobOpenings: { backgroundImage: string; title: string; description: string };
    whyWork: { title: string; image: string; items: CareerIcon[] };
}

// ============================================================
// Default content (fallback) — unchanged
// ============================================================
const defaultContent: CareerContent = {
    isActive: true,
    hero: { media: '/careers_hero.jpg' },
    intro: {
        title: 'Be Part of the Global Trade Journey.',
        description: "At Trident Global Logistics Limited, we do more than deliver cargo — we create opportunities. We're building a workplace where driven professionals can accelerate their careers, expand their global perspective, and make a meaningful impact in the fast-evolving world of logistics."
    },
    culture: {
        title: 'Our Culture',
        description: "We know exceptional logistics starts with exceptional people. That's why we foster continuous learning, recognize performance, and empower every team member to grow, contribute, and succeed.",
        icons: [
            { icon: 'RocketOutlined', text: 'Career growth in a global industry' },
            { icon: 'BulbOutlined', text: 'Learning from the best hands-on training with SOPs, CRM tools, and carrier systems' },
            { icon: 'ArrowUpOutlined', text: 'Performance-driven bonuses and leadership tracks' },
            { icon: 'TeamOutlined', text: 'Teamwork, accountability, and transparent communication' }
        ]
    },
    responsibilityBanner: { title: 'Your Goods, Our Responsibility – Flawless Logistics' },
    faqSection: {
        image: '/career_3.jpg',
        faqs: [
            { title: 'Customs Brokerage', narration: 'Customs brokers facilitate the clearance of goods through customs checkpoints, ensuring compliance with import and export regulations.' },
            { title: 'Last-Mile Delivery', narration: 'Last-mile delivery focuses on the final leg of the supply chain, delivering products from distribution centers to the end customers\' doorsteps.' },
            { title: 'Reverse Logistics', narration: 'Reverse logistics involves managing the return of products from customers to the manufacturer or retailer.' }
        ]
    },
    jobOpenings: {
        backgroundImage: '/careers_4.jpg',
        title: 'Current Job Openings',
        description: 'Browse open roles across departments: Sales Coordinator - Freight Solutions (Mid-Level)'
    },
    whyWork: {
        title: 'Why work at Trident?',
        image: '/careers_05.jpg',
        items: [
            { icon: 'DollarOutlined', text: 'Competitive salary with performance bonuses' },
            { icon: 'RiseOutlined', text: 'Rapid promotion path for high performers' },
            { icon: 'GlobalOutlined', text: 'Exposure to international agents, clients, and systems' },
            { icon: 'CarOutlined', text: '360° training in all freight modes: Air, Sea, Road' },
            { icon: 'UsergroupAddOutlined', text: 'Inclusive workplace culture with mentorship from senior leaders' },
            { icon: 'TrophyOutlined', text: 'Recognition programmes and awards for excellence' }
        ]
    }
};

// ============================================================
// Helper
// ============================================================
const findSection = (sections: any[], key: string) => {
    return sections?.find((s: any) => s.section_key === key) || null;
};

// ============================================================
// Component
// ============================================================
const Careers = () => {
    const [content, setContent] = useState<CareerContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
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
            const response = await contentAPI.getPage('careers');

            if (response.success && response.page) {
                const page = response.page;
                const sections = page.sections || [];

                const introSection = findSection(sections, 'intro');
                const intro = {
                    title: introSection?.title || defaultContent.intro.title,
                    description: introSection?.description || defaultContent.intro.description,
                };

                const cultureSection = findSection(sections, 'culture');
                const cultureIcons: CareerIcon[] = (cultureSection?.icons || []).map((icon: any) => ({
                    icon: icon.icon || 'RocketOutlined',
                    text: icon.text || '',
                }));
                const culture = {
                    title: cultureSection?.title || defaultContent.culture.title,
                    description: cultureSection?.description || defaultContent.culture.description,
                    icons: cultureIcons.length > 0 ? cultureIcons : defaultContent.culture.icons,
                };

                const responsibilitySection = findSection(sections, 'responsibilityBanner');
                const responsibilityBanner = {
                    title: responsibilitySection?.title || defaultContent.responsibilityBanner.title,
                };

                const faqSectionData = findSection(sections, 'faqSection');
                const faqs: CareerFAQ[] = (faqSectionData?.faqs || []).map((faq: any) => ({
                    title: faq.title || faq.question || '',
                    narration: faq.narration || faq.answer || '',
                }));
                const faqSection = {
                    image: faqSectionData?.image || defaultContent.faqSection.image,
                    faqs: faqs.length > 0 ? faqs : defaultContent.faqSection.faqs,
                };

                const jobSection = findSection(sections, 'jobOpenings');
                const jobOpenings = {
                    backgroundImage: jobSection?.background_image || defaultContent.jobOpenings.backgroundImage,
                    title: jobSection?.title || defaultContent.jobOpenings.title,
                    description: jobSection?.description || defaultContent.jobOpenings.description,
                };

                const whyWorkSection = findSection(sections, 'whyWork');
                const whyWorkItems: CareerIcon[] = (whyWorkSection?.icons || []).map((icon: any) => ({
                    icon: icon.icon || 'TrophyOutlined',
                    text: icon.text || '',
                }));
                const whyWork = {
                    title: whyWorkSection?.title || defaultContent.whyWork.title,
                    image: whyWorkSection?.image || defaultContent.whyWork.image,
                    items: whyWorkItems.length > 0 ? whyWorkItems : defaultContent.whyWork.items,
                };

                setContent({
                    isActive: page.is_active ?? defaultContent.isActive,
                    hero: { media: page.hero?.media || defaultContent.hero.media },
                    intro,
                    culture,
                    responsibilityBanner,
                    faqSection,
                    jobOpenings,
                    whyWork,
                });
            }
        } catch (err) {
            console.error('Error loading careers content:', err);
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Loading State
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4c6860]"></div>
            </div>
        );
    }

    // ============================================================
    // Render
    // ============================================================
    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ fontFamily: 'Verdana, sans-serif' }}>
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[78vh] flex items-center justify-start overflow-hidden mt-16 md:mt-[150px]">
                <div className="absolute inset-0 overflow-hidden bg-black" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                    {content.hero.media?.endsWith('.mp4') || content.hero.media?.endsWith('.webm') ? (
                        <LazyVideo
                            src={getMediaUrl(content.hero.media)}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                        />
                    ) : (
                        <img
                            src={getMediaUrl(content.hero.media || '/careers_hero.jpg')}
                            alt="Careers Hero"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
                        />
                    )}
                    <div className="absolute inset-0"
                        style={{
                            borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px',
                            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
                        }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{ height: '45px', background: '#4c6860', borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', zIndex: 5 }} />
                <div className="relative z-10 w-full px-5 sm:px-8 md:pl-[180px] md:pr-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-white font-bold leading-tight">
                        Careers
                    </h1>
                </div>
            </section>

            {/* Intro */}
            <section className="py-10 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-gray-900 leading-tight mb-3 md:mb-4 font-bold">
                        {content.intro.title}
                    </h2>
                    <div className="w-full h-[1px] bg-gray-300 my-6 md:my-8"></div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#4c6860] leading-relaxed">
                        {content.intro.description}
                    </p>
                </div>
            </section>

            {/* Culture */}
            <section className="py-10 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-gray-50">
                <div className="w-full">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-[#4c6860] font-bold mb-4 md:mb-6">
                        {content.culture.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-900 leading-relaxed mb-10 md:mb-16">
                        {content.culture.description}
                    </p>
                    <div className="relative">
                        <div className="hidden lg:block absolute top-12 left-0 right-0 h-[2px] bg-[#4c6860]/40" style={{ top: '48px' }}></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {content.culture.icons.map((item, idx) => {
                                const IconComponent = iconMap[item.icon] || RocketOutlined;
                                return (
                                    <div key={idx} className="flex flex-col items-center text-center relative z-10">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#4c6860] rounded-full flex items-center justify-center mb-5 md:mb-6 relative">
                                            <span className="absolute -top-3 -right-3 w-8 h-8 bg-[#006666] text-white rounded-full flex items-center justify-center text-lg font-bold">
                                                {idx + 1}
                                            </span>
                                            <IconComponent style={{ fontSize: '36px', color: '#fff' }} />
                                        </div>
                                        <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-700 leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Responsibility Banner */}
            <section className="py-10 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-[#4c6860] font-bold">
                        {content.responsibilityBanner.title}
                    </h2>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-10 md:py-16 px-5 sm:px-8 md:px-12 lg:px-24 bg-gray-50">
                <div className="w-full">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                        <div>
                            {content.faqSection.faqs.map((item, index) => (
                                <div key={index} className="border-b border-gray-300">
                                    <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                        className="w-full flex items-center justify-between py-5 md:py-6 text-left hover:bg-gray-100 transition-colors px-3 md:px-4 rounded-lg">
                                        <span className="text-lg sm:text-xl md:text-2xl lg:text-[28px] text-gray-800 font-medium pr-4 md:pr-8">
                                            {item.title}
                                        </span>
                                        <span className="flex-shrink-0 text-[#4c6860]">
                                            {openFAQ === index ? <MinusOutlined style={{ fontSize: '20px' }} /> : <PlusOutlined style={{ fontSize: '20px' }} />}
                                        </span>
                                    </button>
                                    {openFAQ === index && (
                                        <div className="pb-5 md:pb-6 px-3 md:px-4">
                                            <p className="text-base sm:text-lg md:text-xl lg:text-[24px] text-gray-600 leading-relaxed">
                                                {item.narration}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            {/* Added border-4 and p-2 here */}
                            <motion.div className="rounded-lg overflow-hidden shadow-xl w-full border-4 border-[#4c6860] p-2"
                                initial={{ opacity: 0, x: 300 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                                {/* Added rounded-md to smooth the inner image corners */}
                                <LazyImage src={getMediaUrl(content.faqSection.image)} alt="Careers" className="w-full h-auto rounded-md" style={{ objectFit: 'cover' }} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Openings Parallax — bg-fixed only on md+ to avoid iOS bug */}
            <div
                className="relative h-[60vh] md:h-screen flex items-center justify-center bg-scroll md:bg-fixed bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url('${getMediaUrl(content.jobOpenings.backgroundImage)}')` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-5 sm:px-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-white font-bold mb-4 md:mb-6">
                        {content.jobOpenings.title}
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-[36px] text-white font-bold max-w-4xl mx-auto leading-snug">
                        {content.jobOpenings.description}
                    </p>
                </div>
            </div>

            {/* Why Work */}
            <section className="py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div className="flex items-center justify-center order-2 md:order-1">
                            {/* Added border-4 and p-2 here */}
                            <motion.div className="rounded-lg overflow-hidden shadow-xl w-full border-4 border-[#4c6860] p-2"
                                initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                                {/* Added rounded-md to smooth the inner image corners */}
                                <LazyImage src={getMediaUrl(content.whyWork.image)} alt="Why work at Trident" className="w-full h-auto rounded-md" style={{ objectFit: 'cover' }} />
                            </motion.div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] text-[#4c6860] font-bold mb-6 md:mb-8">
                                {content.whyWork.title}
                            </h2>
                            <div className="space-y-4 md:space-y-6">
                                {content.whyWork.items.map((item, idx) => {
                                    const IconComponent = iconMap[item.icon] || TrophyOutlined;
                                    return (
                                        <div key={idx} className="flex items-start gap-3 md:gap-4">
                                            <IconComponent style={{ fontSize: '24px', color: '#4c6860', marginTop: '4px', flexShrink: 0 }} />
                                            <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-gray-700 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-700"></div>
            </div>

            <div className="bg-gray-900 text-white py-6 text-center px-4">
              <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
            </div>

            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-600"></div>
            </div>

            <div className="bg-gray-900 text-gray-500 py-4 text-center px-4">
              <p className="text-xs">Powered by - ARK PANORAMA LAB</p>
            </div>
        </div>
    );
};

export default Careers;
