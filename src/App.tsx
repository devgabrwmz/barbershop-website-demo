import { useState } from "react";
import "./components/site.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Reveal from "./components/Reveal";
import AnimatedStat from "./components/AnimatedStat";
import Lightbox from "./components/Lightbox";
import StickyCta from "./components/StickyCta";
import FloatingWhatsapp from "./components/FloatingWhatsapp/FloatingWhatsapp";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Marquee from "./components/Marquee";
import TiltCard from "./components/TiltCard";
import MagneticButton from "./components/MagneticButton";
import Stars from "./components/Stars";
import InitialsAvatar from "./components/InitialsAvatar";

import {
  APPBARBER_URL,
  SERVICES,
  PACKAGES,
  PROFESSIONALS,
  REVIEWS,
  AMENITIES,
  PAYMENT_METHODS,
  HOURS,
  formatPrice,
  whatsappLink,
} from "./data";

import ambiente01 from "./assets/ambiente/ambiente-01.webp";
import ambiente02 from "./assets/ambiente/ambiente-02.webp";
import ambiente03 from "./assets/ambiente/ambiente-03.webp";

import equipeImg from "./assets/equipe/equipe.webp";

import galeria01 from "./assets/galeria/galeria-01.webp";
import galeria02 from "./assets/galeria/galeria-02.webp";
import galeria03 from "./assets/galeria/galeria-03.webp";
import galeria04 from "./assets/galeria/galeria-04.webp";
import galeria05 from "./assets/galeria/galeria-05.webp";
import galeria06 from "./assets/galeria/galeria-06.webp";

const GALLERY_IMAGES = [
  { src: galeria01, alt: "Corte masculino" },
  { src: galeria02, alt: "Barba profissional" },
  { src: galeria03, alt: "Corte moderno" },
  { src: galeria04, alt: "Acabamento profissional" },
  { src: galeria05, alt: "Cliente atendido" },
  { src: galeria06, alt: "Resultado final" },
];

const STATS = [
  { value: 9, prefix: "+", suffix: "", label: "de tradição" },
  { value: 4.9, decimals: 1, suffix: " ⭐", label: "avaliação média" },
  { value: 180, prefix: "+", suffix: "", label: "clientes satisfeitos" },
  { value: 100, suffix: "%", label: "horário marcado" },
];

const MARQUEE_ITEMS = [
  "BARBEARIA PRIME",
  "CORTE, BARBA E BOA CONVERSA",
  "TRADIÇÃO E QUALIDADE",
  "AGENDE SEU HORÁRIO",
];

