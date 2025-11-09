"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type MenuCategory = "compartir" | "horneado" | "bowls" | "tostas" | "croissant" | "tortitas" | "brunch" | "bebidas" | "cafe";

type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  allergens?: string;
  category: Exclude<MenuCategory, "all">;
};

const menuItems: MenuItem[] = [
  // PARA COMPARTIR
  {
    id: "patatas-bravas",
    name: "Patatas bravas smash",
    price: "11 €",
    description: "Patatas gratinadas con queso parmesano y salsa brava LINDA.",
    allergens: "huevo, leche y sulfitos",
    category: "compartir"
  },
  {
    id: "huevos-onsen",
    name: "Huevos onsen",
    price: "13 €",
    description: "Tres huevos a baja temperatura con crema de yogur griego, mantequilla, aceite de chile y pan ecológico de masa madre.",
    allergens: "leche, huevo, soja y gluten",
    category: "compartir"
  },
  {
    id: "duo-hummus",
    name: "Dúo de hummus",
    price: "12 €",
    description: "Hummus clásico y de remolacha con pan ecológico de masa madre.",
    allergens: "gluten y sésamo",
    category: "compartir"
  },
  {
    id: "alcachofas",
    name: "Alcachofas confitadas",
    price: "14,5 €",
    description: "Flores de alcachofa variedad Tudela confitadas en aceite y sal.",
    category: "compartir"
  },
  {
    id: "migas-croissant",
    name: "Migas de croissant y bacon",
    price: "12 €",
    description: "Migas reversionadas con croissant, huevos onsen y bacon. Consultar disponibilidad.",
    allergens: "gluten, huevo y sulfitos",
    category: "compartir"
  },
  // HORNEADO EN LINDA
  {
    id: "butter-cake",
    name: "Butter cake",
    price: "3,5 €",
    description: "Bizcocho esponjoso estilo oriental (original, chocolate, café o ube).",
    allergens: "gluten, leche y huevo (varía según sabor)",
    category: "horneado"
  },
  {
    id: "croissant-mantequilla",
    name: "Croissant de mantequilla",
    price: "2 €",
    description: "Hecho con mantequilla de Bretaña.",
    allergens: "gluten, leche y huevo",
    category: "horneado"
  },
  {
    id: "pan-chocolat",
    name: "Pan au chocolat",
    price: "2 €",
    description: "Hojaldre con chocolate belga.",
    allergens: "gluten, soja, leche y huevo",
    category: "horneado"
  },
  {
    id: "tarta-queso",
    name: "Tarta de queso y galleta de dinosaurios",
    price: "6 €",
    description: "Queso crema y mascarpone con galletas.",
    allergens: "gluten, leche, huevo, frutos secos, soja, mostaza",
    category: "horneado"
  },
  {
    id: "brownie-vegano",
    name: "Brownie vegano de chocolate",
    price: "5 €",
    description: "Brownie vegano de chocolate intenso.",
    allergens: "soja, frutos secos, sésamo",
    category: "horneado"
  },
  // BOWLS
  {
    id: "golden-banana",
    name: "Golden banana porridge",
    price: "7,5 €",
    description: "Avena con cúrcuma, plátano, chocolate belga, arándanos, coco y pistachos.",
    category: "bowls"
  },
  {
    id: "yogurt-bowl",
    name: "Yogurt bowl",
    price: "7,5 €",
    description: "Yogur griego con fruta fresca, coco y granola casera con miel y frutos secos.",
    category: "bowls"
  },
  {
    id: "acai-bowl",
    name: "Açai bowl",
    price: "9 €",
    description: "Açai puro con coco, chía y frutas.",
    category: "bowls"
  },
  // TOSTAS
  {
    id: "tosta-favorita",
    name: "La favorita",
    price: "6 €",
    description: "Aguacate y hummus de remolacha. Añade huevo onsen por 2 €.",
    category: "tostas"
  },
  {
    id: "tosta-ricotta",
    name: "Frutos secos, ricotta y miel",
    price: "6 €",
    description: "Ricotta, nueces, miel y romero.",
    category: "tostas"
  },
  {
    id: "tosta-iberica",
    name: "Ibérica",
    price: "6 €",
    description: "Tomate triturado y jamón ibérico.",
    category: "tostas"
  },
  {
    id: "tosta-tomate",
    name: "Tomate y cherrys asados",
    price: "5 €",
    description: "Tomate cherry asado.",
    category: "tostas"
  },
  {
    id: "tosta-italiana",
    name: "Italiana de ricotta y tomates asados",
    price: "6 €",
    description: "Ricotta, balsámico y tomate asado.",
    category: "tostas"
  },
  // MUNDO CROISSANT
  {
    id: "tostada-benedictine",
    name: "Tostada francesa benedictine",
    price: "12,5 €",
    description: "Croissant a la plancha con bacon, huevo a baja temperatura y salsa manchega.",
    category: "croissant"
  },
  {
    id: "tostada-frutos-rojos",
    name: "Tostada francesa de frutos rojos",
    price: "11,5 €",
    description: "Con crema de yogur, frutos rojos y galleta Biscoff.",
    category: "croissant"
  },
  {
    id: "tostada-jamon-queso",
    name: "Tostada francesa de jamón y queso",
    price: "11,5 €",
    description: "Croissant relleno con jamón, bechamel y huevo.",
    category: "croissant"
  },
  {
    id: "croissant-relleno",
    name: "Croissant relleno",
    price: "10 €",
    description: "Con hummus de remolacha, bacon y huevo.",
    category: "croissant"
  },
  // TORTITAS
  {
    id: "tortitas-nutella",
    name: "Tortitas Nutella",
    price: "9,5 €",
    description: "Masa casera original o de avena con Nutella.",
    category: "tortitas"
  },
  {
    id: "tortitas-bacon",
    name: "Tortitas bacon y huevo onsen",
    price: "10,5 €",
    description: "Masa casera con bacon y huevo onsen.",
    category: "tortitas"
  },
  {
    id: "tortitas-banoffee",
    name: "Tortitas Banoffee",
    price: "9,5 €",
    description: "Masa casera con plátano, toffee y crema.",
    category: "tortitas"
  },
  {
    id: "tortitas-frutos-rojos",
    name: "Tortitas frutos rojos",
    price: "9,5 €",
    description: "Masa casera con frutos rojos.",
    category: "tortitas"
  },
  // BRUNCH
  {
    id: "brunch-linda",
    name: "Brunch Linda",
    price: "19,5 €",
    description: "Incluye bebida de café o té, capricho dulce, plato principal y bebida fría.",
    category: "brunch"
  },
  {
    id: "mini-brunch",
    name: "Mini Brunch",
    price: "10,5 €",
    description: "Incluye café o té, dulce y una tosta o croissant relleno.",
    category: "brunch"
  },
  // BEBIDAS
  {
    id: "limonada-manzana",
    name: "Limonada de manzana",
    price: "4,5 €",
    description: "Limonada fresca de manzana.",
    category: "bebidas"
  },
  {
    id: "limonada-hibiscus",
    name: "Limonada de hibiscus",
    price: "4,5 €",
    description: "Limonada de hibiscus (no recomendada embarazadas/lactancia).",
    category: "bebidas"
  },
  {
    id: "limonada-fresa",
    name: "Limonada de fresa",
    price: "4,5 €",
    description: "Limonada fresca de fresa.",
    category: "bebidas"
  },
  {
    id: "smoothie-energetico",
    name: "Smoothie energético",
    price: "6 €",
    description: "Naranja, zanahoria, arándanos, jengibre, cúrcuma y chía.",
    category: "bebidas"
  },
  {
    id: "smoothie-antioxidante",
    name: "Smoothie antioxidante",
    price: "6 €",
    description: "Manzana verde, kiwi, limón, perejil, pepino, jengibre y miel.",
    category: "bebidas"
  },
  {
    id: "smoothie-revitalizante",
    name: "Smoothie revitalizante",
    price: "6 €",
    description: "Manzana roja, remolacha, frutos rojos, jengibre, chía y miel.",
    category: "bebidas"
  },
  {
    id: "zumo-naranja",
    name: "Zumo de naranja natural",
    price: "3 €",
    description: "Zumo recién exprimido.",
    category: "bebidas"
  },
  {
    id: "mimosa-linda",
    name: "Mimosa Linda",
    price: "6,5 €",
    description: "Cóctel clásico con cava y zumo de naranja.",
    category: "bebidas"
  },
  {
    id: "vermut-perucchi",
    name: "Vermut Perucchi gran reserva",
    price: "5 €",
    description: "Vermut de gran reserva.",
    category: "bebidas"
  },
  {
    id: "french-75",
    name: "French 75",
    price: "6,5 €",
    description: "Cóctel con ginebra, limón, azúcar y cava.",
    category: "bebidas"
  },
  {
    id: "irish-coffee",
    name: "Irish Coffee",
    price: "6,5 €",
    description: "Café con whisky irlandés y nata montada.",
    category: "bebidas"
  },
  {
    id: "mojito",
    name: "Mojito",
    price: "6,5 €",
    description: "Clásico o de fresa.",
    category: "bebidas"
  },
  {
    id: "bloody-mary",
    name: "Bloody Mary",
    price: "6,5 €",
    description: "Cóctel con vodka, zumo de tomate y especias.",
    category: "bebidas"
  },
  // CAFÉ Y TÉ
  {
    id: "espresso",
    name: "Espresso",
    price: "1,5 €",
    description: "Café espresso de especialidad.",
    category: "cafe"
  },
  {
    id: "americano",
    name: "Americano",
    price: "2 €",
    description: "Espresso con agua caliente.",
    category: "cafe"
  },
  {
    id: "cortado",
    name: "Cortado",
    price: "2,5 €",
    description: "Espresso con un toque de leche.",
    category: "cafe"
  },
  {
    id: "caffe-latte",
    name: "Caffe Latte",
    price: "3 €",
    description: "Espresso con leche vaporizada.",
    category: "cafe"
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: "3 €",
    description: "Espresso con microespuma de leche.",
    category: "cafe"
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    price: "3,5 €",
    description: "Café filtrado en frío durante 12 horas.",
    category: "cafe"
  },
  {
    id: "mocca",
    name: "Mocca (negro o blanco)",
    price: "5 €",
    description: "Espresso con chocolate y leche.",
    category: "cafe"
  },
  {
    id: "latte-caramelo",
    name: "Latte caramelo o vainilla",
    price: "5 €",
    description: "Latte con sirope de caramelo o vainilla.",
    category: "cafe"
  },
  {
    id: "pistachio-latte",
    name: "Pistachio Latte",
    price: "5,5 €",
    description: "Latte con crema de pistacho.",
    category: "cafe"
  },
  {
    id: "te-infusiones",
    name: "Tés e infusiones",
    price: "3 €",
    description: "Menta poleo, manzanilla lavanda, pu erh, earl grey, sencha, frutos rojos.",
    category: "cafe"
  },
  {
    id: "matcha-latte",
    name: "Matcha latte",
    price: "4,5 €",
    description: "Matcha japonés con leche vaporizada.",
    category: "cafe"
  },
  {
    id: "cold-matcha",
    name: "Cold matcha",
    price: "5-5,5 €",
    description: "Matcha frío (ube, blanco, biscoff, fresa, naranja).",
    category: "cafe"
  },
  {
    id: "chai-latte",
    name: "Chai latte",
    price: "3,5 €",
    description: "Té chai especiado con leche.",
    category: "cafe"
  },
  {
    id: "remolacha-cacao",
    name: "Remolacha cacao latte",
    price: "4,5 €",
    description: "Bebida con remolacha, cacao y leche.",
    category: "cafe"
  }
];

