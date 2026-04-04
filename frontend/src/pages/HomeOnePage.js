import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import axios from 'axios';
import { Heart, Briefcase, Baby, Home as HomeIcon, Target, Palette, Mail, Phone, MapPin, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const HomeOnePage = () => {
  const { t, language } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [testimonialsRes, blogRes] = await Promise.all([
        axios.get(`${API_URL}/api/testimonials`),
        axios.get(`${API_URL}/api/blog/posts?status=published`)
      ]);
      setTestimonials(testimonialsRes.data.slice(0, 5));
      setBlogPosts(blogRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/contact`, contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setContactStatus('error');
    }
  };

  const services = [
    {
      icon: Heart,
      title: t('Accompagnement Personnel', 'Personal Coaching'),
      desc: t("(Re)trouvez votre équilibre et votre raison d'être", 'Rediscover your balance and purpose'),
      span: 'md:col-span-6'
    },
    {
      icon: Briefcase,
      title: t('Accompagnement Professionnel', 'Professional Coaching'),
      desc: t('Construisez un avenir aligné avec vos valeurs', 'Build a future aligned with your values'),
      span: 'md:col-span-6'
    },
    {
      icon: Baby,
      title: t('Accompagnement Parentalité', 'Parenting Support'),
      desc: t('Grandissez ensemble en famille', 'Grow together as a family'),
      span: 'md:col-span-4'
    },
    {
      icon: HomeIcon,
      title: 'Home Organising',
      desc: t('Créez un environnement qui vous apaise', 'Create an environment that soothes you'),
      span: 'md:col-span-4'
    },
    {
      icon: Target,
      title: 'Ikigaï',
      desc: t('Trouvez votre boussole intérieure', 'Find your inner compass'),
      span: 'md:col-span-4'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('Sophie Lamour - Coach de vie et développement personnel', 'Sophie Lamour - Life Coach & Personal Development')}</title>
        <meta name="description" content={t(
          'Accompagnement personnalisé en développement personnel, coaching professionnel, parentalité, home organising et ikigai.',
          'Personalized support in personal development, professional coaching, parenting, home organizing and ikigai.'
        )} />
      </Helmet>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden" 
        data-testid="hero-section"
        id="home"
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1713973243889-c12fe6f60807?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwY2FsbXxlbnwwfHx8fDE3NzUzMTcyMTR8MA&ixlib=rb-4.1.0&q=85)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#083344]/60 via-[#06B6D4]/40 to-[#14B8A6]/50" />
        </motion.div>
        
        <motion.div 
          className="relative z-10 text-center px-6 md:px-12 text-white"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">{t('Coaching de vie', 'Life Coaching')}</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-light tracking-tighter mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("Découvrez votre raison d'être", 'Discover Your Purpose')}
          </motion.h1>
          
          <motion.p 
            className="text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8 text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t(
              'Bienvenue dans un espace dédié à votre transformation et à votre épanouissement.',
              'Welcome to a space dedicated to your transformation and fulfillment.'
            )}
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 bg-white text-[#06B6D4] hover:bg-[#F0F9FF] rounded-full px-8 py-4 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              {t('Prendre rendez-vous', 'Book Appointment')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-4 transition-all duration-300 font-medium backdrop-blur-sm"
            >
              {t('En savoir plus', 'Learn More')}
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-white/70" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white" id="services" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#06B6D4] mb-4 block">
                {t('Services', 'Services')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal tracking-tight text-[#083344] mb-6">
                {t('Comment puis-je vous aider?', 'How Can I Help You?')}
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <FadeInSection key={idx} delay={idx * 0.1}>
                  <motion.div
                    className={`${service.span} group bg-gradient-to-br from-[#F0F9FF] to-white rounded-3xl p-8 border border-cyan-100 hover:border-[#06B6D4] transition-all duration-300 cursor-pointer`}
                    whileHover={{ y: -4, scale: 1.02 }}
                    data-testid={`service-card-${idx}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#14B8A6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#083344] mb-3">{service.title}</h3>
                    <p className="text-base leading-relaxed text-[#475569]">{service.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-[#06B6D4] font-medium group-hover:gap-3 transition-all">
                      {t('Découvrir', 'Learn More')}
                      <ArrowRight size={18} />
                    </div>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[#F0F9FF]" id="about" data-testid="about-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <FadeInSection>
              <div className="lg:col-span-5">
                <img
                  src="https://sophielamour.com/wp-content/uploads/2025/02/IMG-20250207-WA0001-e1740056629770-891x1024.jpg"
                  alt="Sophie Lamour"
                  className="rounded-[2rem] shadow-2xl w-full sticky top-24"
                />
              </div>
            </FadeInSection>

            <div className="lg:col-span-7 space-y-8">
              <FadeInSection delay={0.2}>
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#06B6D4] mb-4 block">
                  {t('Qui suis-je?', 'About Me')}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal tracking-tight text-[#083344] mb-6">
                  Sophie Lamour
                </h2>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#475569]">
                  <p>
                    {t(
                      "Je m'appelle Sophie Lamour, et je suis profondément convaincue que chaque individu possède en lui les ressources nécessaires pour évoluer, grandir et surmonter les défis de la vie.",
                      "My name is Sophie Lamour, and I am deeply convinced that every individual has within them the necessary resources to evolve, grow, and overcome life's challenges."
                    )}
                  </p>
                  <p>
                    {t(
                      "Pendant plus de 20 ans, j'ai évolué dans le monde du commerce avant de traverser une période de transformation personnelle qui m'a amenée au coaching en 2020.",
                      'For over 20 years, I worked in commerce before going through a period of personal transformation that led me to coaching in 2020.'
                    )}
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.4}>
                <div className="grid grid-cols-2 gap-6 mt-12">
                  {[
                    { title: t('Bienveillance', 'Kindness'), desc: t('Accueil sans jugement', 'Welcome without judgment') },
                    { title: t('Authenticité', 'Authenticity'), desc: t('Vivre selon ses valeurs', 'Live by your values') },
                    { title: t('Lâcher-prise', 'Letting Go'), desc: t('Libérer son énergie', 'Release energy') },
                    { title: t('Quête de sens', 'Search for Meaning'), desc: t('Trouver sa raison d\'être', 'Find your purpose') }
                  ].map((value, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-cyan-100"
                      whileHover={{ scale: 1.05 }}
                    >
                      <h4 className="text-xl font-heading font-medium text-[#083344] mb-2">{value.title}</h4>
                      <p className="text-sm text-[#475569]">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      {blogPosts.length > 0 && (
        <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white" id="blog" data-testid="blog-section">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-16">
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#06B6D4] mb-4 block">
                  Blog
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal tracking-tight text-[#083344] mb-6">
                  {t('Dernières réflexions', 'Latest Thoughts')}
                </h2>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, idx) => (
                <FadeInSection key={idx} delay={idx * 0.1}>
                  <motion.div
                    className="group cursor-pointer"
                    whileHover={{ y: -8 }}
                    data-testid={`blog-card-${idx}`}
                  >
                    {post.featured_image && (
                      <div className="overflow-hidden rounded-[2rem] mb-4">
                        <img
                          src={post.featured_image}
                          alt={language === 'fr' ? post.title_fr : post.title_en}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-[#06B6D4]">{new Date(post.created_at).toLocaleDateString(language)}</span>
                      <span className="text-xs px-3 py-1 bg-[#E0F2FE] text-[#06B6D4] rounded-full">{post.category}</span>
                    </div>
                    <h3 className="text-2xl font-heading font-medium text-[#083344] mb-3 group-hover:text-[#06B6D4] transition-colors">
                      {language === 'fr' ? post.title_fr : post.title_en}
                    </h3>
                    <p className="text-base text-[#475569] mb-4 line-clamp-2">
                      {language === 'fr' ? post.excerpt_fr : post.excerpt_en}
                    </p>
                    <div className="flex items-center gap-2 text-[#06B6D4] font-medium">
                      {t('Lire la suite', 'Read More')}
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#F0F9FF] to-[#CCFBF1]" id="testimonials" data-testid="testimonials-section">
          <div className="max-w-7xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-16">
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#06B6D4] mb-4 block">
                  {t('Témoignages', 'Testimonials')}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal tracking-tight text-[#083344] mb-6">
                  {t('Ce que disent mes clients', 'What My Clients Say')}
                </h2>
              </div>
            </FadeInSection>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                    <motion.div 
                      className="bg-white rounded-3xl p-8 shadow-lg h-full"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-[#06B6D4] text-xl">★</span>
                        ))}
                      </div>
                      <p className="text-base leading-relaxed text-[#475569] mb-6">
                        "{language === 'fr' ? testimonial.text_fr : testimonial.text_en}"
                      </p>
                      <p className="font-semibold text-[#083344]">{testimonial.name}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white" id="contact" data-testid="contact-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeInSection>
              <div>
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#06B6D4] mb-4 block">
                  Contact
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal tracking-tight text-[#083344] mb-6">
                  {t('Commençons ensemble', 'Let\'s Start Together')}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-[#475569] mb-8">
                  {t(
                    'Prête à vous accompagner dans votre voyage de transformation.',
                    'Ready to support you in your transformation journey.'
                  )}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#083344] mb-1">Email</p>
                      <a href="mailto:contact@sophielamour.com" className="text-[#475569] hover:text-[#06B6D4] transition-colors">
                        contact@sophielamour.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#083344] mb-1">{t('Téléphone', 'Phone')}</p>
                      <p className="text-[#475569]">+33 X XX XX XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#083344] mb-1">{t('Localisation', 'Location')}</p>
                      <p className="text-[#475569]">France</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <form onSubmit={handleContactSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder={t('Nom', 'Name')}
                    required
                    data-testid="contact-name"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-[#06B6D4] focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="Email"
                    required
                    data-testid="contact-email"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-[#06B6D4] focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    placeholder={t('Téléphone', 'Phone')}
                    data-testid="contact-phone"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-[#06B6D4] focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    placeholder={t('Sujet', 'Subject')}
                    required
                    data-testid="contact-subject"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-[#06B6D4] focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Message"
                    required
                    rows={5}
                    data-testid="contact-message"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-cyan-100 focus:border-[#06B6D4] focus:outline-none transition-colors resize-none bg-white"
                  />
                </div>

                {contactStatus === 'success' && (
                  <div className="p-4 bg-[#CCFBF1] text-[#14B8A6] rounded-2xl" data-testid="contact-success">
                    {t('Message envoyé avec succès!', 'Message sent successfully!')}
                  </div>
                )}

                {contactStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl" data-testid="contact-error">
                    {t('Une erreur est survenue.', 'An error occurred.')}
                  </div>
                )}

                <motion.button
                  type="submit"
                  data-testid="contact-submit"
                  className="w-full ocean-gradient text-white rounded-full px-8 py-4 font-medium shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('Envoyer', 'Send')}
                </motion.button>
              </form>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeOnePage;
