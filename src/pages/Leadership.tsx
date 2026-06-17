import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';

interface LeadershipContent {
  isActive: boolean;
  hero: { title: string; subtitle: string; image?: string; video?: string; buttonText: string; };
  introSection: { title: string; description: string; };
  leaders: Array<{ name: string; title: string; description: string; image: string; bgGradient: string; }>;
  cta: { buttonText: string; buttonLink: string; };
}

const defaultContent: LeadershipContent = {
  isActive: true,
  hero: { title: "Our Leadership", subtitle: "Meet the leaders who are setting our course for transformation", image: "/About Us-2.jpg", buttonText: "" },
  introSection: { title: "Leadership Team", description: "At the heart of our success is a leadership team with unmatched experience, vision, and dedication to advancing global logistics in Bangladesh. Together, they bring decades of industry knowledge, strategic foresight, and a deep understanding of the freight forwarding business." },
  leaders: [
    { name: "Raihan Haidar", title: "Chairman", description: "As Chairman, Raihan Haidar provides the strategic vision and leadership that guides the company's long-term growth.", image: "/raihan-haidar-2.jpg", bgGradient: "from-blue-100 to-blue-50" },
    { name: "Md. Nazrul Islam", title: "Managing Director", description: "With over 30 years of experience in global shipping and logistics, Md. Nazrul Islam has built bridges between companies and governments across Asia and Europe.", image: "/md-nazrul-islam.jpg", bgGradient: "from-green-100 to-green-50" },
    { name: "Asif Ahmed", title: "Director", description: "Asif Ahmed brings over 32 years of experience in global shipping and logistics, having held senior positions with leading organizations including CMA-CGM, P&O, and Maersk.", image: "/asif-ahmed-2.jpg", bgGradient: "from-purple-100 to-purple-50" }
  ],
  cta: { buttonText: "Meet the full team →", buttonLink: "/team" }
};

const Leadership = () => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); loadContent(); }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('leadership');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          introSection: { ...defaultContent.introSection, ...(pc.introSection || {}) },
          leaders: pc.leaders || defaultContent.leaders,
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

  const dotColor = (gradient: string) => {
    if (gradient.includes('green')) return 'bg-green-500/10';
    if (gradient.includes('purple')) return 'bg-purple-500/10';
    return 'bg-blue-500/10';
  };

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-start overflow-hidden pt-20">
        <div className="absolute inset-0">
          {isHeroVideo ? (
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover" style={{ objectPosition: 'center 30%' }}>
              <source src={gm(heroMedia)} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${gm(heroMedia)}')`, backgroundPosition: 'center 30%' }} />
          )}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-5xl md:text-6xl lg:text-6xl text-white leading-tight mb-6 tracking-tight font-light">{content.hero.title}</h1>
          <div className="w-20 h-1 bg-blue-500 mb-8"></div>
          <p className="text-xl text-white/90 max-w-2xl">{content.hero.subtitle}</p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">{content.introSection.title}</h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">{content.introSection.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.leaders.map((leader, i) => (
              <div key={i} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
                <div className={`h-80 bg-gradient-to-br ${leader.bgGradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
                    <img src={gm(leader.image)} alt={leader.name} className="w-full h-full rounded-full object-cover scale-110" />
                  </div>
                  <div className={`absolute -bottom-6 -right-6 w-32 h-32 ${dotColor(leader.bgGradient)} rounded-full blur-2xl`}></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{leader.title}</p>
                  <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>

          {content.cta.buttonText && (
            <div className="text-center mt-12">
              <button className="bg-transparent border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium">
                {content.cta.buttonText}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Leadership;
