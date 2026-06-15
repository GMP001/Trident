import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LCL = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Verdana, sans-serif' }}>
      <Navbar />

      {/* Hero Section with Video Background and Curved Blue Border */}
      <section className="relative h-[55vh] flex items-center justify-start overflow-visible">
        
        {/* Background Video with Curve - EXTEND BELOW SECTION */}
        <div 
          className="absolute overflow-hidden"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderBottomRightRadius: '60px',
            borderBottomLeftRadius: '60px',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderBottomRightRadius: '60px',
              borderBottomLeftRadius: '60px',
              objectPosition: 'center 40%',
            }}
          >
            <source src="/lcl_stuffing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark Overlay */}
          <div 
            className="absolute bg-black/50" 
            style={{ 
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderBottomRightRadius: '50px',
              borderBottomLeftRadius: '50px',
            }} 
          /> 
        </div>

        {/* Sky Blue Thick Border - Left side */}
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: '0px',
            height: '35px',
            width: '150px',
            background: '#38bdf8',
            borderBottomLeftRadius: '50px',
            zIndex: 15,
            left: '7px',
          }}
        />

        {/* Sky Blue Thick Border - Right side */}
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: '0px',
            height: '35px',
            width: '150px',
            background: '#38bdf8',
            borderBottomRightRadius: '50px',
            zIndex: 15,
            right: '7px',
          }}
        />

        {/* Full Width Straight Blue Thick Border - Middle section */}
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: '0px',
            height: '35px',
            background: '#38bdf8',
            left: '150px',
            right: '150px',
            zIndex: 15,
          }}
        />
        
        <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl" style={{ marginLeft: '300px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-5xl text-white leading-tight mb-4 font-light">
            Less-than-Container Load (LCL) Shipping
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Ship boxes and pallets as per your need.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium">
              Book now
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-md hover:bg-white/10 transition-all text-sm font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Card */}
      <section className="py-12 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Book LCL at competitive rates</h2>
              <p className="text-gray-600">
                Do you want to ship boxes and pallets? With Trident, you can book your Less-than-Container Load online with a few clicks.<br />
                For your ease book now at competitive rates.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all whitespace-nowrap text-sm font-medium">
              Book now
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: What is LCL shipment? */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                What is LCL shipment?
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Is your shipment too small to fill up a whole container? LCL shipping allows you to share a 
                container which is consolidated with other cargo. This allows you to ensure your small 
                shipment can be on the move when you need it.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Less-than-Container Load enables the use of palletized boxes and crates or small package 
                boxes to ensure on-time shipment of your cargo. It helps you accommodate fluctuating demand 
                and find shipping availability even during busy periods.
              </p>
              <button className="mt-6 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Learn more →
              </button>
            </div>
            <div>
              <img src="/lcl_stuffing_04.avif" alt="LCL Shipment" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">A woman looking at her laptop in a warehouse containing small boxes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why choose LCL shipping? */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src="/lcl_stuffing_05.avif" alt="Why Choose LCL" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">A woman in a warehouse typing on a laptop with boxes and pallets in the background.</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                Why choose LCL shipping?
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                LCL shipping gives you flexibility and the ability to react to ever-changing demands, 
                especially if you need to move small shipments often. With LCL you can ship your small 
                boxes and pallets per your needs instead of waiting to fill a full container with your cargo.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By choosing LCL, you only pay for the space your cargo is occupying in the container. 
                You share the space with others as well as the costs. It is cheaper than air freight and 
                it allows you to ship less goods more frequently while spending less money on inventorying 
                and warehousing space.
              </p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm">
                Our LCL services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What is the difference between LCL and FCL? */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                What is the difference between LCL and FCL?
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                There are two main shipping modes when choosing how to ship your cargo via ocean – 
                Less-than-Container-Load (LCL) and Full Container Load (FCL) shipping. Here, we have a 
                simple comparison explaining the meaning of FCL and LCL.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                With FCL shipping, you pay for the whole container, and there will only be one shipper. 
                This means there is also little handling since your FCL shipment does not need to be 
                de-consolidated at the end of the journey and will be sealed right after loading.
              </p>
              <p className="text-gray-600 leading-relaxed">
                LCL shipping, on the contrary, lets you share a container with other shippers and thus 
                consolidate a container that wouldn't be full otherwise. Shipping boxes and pallets allows 
                for a more flexible delivery based on your actual needs, as even the smallest cargo can 
                have a big impact on your business.
              </p>
              <button className="mt-6 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Learn more →
              </button>
            </div>
            <div>
              <img src="/lcl_stuffing_06.avif" alt="LCL vs FCL" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">Side view of a worker in a forklift truck consolidating LCL cargo in boxes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: When to use LCL? */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src="/lcl_stuffing_07.avif" alt="When to use LCL" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">A couple of employees discussing in a warehouse with small boxes in the background.</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                When to use LCL?
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you want to ship small boxes or pallets that fit into 20 feet or 40 feet containers, 
                and do not have enough cargo to fill up a whole container, LCL shipping is the right 
                solution for you. It works perfectly for stackable cargo, but we can also ship your boxes 
                and pallets if they are non-stackable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                LCL shipment is ideal for small and medium enterprises (SMEs) who may not have sufficient 
                cargo to fill a full container. It also works for large and medium enterprises (LMEs) who 
                are facing varying demands or want to test out new markets. Typically, industries like 
                fashion, lifestyle, automotive, technology and FMCG can benefit greatly from LCL shipping.
              </p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all text-sm">
                Our LCL services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How does LCL shipping work? */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                How does LCL shipping work?
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our LCL shipping services are designed for you, and we take care of your cargo from start to finish.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                With Trident, you can easily book your LCL shipment online. Simply log in to the Trident LCL 
                platform and fill out relevant information about your cargo in a few steps. You'll get an 
                instant price and a booking confirmation within 4 hours. After this, you can either drop 
                your boxes (or pallets) at our warehouse or we can pick it up directly from your warehouse.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your cargo will then be grouped with others, loaded, and sealed at a Container Freight Station, 
                and it will leave for your destination on a ship after having gone through customs clearance. 
                If you wish, our customs experts can also take care of the Customs Clearance.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Upon arrival, the container is unloaded, and your boxes (or pallets) are delivered either 
                directly to you or to our warehouse for you to pick up.
              </p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                Book now
              </button>
            </div>
            <div>
              <img src="/lcl_stuffing_08.avif" alt="How LCL Works" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">A woman worker handling a LCL cargo in a warehouse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: How much does LCL shipping cost? */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto" style={{ marginLeft: '300px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              <img src="/lcl_stuffing_03.jpg" alt="LCL Cost" className="w-full h-auto rounded-lg shadow-md" />
              <p className="text-sm text-gray-500 mt-2 text-center">A couple of workers in a consolidation warehouse discussing LCL freight</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-light">
                How much does LCL shipping cost?
              </h2>
              <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed mb-4">
                The cost of LCL shipping depends on a few different factors, the main ones being the volume 
                of space that your cargo will occupy within the container and its weight and the shipping 
                route. Volume is calculated in cubic meters (CBM) and weight in kilograms.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Trident, maximum for a single package is 3,000 kg and 29 CBM and the maximum limit per 
                booking is 20,000 kg and 60 CBM.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When you book LCL via our digital platform, you have complete transparency on speed, options 
                and costs. You'll also get an instant price and a booking confirmation within 4 hours.
              </p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
                Check rates
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
              Should you have any immediate questions regarding LCL, please refer to our customer FAQs. 
              For further queries, just contact us – we are happy to help.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {/* FAQ 1 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is it cheaper to ship LCL or FCL?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The price you will pay for either LCL or FCL shipping depends entirely on your cargo. 
                If you want to ship small boxes or palletized cargo, then it is likely cheaper for you 
                to choose LCL shipping. However, if your goods take up most of a container's space, then 
                it is more cost-effective for you to choose FCL.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 2 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is better: LCL or FCL?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Is Less-than-Container Load or Full Container Load right for your cargo? Learn the 
                differences and benefits of choosing LCL or FCL based on your shipping needs.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 3 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is the maximum CBM for LCL?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The maximum for a single package is 3000 kg and 29 CBM and the maximum limit per booking 
                is 20,000 kg and 60 CBM.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 4 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I get a LCL price?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                On Trident.com and via the Trident App, you can get an instant LCL price and place a 
                booking request. Simply log in to the Trident LCL booking portal or download the Trident App.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 5 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I track my LCL shipment?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Yes, you can track your LCL shipment on our LCL tracking page.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>

            {/* FAQ 6 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I calculate the volume for my LCL cargo?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Within our LCL booking portal, you can use our virtual calculator to calculate your CBM 
                volumes based on your cargo's height, weight, length and width.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Read more →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl mb-4 font-light">Ready to ship your LCL cargo?</h3>
          <p className="text-xl text-gray-300 mb-8">Contact our LCL experts for a customized solution</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all font-medium">
              Get a quote
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">
              Contact us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LCL;
