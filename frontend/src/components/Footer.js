import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Linkedin, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-[#03045E] to-[#023E8A] text-white py-20 lg:py-32" data-testid="main-footer">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="text-2xl font-serif font-bold text-white mb-4 block">
              Sophie Lamour
            </span>
            <p className="text-white/80 leading-relaxed">
              {t(
                'Accompagnement personnalisé en développement personnel et coaching de vie.',
                'Personalized support in personal development and life coaching.'
              )}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">
              {t('Liens rapides', 'Quick Links')}
            </h3>
            <ul className="space-y-2">
              <Link to="/qui-suis-je" className="block text-white/80 hover:text-[#48CAE4] transition-colors">
                {t('Qui suis-je?', 'About Me')}
              </Link>
              <Link to="/services" className="block text-white/80 hover:text-[#48CAE4] transition-colors">
                Services
              </Link>
              <Link to="/blog" className="block text-white/80 hover:text-[#48CAE4] transition-colors">
                Blog
              </Link>
              <Link to="/rendez-vous" className="block text-white/80 hover:text-[#48CAE4] transition-colors">
                {t('Prendre rendez-vous', 'Book Appointment')}
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/80">
                <Mail size={18} />
                <a href="mailto:contact@sophielamour.com" className="hover:text-[#48CAE4] transition-colors">
                  contact@sophielamour.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Phone size={18} />
                <a href="tel:+33689844778" className="hover:text-[#48CAE4] transition-colors">
                  +33 6 89 84 47 78
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <MessageCircle size={18} />
                <a 
                  href="https://wa.me/33689844778" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#48CAE4] transition-colors"
                  data-testid="whatsapp-footer"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <MapPin size={18} />
                <a 
                  href="https://www.google.com/maps/place/Ch%C3%A2teau-Landon,+77570+France/@48.1522,2.7006,13z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#48CAE4] transition-colors"
                  data-testid="location-footer"
                >
                  Château-Landon 77570
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#48CAE4] transition-colors"
                data-testid="social-facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#48CAE4] transition-colors"
                data-testid="social-instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#48CAE4] transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Sophie Lamour. {t('Tous droits réservés.', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;