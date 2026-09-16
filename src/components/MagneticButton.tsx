import { useRef, type AnchorHTMLAttributes } from "react";
import { useMagnetic } from "../hooks/useMagnetic";

type MagneticButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  strength?: number;
};

/** Link estilizado como botão que "gruda" levemente no cursor ao passar perto. */
export default function MagneticButton({
  strength = 0.3,
  children,
  ...anchorProps
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, strength);

  return (
    <a ref={ref} {...anchorProps}>
      {children}
    </a>
  );
}
