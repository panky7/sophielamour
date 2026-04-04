import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Mail, Phone, MapPin } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('Contact - Sophie Lamour', 'Contact - Sophie Lamour')}</title>
      </Helmet>

      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24" data-testid="contact-page">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight font-serif text-[#2C2C2A] mb-6">
              Contact
            </h1>
            <p className="text-base lg:text-lg leading-relaxed text-[#5C5A56]">
              {t(
                'Une question? Un projet? N’hésitez pas à me contacter.',
                'A question? A project? Feel free to contact me.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif text-[#2C2C2A] mb-6">{t('Informations de contact', 'Contact Information')}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#9EAB9A]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#9EAB9A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C2C2A] mb-1">Email</p>
                    <a href="mailto:contact@sophielamour.com" className="text-[#5C5A56] hover:text-[#D9A098]">
                      contact@sophielamour.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#9EAB9A]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#9EAB9A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C2C2A] mb-1">{t('Téléphone', 'Phone')}</p>
                    <p className="text-[#5C5A56]">+33 X XX XX XX XX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#9EAB9A]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#9EAB9A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2C2C2A] mb-1">{t('Localisation', 'Location')}</p>
                    <p className="text-[#5C5A56]">France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(44,44,42,0.04)]">
              <form onSubmit={handleSubmit} data-testid="contact-form">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2A] mb-2">
                      {t('Nom', 'Name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      data-testid="contact-name"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2A] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-testid="contact-email"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#2C2C2A] mb-2">
                      {t('Téléphone', 'Phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      data-testid="contact-phone"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#2C2C2A] mb-2">
                      {t('Sujet', 'Subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      data-testid="contact-subject"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2A] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      data-testid="contact-message"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] focus:outline-none focus:border-[#D9A098] transition-colors resize-none"
                    />
                  </div>

                  {status === 'success' && (
                    <div className="p-4 bg-[#9EAB9A]/10 text-[#9EAB9A] rounded-xl" data-testid="contact-success">
                      {t('Message envoyé avec succès!', 'Message sent successfully!')}
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl" data-testid="contact-error">
                      {t('Une erreur est survenue. Veuillez réessayer.', 'An error occurred. Please try again.')}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="contact-submit"
                    className="w-full bg-[#D9A098] text-white hover:bg-[#C48A7E] rounded-full px-8 py-4 transition-all duration-300 font-medium tracking-wide shadow-sm hover:shadow-md disabled:opacity-50"
                  >
                    {loading ? t('Envoi...', 'Sending...') : t('Envoyer', 'Send')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;