import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('Accueil', 'Home') },
    { path: '/qui-suis-je', label: t('Qui suis-je?', 'About Me') },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/temoignages', label: t('Témoignages', 'Testimonials') },
    { path: '/rendez-vous', label: t('Rendez-vous', 'Appointments') },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-white/95 shadow-lg shadow-[#CAF0F8]/20' : 'bg-white/90'
      } border-b border-[#CAF0F8]`}
      data-testid="main-header"
    >
      <div className="px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <span className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-[#03045E] to-[#0077B6] bg-clip-text text-transparent">
              Sophie Lamour
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.path}`}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#0077B6]'
                    : 'text-[#023E8A] hover:text-[#0077B6]'
                }`}
              >
                {link.label}
              </Link>
            ))}           </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium tracking-wide px-3 py-1.5 rounded-lg bg-[#CAF0F8] hover:bg-[#ADE8F4] transition-colors"
              data-testid="language-toggle"
            >
              <span className={language === 'fr' ? 'text-[#0077B6] font-bold' : 'text-[#023E8A]'}>
                FR
              </span>
              {' / '}
              <span className={language === 'en' ? 'text-[#0077B6] font-bold' : 'text-[#023E8A]'}>
                EN
              </span>
            </button>

            <button
              className="lg:hidden text-[#03045E]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col space-y-3" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#0077B6]'
                    : 'text-[#023E8A]'
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