// D:\Trident Log\Trident-FE\src\pages\Depot.tsx

import { useEffect, useState } from 'react';
import { contentAPI } from '../services/api';
import Navbar from '../components/Navbar';

interface DepotContent {
  isActive: boolean;
  hero: {
    title: string;
    subtitle: string;
    video?: string;
    image?: string;
    buttonText: string;
  };
  overview: {
    speedAndFlexibility: {
      title: string;
      description: string;
      description2: string;
      image: string;
    };
    keyBenefits: {
      title: string;
      subtitle: string;
      benefits: Array<{
        title: string;
        description: string;
      }>;
    };
    depotServices: {
      title: string;
      description: string;
      image: string;
      buttonText: string;
    };
    globalReach: {
      title: string;
      subtitle: string;
    };
  };
  services: {
    simplifySupplyChain: {
      title: string;
      opportunities: string[];
      description: string;
      image: string;
    };
    customerDedicatedDepot: {
      title: string;
      description: string;
      image: string;
    };
    fullContainerStorage: {
      title: string;
      description: string;
      image: string;
    };
    containerPreparation: {
      title: string;
      description: string;
      image: string;
    };
    stuffingAndDestuffing: {
      title: string;
      description: string;
      image: string;
    };
    valueAddedServices: {
      title: string;
      subtitle: string;
      services: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

const defaultContent: DepotContent = {
  isActive: true,
  hero: {
    title: "Trident Depot Services",
    subtitle: "Pitstops for your cargo.",
    video: "/deport_operation.mp4",
    buttonText: "Contact us"
  },
  overview: {
    speedAndFlexibility: {
      title: "Add a little speed and flexibility to your supply chain",
      description: "Container depots are essential nodes that act as key connectors expediting the import and export of your cargo. Think of them as quick stops fulfilling critical container and cargo needs in a well-oiled supply chain. Our experts are on hand with industry-leading import/export management processes and a range of value-added services to ensure your supply chain is running seamlessly. You can now reach more customers in remote or inland locations with our inland container depots supporting your logistics needs.",
      description2: "Our depots give you the flexibility to absorb disruptions and uncertainties with solutions designed to address your specific requirements, including building dedicated container depots closer to your factories or transport nodes.",
      image: "/depot_operation_01.avif"
    },
    keyBenefits: {
      title: "Key benefits",
      subtitle: "Trident Depots are designed to give you greater control, flexibility and visibility of your supply chain, from end to end.",
      benefits: [
        { title: "One-stop shop", description: "Our integrated logistics solutions are designed for end-to-end servicing of your depot needs." },
        { title: "Agility and efficiency", description: "Respond to uncertainties and changes with ease and keep fulfilling orders seamlessly via a single logistics partner." },
        { title: "Container quality preservation", description: "The quality of your cargo is maintained throughout its journey with our industry-leading container preparation protocols." },
        { title: "Configurable solutions", description: "Get solutions that cater to your industry needs, so you can rest assured that your cargo is being handled with the best protocols applicable." },
        { title: "Inland connectivity", description: "Transport your cargo to locations away from transportation centres through our growing network of inland container depots." }
      ]
    },
    depotServices: {
      title: "Depot Services",
      description: "Choose from a range of services and products for your cargo at Trident Depots, from import and export to full container storage services. Learn more on how we can help move your cargo quickly and efficiently through a Trident Depot.",
      image: "/depot-services_02.avif",
      buttonText: "Explore our services"
    },
    globalReach: {
      title: "Expanding our global reach",
      subtitle: "Leverage our growing network to simplify and optimise your supply chain."
    }
  },
  services: {
    simplifySupplyChain: {
      title: "Simplify your supply chain",
      opportunities: [
        "Import/Export your cargo efficiently and on time with the highest quality standards.",
        "Prepare containers and load your cargo optimally for maximum transit readiness.",
        "Navigate uncertainties with the flexibility to control your supply chain's pace.",
        "Seamlessly connect to remote customers through our inland container depot network."
      ],
      description: "Get end-to-end import/export cargo services at our depots, whether it is preparing containers, cargo stuffing and destuffing, receiving and stowing full containers, facilitating customs clearances in the bonded yard, or shunting full containers to port closer to vessel arrival. You gain the reliable handling of your container cargo from one integrated logistics solutions partner at origin and destination.",
      image: "/deport-supply-chain.svg"
    },
    customerDedicatedDepot: {
      title: "Customer dedicated depot",
      description: "We offer dedicated facilities tailored for your exact container and cargo needs. You get an all-in-one solution in close proximity to your facility that ensures not only empty container availability but optimised cargo stuffing. Equip your dedicated depot with basic services, such as container Equipment Management and Repair (EMR), to complex tasks such as container preparation, cargo loading, yard management for full and empty containers. You can focus on your core business knowing that your cargo is being handled by experts safely and securely, all the way.",
      image: "/maersk-depot-illustr-01.svg"
    },
    fullContainerStorage: {
      title: "Full container storage",
      description: "Our storage areas hold full containers at origin or destination in both bonded and non-bonded conditions. Whether your in-transit cargo is awaiting customs clearances or an unexpected disruption requires slowing your shipment down, you get increased flexibility to manage your supply chain. With a low cost of storage, you can also use our depots to lower inventories at your factory or distribution centres.",
      image: "/trident-depot-illustration-full-container-storage.svg"
    },
    containerPreparation: {
      title: "Container preparation",
      description: "Every single container is thoroughly checked and prepared for its cargo, whether it is dry or refrigerated. We offer flexi-tanks, bulkheads, probes, liner solutions, paper/craft paper or cardboard linings for the interior walls of the container for export cargo. Once the containers are cleared, we help properly secure high-value cargo and ensure quality is preserved for the entire journey.",
      image: "/trident-depot-illustration-container-preparation.svg"
    },
    stuffingAndDestuffing: {
      title: "Stuffing and destuffing",
      description: "We ensure optimised container stuffing and destuffing of various types of cargo, from dry bulk and commodities in big bags to case or palletised goods and over-dimension and outsized cargo. Save time and costs by dealing with only one logistics partner.",
      image: "/trident-depot-illustration-stuffing-and-destuffing.svg"
    },
    valueAddedServices: {
      title: "Value-added services",
      subtitle: "Get exactly what you need. As a one-stop logistics shop, we offer a range of value-added services in-house for all your container requirements.",
      services: [
        { title: "Empty container management", description: "Ensuring the equipment of the right type and size is available for container stuffing as per your needs." },
        { title: "Shunting", description: "Trucking containers to and from customer's site." },
        { title: "Labelling", description: "Complete printing, placing and removal of labels, marking and re-marking of pallets or cartons." },
        { title: "Cargo packaging", description: "We ensure your cargo is packed optimally and safely." },
        { title: "Customer inspection", description: "Facilitating inspections for customers at requested dates and times." },
        { title: "Cargo photography", description: "High-resolution imagery of cargo for claims processing/avoidance available on request." },
        { title: "VIP services", description: "Priority lane and special stacking of containers to expedite pickup and delivery." },
        { title: "Refrigerated cargo monitoring", description: "Temperature and condition checks during plug-in to ensure the cold cargo set temperature is maintained." },
        { title: "Customs inspection (Bonded yard)", description: "Customs assessment of cargo type and quantity to ascertain legal requirements on duties." },
        { title: "Verified Gross Mass (VGM)", description: "Weighing of container in line with SOLAS 1978." },
        { title: "Storage", description: "Bulk cargo, packaging material or any other cargo suitable for storage needs." }
      ]
    }
  },
  contact: {
    title: "Contact our Depot Services Team",
    subtitle: "Reach out to our depot experts for any assistance with your container and cargo needs.",
    buttonText: "Contact us"
  }
};

const Depot = () => {
  const [content, setContent] = useState<DepotContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const pc = await contentAPI.getPage('depot');
      if (pc && Object.keys(pc).length > 0) {
        setContent({
          isActive: pc.isActive ?? defaultContent.isActive,
          hero: { ...defaultContent.hero, ...(pc.hero || {}) },
          overview: {
            speedAndFlexibility: { ...defaultContent.overview.speedAndFlexibility, ...(pc.overview?.speedAndFlexibility || {}) },
            keyBenefits: {
              ...defaultContent.overview.keyBenefits,
              ...(pc.overview?.keyBenefits || {}),
              benefits: pc.overview?.keyBenefits?.benefits || defaultContent.overview.keyBenefits.benefits
            },
            depotServices: { ...defaultContent.overview.depotServices, ...(pc.overview?.depotServices || {}) },
            globalReach: { ...defaultContent.overview.globalReach, ...(pc.overview?.globalReach || {}) }
          },
          services: {
            simplifySupplyChain: {
              ...defaultContent.services.simplifySupplyChain,
              ...(pc.services?.simplifySupplyChain || {}),
              opportunities: pc.services?.simplifySupplyChain?.opportunities || defaultContent.services.simplifySupplyChain.opportunities
            },
            customerDedicatedDepot: { ...defaultContent.services.customerDedicatedDepot, ...(pc.services?.customerDedicatedDepot || {}) },
            fullContainerStorage: { ...defaultContent.services.fullContainerStorage, ...(pc.services?.fullContainerStorage || {}) },
            containerPreparation: { ...defaultContent.services.containerPreparation, ...(pc.services?.containerPreparation || {}) },
            stuffingAndDestuffing: { ...defaultContent.services.stuffingAndDestuffing, ...(pc.services?.stuffingAndDestuffing || {}) },
            valueAddedServices: {
              ...defaultContent.services.valueAddedServices,
              ...(pc.services?.valueAddedServices || {}),
              services: pc.services?.valueAddedServices?.services || defaultContent.services.valueAddedServices.services
            }
          },
          contact: { ...defaultContent.contact, ...(pc.contact || {}) }
        });
      }
    } catch (err) { console.error('Error loading depot content:', err); }
    finally { setLoading(false); }
  };

  const getMediaUrl = (p: string) => {
    if (!p) return '';
    if (p.startsWith('http')) return p;
    if (p.startsWith('/uploads/')) return `http://localhost:5000${p}`;
    return p;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-start overflow-visible">
        <div className="absolute overflow-hidden" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px' }}>
          {content.hero.video?.endsWith('.mp4') ? (
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }}>
              <source src={getMediaUrl(content.hero.video)} type="video/mp4" />
            </video>
          ) : (
            <img src={getMediaUrl(content.hero.image || '')} alt={content.hero.title} className="absolute w-full h-full object-cover" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '60px', borderBottomLeftRadius: '60px', objectPosition: 'center 40%' }} />
          )}
          <div className="absolute bg-black/55" style={{ top: 0, left: 0, right: 0, bottom: 0, borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px' }} />
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomLeftRadius: '50px', zIndex: 15, left: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', width: '150px', background: '#38bdf8', borderBottomRightRadius: '50px', zIndex: 15, right: '7px' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '0px', height: '35px', background: '#38bdf8', left: '150px', right: '150px', zIndex: 15 }} />
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light tracking-wide">{content.hero.title}</h1>
          <p className="text-xl text-white/90 mb-8">{content.hero.subtitle}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.hero.buttonText}</button>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24" style={{ marginLeft: '300px' }}>
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'services', 'contact'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>{tab}</button>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div>
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.speedAndFlexibility.title}</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">{content.overview.speedAndFlexibility.description}</p>
                  <p className="text-gray-600 leading-relaxed">{content.overview.speedAndFlexibility.description2}</p>
                </div>
                <div><img src={getMediaUrl(content.overview.speedAndFlexibility.image)} alt="Speed" className="w-full h-auto rounded-lg shadow-md" /></div>
              </div>
            </div>
          </section>
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.keyBenefits.title}</h2>
                <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.overview.keyBenefits.subtitle}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.overview.keyBenefits.benefits.map((b, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                    <p className="text-gray-600 text-sm">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.overview.depotServices.title}</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-6">{content.overview.depotServices.description}</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">{content.overview.depotServices.buttonText}</button>
                </div>
                <div><img src={getMediaUrl(content.overview.depotServices.image)} alt="Depot Services" className="w-full h-auto rounded-lg shadow-md" /></div>
              </div>
            </div>
          </section>
          <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}>
              <h2 className="text-2xl md:text-3xl text-gray-900 leading-tight mb-4 font-light">{content.overview.globalReach.title}</h2>
              <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">{content.overview.globalReach.subtitle}</p>
            </div>
          </section>
        </div>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div>
          {/* Simplify supply chain */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.services.simplifySupplyChain.title}</h2>
                  <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed mb-4">Trident container depot services give you the opportunity to:</p>
                  <ul className="space-y-2 mb-6">
                    {content.services.simplifySupplyChain.opportunities.map((opp, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-blue-600 mt-1">{i + 1}.</span><span className="text-gray-600">{opp}</span></li>
                    ))}
                  </ul>
                  <p className="text-gray-600 leading-relaxed">{content.services.simplifySupplyChain.description}</p>
                </div>
                <div><img src={getMediaUrl(content.services.simplifySupplyChain.image)} alt="Supply Chain" className="w-full h-auto" /></div>
              </div>
            </div>
          </section>
          {/* Customer dedicated depot - img LEFT */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1"><img src={getMediaUrl(content.services.customerDedicatedDepot.image)} alt="Dedicated Depot" className="w-full h-auto" /></div>
                <div className="order-1 md:order-2"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.services.customerDedicatedDepot.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{content.services.customerDedicatedDepot.description}</p></div>
              </div>
            </div>
          </section>
          {/* Full container storage - img RIGHT */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.services.fullContainerStorage.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{content.services.fullContainerStorage.description}</p></div>
                <div><img src={getMediaUrl(content.services.fullContainerStorage.image)} alt="Full Storage" className="w-full h-auto" /></div>
              </div>
            </div>
          </section>
          {/* Container preparation - img LEFT */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1"><img src={getMediaUrl(content.services.containerPreparation.image)} alt="Preparation" className="w-full h-auto" /></div>
                <div className="order-1 md:order-2"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.services.containerPreparation.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{content.services.containerPreparation.description}</p></div>
              </div>
            </div>
          </section>
          {/* Stuffing - img RIGHT */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.services.stuffingAndDestuffing.title}</h2><div className="w-16 h-0.5 bg-blue-500 mb-6"></div><p className="text-gray-600 leading-relaxed">{content.services.stuffingAndDestuffing.description}</p></div>
                <div><img src={getMediaUrl(content.services.stuffingAndDestuffing.image)} alt="Stuffing" className="w-full h-auto" /></div>
              </div>
            </div>
          </section>
          {/* Value-added services grid */}
          <section className="py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
              <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.services.valueAddedServices.title}</h2><div className="w-20 h-0.5 bg-blue-500 mx-auto mb-6"></div><p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.services.valueAddedServices.subtitle}</p></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.services.valueAddedServices.services.map((s, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"><h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3><p className="text-gray-600 text-sm">{s.description}</p></div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CONTACT TAB */}
      {activeTab === 'contact' && (
        <section className="py-20 px-8 md:px-16 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto text-center" style={{ marginLeft: '300px' }}>
            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">{content.contact.title}</h2>
            <div className="w-20 h-0.5 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{content.contact.subtitle}</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">{content.contact.buttonText}</button>
          </div>
        </section>
      )}
    {/* Weather Widget (static) */}
      <section className="py-6 px-8 md:px-16 lg:px-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3"><span className="text-3xl">⛅</span><div><div className="text-lg font-semibold text-gray-800">30°C</div><div className="text-sm text-gray-500">Mostly cloudy</div></div></div>
            <div className="text-right"><div className="text-lg font-semibold text-gray-800">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div></div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Visible on all tabs */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl text-white mb-4 font-light">
            Ready to optimize your depot operations?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Contact our depot experts today
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-all font-medium">
            Contact us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Depot;
