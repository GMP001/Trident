import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { contentAPI } from '../services/api';

// Default content as fallback - MATCHING YOUR BACKEND STRUCTURE
const defaultContent = {
  isActive: true,
  hero: {
    title: "To improve life for all",
    subtitle: "by integrating the world",
    image: "/About Us-1.jpg",
    media: "/about_us.mp4"
  },
  purpose: {
    heading: "Our purpose is the reason we strive to go all the way, every day.",
    text: "To deliver a more connected, agile and sustainable future for global logistics. We combine strategic expertise, operational excellence, and a customer-first approach to ensure seamless cargo movement across international trade routes.",
    tags: ["Sustainability", "Our History", "Careers"],
    image: "/corporate_leaders_in_serious_mood.jpg"
  },
  vision: {
    title: "Trident Global Logistics' vision is to become the Global Integrator",
    description: "Increasing complexity in global supply chains is making them inefficient, vulnerable and unsustainable. At Trident, our strategic vision is to become the Global Integrator, offering truly integrated logistics solutions that connect, protect and simplify our customers' supply chains."
  },
  values: [
    {
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical practices in all our dealings, building trust that lasts generations.",
      image: "/About Us-3.jpg"
    },
    {
      title: "Excellence",
      description: "We strive for operational excellence in every shipment and every interaction, never settling for good enough.",
      image: "/About Us-4.jpg"
    },
    {
      title: "Reliability",
      description: "We deliver on our promises, ensuring your cargo arrives safely and on time, every single time.",
      image: "/About Us-5.jpg"
    }
  ],
  leadership: {
    title: "Our leadership",
    description: "Our strategic vision to be the Global Integrator is anchored in Trident's Executive Leadership team and our Board of Directors. Meet the leaders who are setting our course for transformation.",
    image: "/About Us-2.jpg"
  },
  sustainability: {
    title: "We are committed to sustainable growth",
    description: "Our purpose serves as the foundation and compass guiding our work towards a world where global trade distributes economic and social benefits, without negatively impacting individuals, communities or the environment. This is why sustainability is integrated into our purpose. Because real shared value can only be delivered through logistics solutions that are digitised, integrated, decarbonised and democratised – so that global trade is inclusive and sustainable, and the benefits are felt by as many people as possible.",
    image: "/About Us-6.jpg"
  },
  cta: {
    title: "Ready to integrate your supply chain?",
    subtitle: "Partner with Trident Global Logistics and experience truly integrated logistics solutions.",
    button1Text: "Contact Our Team",
    button2Text: "Request a Quote"
  }
};

  interface AboutContent {
    isActive: boolean;
    hero: {
      title: string;
      subtitle: string;
      image?: string;
      media?: string;
    };
    purpose: {
      heading: string;
      text: string;
      tags: string[];
      image?: string;  // ✅ Already added
    };
    vision: {
      title: string;
      description: string;
    };
    values: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    leadership: {
      title: string;
      description: string;
      image: string;
    };
    sustainability: {
      title: string;
      description: string;
      image: string;
    };
    cta: {
      title: string;
      subtitle: string;
      button1Text: string;
      button2Text: string;
    };
  }

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
      const pageContent = await contentAPI.getPage('about');
      
      console.log('Loaded about page content:', pageContent);
      
      if (pageContent && Object.keys(pageContent).length > 0) {
        const mergedContent = {
          isActive: pageContent.isActive ?? defaultContent.isActive,
          hero: { 
            ...defaultContent.hero, 
            ...(pageContent.hero || {}),
            media: pageContent.hero?.media || pageContent.hero?.image || defaultContent.hero.media
          },
          purpose: { 
            ...defaultContent.purpose, 
            ...(pageContent.purpose || {}),
            tags: pageContent.purpose?.tags || defaultContent.purpose.tags,
            image: pageContent.purpose?.image || defaultContent.purpose.image
          },
          vision: { 
            ...defaultContent.vision, 
            ...(pageContent.vision || {}) 
          },
          values: pageContent.values || defaultContent.values,
          leadership: { 
            ...defaultContent.leadership, 
            ...(pageContent.leadership || {}) 
          },
          sustainability: { 
            ...defaultContent.sustainability, 
            ...(pageContent.sustainability || {}) 
          },
          cta: { 
            ...defaultContent.cta, 
            ...(pageContent.cta || {}) 
          }
        };
        setContent(mergedContent);
      }
    } catch (error) {
      console.error('Error loading about page content:', error);
      setError('Failed to load content. Using default content.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    // If it's already a full URL
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's an uploaded image from admin panel (starts with /uploads/)
    if (imagePath.startsWith('/uploads/')) return `http://localhost:5000${imagePath}`;
    
    // If it's a local image from public folder
    return imagePath;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />
      
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 fixed top-20 right-4 z-50 max-w-md shadow-lg">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      {/* Hero Section - Supports both video and image backgrounds */}
      <section className="relative min-h-[50vh] flex items-center justify-start overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          {content.hero.media && (content.hero.media.endsWith('.mp4') || content.hero.media.endsWith('.webm')) ? (
            // Video background
            <video
              autoPlay
              loop
              muted
              playsInline
              key={content.hero.media} // Force re-render when media changes
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={getImageUrl(content.hero.media)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            // Image background
            <img 
              src={getImageUrl(content.hero.media || content.hero.image || '/about_us.mp4')} 
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/about_us.mp4';
              }}
            />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-6xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-1xl md:text-4xl lg:text-5xl text-white leading-tight mb-6 font-light tracking-wide">
            {content.hero.title}<br />
            <span className="font-light">{content.hero.subtitle}</span>
          </h1>
          <div className="w-24 h-0.5 bg-white/60 mb-8"></div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-6 font-light">
                  {content.purpose.heading}
                </h2>
                <div className="w-16 h-0.5 bg-blue-500"></div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {content.purpose.text}
              </p>
              <div className="flex gap-8 items-center flex-wrap">
                {content.purpose.tags.map((tag, index) => (
                  <span key={index} className="text-blue-600 font-medium cursor-pointer hover:text-blue-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-stretch">
              <div className="rounded-lg overflow-hidden shadow-lg w-full">
                <img 
                  src={getImageUrl(content.purpose.image || "/corporate_leaders_in_serious_mood.jpg")} 
                  alt="Global Logistics" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.src = "/corporate_leaders_in_serious_mood.jpg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-24 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10" 
             style={{ backgroundImage: `url(${getImageUrl(content.leadership.image)})` }}>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-6 font-light">
              {content.vision.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {content.vision.description}
            </p>
            <div className="flex gap-6">
              <Link to="/vision">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2">
                  Our vision <span>→</span>
                </button>
              </Link>
              <Link to="/why-us">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2">
                  Why us? <span>→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 font-light">
              Our values connect us and guide us
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Our values inspire us to do better in a constantly changing world, guiding our work every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mt-12">
            {content.values.map((value, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="mb-6 relative">
                  <img 
                    src={getImageUrl(value.image)} 
                    alt={value.title} 
                    className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all"
                    onError={(e) => {
                      e.currentTarget.src = '/About Us-3.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-900/20 rounded-lg group-hover:bg-blue-900/10 transition-all"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="relative py-24 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 font-light">
                {content.leadership.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {content.leadership.description}
              </p>
              <Link to="/leadership">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2 text-lg">
                  Learn more <span>→</span>
                </button>
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img 
                src={getImageUrl(content.leadership.image)} 
                alt="Leadership" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/About Us-2.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
              <img 
                src={getImageUrl(content.sustainability.image)} 
                alt="Sustainability" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/About Us-6.jpg';
                }}
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-6 font-light">
                {content.sustainability.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {content.sustainability.description}
              </p>
              <Link to="/sustainability">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2">
                  Learn more <span>→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-600">
        <div className="max-w-4xl mx-auto text-center" style={{ marginLeft: '300px' }}>
          <h3 className="text-3xl md:text-4xl text-white mb-6 font-light">
            {content.cta.title}
          </h3>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            {content.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all text-base font-medium">
                {content.cta.button1Text}
              </button>
            </Link>
            <Link to="/quote">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all text-base font-medium">
                {content.cta.button2Text}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

