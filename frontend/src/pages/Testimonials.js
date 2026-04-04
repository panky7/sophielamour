import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Testimonials = () => {
  const { t, language } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [emblaRef] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/testimonials`);
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('Témoignages - Sophie Lamour', 'Testimonials - Sophie Lamour')}</title>
      </Helmet>

      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24" data-testid="testimonials-page">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight font-serif text-[#2C2C2A] mb-6">
            {t('Témoignages', 'Testimonials')}
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-[#5C5A56] max-w-3xl mx-auto">
            {t(
              'Découvrez les expériences de ceux qui ont fait confiance à mon accompagnement.',
              'Discover the experiences of those who trusted my support.'
            )}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center text-[#5C5A56]">{t('Aucun témoignage pour le moment.', 'No testimonials yet.')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(44,44,42,0.04)]" data-testid={`testimonial-${idx}`}>
                <div className="text-6xl font-serif text-[#D9A098] mb-4">“</div>
                <p className="text-base leading-relaxed text-[#5C5A56] mb-6">
                  {language === 'fr' ? testimonial.text_fr : testimonial.text_en}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#D9A098] text-xl">★</span>
                  ))}
                </div>
                <p className="font-semibold text-[#2C2C2A]">{testimonial.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Testimonials;