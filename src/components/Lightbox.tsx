import { useCallback, useEffect } from "react";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const total = images.length;

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + total) % total),
    [index, total, onIndexChange],
  );

  const goNext = useCallback(
    () => onIndexChange((index + 1) % total),
    [index, total, onIndexChange],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose, goPrev, goNext]);

  const current = images[index];
  if (!current) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Fechar"
      >
        ✕
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Imagem anterior"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Próxima imagem"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            ›
          </button>
        </>
      )}

      <figure
        className="lightbox__figure"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={current.src} alt={current.alt} />
      </figure>

      {total > 1 && (
        <p className="lightbox__counter">
          {index + 1} / {total}
        </p>
      )}
    </div>
  );
}
