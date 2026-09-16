import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

import heroVideo from "/src/assets/videos/hero.mp4";
import MagneticButton from "./components/MagneticButton";
import { APPBARBER_URL, whatsappLink } from "./data";

import "./hero.css";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 1000) / 10,
        top: Math.round(Math.random() * 1000) / 10,
        size: 2 + Math.random() * 3,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    [],
  );

  // Garante que o vídeo toque no mobile: alguns navegadores (iOS Safari,
  // Chrome Android) ignoram o atributo HTML "autoplay" e só liberam a
  // reprodução se ela for disparada explicitamente por JS depois que o
  // vídeo estiver pronto, com muted setado como propriedade (não só atributo).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {
        // autoplay bloqueado pelo navegador/SO (ex: economia de dados) —
        // volta a tentar quando a aba ganhar foco/visibilidade de novo.
      });
    };

    tryPlay();

    const onVisibility = () => {
      if (document.visibilityState === "visible" && video.paused) tryPlay();
    };

    const onCanPlay = () => tryPlay();

    document.addEventListener("visibilitychange", onVisibility);
    video.addEventListener("loadeddata", onCanPlay);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("loadeddata", onCanPlay);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  // Entrada dramática do texto
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero__kicker",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
      )
        .fromTo(
          ".hero__title-line",
          { opacity: 0, y: 90, rotate: 3 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.1,
            stagger: 0.14,
            ease: "back.out(1.4)",
          },
          "-=0.35",
        )
        .fromTo(
          ".hero__sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          ".hero__actions",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55",
        )
        .fromTo(
          ".hero__scroll-cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3",
        );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  // Parallax 3D: o conteúdo e o vídeo reagem à posição do mouse
  useEffect(() => {
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isDesktop || prefersReducedMotion) return;

    const content = contentRef.current;
    const media = mediaRef.current;
    const section = scopeRef.current;
    if (!content || !media || !section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      if (e.clientY > rect.bottom) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(content, {
        rotateX: y * -4,
        rotateY: x * 4,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(media, {
        x: x * 16,
        y: y * 12,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" className="hero" ref={scopeRef}>
      <div className="hero__media" ref={mediaRef}>
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="hero__scrim" />

        <div className="hero__particles" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero__particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero__content container" ref={contentRef}>
        <p className="hero__kicker">TRADIÇÃO E QUALIDADE</p>
        <h1 className="hero__title">
          <span className="hero__title-line">CORTE, BARBA</span>
          <span className="hero__title-line">E BOA CONVERSA.</span>
        </h1>
        <p className="hero__sub">
          Barbearia Prime: cadeira certa, navalha na régua e um clima de casa.
          Agende seu horário e sinta a diferença.
        </p>
        <div className="hero__actions">
          <MagneticButton
            href={APPBARBER_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-solid"
            strength={0.4}
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
            strength={0.4}
          >
            Falar no WhatsApp
          </MagneticButton>
        </div>
      </div>

      <div className="hero__scroll-cue">
        <span className="hero__scroll-cue-line" />
        <span className="hero__scroll-cue-text">role a página</span>
      </div>
    </section>
  );
}
