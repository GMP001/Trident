// D:\Trident Log\Trident-FE\src\pages\LCL.tsx

import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';

interface LCLContent {
  isActive: boolean;
  hero: {
    title: string;
    subtitle: string;
    video?: string;
    image?: string;
    button1Text: string;
    button2Text: string;
  };
  promotionalCard: {
    title: string;
    description: string;
    buttonText: string;
  };
  whatIsLCL: {
    title: string;
    description: string;
    description2: string;
    image: string;
    imageCaption: string;
  };
  whyChooseLCL: {
    title: string;
    description: string;
    description2: string;
    image: string;
    imageCaption: string;
    buttonText: string;
  };
  lclVsFCL: {
    title: string;
    description: string;
    description2: string;
    description3: string;
    image: string;
    imageCaption: string;
  };
  whenToUseLCL: {
    title: string;
    description: string;
    description2: string;
    image: string;
    imageCaption: string;
    buttonText: string;
  };
  howItWorks: {
    title: string;
    description: string;
    description2: string;
    description3: string;
    description4: string;
    image: string;
    imageCaption: string;
    buttonText: string;
  };
  costInfo: {
    title: string;
    description: string;
    description2: string;
    description3: string;
    image: string;
    imageCaption: string;
    buttonText: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cta: {
    title: string;
    subtitle: string;
    button1Text: string;
    button2Text: string;
  };
}

const defaultContent: LCLContent = {
  isActive: true,
  hero: {
    title: "Less-than-Container Load (LCL) Shipping",
    subtitle: "Ship boxes and pallets as per your need.",
    video: "/lcl_stuffing.mp4",
    button1Text: "Book now",
    button2Text: "Contact us"
  },
  promotionalCard: {
    title: "Book LCL at competitive rates",
    description: "Do you want to ship boxes and pallets? With Trident, you can book your Less-than-Container Load online with a few clicks. For your ease book now at competitive rates.",
    buttonText: "Book now"
  },
  whatIsLCL: {
    title: "What is LCL shipment?",
    description: "Is your shipment too small to fill up a whole container? LCL shipping allows you to share a container which is consolidated with other cargo. This allows you to ensure your small shipment can be on the move when you need it.",
    description2: "Less-than-Container Load enables the use of palletized boxes and crates or small package boxes to ensure on-time shipment of your cargo. It helps you accommodate fluctuating demand and find shipping availability even during busy periods.",
    image: "/lcl_stuffing_04.avif",
    imageCaption: "A few black men-women trying to load LCL cargo."
  },
  whyChooseLCL: {
    title: "Why choose LCL shipping?",
    description: "LCL shipping gives you flexibility and the ability to react to ever-changing demands, especially if you need to move small shipments often. With LCL you can ship your small boxes and pallets per your needs instead of waiting to fill a full container with your cargo.",
    description2: "By choosing LCL, you only pay for the space your cargo is occupying in the container. You share the space with others as well as the costs. It is cheaper than air freight and it allows you to ship less goods more frequently while spending less money on inventorying and warehousing space.",
    image: "/lcl_stuffing_05.avif",
    imageCaption: "A woman in a warehouse typing on a laptop with boxes and pallets in the background.",
    buttonText: "Our LCL services"
  },
  lclVsFCL: {
    title: "What is the difference between LCL and FCL?",
    description: "There are two main shipping modes when choosing how to ship your cargo via ocean – Less-than-Container-Load (LCL) and Full Container Load (FCL) shipping. Here, we have a simple comparison explaining the meaning of FCL and LCL.",
    description2: "With FCL shipping, you pay for the whole container, and there will only be one shipper. This means there is also little handling since your FCL shipment does not need to be de-consolidated at the end of the journey and will be sealed right after loading.",
    description3: "LCL shipping, on the contrary, lets you share a container with other shippers and thus consolidate a container that wouldn't be full otherwise. Shipping boxes and pallets allows for a more flexible delivery based on your actual needs, as even the smallest cargo can have a big impact on your business.",
    image: "/lcl_stuffing_06.avif",
    imageCaption: "Side view of a worker in a forklift truck consolidating LCL cargo in boxes."
  },
  whenToUseLCL: {
    title: "When to use LCL?",
    description: "If you want to ship small boxes or pallets that fit into 20 feet or 40 feet containers, and do not have enough cargo to fill up a whole container, LCL shipping is the right solution for you. It works perfectly for stackable cargo, but we can also ship your boxes and pallets if they are non-stackable.",
    description2: "LCL shipment is ideal for small and medium enterprises (SMEs) who may not have sufficient cargo to fill a full container. It also works for large and medium enterprises (LMEs) who are facing varying demands or want to test out new markets. Typically, industries like fashion, lifestyle, automotive, technology and FMCG can benefit greatly from LCL shipping.",
    image: "/lcl_stuffing_07.avif",
    imageCaption: "A couple of employees discussing in a warehouse with small boxes in the background.",
    buttonText: "Our LCL services"
  },
  howItWorks: {
    title: "How does LCL shipping work?",
    description: "Our LCL shipping services are designed for you, and we take care of your cargo from start to finish.",
    description2: "With Trident, you can easily book your LCL shipment online. Simply log in to the Trident LCL platform and fill out relevant information about your cargo in a few steps. You'll get an instant price and a booking confirmation within 4 hours. After this, you can either drop your boxes (or pallets) at our warehouse or we can pick it up directly from your warehouse.",
    description3: "Your cargo will then be grouped with others, loaded, and sealed at a Container Freight Station, and it will leave for your destination on a ship after having gone through customs clearance. If you wish, our customs experts can also take care of the Customs Clearance.",
    description4: "Upon arrival, the container is unloaded, and your boxes (or pallets) are delivered either directly to you or to our warehouse for you to pick up.",
    image: "/lcl_stuffing_08.avif",
    imageCaption: "A woman worker handling a LCL cargo in a warehouse.",
    buttonText: "Book now"
  },
  costInfo: {
    title: "How much does LCL shipping cost?",
    description: "The cost of LCL shipping depends on a few different factors, the main ones being the volume of space that your cargo will occupy within the container and its weight and the shipping route. Volume is calculated in cubic meters (CBM) and weight in kilograms.",
    description2: "At Trident, maximum for a single package is 3,000 kg and 29 CBM and the maximum limit per booking is 20,000 kg and 60 CBM.",
    description3: "When you book LCL via our digital platform, you have complete transparency on speed, options and costs. You'll also get an instant price and a booking confirmation within 4 hours.",
    image: "/lcl_stuffing_03.jpg",
    imageCaption: "A couple of workers in a consolidation warehouse discussing LCL freight",
    buttonText: "Check rates"
  },
  faqs: [
    {
      question: "Is it cheaper to ship LCL or FCL?",
      answer: "The price you will pay for either LCL or FCL shipping depends entirely on your cargo. If you want to ship small boxes or palletized cargo, then it is likely cheaper for you to choose LCL shipping. However, if your goods take up most of a container's space, then it is more cost-effective for you to choose FCL."
    },
    {
      question: "What is better: LCL or FCL?",
      answer: "Is Less-than-Container Load or Full Container Load right for your cargo? Learn the differences and benefits of choosing LCL or FCL based on your shipping needs."
    },
    {
      question: "What is the maximum CBM for LCL?",
      answer: "The maximum for a single package is 3000 kg and 29 CBM and the maximum limit per booking is 20,000 kg and 60 CBM."
    },
    {
      question: "Can I get a LCL price?",
      answer: "On Trident.com and via the Trident App, you can get an instant LCL price and place a booking request. Simply log in to the Trident LCL booking portal or download the Trident App."
    },
    {
      question: "Can I track my LCL shipment?",
      answer: "Yes, you can track your LCL shipment on our LCL tracking page."
    },
    {
      question: "How do I calculate the volume for my LCL cargo?",
      answer: "Within our LCL booking portal, you can use our virtual calculator to calculate your CBM volumes based on your cargo's height, weight, length and width."
    }
  ],
  cta: {
    title: "Ready to ship your LCL cargo?",
    subtitle: "Contact our LCL experts for a customized solution",
    button1Text: "Get a quote",
    button2Text: "Contact us"
  }
};

const LCL = () => {
  const [content, setContent] = useState<LCLContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setError(null);
      const pageContent = await contentAPI.getPage('lcl');
      
      if (pageContent && Object.keys(pageContent).length > 0) {
        const mergedContent: LCLContent = {
          isActive: pageContent.isActive !== undefined ? pageContent.isActive : defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pageContent.hero || {}) },
          promotionalCard: { ...defaultContent.promotionalCard, ...(pageContent.promotionalCard || {}) },
          whatIsLCL: { ...defaultContent.whatIsLCL, ...(pageContent.whatIsLCL || {}) },
          whyChooseLCL: { ...defaultContent.whyChooseLCL, ...(pageContent.whyChooseLCL || {}) },
          lclVsFCL: { ...defaultContent.lclVsFCL, ...(pageContent.lclVsFCL || {}) },
          whenToUseLCL: { ...defaultContent.whenToUseLCL, ...(pageContent.whenToUseLCL || {}) },
          howItWorks: { ...defaultContent.howItWorks, ...(pageContent.howItWorks || {}) },
          costInfo: { ...defaultContent.costInfo, ...(pageContent.costInfo || {}) },
          faqs: Array.isArray(pageContent.faqs) && pageContent.faqs.length > 0 
            ? pageContent.faqs 
            : defaultContent.faqs,
          cta: { ...defaultContent.cta, ...(pageContent.cta || {}) }
        };
        setContent(mergedContent);
      }
    } catch (error) {
      console.error('Error loading LCL content:', error);
      setError('Failed to load content. Using default content.');
    } finally {
      setLoading(false);
    }
  };

  const getMediaUrl = (path: string): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads/')) return `http://localhost:5000${path}`;
    return path;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-start overflow-visible">
        <div 
          className="absolute overflow-hidden"
          style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}
        >
          {content.hero.video?.endsWith('.mp4') ? (
            <video
              autoPlay loop muted playsInline
              className="absolute w-full h-full object-cover"
              style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}
            >
              <source src={getMediaUrl(content.hero.video)} type="video/mp4" />
            </video>
          ) : (
            <img
              src={getMediaUrl(content.hero.image || content.hero.video || '')}
              alt={content.hero.title}
              className="absolute w-full h-full object-cover"
              style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}
            />
          )}
          <div className="absolute bg-black/50" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px' }} />
        </div>

        {/* Sky Blue Borders */}
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light">
            {content.hero.title}
          </h1>
          <p className="text-xl text-white/90 mb-8">{content.hero.subtitle}</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
              {content.hero.button1Text}
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">
              {content.hero.button2Text}
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Card */}
      <section className="py-12 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{content.promotionalCard.title}</h2>
              <p className="text-gray-600">{content.promotionalCard.description}</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all whitespace-nowrap text-sm font-medium">
              {content.promotionalCard.buttonText}
            </button>
          </div>
        </div>
      </section>

      {/* What is LCL shipment? (Image RIGHT) */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whatIsLCL.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">{content.whatIsLCL.description}</p>
              <p className="text-gray-600 leading-relaxed">{content.whatIsLCL.description2}</p>
              <button className="mt-6 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Learn more →</button>
            </div>
            <div>
              <img src={getMediaUrl(content.whatIsLCL.image)} alt={content.whatIsLCL.title} className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">{content.whatIsLCL.imageCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose LCL? (Image LEFT) */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src={getMediaUrl(content.whyChooseLCL.image)} alt={content.whyChooseLCL.title} className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">{content.whyChooseLCL.imageCaption}</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whyChooseLCL.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">{content.whyChooseLCL.description}</p>
              <p className="text-gray-600 leading-relaxed">{content.whyChooseLCL.description2}</p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm">
                {content.whyChooseLCL.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LCL vs FCL (Image RIGHT) */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.lclVsFCL.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">{content.lclVsFCL.description}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{content.lclVsFCL.description2}</p>
              <p className="text-gray-600 leading-relaxed">{content.lclVsFCL.description3}</p>
              <button className="mt-6 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Learn more →</button>
            </div>
            <div>
              <img src={getMediaUrl(content.lclVsFCL.image)} alt={content.lclVsFCL.title} className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">{content.lclVsFCL.imageCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* When to use LCL? (Image LEFT) */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src={getMediaUrl(content.whenToUseLCL.image)} alt={content.whenToUseLCL.title} className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">{content.whenToUseLCL.imageCaption}</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whenToUseLCL.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">{content.whenToUseLCL.description}</p>
              <p className="text-gray-600 leading-relaxed">{content.whenToUseLCL.description2}</p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm">
                {content.whenToUseLCL.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How does LCL shipping work? (Image RIGHT) */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.howItWorks.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">{content.howItWorks.description}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{content.howItWorks.description2}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{content.howItWorks.description3}</p>
              <p className="text-gray-600 leading-relaxed">{content.howItWorks.description4}</p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                {content.howItWorks.buttonText}
              </button>
            </div>
            <div>
              <img src={getMediaUrl(content.howItWorks.image)} alt={content.howItWorks.title} className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">{content.howItWorks.imageCaption}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How much does LCL cost? (Image LEFT) */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src={getMediaUrl(content.costInfo.image)} alt={content.costInfo.title} className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">{content.costInfo.imageCaption}</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.costInfo.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">{content.costInfo.description}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{content.costInfo.description2}</p>
              <p className="text-gray-600 leading-relaxed">{content.costInfo.description3}</p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                {content.costInfo.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Should you have any immediate questions regarding LCL, please refer to our customer FAQs. For further queries, just contact us – we are happy to help.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {content.faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Read more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl mb-4 font-light">{content.cta.title}</h3>
          <p className="text-xl text-gray-300 mb-8">{content.cta.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
              {content.cta.button1Text}
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">
              {content.cta.button2Text}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LCL;
