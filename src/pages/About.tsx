// D:/Trident Log/Trident-FE/src/pages/About.tsx

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../../src/pages/Footer';
import { contentAPI } from '../services/api';
import {
  SmileOutlined,
  TeamOutlined,
  HeartOutlined,
  UserOutlined,
  EyeOutlined
} from '@ant-design/icons';
import LazyVideo from '../pages/LazyVideo';
import LazyImage from '../pages/LazyImage';
import { getMediaUrl } from '../utils/urlHelper';

// ============================================================
// Types
// ============================================================
interface Leader {
    name: string;
    title: string;
    description: string;
    image: string;
    gradient: string;
    reverse: boolean;
}

interface Value {
    title: string;
    description: string;
    image: string;
}

interface AboutContent {
    isActive: boolean;
    hero: { media?: string };
    purpose: { heading: string; subtitle: string; text: string; image?: string };
    vision: { title: string; description: string; visionStatement?: string; missionStatement?: string };
    values: Value[];
    leadership: { title: string; description: string; leaders: Leader[] };
    sustainability: { title: string; description: string; image: string };
    offices: {
        title: string;
        description: string;
        companyName: string;
        address: string[];
        phone: string;
        email: string;
        mapUrl: string;
    };
}

// ============================================================
// Default content (fallback) — unchanged
// ============================================================
const defaultContent: AboutContent = {
    isActive: true,
    hero: { media: '/About_US_Latest.mp4' },
    purpose: {
        heading: 'Who We Are',
        subtitle: 'We connect origins and destinations, and We Deliver Commitments',
        text: "Trident Logistics is one of the most trusted freight forwarding companies managed by 30+ years of experience local market experts, founded in 2025 with a mission to simplify global logistics through accountability, innovation, and spontinious client support.\n\nFrom air and sea freight to warehousing, road transport, and customs clearance, Trident operates as a full-service logistics partner trusted by over 100 clients, connected to 200+ global agents worldwide.\n\nOur headquarters in Dhaka serve as the nerve centre for a highly coordinated, SOP-driven operation that manages time-sensitive shipments with local agility and global precision.",
        image: '/corporate_leaders_in_serious_mood.jpg'
    },
    vision: {
        title: "Our mission and vision are to become the Global Integrator",
        description: "Increasing complexity in global pure forwarding and supply chains is making them inefficient, vulnerable and unsustainable. At Trident, our strategic mission and vision are to become the Global Integrator, offering truly integrated logistics solutions that connect, protect and simplify our customers' any demand like forwarding and supply chains.",
        visionStatement: "To create leadership in people and systems that deliver supreme solutions in global freight transport – setting the standard in reliability, speed, and compliance.",
        missionStatement: "To serve clients with passion, precision, and professionalism, ensuring every shipment is handled as if it were our own."
    },
    values: [
        { title: "Persistent Customer Experience", description: "We consistently exceed customer expectations through reliable service, proactive communication, continuous improvement, and long-term commitment to customer success.", image: "/About Us-3.jpg" },
        { title: "Humbleness", description: "We embrace humility by listening, learning, accepting feedback, valuing every contribution, and always striving to improve together.", image: "/About Us-4.jpg" },
        { title: "Mutual Respect", description: "We foster an inclusive workplace where everyone is treated with dignity, fairness, empathy, professionalism, and respect regardless of differences.", image: "/About Us-5.jpg" },
        { title: "Our Employees", description: "We empower our employees through trust, continuous learning, collaboration, recognition, and opportunities for personal and professional growth.", image: "/About Us-3.jpg" },
        { title: "Transparency", description: "We communicate openly, act with honesty, share information responsibly, and build lasting trust through accountability and ethical business practices.", image: "/About Us-4.jpg" }
    ],
    leadership: {
        title: "Our Leadership Team",
        description: "Our strategic vision to be the Global Integrator is anchored in Trident's Executive Leadership team and our Board of Directors. Meet the leaders who are setting our course for transformation.",
        leaders: [
            { name: "Raihan Haidar", title: "Chairman", description: "As Chairman, Raihan Haidar provides the strategic vision and leadership that guides the company's long-term growth.", image: "/raihan-haidar-2.jpg", gradient: "from-blue-100 to-blue-50", reverse: false },
            { name: "Md. Nazrul Islam", title: "Managing Director", description: "With over 30 years of experience in global shipping and logistics, Md. Nazrul Islam has built bridges between companies and governments across Asia and Europe.", image: "/md-nazrul-islam.jpg", gradient: "from-green-100 to-green-50", reverse: true },
            { name: "Asif Ahmed", title: "Director", description: "Asif Ahmed brings over 32 years of experience in global shipping and logistics, having held senior positions with leading organizations including CMA-CGM, P&O, and Maersk.", image: "/asif-ahmed-2.jpg", gradient: "from-purple-100 to-purple-50", reverse: false }
        ]
    },
    sustainability: {
        title: "We are committed to sustainable growth",
        description: "Our purpose serves as the foundation and compass guiding our work towards a world where global trade distributes economic and social benefits, without negatively impacting individuals, communities or the environment.",
        image: "/About Us-6.jpg"
    },
    offices: {
        title: "Our Offices",
        description: "We work all over the world as a forwarder. We collaborate closely with our international agent network. This guarantees the timely and trouble-free delivery of items to their intended final destination.",
        companyName: "Trident Global Logistics Limited",
        address: ["Le Meridien Hotel (Commercial Space)", "Level-06, 79/A, Airport Road", "Nikunja-2, Khilkhet", "Dhaka-1229, Bangladesh"],
        phone: "+8801755 605033 & +8801713244029",
        email: "nazrul.islam@tgllbd.com",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4265414691234!2d90.4066!3d23.8748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d05c9b2aab%3A0x6b7b7c5c5c5c5c5c!2sLe%20Meridien%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
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
const About = () => {
    const [content, setContent] = useState<AboutContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            setError(null);
            const response = await contentAPI.getPage('about');

            if (response.success && response.page) {
                const page = response.page;
                const sections = page.sections || [];

                const purposeSection = findSection(sections, 'purpose');
                const purpose = {
                    heading: purposeSection?.heading || defaultContent.purpose.heading,
                    subtitle: purposeSection?.subtitle || defaultContent.purpose.subtitle,
                    text: purposeSection?.description || defaultContent.purpose.text,
                    image: purposeSection?.image || defaultContent.purpose.image,
                };

                const visionSection = findSection(sections, 'vision');
                const vision = {
                    title: visionSection?.title || defaultContent.vision.title,
                    description: visionSection?.description || defaultContent.vision.description,
                    visionStatement: visionSection?.vision_statement || defaultContent.vision.visionStatement,
                    missionStatement: visionSection?.mission_statement || defaultContent.vision.missionStatement,
                };

                const valuesSection = findSection(sections, 'values');
                const valuesImage = valuesSection?.image || '/core_values.jpg';
                const values: Value[] = (valuesSection?.cards || []).map((card: any) => ({
                    title: card.title || '',
                    description: card.description || '',
                    image: valuesImage,
                }));
                if (values.length === 0) values.push(...defaultContent.values);

                const leadershipSection = findSection(sections, 'leadership');
                const leaders: Leader[] = (leadershipSection?.leaders || []).map((l: any) => ({
                    name: l.name || '',
                    title: l.title || '',
                    description: l.description || '',
                    image: l.image || '',
                    gradient: l.gradient || 'from-blue-100 to-blue-50',
                    reverse: l.reverse || false,
                }));
                if (leaders.length === 0) leaders.push(...defaultContent.leadership.leaders);

                const leadership = {
                    title: leadershipSection?.title || defaultContent.leadership.title,
                    description: leadershipSection?.description || defaultContent.leadership.description,
                    leaders,
                };

                const sustainabilitySection = findSection(sections, 'sustainability');
                const sustainability = {
                    title: sustainabilitySection?.title || defaultContent.sustainability.title,
                    description: sustainabilitySection?.description || defaultContent.sustainability.description,
                    image: sustainabilitySection?.image || defaultContent.sustainability.image,
                };

                const officesSection = findSection(sections, 'offices');
                const offices = {
                    title: officesSection?.title || defaultContent.offices.title,
                    description: officesSection?.description || defaultContent.offices.description,
                    companyName: officesSection?.company_name || defaultContent.offices.companyName,
                    address: officesSection?.address || defaultContent.offices.address,
                    phone: officesSection?.phone || defaultContent.offices.phone,
                    email: officesSection?.email || defaultContent.offices.email,
                    mapUrl: officesSection?.map_url || defaultContent.offices.mapUrl,
                };

                setContent({
                    isActive: page.is_active ?? defaultContent.isActive,
                    hero: { media: page.hero?.media || defaultContent.hero.media },
                    purpose,
                    vision,
                    values,
                    leadership,
                    sustainability,
                    offices,
                });
            }
        } catch (err) {
            console.error('Error loading about page:', err);
            setError('Failed to load content. Using default content.');
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // Loading
    // ============================================================
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
        );
    }

    const valueIcons = [
        <SmileOutlined style={{ fontSize: '36px', color: '#fff' }} />,
        <TeamOutlined style={{ fontSize: '36px', color: '#fff' }} />,
        <HeartOutlined style={{ fontSize: '36px', color: '#fff' }} />,
        <UserOutlined style={{ fontSize: '36px', color: '#fff' }} />,
        <EyeOutlined style={{ fontSize: '36px', color: '#fff' }} />,
    ];

    return (
        <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
            <Navbar />
            {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 fixed top-20 right-4 z-50 max-w-md shadow-lg">
                    <p className="text-yellow-700">{error}</p>
                </div>
            )}

            {/* Hero */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[78vh] flex items-center justify-start overflow-hidden mt-16 md:mt-[150px]">
                <div className="absolute inset-0 overflow-hidden" style={{ borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
                    <LazyVideo
                        src={getMediaUrl(content.hero.media || '/About_US_Latest.mp4')}
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
                <div className="relative z-10 w-full px-5 sm:px-8 md:pl-[180px] md:pr-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[72px] text-white font-bold leading-tight">
                        About Us
                    </h1>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                        <div>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] text-gray-900 leading-tight mb-2 font-light">
                                {content.purpose.heading}
                            </h2>
                            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] text-[#4c6860] leading-tight mb-4 font-light">
                                {content.purpose.subtitle}
                            </p>
                            <div className="w-24 md:w-36 h-0.5 bg-[#4c6860]"></div>
                        </div>
                        <div className="flex items-stretch">
                            <div className="rounded-lg overflow-hidden shadow-lg w-full">
                                <LazyImage
                                    src={getMediaUrl(content.purpose.image || '/corporate_leaders_in_serious_mood.jpg')}
                                    alt="Global Logistics"
                                    className="w-full h-full"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content.purpose.text.replace(/\n\n/g, '<br /><br />') }}>
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="relative py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-gray-50">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                    style={{ backgroundImage: `url(${getMediaUrl('/About Us-2.jpg')})` }}></div>
                <div className="relative z-10 w-full">
                    <div className="mb-10 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-tight mb-4 md:mb-6 font-light">
                            {content.vision.title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                            {content.vision.description}
                        </p>
                    </div>
                    <div className="mb-10 md:mb-12">
                        <h3 className="text-2xl sm:text-3xl md:text-[36px] text-[#4c6860] leading-tight mb-3 md:mb-4 font-bold">
                            Our Vision
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                            {content.vision.visionStatement}
                        </p>
                    </div>
                    <div className="mb-10 md:mb-12">
                        <h3 className="text-2xl sm:text-3xl md:text-[36px] text-[#4c6860] leading-tight mb-3 md:mb-4 font-bold">
                            Our Mission
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                            {content.vision.missionStatement}
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="relative py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                    style={{ backgroundImage: `url(${getMediaUrl('/core_values.jpg')})` }}></div>
                <div className="relative z-10 w-full">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#4c6860] mb-4 font-light">
                            Our values connect us and guide us
                        </h2>
                        <div className="w-20 h-0.5 bg-[#4c6860] mx-auto"></div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
                            Our values inspire us to do better in a constantly changing world, guiding our work every day.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-stretch">
                        <div className="space-y-8 flex flex-col justify-center">
                            {content.values.map((value, index) => (
                                <div key={index} className="flex items-start gap-4 md:gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-[#4c6860] rounded-full flex items-center justify-center group-hover:bg-[#006666] transition-colors">
                                        {valueIcons[index] || valueIcons[0]}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
                                            {value.title}
                                        </h3>
                                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-stretch">
                            <div className="rounded-lg overflow-hidden shadow-xl w-full h-64 sm:h-80 md:h-auto">
                                <LazyImage
                                    src={getMediaUrl(content.values[0]?.image || '/core_values.jpg')}
                                    alt="Our Values"
                                    className="w-full h-full"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="relative py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-gray-50">
                <div className="w-full">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 md:mb-6 text-gray-900">
                            {content.leadership.title}
                        </h1>
                        <div className="w-20 h-0.5 bg-[#4c6860] mx-auto mb-6 md:mb-8"></div>
                        <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            {content.leadership.description}
                        </p>
                    </div>
                    <div className="space-y-8 md:space-y-12">
                        {content.leadership.leaders.map((leader, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#4c6860]/30">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className={`h-72 sm:h-80 md:h-96 bg-gradient-to-br ${leader.gradient} flex items-center justify-center p-6 md:p-8 ${leader.reverse ? 'order-1 md:order-2' : ''}`}>
                                        <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-white shadow-xl rounded-full flex items-center justify-center overflow-hidden border-2 border-[#4c6860]">
                                            <LazyImage
                                                src={getMediaUrl(leader.image)}
                                                alt={leader.name}
                                                className="w-full h-full"
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`p-6 sm:p-8 md:p-10 flex flex-col justify-center ${leader.reverse ? 'order-2 md:order-1' : ''}`}>
                                        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                                            {leader.name}
                                        </h3>
                                        <p className="text-[#4c6860] font-medium text-base sm:text-lg mb-4">
                                            {leader.title}
                                        </p>
                                        <div className="w-16 h-0.5 bg-[#4c6860] mb-4 md:mb-6"></div>
                                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                            {leader.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section className="py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                        <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
                            <LazyImage
                                src={getMediaUrl(content.sustainability.image)}
                                alt="Sustainability"
                                className="w-full h-full"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4 md:mb-6 font-light">
                                {content.sustainability.title}
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                                {content.sustainability.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Offices */}
            <section className="py-12 md:py-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white">
                <div className="w-full">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-gray-900">
                            {content.offices.title}
                        </h2>
                        <div className="w-20 h-0.5 bg-[#4c6860] mx-auto mb-6 md:mb-8"></div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            {content.offices.description}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                                {content.offices.companyName}
                            </h3>
                            <div className="space-y-2 md:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                                {content.offices.address.map((line, i) => <p key={i}>{line}</p>)}
                            </div>
                            <div className="mt-6 md:mt-8 space-y-3">
                                <div className="flex items-center gap-3 text-gray-600 text-base sm:text-lg">
                                    <svg className="w-5 h-5 text-[#4c6860] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{content.offices.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 text-base sm:text-lg">
                                    <svg className="w-5 h-5 text-[#4c6860] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="break-all">{content.offices.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 md:h-96">
                            <iframe
                                src={content.offices.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Trident Global Logistics Office Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Horizontal Divider */}
            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-700"></div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-900 text-white py-6 text-center px-4">
              <p className="text-sm">©2026 TRIDENT GLOBAL LOGISTICS LTD. ALL RIGHTS RESERVED</p>
            </div>

            {/* Horizontal Divider */}
            <div className="bg-gray-900">
              <div className="w-full h-px bg-gray-600"></div>
            </div>

            {/* Powered By */}
            <div className="bg-gray-900 text-gray-500 py-4 text-center px-4">
              <p className="text-xs">Powered by - ARK PANORAMA LAB</p>
            </div>
        </div>
    );
};

export default About;
