interface StarsProps {
  count: number;
}

export default function Stars({ count }: StarsProps) {
  return (
    <span className="stars" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "stars__on" : "stars__off"}>
          ★
        </span>
      ))}
    </span>
  );
}
