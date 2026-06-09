import { useState, useEffect } from 'react';
import { Search, HelpCircle, Mail, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      hidden ? '-translate-y-full' : 'translate-y-0'
    } ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      
      {/* CHANGED: Added min left margin of 300px */}
      <div className="px-8 md:px-16 lg:px-24 py-4 flex items-center" style={{ marginLeft: '300px' }}>
        
        {/* Logo with semi-transparent background box */}
        <div className="relative">
          {/* Permanent square shape background box with rounded corners and 40% opacity */}
          <div className="absolute inset-0 bg-black/40 rounded-lg -m-3 p-3"></div>
          <div className="relative">
            <img 
              src="/trident-logo.png" 
              alt="Trident Global Logistics Ltd." 
              className="h-28 w-auto"
            />
          </div>
        </div>

        {/* All Navigation Buttons - Now with dynamic text color based on scroll */}
        <div className={`flex items-center gap-4 ml-8 transition-colors duration-300 ${
          isScrolled ? 'text-gray-800' : 'text-white'
        }`}>
          
          <a href="#services" className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 flex items-center gap-1 whitespace-nowrap">
            Services <ChevronDown size={16} />
          </a>
          
          <a href="#about" className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 whitespace-nowrap">
            About Us
          </a>
          
          <a href="#reach" className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 flex items-center gap-1 whitespace-nowrap">
            Our Reach <ChevronDown size={16} />
          </a>
          
          <a href="#solutions" className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 flex items-center gap-1 whitespace-nowrap">
            Solutions <ChevronDown size={16} />
          </a>

          <a href="#ask-trident" className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
            <Search size={20} />
            Ask Trident
          </a>

          <a href="#contact" className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
            <Mail size={20} />
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
