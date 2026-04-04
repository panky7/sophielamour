import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Heart, Briefcase, Baby, Home as HomeIcon } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

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
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('Services - Sophie Lamour', 'Services - Sophie Lamour')}</title>
        <meta name="description" content={t(
          'Découvrez mes services d’accompagnement personnalisé en développement personnel, coaching professionnel, parentalité et home organising.',
          'Discover my personalized support services in personal development, professional coaching, parenting, and home organizing.'
        )} />
      </Helmet>

      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24" data-testid="services-page">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight font-serif text-[#2C2C2A] mb-6">
            {t('Mes Services', 'My Services')}
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-[#5C5A56] max-w-3xl mx-auto">
            {t(
              'Un accompagnement personnalisé pour vous aider à atteindre vos objectifs et vivre une vie alignée avec vos valeurs.',
              'Personalized support to help you achieve your goals and live a life aligned with your values.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                to={service.link}
                data-testid={`service-link-${idx}`}
                className="bg-white rounded-3xl p-10 border border-[#E8E2D9] shadow-[0_8px_32px_rgba(44,44,42,0.04)] hover:shadow-[0_16px_48px_rgba(217,160,152,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start group"
              >
                <div className="w-16 h-16 rounded-full bg-[#9EAB9A]/10 flex items-center justify-center mb-6 group-hover:bg-[#D9A098]/10 transition-colors">
                  <Icon className="w-8 h-8 text-[#9EAB9A] group-hover:text-[#D9A098] transition-colors" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#2C2C2A] mb-4">{service.title}</h2>
                <p className="text-base lg:text-lg leading-relaxed text-[#5C5A56] font-sans mb-6 flex-grow">{service.desc}</p>
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#9EAB9A] group-hover:text-[#D9A098] transition-colors">
                  {t('Découvrir', 'Learn More')} →
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Services;