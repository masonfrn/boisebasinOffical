"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_2px_16px_-4px_rgba(11,37,69,0.14)] backdrop-blur"
          : "bg-white/80 backdrop-blur"
      )}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
              <Truck size={20} strokeWidth={2.25} />
            </span>
            <span className="font-display leading-tight">
              <span className="block text-[15px] font-bold text-navy sm:text-base">
                Boise Basin
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-basin-500">
                Junk Removal
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-display text-sm font-semibold text-ink-soft transition-colors hover:text-basin-500",
                  pathname === link.href && "text-basin-500"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-2 font-display text-sm font-bold text-navy hover:text-haul-500"
            >
              <Phone size={16} /> {BUSINESS.phone}
            </a>
            <Button href="/quote" size="md">
              Get Instant Quote
            </Button>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-navy lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "overflow-hidden bg-white shadow-lg transition-[max-height] duration-300 ease-in-out lg:hidden",
          open ? "max-h-[420px]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-3 font-display text-base font-semibold text-ink-soft hover:bg-navy-50",
                pathname === link.href && "bg-basin-50 text-basin-600"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-navy/10 pt-4">
            <Button href="/quote" size="md" className="justify-center">
              Get Instant Quote
            </Button>
            <Button href={BUSINESS.phoneHref} variant="outline" size="md" className="justify-center" icon={<Phone size={16} />}>
              Call {BUSINESS.phone}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
