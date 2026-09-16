interface InitialsAvatarProps {
  name: string;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Avatar circular com as iniciais do nome — usado onde não temos foto própria. */
export default function InitialsAvatar({ name, className }: InitialsAvatarProps) {
  return (
    <div className={`initials-avatar ${className ?? ""}`} aria-hidden="true">
      {getInitials(name)}
    </div>
  );
}
