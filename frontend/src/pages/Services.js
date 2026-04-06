import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';

const serviceImages = {
  personnel: 'https://sophielamour.com/wp-content/uploads/2025/02/IMG-20250207-WA0001-e1740056629770.jpg',
  professionnel: 'https://sophielamour.com/wp-content/uploads/2025/04/ChatGPT-Image-4-avr.-2025-15_08_04.png',
  parentalite: 'https://sophielamour.com/wp-content/uploads/2025/04/ChatGPT-Image-4-avr.-2025-15_42_16.png',
  homeOrganising: 'https://sophielamour.com/wp-content/uploads/2025/02/DALL%C2%B7E-2025-02-20-19.17.12-Une-photo-ultra-realiste-de-la-meme-piece-mais-parfaitement-rangee-et-organisee.-Les-vetements-sont-plies-et-ranges-dans-une-armoire-bien-ordonnee-l.webp',
  ikigai: 'https://sophielamour.com/wp-content/uploads/2025/03/DALL%C2%B7E-2025-03-01-07.56.39-A-symbolic-and-artistic-representation-of-the-concept-of-Ikigai.-A-large-ancient-tree-with-deep-roots-and-expansive-branches-stands-in-the-center-of-.webp',
  artTherapie: 'https://sophielamour.com/wp-content/uploads/2025/03/DALL%C2%B7E-2025-03-01-07.57.13-A-symbolic-and-artistic-representation-of-Art-Therapy.-A-peaceful-artist-sits-in-a-bright-open-studio-surrounded-by-paintings-sculptures-and-sketch.webp',
  yogaDuRire: 'https://sophielamour.com/wp-content/uploads/2025/06/image1-8-scaled.jpg'
};

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t("Accompagnement Personnel", "Personal Coaching"),
      desc: t("(Re)trouvez votre equilibre et votre raison d'etre", "Rediscover your balance and purpose"),
      link: '/services/personnel',
      image: serviceImages.personnel
    },
    {
      title: t("Accompagnement Professionnel", "Professional Coaching"),
      desc: t("Construisez un avenir aligne avec vos valeurs", "Build a future aligned with your values"),
      link: '/services/professionnel',
      image: serviceImages.professionnel
    },
    {
      title: t("Accompagnement Parentalite", "Parenting Support"),
      desc: t("Grandissez ensemble en famille", "Grow together as a family"),
      link: '/services/parentalite',
      image: serviceImages.parentalite
    },
    {
      title: "Home Organising",
      desc: t("Creez un environnement qui vous apaise", "Create an environment that soothes you"),
      link: '/services/home-organising',
      image: serviceImages.homeOrganising
    },
    {
      title: "Ikigai",
      desc: t("Trouvez votre boussole interieure", "Find your inner compass"),
      link: '/services/ikigai',
      image: serviceImages.ikigai
    },
    {
      title: t("Art-Therapie", "Art Therapy"),
      desc: t("Explorer, creer, se reconnecter a soi", "Explore, create, reconnect with yourself"),
      link: '/services/art-therapie',
      image: serviceImages.artTherapie
    },
    {
      title: t("Yoga Du Rire", "Laughter Yoga"),
      desc: t("Liberez votre joie de vivre", "Release your joy of living"),
      link: '/services/yoga-du-rire',
      image: serviceImages.yogaDuRire
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("Services - Sophie Lamour", "Services - Sophie Lamour")}</title>
        <meta name="description" content={t(
          "Decouvrez mes services : coaching personnel, professionnel, parentalite, home organising, Ikigai, art-therapie et yoga du rire.",
          "Discover my services: personal coaching, professional coaching, parenting, home organizing, Ikigai, art therapy and laughter yoga."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <Link
              key={idx}
              to={service.link}
              data-testid={`service-link-${idx}`}
              className="group bg-white rounded-3xl overflow-hidden border border-[#ADE8F4] shadow-[0_8px_32px_rgba(44,44,42,0.04)] hover:shadow-[0_16px_48px_rgba(0,119,182,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/60 to-transparent" />
                <h2 className="absolute bottom-4 left-6 right-6 text-xl sm:text-2xl font-serif text-white leading-tight">
                  {service.title}
                </h2>
              </div>
              <div className="p-6">
                <p className="text-base leading-relaxed text-[#023E8A] mb-4">{service.desc}</p>
                <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#48CAE4] group-hover:text-[#0077B6] transition-colors">
                  {t("Decouvrir", "Learn More")} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
