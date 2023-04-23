import type { ReactNode } from "react";

export interface ButtonControlProps {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export function ButtonControl({
  onClick,
  children,
  className,
}: ButtonControlProps) {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
}
