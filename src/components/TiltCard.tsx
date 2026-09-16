import { useRef, useState, type ElementType, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** graus máximos de inclinação em cada eixo */
  max?: number;
}

/**
 * Envolve um card e aplica uma leve inclinação 3D seguindo o cursor, com um
 * brilho radial que acompanha o ponteiro. Some sozinho em touch/mobile
 * porque depende de mousemove, que não dispara em toque.
 */
export default function TiltCard({
  children,
  className,
  as = "div",
  max = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * max * 2;
    const rotateX = (0.5 - py) * max * 2;

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    el.style.setProperty("--spot-x", `${px * 100}%`);
    el.style.setProperty("--spot-y", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      className={`tilt-card ${className ?? ""}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </Tag>
  );
}
