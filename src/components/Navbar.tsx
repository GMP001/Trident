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
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      hidden ? '-translate-y-full' : 'translate-y-0'
    } ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      
      {/* Main Navbar Container */}
      <div className="px-8 md:px-16 lg:px-24 py-4 flex items-center" style={{ marginLeft: '300px' }}>
        
        {/* Logo - Now Clickable */}
        <Link to="/" className="relative">
          <div className="absolute inset-0 bg-black/40 rounded-lg -m-3 p-3"></div>
          <div className="relative">
            <img 
              src="/trident-logo.png" 
              alt="Trident Global Logistics Ltd." 
              className="h-28 w-auto cursor-pointer"
            />
          </div>
        </Link>

        {/* Navigation Buttons */}
        <div className={`flex items-center gap-4 ml-8 transition-colors duration-300 ${
          isScrolled ? 'text-gray-800' : 'text-white'
        }`}>
          
          {/* Services Mega Dropdown - Now with Hover */}
          <div 
            className="relative dropdown-container"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
            >
              Services <ChevronDown size={16} className={`transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mega Dropdown Menu - 4 Column Grid Layout */}
            {openDropdown === 'services' && (
              <div 
                className="fixed left-0 right-0 mt-2 bg-white shadow-2xl border-t border-gray-200 overflow-y-auto" 
                style={{ top: '120px', maxHeight: '70vh' }}
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="max-w-7xl mx-auto px-8 py-6">
                  
                  {/* 4 Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                  {/* COLUMN 1 - TRANSPORT */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Transport</h3>
                    <div className="space-y-4">
                      <Link to="/ocean-transport" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Ocean Transport</p>
                        <p className="text-sm text-gray-500">Ship with stable rates and assured space</p>
                      </Link>
                      <Link to="/inland-transport" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Inland Transport</p>
                        <p className="text-sm text-gray-500">Move containers between ports and inland</p>
                      </Link>
                      <Link to="/lcl" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Less-than-Container Load (LCL)</p>
                        <p className="text-sm text-gray-500">Ship small-volume cargo via ocean</p>
                      </Link>
                      <Link to="/air-freight" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Air Freight</p>
                        <p className="text-sm text-gray-500">Fly your cargo for faster arrival</p>
                      </Link>
                      <Link to="/ground-freight" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Trident Ground Freight Transport</p>
                        <p className="text-sm text-gray-500">Full Truckload and Less-than-Truckload</p>
                      </Link>
                    </div>
                  </div>

                  {/* COLUMN 2 - STORE & CLEAR & PROTECT */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Store</h3>
                    <div className="space-y-4 mb-6">
                      <Link to="/warehousing" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Warehousing</p>
                        <p className="text-sm text-gray-500">Store goods for end-to-end distribution</p>
                      </Link>
                      <Link to="/depot" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Depot</p>
                        <p className="text-sm text-gray-500">Pit stops for your cargo</p>
                      </Link>
                      <Link to="/cold-storage" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Cold Storage</p>
                        <p className="text-sm text-gray-500">Facilities to ensure unbroken cold chains</p>
                      </Link>
                    </div>
                    
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 mt-2">Clear & Protect</h3>
                    <div className="space-y-4">
                      <Link to="/customs-services" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Trident Customs Services</p>
                        <p className="text-sm text-gray-500">Simplify global customs with local expertise</p>
                      </Link>
                    </div>
                  </div>

                  {/* COLUMN 3 - LOGISTICS MANAGEMENT */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Logistics Management</h3>
                    <div className="space-y-4">
                      <Link to="/project-logistics" onClick={handleLinkClick} className="group block">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Trident Project Logistics</p>
                        <p className="text-sm text-gray-500">Large-scale industrial projects</p>
                      </Link>
                    </div>
                  </div>

                  {/* COLUMN 4 - BY INDUSTRY */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">By Industry</h3>
                    <div className="space-y-2">
                      <Link to="/industry/fmcg" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 text-sm font-bold">
                        FMCG
                      </Link>
                      <Link to="/fashion-lifestyle" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 text-sm font-bold">
                        Fashion & Lifestyle
                      </Link>
                      <Link to="/industry/retail" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 text-sm font-bold">
                        Retail
                      </Link>
                      <Link to="/industry/chemicals" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 text-sm font-bold">
                        Chemicals
                      </Link>
                      <Link to="/industry/automotive" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 text-sm font-bold">
                        Automotive
                      </Link>
                      <Link to="/industry/pharma" onClick={handleLinkClick} className="block text-gray-700 hover:text-blue-600 text-sm font-bold">
                        Pharma & Healthcare
                      </Link>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100">
                    </div>
                  </div>
                  </div>

                  {/* Bottom Featured Card */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-lg p-5">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">Trident all services</h4>
                          <p className="text-gray-600 text-sm">Connect your logistics network with reliable trucking services across all distances.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* About Us */}
          <Link to="/about" onClick={handleLinkClick} className="text-xl font-medium px-5 py-2 rounded hover:bg-black/30 hover:text-gray-400 transition-all duration-200 whitespace-nowrap">
            About Us
          </Link>

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
