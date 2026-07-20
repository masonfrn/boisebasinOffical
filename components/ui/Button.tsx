import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight transition-all duration-200 rounded-full whitespace-nowrap active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-basin-500 text-white shadow-cta hover:bg-basin-600 hover:shadow-[0_14px_34px_-8px_rgba(242,102,45,0.65)]",
  secondary:
    "bg-navy text-white hover:bg-navy-500",
  outline:
    "bg-white text-navy border-2 border-navy/15 hover:border-haul-500 hover:text-haul-500",
  ghost: "bg-transparent text-navy hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-3",
  lg: "text-base px-7 py-4",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  icon,
  disabled,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = /^(https?:|tel:|mailto:|sms:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {icon}
      {children}
    </button>
  );
}
