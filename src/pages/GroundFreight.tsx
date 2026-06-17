// D:\Trident Log\Trident-FE\src\pages\GroundFreight.tsx

import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';

interface GroundFreightContent {
  isActive: boolean;
  hero: {
    title: string;
    subtitle: string;
    video?: string;
    image?: string;
    button1Text: string;
    button2Text: string;
  };
  featuresStrip?: {
    items: string[];
  };
  servicesTitle: {
    title: string;
    description: string;
  };
  fullTruckload: {
    title: string;
    description: string;
    image: string;
  };
  lessThanTruckload: {
    title: string;
    description: string;
    image: string;
  };
  crossBorder: {
    title: string;
    description: string;
    image: string;
    showBothButtons?: boolean;
  };
  whyChooseUs: {
    title: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
  };
  contactSteps: {
    title: string;
    subtitle: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    buttonText: string;
  };
  needSupport: {
    title: string;
    description: string;
    image: string;
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

const defaultContent: GroundFreightContent = {
  isActive: true,
  hero: {
    title: "Trident Ground Freight",
    subtitle: "Get seamless and reliable non-containerised ground transportation with integrated trucking services.",
    video: "/container_on_truck_video_02.mp4",
    button1Text: "Our services",
    button2Text: "Contact us"
  },
  featuresStrip: {
    items: ["Full Truckload (FTL)", "Less-than-Truckload (LTL)", "Cross-Border FTL and LTL"]
  },
  servicesTitle: {
    title: "Services",
    description: "Our FTL and LTL ground freight services complement our portfolio of global shipping, port, and fulfilment services to ensure your cargo is handled with the utmost care and efficiency from origin all the way to your end customer."
  },
  fullTruckload: {
    title: "Full Truckload (FTL)",
    description: "By combining cutting-edge transportation technology with extensive trucking services, we help you reach every point in your supply chain with ease, ensuring hassle-free shipping every time. Choose from a range of value-added services, such as multi-stop deliveries, and customisable service levels to meet your specific needs.",
    image: "/full_truck_load.jpg"
  },
  lessThanTruckload: {
    title: "Less-than-Truckload (LTL)",
    description: "Get the flexibility and convenience you need for goods that don't require a full truckload. With our intricate trucking network, we'll move your low cargo volumes from end-to-end with care, precision, and reliability. Enjoy value-added-services such as time-definite trucking, expedited services, and groupage options.",
    image: "/loose_truck_load.jpg"
  },
  crossBorder: {
    title: "Cross-Border FTL and LTL",
    description: "With our long history of international trade and customs expertise, you can rely on our efficient cross-border FTL and LTL services to transport your goods seamlessly between countries. We can help you set up recurring trade flows or explore entering new geographies with smaller shipments, from pick up through to delivery.",
    image: "/cross_border_truck.jpg",
    showBothButtons: true
  },
  whyChooseUs: {
    title: "Why Trident Ground Freight?",
    benefits: [
      { title: "Optimised pricing", description: "Streamline your trucking spend through our smart routing, precise planning, and efficient asset utilisation – ensuring every kilometre delivers maximum value." },
      { title: "Speed and network efficiency", description: "Accelerate your cargo flow with dynamically optimised lanes and expedited routes that minimise distance, cut dwell time, and keep operations moving without delay." },
      { title: "Delivery reliability", description: "Count on consistent, on‑schedule performance backed by Trident's proven track record – ensuring your cargo arrives safely and predictably every time." },
      { title: "Flexible capacity", description: "Stay agile during market fluctuations with strong asset utilisation and a resilient partner network that ensures dependable capacity when and where you need it." },
      { title: "State-of-the-art technology", description: "Gain full end‑to‑end visibility with a powerful digital platform offering seamless integration, real‑time tracking, and complete control across every inland milestone." },
      { title: "Customer support", description: "Resolve issues quickly with fast, expert assistance from trusted local professionals who understand your routes, regulations, and operational realities." }
    ]
  },
  contactSteps: {
    title: "Contact our sales team",
    subtitle: "Reach out to our team of experts for any further assistance with your trucking needs.",
    steps: [
      { step: 1, title: "Get in touch", description: "Head to our contact form to start an enquiry." },
      { step: 2, title: "Select your enquiry", description: "Pick enquiry type. For new customers, select 'booking'." },
      { step: 3, title: "Submit your request", description: "Fill in your contact information and submit." },
      { step: 4, title: "Get local assistance", description: "Our regional sales team will respond shortly." }
    ],
    buttonText: "Contact us"
  },
  needSupport: {
    title: "Need support? Our experts are here to help",
    description: "Find answers to your questions and get in touch with our experts for support.",
    image: "/call_us_staff.jpg",
    buttonText: "Contact us"
  },
  faqs: [
    { question: "What is ground freight?", answer: "Ground freight refers to the transportation of goods via trucks or other vehicles over land. It's a flexible and efficient way to move cargo from one location to another, whether locally, regionally, or across borders." },
    { question: "How is a full-truckload (FTL) different from Less Than Truckload (LTL)?", answer: "FTL and LTL are both non-containerised ground transportation. FTL uses the whole trailer for one customer, while LTL combines multiple shipments from different customers in one truck for smaller shipping volumes." },
    { question: "When should I use Less-than-Truckload (LTL)?", answer: "Less-than-Truckload shipping is ideal for shipments less than 12 pallets." },
    { question: "Can Trident accommodate specialised trucking requirements, such as temperature-controlled or hazardous materials?", answer: "As of now, we do not offer temperature-controlled or hazardous materials transportation options." },
    { question: "How do I get a Full Truckload (FTL) quote?", answer: "You can get an instant FTL quote by contacting our sales team or using our online booking platform. Simply provide your shipment details, origin, destination, and preferred pickup date." },
    { question: "What are the coverage areas for Trident Full Truckload (FTL) and Less-than-Truckload (LTL) services?", answer: "Our trucking services are available in regions across the globe. To learn more about the services we offer in your regions, please contact our sales team." }
  ],
  cta: {
    title: "Ready to ship with ground freight?",
    subtitle: "Contact our trucking experts for a customized solution",
    button1Text: "Get a quote",
    button2Text: "Contact us"
  }
};

// Icon renderer for whyChooseUs benefits
const renderBenefitIcon = (index: number) => {
  const icons = [
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />,
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  ];
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[index] || icons[0]}
    </svg>
  );
};

