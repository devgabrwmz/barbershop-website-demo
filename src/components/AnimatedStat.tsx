import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedStat({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedStatProps) {
  const numberRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }

    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, prefix, suffix, decimals]);

  return (
    <TiltCard as="div" className="social-proof__card" max={6}>
      <h3 ref={numberRef}>
        {prefix}0{suffix}
      </h3>
      <p>{label}</p>
    </TiltCard>
  );
}
