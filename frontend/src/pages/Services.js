import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Heart, Briefcase, Baby, Home as HomeIcon, Compass, Palette } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Heart,
      title: t("Accompagnement Personnel", "Personal Coaching"),
      desc: t("(Re)trouvez votre equilibre et votre raison d'etre", "Rediscover your balance and purpose"),
      link: '/services/personnel'
    },
    {
      icon: Briefcase,
      title: t("Accompagnement Professionnel", "Professional Coaching"),
      desc: t("Construisez un avenir aligne avec vos valeurs", "Build a future aligned with your values"),
      link: '/services/professionnel'
    },
    {
      icon: Baby,
      title: t("Accompagnement Parentalite", "Parenting Support"),
      desc: t("Grandissez ensemble en famille", "Grow together as a family"),
      link: '/services/parentalite'
    },
    {
      icon: HomeIcon,
      title: "Home Organising",
      desc: t("Creez un environnement qui vous apaise", "Create an environment that soothes you"),
      link: '/services/home-organising'
    },
    {
      icon: Compass,
      title: "Ikigai",
      desc: t("Decouvrez votre raison d'etre et alignez passion, mission, vocation et profession", "Discover your reason for being and align passion, mission, vocation and profession"),
      link: '/services/ikigai'
    },
    {
      icon: Palette,
      title: t("Art-Therapie", "Art Therapy"),
      desc: t("Exprimez-vous et liberez vos emotions a travers la creativite artistique", "Express yourself and release your emotions through artistic creativity"),
      link: '/services/art-therapie'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("Services - Sophie Lamour", "Services - Sophie Lamour")}</title>
        <meta name="description" content={t(
          "Decouvrez mes services d'accompagnement personnalise en developpement personnel, coaching professionnel, parentalite, home organising, Ikigai et art-therapie.",
          "Discover my personalized support services in personal development, professional coaching, parenting, home organizing, Ikigai and art therapy."
        )} />
      </Helmet>

      <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-24" data-testid="services-page">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight font-serif text-[#03045E] mb-6">
            {t("Mes Services", "My Services")}
          </h1>
          <p className="text-base lg:text-lg leading-relaxed text-[#023E8A] max-w-3xl mx-auto">
            {t(
              "Un accompagnement personnalise pour vous aider a atteindre vos objectifs et vivre une vie alignee avec vos valeurs.",
              "Personalized support to help you achieve your goals and live a life aligned with your values."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                to={service.link}
                data-testid={`service-link-${idx}`}
                className="bg-white rounded-3xl p-10 border border-[#ADE8F4] shadow-[0_8px_32px_rgba(44,44,42,0.04)] hover:shadow-[0_16px_48px_rgba(217,160,152,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start group"
              >
                <div className="w-16 h-16 rounded-full bg-[#48CAE4]/10 flex items-center justify-center mb-6 group-hover:bg-[#0077B6]/10 transition-colors">
                  <Icon className="w-8 h-8 text-[#48CAE4] group-hover:text-[#0077B6] transition-colors" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#03045E] mb-4">{service.title}</h2>
                <p className="text-base leading-relaxed text-[#023E8A] font-sans mb-6 flex-grow">{service.desc}</p>
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#48CAE4] group-hover:text-[#0077B6] transition-colors">
                  {t("Decouvrir", "Learn More")} &rarr;
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
