interface MarqueeProps {
  items: string[];
}

/** Faixa dourada com texto rolando infinitamente — quebra de ritmo visual entre seções. */
export default function Marquee({ items }: MarqueeProps) {
  // duplicado para o loop de translateX(-50%) fechar sem emenda visível
  const content = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {content.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__dot">✂</span>
          </span>
        ))}
      </div>
    </div>
  );
}