const DAY_NAMES = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
const TODAY_NAME = DAY_NAMES[new Date().getDay()];

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [serviceSearch, setServiceSearch] = useState("");

  const filteredServices = SERVICES.filter((service) =>
    service.name.toLowerCase().includes(serviceSearch.trim().toLowerCase()),
  );

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />

        <Marquee items={MARQUEE_ITEMS} />

        {/* PROVA SOCIAL */}
        <section className="social-proof">
          <div className="container">
            <Reveal className="social-proof__grid" stagger={0.1} y={20}>
              {STATS.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="section">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Por que escolher</span>
              <h2>Mais do que um corte.</h2>
            </Reveal>

            <Reveal className="services-grid" stagger={0.08}>
              <TiltCard as="article" className="service-card">
                <h3>📅 Horário Marcado</h3>
                <p>
                  Atendimento organizado para você não perder tempo esperando.
                </p>
              </TiltCard>

              <TiltCard as="article" className="service-card">
                <h3>🔥 Barbaterapia</h3>
                <p>
                  Experiência completa com toalha quente e acabamento
                  profissional.
                </p>
              </TiltCard>

              <TiltCard as="article" className="service-card">
                <h3>⭐ Atendimento Personalizado</h3>
                <p>
                  Cada cliente recebe atenção individual para encontrar o melhor
                  estilo.
                </p>
              </TiltCard>

              <TiltCard as="article" className="service-card">
                <h3>💈 Desde 2016</h3>
                <p>
                  Anos de experiência cuidando da aparência e autoestima dos
                  clientes.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal className="badge-row" style={{ marginTop: "2.5rem" }} stagger={0.05} y={12}>
              {AMENITIES.map((item) => (
                <span className="badge-pill" key={item.label}>
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="section section--alt">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Serviços</span>
              <h2>Escolha seu atendimento.</h2>
            </Reveal>

            <div className="service-search">
              <span aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Pesquisar serviço..."
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                aria-label="Pesquisar serviço"
              />
            </div>

            <Reveal className="service-list" stagger={0.03} y={14}>
              {filteredServices.map((service) => (
                <div className="service-row" key={service.name}>
                  <div className="service-row__info">
                    <h3>{service.name}</h3>
                    <div className="service-row__meta">
                      <span className="service-row__price">
                        {service.priceFrom ? "A partir de " : ""}
                        {formatPrice(service.price)}
                      </span>
                      <span>⏱ {service.duration} min</span>
                    </div>
                  </div>

                  <div className="service-row__actions">
                    <a
                      href={APPBARBER_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-solid"
                    >
                      Agendar
                    </a>
                  </div>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <p style={{ padding: "2rem 0", color: "var(--muted)" }}>
                  Nenhum serviço encontrado para "{serviceSearch}".
                </p>
              )}
            </Reveal>

            <div className="dual-cta">
              <MagneticButton
                href={APPBARBER_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid"
              >
                Agendar pelo site oficial
              </MagneticButton>

              <MagneticButton
                href={whatsappLink(
                  "Olá! Vim pelo site da Barbearia Prime e gostaria de saber mais sobre os serviços.",
                )}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Prefiro falar no WhatsApp
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* PACOTES */}
        <section id="pacotes" className="section">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Pacotes</span>
              <h2>Combos que valem a pena.</h2>
            </Reveal>

            <Reveal className="services-grid" stagger={0.1}>
              {PACKAGES.map((pkg) => (
                <TiltCard as="article" className="package-card" key={pkg.name} max={6}>
                  <h3>{pkg.name}</h3>
                  <p className="package-card__price">{formatPrice(pkg.price)}</p>
                  <p>{pkg.description}</p>
                  <a
                    href={APPBARBER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    Contratar pelo site oficial
                  </a>
                </TiltCard>
              ))}
            </Reveal>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="section section--alt">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Resultados</span>
              <h2>Resultados que falam por si.</h2>
            </Reveal>

            <Reveal className="gallery-grid" stagger={0.08} clip>
              {GALLERY_IMAGES.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  className="gallery-item"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img src={image.src} alt={image.alt} />
                  <span className="gallery-item__overlay">
                    <span>🔍 Ampliar</span>
                  </span>
                </button>
              ))}
            </Reveal>
          </div>
        </section>

        {/* AMBIENTE */}
        <section id="ambiente" className="section">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Ambiente</span>
              <h2>Mais que uma barbearia, uma experiência.</h2>
            </Reveal>

            <p>
              Um espaço moderno, confortável e pensado para proporcionar a
              melhor experiência em cada visita.
            </p>

            <Reveal className="gallery-grid" stagger={0.1} clip>
              <img src={ambiente01} alt="Ambiente da barbearia" />
              <img src={ambiente02} alt="Estrutura da barbearia" />
              <img src={ambiente03} alt="Interior da barbearia" />
            </Reveal>
          </div>
        </section>

        {/* EQUIPE */}
        <section id="equipe" className="section section--alt">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Equipe</span>
              <h2>Profissionais apaixonados pelo que fazem.</h2>
            </Reveal>

            <Reveal className="team-card" y={24}>
              <img src={equipeImg} alt="Equipe Barbearia Prime" />

              <div>
                <h3>Barbearia Prime</h3>

                <p>
                  Oferecendo cortes, barba e atendimento de qualidade para
                  toda a região.
                </p>
              </div>
            </Reveal>

            <Reveal
              className="professionals-grid"
              stagger={0.08}
              style={{ marginTop: "2rem" }}
            >
              {PROFESSIONALS.map((name) => (
                <TiltCard as="div" className="professional-card" key={name} max={5}>
                  <InitialsAvatar name={name} />
                  <div>
                    <h3>{name}</h3>
                    <p>Barbeiro</p>
                  </div>
                </TiltCard>
              ))}
            </Reveal>
          </div>
        </section>

        {/* AVALIAÇÕES */}
        <section id="avaliacoes" className="section">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Avaliações</span>
              <h2>Quem já veio, aprovou.</h2>
            </Reveal>

            <Reveal className="reviews-grid" stagger={0.06}>
              {REVIEWS.map((review) => (
                <div className="review-card" key={review.name}>
                  <InitialsAvatar name={review.name} />
                  <div>
                    <p className="review-card__name">{review.name}</p>
                    <p className="review-card__date">{review.date}</p>
                    <Stars count={review.stars} />
                    {review.comment && (
                      <p className="review-card__comment">"{review.comment}"</p>
                    )}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="section section--alt">
          <div className="container">
            <Reveal className="section__header">
              <span className="section__eyebrow">Contato</span>
              <h2>Agende seu horário.</h2>
            </Reveal>

            <div className="info-grid">
              <div>
                <div className="info-block">
                  <h3>Endereço</h3>
                  <p>
                    Rua Exemplo, 123
                    <br />
                    Centro • Sua Cidade - UF
                  </p>
                </div>

                <div className="info-block">
                  <h3>Redes sociais</h3>
                  <p>Instagram: @suabarbearia</p>
                </div>

                <div className="info-block">
                  <h3>Formas de pagamento</h3>
                  <div className="badge-row">
                    {PAYMENT_METHODS.map((method) => (
                      <span className="badge-pill" key={method}>
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="dual-cta">
                  <MagneticButton
                    href={APPBARBER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-solid"
                  >
                    Agendar pelo site oficial
                  </MagneticButton>

                  <MagneticButton
                    href={whatsappLink(
                      "Olá! Vim pelo site da Barbearia Prime e gostaria de agendar um horário.",
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    Chamar no WhatsApp
                  </MagneticButton>
                </div>
              </div>

              <div className="info-block">
                <h3>Horário de funcionamento</h3>
                <div className="hours-list">
                  {HOURS.map((row) => (
                    <div className="hours-row" key={row.day}>
                      <span className="hours-row__day">
                        {row.day}
                        {row.day === TODAY_NAME && (
                          <span className="hours-row__today">Hoje</span>
                        )}
                      </span>
                      <span className="hours-row__ranges">
                        {row.ranges.map((range) => (
                          <span key={range} style={{ display: "block" }}>
                            {range}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="section cta-final">
          <div className="cta-final__glow" aria-hidden="true" />

          <Reveal className="container" as="div" y={22}>
            <div className="cta-final__content">
              <h2 style={{ marginBottom: "1rem" }}>
                Pronto para renovar o visual?
              </h2>

              <p
                style={{
                  maxWidth: "700px",
                  margin: "0 auto 2rem",
                }}
              >
                Agende seu horário agora mesmo e tenha a experiência completa
                da Barbearia Prime.
              </p>

              <div
                className="dual-cta"
                style={{ justifyContent: "center", marginTop: 0 }}
              >
                <MagneticButton
                  href={APPBARBER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-solid"
                  strength={0.35}
                >
                  Agendar pelo site oficial
                </MagneticButton>

                <MagneticButton
                  href={whatsappLink(
                    "Olá! Vim pelo site da Barbearia Prime e quero renovar o visual — gostaria de agendar um horário.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  strength={0.35}
                >
                  Falar no WhatsApp
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </section>

        {/* GOOGLE MAPS */}
        <section className="map-section">
          <iframe
            title="Localização (exemplo)"
            src="https://www.google.com/maps?q=Avenida+Paulista,+São+Paulo,+SP&output=embed"
            width="100%"
            height="450"
            loading="lazy"
          />
        </section>
      </main>

      {/* WHATSAPP FLUTUANTE */}
      <FloatingWhatsapp />

      {/* CTA FIXO (mobile) */}
      <StickyCta />

      {/* RODAPÉ */}
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <h3>Barbearia Prime</h3>
              <p>
                Oferecendo cortes, barba e atendimento de qualidade para toda
                a região.
              </p>
            </div>

            <div>
              <h3>Contato</h3>
              <p>WhatsApp: (11) 99999-9999</p>
              <p>@suabarbearia</p>
            </div>

            <div>
              <h3>Endereço</h3>
              <p>
                Rua Exemplo, 123
                <br />
                Centro
                <br />
                Sua Cidade - UF
              </p>
            </div>
          </div>

          <hr
            style={{
              margin: "2rem 0",
              borderColor: "#3a3229",
            }}
          />

          <p style={{ textAlign: "center" }}>
            © 2026 Barbearia Prime • Todos os direitos reservados (demo de portfólio)
          </p>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}