const GroundFreight = () => {
  const [content, setContent] = useState<GroundFreightContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setError(null);
      const pageContent = await contentAPI.getPage('ground-freight');
      
      if (pageContent && Object.keys(pageContent).length > 0) {
        const mergedContent: GroundFreightContent = {
          isActive: pageContent.isActive !== undefined ? pageContent.isActive : defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pageContent.hero || {}) },
          featuresStrip: pageContent.featuresStrip || defaultContent.featuresStrip,
          servicesTitle: { ...defaultContent.servicesTitle, ...(pageContent.servicesTitle || {}) },
          fullTruckload: { ...defaultContent.fullTruckload, ...(pageContent.fullTruckload || {}) },
          lessThanTruckload: { ...defaultContent.lessThanTruckload, ...(pageContent.lessThanTruckload || {}) },
          crossBorder: { ...defaultContent.crossBorder, ...(pageContent.crossBorder || {}) },
          whyChooseUs: {
            ...defaultContent.whyChooseUs,
            ...(pageContent.whyChooseUs || {}),
            benefits: pageContent.whyChooseUs?.benefits || defaultContent.whyChooseUs.benefits
          },
          contactSteps: {
            ...defaultContent.contactSteps,
            ...(pageContent.contactSteps || {}),
            steps: pageContent.contactSteps?.steps || defaultContent.contactSteps.steps
          },
          needSupport: { ...defaultContent.needSupport, ...(pageContent.needSupport || {}) },
          faqs: Array.isArray(pageContent.faqs) && pageContent.faqs.length > 0 ? pageContent.faqs : defaultContent.faqs,
          cta: { ...defaultContent.cta, ...(pageContent.cta || {}) }
        };
        setContent(mergedContent);
      }
    } catch (error) {
      console.error('Error loading ground freight content:', error);
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
      <section className="relative h-[70vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {content.hero.video?.endsWith('.mp4') ? (
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover"
              style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}>
              <source src={getMediaUrl(content.hero.video)} type="video/mp4" />
            </video>
          ) : (
            <img src={getMediaUrl(content.hero.image || content.hero.video || '')} alt={content.hero.title}
              className="absolute w-full h-full object-cover"
              style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }} />
          )}
          <div className="absolute bg-black/55" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px' }} />
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">{content.hero.subtitle}</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.button1Text}</button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">{content.hero.button2Text}</button>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      {content.featuresStrip && content.featuresStrip.items.length > 0 && (
        <section className="py-6 px-8 md:px-16 lg:px-24 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
            <div className="flex flex-wrap gap-8 justify-start items-center">
              {content.featuresStrip.items.map((item, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="text-blue-600 font-medium text-base">{item}</span>
                  {i < content.featuresStrip!.items.length - 1 && <span className="text-gray-300">|</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Title */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.servicesTitle.title}</h2>
          <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">{content.servicesTitle.description}</p>
        </div>
      </section>

      {/* Full Truckload - Image RIGHT */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">{content.fullTruckload.title}</h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">{content.fullTruckload.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Contact us →</button>
            </div>
            <div><img src={getMediaUrl(content.fullTruckload.image)} alt={content.fullTruckload.title} className="w-full h-auto rounded-lg shadow-md" /></div>
          </div>
        </div>
      </section>

      {/* Less-than-Truckload - Image LEFT */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1"><img src={getMediaUrl(content.lessThanTruckload.image)} alt={content.lessThanTruckload.title} className="w-full h-auto rounded-lg shadow-md" /></div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">{content.lessThanTruckload.title}</h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">{content.lessThanTruckload.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Contact us →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Border - Image RIGHT */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">{content.crossBorder.title}</h3>
              <div className="w-12 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-6">{content.crossBorder.description}</p>
              <div className="flex gap-4">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Contact us →</button>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">Learn more →</button>
              </div>
            </div>
            <div><img src={getMediaUrl(content.crossBorder.image)} alt={content.crossBorder.title} className="w-full h-auto rounded-lg shadow-md" /></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Benefits Grid */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.whyChooseUs.title}</h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.whyChooseUs.benefits.map((benefit, i) => (
              <div key={i} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">{renderBenefitIcon(i)}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Steps */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contactSteps.title}</h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{content.contactSteps.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {content.contactSteps.steps.map((step) => (
              <div key={step.step} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">{step.step}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contactSteps.buttonText}</button>
          </div>
        </div>
      </section>

      {/* Need Support */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.needSupport.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{content.needSupport.description}</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.needSupport.buttonText}</button>
            </div>
            <div><img src={getMediaUrl(content.needSupport.image)} alt="Support" className="w-full h-auto rounded-lg shadow-md" /></div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">Frequently Asked Questions (FAQs)</h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {content.faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl mb-4 font-light">{content.cta.title}</h3>
          <p className="text-xl text-gray-300 mb-8">{content.cta.subtitle}</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.cta.button1Text}</button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">{content.cta.button2Text}</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroundFreight;
