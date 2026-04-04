import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'blog', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t('Accueil', 'Home') },
    { id: 'services', label: 'Services' },
    { id: 'about', label: t('À propos', 'About') },
    { id: 'blog', label: 'Blog' },
    { id: 'testimonials', label: t('Témoignages', 'Testimonials') },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      } border-b border-white/20`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      data-testid="main-header"
    >
      <div className="px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')} 
            className="flex items-center group" 
            data-testid="logo-link"
          >
            <span className="text-2xl font-heading font-semibold text-[#083344] group-hover:text-[#06B6D4] transition-colors">
              Sophie Lamour
            </span>
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                data-testid={`nav-${link.id}`}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative ${
                  activeSection === link.id
                    ? 'text-[#06B6D4]'
                    : 'text-[#083344] hover:text-[#06B6D4]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#06B6D4]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleLanguage}
              className="text-sm font-medium tracking-wide px-4 py-2 rounded-full bg-white/50 hover:bg-white/80 transition-all"
              data-testid="language-toggle"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={language === 'fr' ? 'text-[#06B6D4] font-bold' : 'text-[#475569]'}>
                FR
              </span>
              {' / '}
              <span className={language === 'en' ? 'text-[#06B6D4] font-bold' : 'text-[#475569]'}>
                EN
              </span>
            </motion.button>

            <button
              className="lg:hidden text-[#083344]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.nav 
            className="lg:hidden mt-4 pb-4 flex flex-col space-y-3 bg-white/90 backdrop-blur-xl rounded-2xl p-4" 
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 text-left ${
                  activeSection === link.id
                    ? 'text-[#06B6D4]'
                    : 'text-[#083344]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;