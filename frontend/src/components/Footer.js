import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Linkedin, Mail, Phone, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-[#083344] to-[#164E63] text-white py-20 lg:py-24" data-testid="main-footer">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-heading font-semibold mb-4">Sophie Lamour</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              {t(
                'Accompagnement personnalisé en développement personnel et coaching de vie.',
                'Personalized support in personal development and life coaching.'
              )}
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#06B6D4] flex items-center justify-center transition-all"
                data-testid="social-facebook"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#06B6D4] flex items-center justify-center transition-all"
                data-testid="social-instagram"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#06B6D4] flex items-center justify-center transition-all"
                data-testid="social-linkedin"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-4">
              {t('Navigation', 'Navigation')}
            </h3>
            <ul className="space-y-2">
              {['services', 'about', 'blog', 'testimonials', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/70 hover:text-[#06B6D4] transition-colors capitalize"
                  >
                    {section === 'about' ? t('À propos', 'About') : 
                     section === 'testimonials' ? t('Témoignages', 'Testimonials') : 
                     section}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-heading font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70">
                <Mail size={18} className="text-[#06B6D4]" />
                <span>contact@sophielamour.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone size={18} className="text-[#06B6D4]" />
                <span>+33 X XX XX XX XX</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center max-w-7xl mx-auto">
          <p className="text-white/50 text-sm flex items-center justify-center gap-2">
            &copy; {new Date().getFullYear()} Sophie Lamour. {t('Tous droits réservés.', 'All rights reserved.')}
            <Heart size={14} className="text-[#06B6D4]" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;