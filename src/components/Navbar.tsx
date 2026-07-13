import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Ref for hover timeout - using number type instead of NodeJS.Timeout
  const hoverTimeoutRef = useRef<number | null>(null);

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

  // Close dropdown when clicking on a link inside dropdown
  const handleLinkClick = () => {
    setOpenDropdown(null);
  };

  // Handle mouse enter for dropdown
  const handleMouseEnter = (dropdown: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenDropdown(dropdown);
  };

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
      }
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-md ${
      hidden ? '-translate-y-full' : 'translate-y-0'
    }`}>
      
      {/* Main Navbar Container */}
      <div className="px-8 md:px-16 lg:px-24 py-4 flex items-center" style={{ marginLeft: '100px' }}>
        
        {/* Logo - Now Clickable */}
        <Link to="/" className="relative">
          <div className="absolute inset-0 bg-black/40 rounded-lg -m-3 p-3"></div>
          <div className="relative">
            <img 
              src="/Trident-Global-Logistics-Limited-LOGO-black.png" 
              alt="Trident Global Logistics Ltd." 
              className="h-28 w-auto cursor-pointer"
            />
          </div>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 ml-8 text-gray-800">
          
          <Link to="/" onClick={handleLinkClick} className="text-xl font-medium px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 whitespace-nowrap">
            Home
          </Link>
          {/* About Us */}
          <Link to="/about" onClick={handleLinkClick} className="text-xl font-medium px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 whitespace-nowrap">
            About Us
          </Link>
          
          <Link to="/ocean-freight" onClick={handleLinkClick} className="text-xl font-medium px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 whitespace-nowrap">
            Services
          </Link>
          <Link to="/get-quote" onClick={handleLinkClick} className="text-xl font-medium px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 whitespace-nowrap">
            Get a Quote
          </Link>
          <Link to="/careers" onClick={handleLinkClick} className="text-xl font-medium px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 whitespace-nowrap">
            Careers
          </Link>
          <a href="#contact" className="text-xl font-medium px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
            <Link to="/contact" onClick={handleLinkClick} className="text-xl font-medium px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
              <Mail size={20} />
              Contact Us
            </Link>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
