import { FacebookOutlined, YoutubeOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row gap-10 mb-12" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        
        {/* Logo - Left Side */}
        <div className="flex-shrink-0 flex items-start">
          <img 
            src="/Trident-Global-Logistics-Limited-LOGO-White.png" 
            alt="Trident Global Logistics Limited" 
            style={{ height: '300px', width: 'auto' }}
            className="transition-all duration-300 hover:brightness-0 hover:invert hover:saturate-[.75] hover:hue-rotate-[358deg] hover:sepia-[.75]"
          />
        </div>

        {/* Offices & Links - Middle */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{ paddingLeft: '100px' }}>
          
          {/* Dhaka Office */}
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-[#FFD700]">Dhaka Office</h3>
            <div className="space-y-2 text-l text-gray-400">
              <p className="font-semibold text-white text-l">Trident Global Logistics Limited</p>
              <p>Le Meridien Hotel (Commercial Space)</p>
              <p>Level-06, 79/A, Airport Road</p>
              <p>Nikunja-2, Khilkhet</p>
              <p>Dhaka-1229, Bangladesh</p>
              <div className="mt-3 space-y-1">
                <p>Email: <a href="mailto:asif.ahmed@tgllbd.com" className="hover:text-white transition-colors">asif.ahmed@tgllbd.com</a></p>
                <p>Mobile: <a href="tel:+8801982727100" className="hover:text-white transition-colors">+8801982727100 (Wechat)</a> & <a href="tel:+8801755625928" className="hover:text-white transition-colors">+8801755625928</a> & <a href="tel:+8801713244029" className="hover:text-white transition-colors">+8801713244029</a></p>
                <p>AIN: 301260653</p>
                <p>JCtrans Member ID: 159280</p>
              </div>
            </div>
          </div>

          {/* Chittagong Office */}
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-[#FFD700]">Chittagong Office</h3>
            <div className="space-y-2 text-l text-gray-400">
              <p className="font-semibold text-white text-l">Trident Global Logistics Limited</p>
              <p>3072 Shek Mujib Road</p>
              <p>Agrabad, Chittagong</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFD700]">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors text-lg">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors text-lg">About Us</a></li>
              <li><a href="/ocean-freight" className="text-gray-400 hover:text-white transition-colors text-lg">Services</a></li>
              <li><a href="/get-quote" className="text-gray-400 hover:text-white transition-colors text-lg">Get a Quote</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors text-lg">Careers</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-lg">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons - Far Right, Vertical */}
        <div className="flex-shrink-0 flex flex-col items-center gap-5">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors" title="Facebook">
            <FacebookOutlined style={{ fontSize: '28px' }} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors" title="YouTube">
            <YoutubeOutlined style={{ fontSize: '28px' }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors" title="Instagram">
            <InstagramOutlined style={{ fontSize: '28px' }} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD700] transition-colors" title="LinkedIn">
            <LinkedinOutlined style={{ fontSize: '28px' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
