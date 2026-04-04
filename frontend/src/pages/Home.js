import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Heart, Briefcase, Baby, Home as HomeIcon, Target, Palette } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const { t, language } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [emblaRef] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    fetchTestimonials();
    fetchBlogPosts();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/testimonials`);
      setTestimonials(data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/blog/posts?status=published`);
      setBlogPosts(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const services = [
    {
      icon: Heart,
      title: t('Accompagnement Personnel', 'Personal Coaching'),
      desc: t('(Re)trouvez votre équilibre et votre raison d’être', 'Rediscover your balance and purpose'),
      link: '/services/personnel'
    },
    {
      icon: Briefcase,
      title: t('Accompagnement Professionnel', 'Professional Coaching'),
      desc: t('Construisez un avenir aligné avec vos valeurs', 'Build a future aligned with your values'),
      link: '/services/professionnel'
    },
    {
      icon: Baby,
      title: t('Accompagnement Parentalité', 'Parenting Support'),
      desc: t('Grandissez ensemble en famille', 'Grow together as a family'),
      link: '/services/parentalite'
    },
    {
      icon: HomeIcon,
      title: 'Home Organising',
      desc: t('Créez un environnement qui vous apaise', 'Create an environment that soothes you'),
      link: '/services/home-organising'
    },
    {
      icon: Target,
      title: 'Ikigaï',
      desc: t('Trouvez votre boussole intérieure', 'Find your inner compass'),
      link: '/services/ikigai'
    },
    {
      icon: Palette,
      title: t('Art-thérapie', 'Art Therapy'),
      desc: t('Explorer, créer, se reconnecter à soi', 'Explore, create, reconnect with yourself'),
      link: '/services/art-therapie'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('Sophie Lamour - Coach de vie et développement personnel', 'Sophie Lamour - Life Coach & Personal Development')}</title>
        <meta name="description" content={t(
          'Accompagnement personnalisé en développement personnel, coaching professionnel, parentalité, home organising, ikigai et yoga du rire.',
          'Personalized support in personal development, professional coaching, parenting, home organizing, ikigai and laughter yoga.'
        )} />
      </Helmet>

      {/* Hero Section */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24" data-testid="hero-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight font-serif text-[#2C2C2A] mb-6">
              {t('Découvrez votre raison d’être', 'Discover Your Purpose')}
            </h1>
            <p className="text-base lg:text-lg leading-relaxed text-[#5C5A56] font-sans mb-8">
              {t(
                'Bienvenue dans un espace dédié à votre transformation et à votre épanouissement. Mon approche bienveillante s’adapte à vos besoins uniques.',
                'Welcome to a space dedicated to your transformation and fulfillment. My caring approach adapts to your unique needs.'
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/rendez-vous"
                data-testid="hero-cta-primary"
                className="bg-[#D9A098] text-white hover:bg-[#C48A7E] rounded-full px-8 py-4 transition-all duration-300 font-medium tracking-wide shadow-sm hover:shadow-md"
              >
                {t('Prendre rendez-vous', 'Book Appointment')}
              </Link>
              <Link
                to="/qui-suis-je"
                data-testid="hero-cta-secondary"
                className="bg-transparent border border-[#9EAB9A] text-[#5C5A56] hover:bg-[#9EAB9A] hover:text-white rounded-full px-8 py-4 transition-all duration-300 font-medium tracking-wide"
              >
                {t('En savoir plus', 'Learn More')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://sophielamour.com/wp-content/uploads/2025/02/IMG-20250207-WA0001-e1740056629770.jpg"
              alt="Sophie Lamour"
              className="rounded-3xl shadow-[0_16px_48px_rgba(217,160,152,0.15)] w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#F3EFEA]" data-testid="services-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-snug font-serif text-[#2C2C2A] mb-4">
            {t('Quel accompagnement est fait pour vous?', 'Which Support is Right for You?')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                to={service.link}
                data-testid={`service-card-${idx}`}
                className="bg-white rounded-3xl p-8 lg:p-10 border border-[#E8E2D9] shadow-[0_8px_32px_rgba(44,44,42,0.04)] hover:shadow-[0_16px_48px_rgba(217,160,152,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-14 h-14 rounded-full bg-[#9EAB9A]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#9EAB9A]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2C2C2A] mb-3">{service.title}</h3>
                <p className="text-base lg:text-lg leading-relaxed text-[#5C5A56] font-sans mb-6">{service.desc}</p>
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#9EAB9A]">
                  {t('Découvrir', 'Discover')} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-[#9EAB9A]/10" data-testid="testimonials-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-snug font-serif text-[#2C2C2A] mb-4">
              {t('Ce que disent mes clients', 'What My Clients Say')}
            </h2>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                  <div className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(44,44,42,0.04)]">
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Preview Section */}
      {blogPosts.length > 0 && (
        <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24" data-testid="blog-preview-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-snug font-serif text-[#2C2C2A] mb-4">
              {t('Dernières réflexions', 'Latest Thoughts')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <Link
                key={idx}
                to={`/blog/${post.slug}`}
                data-testid={`blog-preview-${idx}`}
                className="group"
              >
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={language === 'fr' ? post.title_fr : post.title_en}
                    className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <p className="text-sm text-[#9EAB9A] mb-2">{new Date(post.created_at).toLocaleDateString(language)}</p>
                <h3 className="text-xl font-serif text-[#2C2C2A] mb-2 group-hover:text-[#D9A098] transition-colors">
                  {language === 'fr' ? post.title_fr : post.title_en}
                </h3>
                <p className="text-base text-[#5C5A56] mb-4">
                  {language === 'fr' ? post.excerpt_fr : post.excerpt_en}
                </p>
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#9EAB9A]">
                  {t('Lire la suite', 'Read More')} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#D9A098]" data-testid="cta-banner">
        <div className="text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-6">
            {t('Prêt à commencer votre transformation?', 'Ready to Start Your Transformation?')}
          </h2>
          <Link
            to="/rendez-vous"
            data-testid="cta-banner-button"
            className="inline-block bg-white text-[#D9A098] hover:bg-[#FAF8F5] rounded-full px-8 py-4 transition-all duration-300 font-medium tracking-wide shadow-md hover:shadow-lg"
          >
            {t('Prendre rendez-vous maintenant', 'Book Appointment Now')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;