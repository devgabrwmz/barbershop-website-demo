import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Anima cada filho direto em sequência (grids de cards). Se falso, anima o bloco como um todo. */
  stagger?: number;
  y?: number;
  as?: ElementType;
  /** Efeito de cortina (clip-path) em vez de fade + translateY — usado na galeria. */
  clip?: boolean;
  style?: CSSProperties;
}

/**
 * Envolve um bloco e anima sua entrada quando ele cruza a viewport.
 * Se o conteúdo tiver múltiplos filhos diretos, cada um entra em stagger.
 */
export default function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 28,
  as = "div",
  clip = false,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const targets = el.children.length > 0 ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      if (clip) {
        gsap.set(targets, { clipPath: "inset(0% 0% 100% 0%)" });

        gsap.to(targets, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.inOut",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            once: true,
          },
        });
        return;
      }

      gsap.set(targets, { opacity: 0, y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 84%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [stagger, y, clip]);

  const Tag = as as ElementType;

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
