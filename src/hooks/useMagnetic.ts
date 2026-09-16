import { useEffect, type RefObject } from "react";

/**
 * Faz o elemento "seguir" levemente o cursor dentro da sua área — efeito
 * magnético usado em botões de destaque. Não faz nada em touch/mobile.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.35,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!isDesktop || prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };

    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, [ref, strength]);
}