const galleryImages = [
  {
    id: "latte-corazon",
    path: "/assets/3d521155-a35a-4ba9-8c39-54a6a166304d.JPG",
    alt: "Latte con arte de corazón perfecto"
  },
  {
    id: "mano-taza",
    path: "/assets/574e686b-8e26-42ac-8917-6f52d4024a34.JPG",
    alt: "Mano sosteniendo taza de café en ambiente cálido"
  },
  {
    id: "postre",
    path: "/assets/a3c2f30a-514f-4fe4-ae79-55e458c14b73.JPG",
    alt: "Postre casero con presentación delicada"
  },
  {
    id: "barista-manos",
    path: "/assets/b483bc61-3e58-4caf-bc17-ade358c4d336.JPG",
    alt: "Manos de barista preparando espresso"
  },
  {
    id: "croissant",
    path: "/assets/c78aefc2-8cf9-4c0c-a144-b7d3e2b81819.JPG",
    alt: "Croissant dorado y crujiente"
  },
  {
    id: "mesa-detalles",
    path: "/assets/dc616b32-ab8c-4cec-b488-2851cd496828.JPG",
    alt: "Mesa con detalles decorativos naturales"
  },
  {
    id: "tortitas-frutos",
    path: "/assets/e1c81add-4eb8-42cc-a612-f5a6cff31a57.JPG",
    alt: "Tortitas con frutos rojos y crema"
  },
  {
    id: "latte-art-final",
    path: "/assets/f9791b6b-272e-4988-85df-f97f28c781df.JPG",
    alt: "Latte art de nuestros baristas"
  }
];

