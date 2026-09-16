import { useEffect, useState } from "react";
import { APPBARBER_URL } from "../data";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky-cta ${visible ? "sticky-cta--visible" : ""}`}
      aria-hidden={!visible}
    >
      <a
        href={APPBARBER_URL}
        target="_blank"
        rel="noreferrer"
        className="btn btn-solid sticky-cta__btn"
      >
        Agendar horário
      </a>
    </div>
  );
}
