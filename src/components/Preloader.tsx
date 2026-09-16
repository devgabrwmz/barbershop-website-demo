import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onFinish: () => void;
}

const BRAND = "BARBEARIA PRIME";

export default function Preloader({ onFinish }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setHidden(true);
      onFinish();
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = overflow;
          setHidden(true);
          onFinish();
        },
      });

      tl.fromTo(
        ".preloader__mark",
        { opacity: 0, scale: 0.6, rotate: -25 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.8)" },
      )
        .fromTo(
          ".preloader__word span",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.035,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .to(
          barRef.current,
          { scaleX: 1, duration: 0.85, ease: "power2.inOut" },
          "-=0.15",
        )
        .to({}, { duration: 0.2 })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        });
    }, rootRef);

    return () => ctx.revert();
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader__content">
        <div className="preloader__mark" aria-hidden="true">
          ✂️
        </div>

        <p className="preloader__word">
          {BRAND.split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </p>

        <div className="preloader__bar-track">
          <div className="preloader__bar" ref={barRef} />
        </div>
      </div>
    </div>
  );
}