const testimonials = [
  {
    id: "lucia",
    quote:
      "El café es espectacular y la vibra del lugar te invita a quedarte. Se siente el cariño en cada detalle.",
    author: "Lucía · reseña en Google"
  },
  {
    id: "marcos",
    quote:
      "Brunch delicioso, ingredientes frescos y un equipo encantador. Siempre termino el domingo aquí.",
    author: "Marcos · cliente habitual"
  },
  {
    id: "valeria",
    quote:
      "Linda es mi lugar favorito para trabajar con calma. Luz natural, buena música y un filtro exquisito.",
    author: "Valeria · barista invitada"
  }
];

const menuFilters: { label: string; value: MenuCategory }[] = [
  { label: "Para compartir", value: "compartir" },
  { label: "Horneado", value: "horneado" },
  { label: "Bowls", value: "bowls" },
  { label: "Tostas", value: "tostas" },
  { label: "Croissant", value: "croissant" },
  { label: "Tortitas", value: "tortitas" },
  { label: "Brunch", value: "brunch" },
  { label: "Bebidas", value: "bebidas" },
  { label: "Café & Té", value: "cafe" }
];

export default function HomeView() {
  const [menuFilter, setMenuFilter] = useState<MenuCategory>("compartir");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => item.category === menuFilter);
  }, [menuFilter]);

  const handleFilterChange = useCallback((value: MenuCategory) => {
    setMenuFilter(value);
  }, []);

  const handleNavToggle = useCallback(() => {
    setNavOpen((prev) => !prev);
  }, []);

  const handleNavLinkClick = useCallback(() => {
    setNavOpen(false);
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      {navOpen && <div className="nav__overlay" onClick={handleNavToggle} aria-hidden="true" />}
      <header className="top-bar">
        <nav className="nav" aria-label="Principal">
          <a className="nav__logo" href="#inicio" onClick={handleNavLinkClick}>
            <img
              src="/assets/RGB_Linda_logo-tagline-white.svg"
              alt="Linda Specialty Coffee & Brunch"
              width={180}
              height={96}
            />
          </a>
          <button
            className="nav__toggle"
            aria-expanded={navOpen}
            aria-controls="primary-menu"
            onClick={handleNavToggle}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {navOpen ? (
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <>
                  <path
                    d="M3 12h18M3 6h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}
            </svg>
          </button>
          <ul className={`nav__links ${navOpen ? "is-open" : ""}`} id="primary-menu">
            <li>
              <a href="#inicio" onClick={handleNavLinkClick}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#historia" onClick={handleNavLinkClick}>
                Nuestra historia
              </a>
            </li>
            <li>
              <a href="#carta" onClick={handleNavLinkClick}>
                Carta
              </a>
            </li>
            <li>
              <a href="#galeria" onClick={handleNavLinkClick}>
                Galería
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={handleNavLinkClick}>
                Ubicación & contacto
              </a>
            </li>
          </ul>
          <a
            className="nav__cta"
            href="https://www.instagram.com/lindaspecialtycoffee?igsh=ZjBnYmxtdXdzMHFo"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero fade-in">
          <div className="hero__media">
            <Image
              src="/assets/_00.CafeteriaLinda.webp"
              alt="Interior de Linda Specialty Coffee & Brunch"
              width={720}
              height={900}
              priority
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </div>
          <div className="hero__content">
            <div className="hero__badge">Specialty Coffee &amp; Brunch with Heart</div>
            <h1>Linda</h1>
            <p>
              Un refugio acogedor donde el café de origen, el brunch artesanal y una atención cercana se
              encuentran para crear momentos que se sienten como en casa.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#carta">
                Ver carta
              </a>
              <a
                className="btn btn--ghost"
                href="https://www.instagram.com/lindaspecialtycoffee?igsh=ZjBnYmxtdXdzMHFo"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>

        <section id="historia" className="section section--split fade-in">
          <div className="section__content">
            <span className="section__eyebrow">Nuestra historia</span>
            <h2>Café con alma, brunch con cariño</h2>
            <p>
              Linda nace del deseo de compartir nuestra pasión por el café de especialidad y la cocina
              honesta. Seleccionamos granos de origen, tostados con mimo, y los servimos junto a platos que
              celebran ingredientes frescos y de temporada.
            </p>
            <p>
              Nuestro espacio está inspirado en las mañanas lentas, la luz natural y los materiales nobles.
              Queremos que cada visita se sienta cálida, cercana y memorable.
            </p>
          </div>
          <div className="section__gallery">
            <figure className="card-image">
              <Image
                src="/assets/88119aae-b723-4c83-a1fe-c8cb1a614b27.JPG"
                alt="Barista preparando café de filtro con V60"
                width={520}
                height={680}
              />
            </figure>
          </div>
        </section>

        <section id="carta" className="section menu fade-in" aria-labelledby="menu-heading">
          <div className="section__header">
            <span className="section__eyebrow">Carta</span>
            <h2 id="menu-heading">Hecha para disfrutar con calma</h2>
            <p>
              Descubre nuestros cafés de especialidad, brunch artesanal, bowls frescos y dulces caseros. Filtra según lo que se te antoje hoy.
            </p>
          </div>
          <div className="menu__filters" role="radiogroup" aria-label="Filtrar carta">
            {menuFilters.map((filter) => (
              <button
                key={filter.value}
                className={`chip ${menuFilter === filter.value ? "chip--active" : ""}`}
                onClick={() => handleFilterChange(filter.value)}
                role="radio"
                aria-checked={menuFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="menu__grid">
            {filteredMenu.map((item) => (
              <article key={item.id} className="menu-card" data-category={item.category}>
                <div className="menu-card__header">
                  <h3>{item.name}</h3>
                  <span className="menu-card__price">{item.price}</span>
                </div>
                <p>{item.description}</p>
                {item.allergens && (
                  <small className="menu-card__allergens">Alérgenos: {item.allergens}</small>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="galeria" className="section gallery fade-in">
          <div className="section__header">
            <span className="section__eyebrow">Galería</span>
            <h2>Instantes en Linda</h2>
            <p>
              Algunas de las escenas cotidianas que más nos inspiran: cafés compartidos, mesas llenas y
              detalles que cuentan historias.
            </p>
          </div>
          <div className="gallery__grid">
            {galleryImages.map((image) => (
              <figure key={image.id} className="gallery__item">
                <Image src={image.path} alt={image.alt} width={540} height={540} sizes="(max-width: 960px) 50vw, 320px" />
              </figure>
            ))}
          </div>
        </section>

        <section className="section testimonials fade-in" aria-label="Testimonios de clientes">
          <div className="section__header">
            <span className="section__eyebrow">Testimonios</span>
            <h2>Lo que dicen quienes nos visitan</h2>
            <p>
              Descubre más opiniones de nuestros clientes en{" "}
              <a
                href="https://www.google.com/maps/place/LINDA+Specialty+Coffee+%26+Brunch/@40.1930949,-3.6715445,17z/data=!4m15!1m8!3m7!1s0xd421f60d2021d2d:0x20b755f26ca4f9ae!2sLINDA+Specialty+Coffee+%26+Brunch!8m2!3d40.1930949!4d-3.6715445!10e9!16s%2Fg%2F11vqnvyx92!3m5!1s0xd421f60d2021d2d:0x20b755f26ca4f9ae!8m2!3d40.1930949!4d-3.6715445!16s%2Fg%2F11vqnvyx92?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline", color: "inherit" }}
              >
                Google Maps
              </a>
            </p>
          </div>
          <div className="testimonials__list">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="testimonial">
                <p>"{testimonial.quote}"</p>
                <cite>{testimonial.author}</cite>
              </blockquote>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
            <a
              className="btn btn--primary"
              href="https://www.google.com/maps/place/LINDA+Specialty+Coffee+%26+Brunch/@40.1930949,-3.6715445,17z/data=!4m15!1m8!3m7!1s0xd421f60d2021d2d:0x20b755f26ca4f9ae!2sLINDA+Specialty+Coffee+%26+Brunch!8m2!3d40.1930949!4d-3.6715445!10e9!16s%2Fg%2F11vqnvyx92!3m5!1s0xd421f60d2021d2d:0x20b755f26ca4f9ae!8m2!3d40.1930949!4d-3.6715445!16s%2Fg%2F11vqnvyx92?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
            >
              Ver todas las reseñas en Google
            </a>
          </div>
        </section>

        <section id="contacto" className="section contact fade-in">
          <div className="section__header">
            <span className="section__eyebrow">Ubicación &amp; contacto</span>
            <h2>Visítanos cuando quieras</h2>
            <p>Estamos en el corazón del barrio, listos para compartir una taza contigo.</p>
          </div>
          <div className="contact__grid">
            <div className="contact__info">
              <h3>Linda · Specialty Coffee &amp; Brunch</h3>
              <p>C. de Gödöllö Esquina, C. Valdesanchuela, 28341 Valdemoro, Madrid</p>
              <div className="contact__hours">
                <h4>Horarios</h4>
                <ul className="hours__list">
                  <li>
                    <span className="hours__day">Domingo</span>
                    <span className="hours__time">9:00–20:30</span>
                  </li>
                  <li>
                    <span className="hours__day">Lunes</span>
                    <span className="hours__time">9:00–14:00 · 16:30–20:00</span>
                  </li>
                  <li>
                    <span className="hours__day">Martes</span>
                    <span className="hours__time hours__time--closed">Cerrado</span>
                  </li>
                  <li>
                    <span className="hours__day">Miércoles</span>
                    <span className="hours__time">9:00–14:00 · 16:30–20:00</span>
                  </li>
                  <li>
                    <span className="hours__day">Jueves</span>
                    <span className="hours__time">9:00–14:00 · 16:30–20:00</span>
                  </li>
                  <li>
                    <span className="hours__day">Viernes</span>
                    <span className="hours__time">9:00–20:30</span>
                  </li>
                  <li>
                    <span className="hours__day">Sábado</span>
                    <span className="hours__time">9:00–20:30</span>
                  </li>
                </ul>
              </div>
              <ul className="contact__links">
                <li>
                  <a href="https://www.instagram.com/lindaspecialtycoffee?igsh=ZjBnYmxtdXdzMHFo" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="contact__map">
              <iframe
                title="Mapa de Linda Specialty Coffee en Valdemoro"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3047.717727703278!2d-3.6715445!3d40.1930949!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd421f60d2021d2d%3A0x20b755f26ca4f9ae!2sLINDA%20Specialty%20Coffee%20%26%20Brunch!5e0!3m2!1ses!2ses!4v1762710982265!5m2!1ses!2ses"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__content">
          <img
            src="/assets/RGB_Linda_logo-tagline-white.svg"
            alt="Linda Specialty Coffee"
            width={140}
            height={74}
          />
          <p>Specialty Coffee &amp; Brunch with Heart · Hecho con calidez en el barrio.</p>
          <small>© {currentYear} Linda. Todos los derechos reservados.</small>
        </div>
      </footer>
    </>
  );
}

