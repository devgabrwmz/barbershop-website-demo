import { useEffect, useState } from "react";
import { whatsappLink } from "../../data";

export default function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(
        "Olá! Vim pelo site da Barbearia Prime e gostaria de agendar um horário.",
      )}
      target="_blank"
      rel="noreferrer"
      className={`floating-whatsapp ${visible ? "floating-whatsapp--visible" : ""}`}
      aria-label="Agendar pelo WhatsApp"
    >
      <span className="floating-whatsapp__ping" aria-hidden="true" />
      <span className="floating-whatsapp__icon">💬</span>
      <span className="floating-whatsapp__tooltip">Fale conosco</span>
    </a>
  );
}
