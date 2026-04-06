import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, ChevronDown } from 'lucide-react';

const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 64 64" className="shrink-0">
    <circle cx="32" cy="32" r="30" fill="#03045E" />
    <text
      x="32" y="44"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="36"
      fontWeight="bold"
      fill="#CAF0F8"
    >S</text>
    <circle cx="32" cy="32" r="30" fill="none" stroke="#0077B6" strokeWidth="2" />
  </svg>
);

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

  const handleServicesEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => setIsServicesOpen(false), 200);
  };

  const serviceSubLinks = [
    { path: '/services/personnel', label: t("Accompagnement Personnel", "Personal Coaching") },
    { path: '/services/professionnel', label: t("Accompagnement Professionnel", "Professional Coaching") },
    { path: '/services/parentalite', label: t("Accompagnement Parentalite", "Parenting Support") },
    { path: '/services/home-organising', label: "Home Organising" },
    { path: '/services/ikigai', label: "Ikigai" },
    { path: '/services/art-therapie', label: t("Art-Therapie", "Art Therapy") },
    { path: '/services/yoga-du-rire', label: t("Yoga Du Rire", "Laughter Yoga") }
  ];

  const navLinks = [
    { path: '/', label: t("Accueil", "Home") },
    { path: '/qui-suis-je', label: t("Qui suis-je?", "About Me") },
    { path: '/blog', label: 'Blog' },
    { path: '/temoignages', label: t("Temoignages", "Testimonials") },
    { path: '/rendez-vous', label: t("Rendez-vous", "Appointments") },
    { path: '/contact', label: 'Contact' }
  ];

  const isServicePage = location.pathname.startsWith('/services');

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-white/95 shadow-lg shadow-[#CAF0F8]/20' : 'bg-white/90'
      } border-b border-[#CAF0F8]`}
      data-testid="main-header"
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-3">
        <div className="flex items-center justify-between">

          {/* Logo — CSS native, matches site typography */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group" data-testid="logo-link">
            <LogoMark />
            <div className="leading-none">
              <span className="block text-lg md:text-xl font-serif font-bold text-[#03045E] group-hover:text-[#0077B6] transition-colors tracking-tight">
                Sophie Lamour
              </span>
              <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-[#0077B6] font-medium mt-0.5">
                {t("Coach de vie & Developpement", "Life Coach & Personal Growth")}
              </span>
            </div>
          </Link>

          {/* Desktop + Tablet Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-5" data-testid="desktop-nav">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.path}`}
                className={`text-xs lg:text-sm font-medium tracking-wide px-2 lg:px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-[#0077B6] bg-[#CAF0F8]/40'
                    : 'text-[#023E8A] hover:text-[#0077B6] hover:bg-[#CAF0F8]/30'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                className={`flex items-center gap-1 text-xs lg:text-sm font-medium tracking-wide px-2 lg:px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                  isServicePage
                    ? 'text-[#0077B6] bg-[#CAF0F8]/40'
                    : 'text-[#023E8A] hover:text-[#0077B6] hover:bg-[#CAF0F8]/30'
                }`}
                data-testid="nav-services-dropdown"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl shadow-[#03045E]/8 border border-[#CAF0F8] py-2 z-50"
                  data-testid="services-dropdown-menu"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <Link
                    to="/services"
                    className="block px-4 py-2.5 text-xs lg:text-sm font-semibold text-[#03045E] hover:bg-[#CAF0F8]/40 transition-colors border-b border-[#CAF0F8]/50 mx-2 rounded-lg"
                  >
                    {t("Tous les services", "All Services")}
                  </Link>
                  {serviceSubLinks.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      data-testid={`nav-sub-${sub.path}`}
                      className={`block px-4 py-2.5 text-xs lg:text-sm transition-colors mx-2 rounded-lg ${
                        location.pathname === sub.path
                          ? 'text-[#0077B6] bg-[#CAF0F8]/40 font-medium'
                          : 'text-[#023E8A] hover:text-[#0077B6] hover:bg-[#CAF0F8]/30'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.path}`}
                className={`text-xs lg:text-sm font-medium tracking-wide px-2 lg:px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-[#0077B6] bg-[#CAF0F8]/40'
                    : 'text-[#023E8A] hover:text-[#0077B6] hover:bg-[#CAF0F8]/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className="text-xs font-medium tracking-wide px-2.5 py-1.5 rounded-lg bg-[#CAF0F8] hover:bg-[#ADE8F4] transition-colors"
              data-testid="language-toggle"
            >
              <span className={language === 'fr' ? 'text-[#0077B6] font-bold' : 'text-[#023E8A]'}>FR</span>
              {' / '}
              <span className={language === 'en' ? 'text-[#0077B6] font-bold' : 'text-[#023E8A]'}>EN</span>
            </button>

            <button
              className="md:hidden text-[#03045E] p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-1 border-t border-[#CAF0F8] pt-4" data-testid="mobile-menu">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-wide px-3 py-2.5 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#0077B6] bg-[#CAF0F8]/40'
                    : 'text-[#023E8A] hover:bg-[#CAF0F8]/30'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`w-full flex items-center justify-between text-sm font-medium tracking-wide px-3 py-2.5 rounded-lg transition-colors ${
                  isServicePage
                    ? 'text-[#0077B6] bg-[#CAF0F8]/40'
                    : 'text-[#023E8A] hover:bg-[#CAF0F8]/30'
                }`}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isMobileServicesOpen && (
                <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-[#CAF0F8] pl-3">
                  <Link
                    to="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-[#03045E] px-3 py-2 rounded-lg hover:bg-[#CAF0F8]/30"
                  >
                    {t("Tous les services", "All Services")}
                  </Link>
                  {serviceSubLinks.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === sub.path
                          ? 'text-[#0077B6] font-medium bg-[#CAF0F8]/40'
                          : 'text-[#023E8A] hover:bg-[#CAF0F8]/30'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-wide px-3 py-2.5 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#0077B6] bg-[#CAF0F8]/40'
                    : 'text-[#023E8A] hover:bg-[#CAF0F8]/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
