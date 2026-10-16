// D:/Trident Log/Trident-FE/src/components/Navbar.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/ocean-freight', label: 'Services' },
    { to: '/get-quote', label: 'Get a Quote' },
    { to: '/careers', label: 'Careers' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-md ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-2 md:py-4 flex items-center justify-between md:justify-start">
          {/* Logo — scales by breakpoint */}
          <Link to="/" className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-[#4c6860] rounded-lg -m-1 md:-m-3"></div>
            <div className="relative">
              <img
                src="/Trident-Global-Logistics-Limited-LOGO-White.png"
                alt="Trident Global Logistics Ltd."
                className="h-12 md:h-20 lg:h-28 w-auto cursor-pointer"
              />
            </div>
          </Link>

          {/* Desktop nav — hidden below md */}
          <div className="hidden md:flex items-center gap-1 lg:gap-4 ml-4 lg:ml-8 text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-base lg:text-xl font-medium px-3 lg:px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="text-base lg:text-xl font-medium px-3 lg:px-5 py-2 rounded hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <Mail size={20} />
              Contact Us
            </Link>
          </div>

          {/* Hamburger — only on mobile */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile drawer — slides in from right */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-64 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-lg font-medium py-3 px-4 rounded hover:bg-gray-100 text-gray-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="text-lg font-medium py-3 px-4 rounded hover:bg-gray-100 text-gray-800 flex items-center gap-2 transition-colors"
          >
            <Mail size={20} />
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
