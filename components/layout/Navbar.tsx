"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Truck, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { BUSINESS, NAV_LINKS, type NavLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

// A dropdown tab counts as "current" for any page underneath it, not just its
// own href — /services/furniture-removal/boise-id should still light up the
// Services tab.
function isSectionActive(link: NavLink, pathname: string) {
  if (pathname === link.href) return true;
  return (
    link.children?.some(
      (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
    ) ?? false
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Which desktop dropdown is showing, and which mobile section is expanded —
  // separate because the two menus can be mounted at the same time on a tablet
  // rotation and shouldn't fight over one piece of state.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setOpenSection(null);
  }, [pathname]);

  // Escape closes whatever is open, so a keyboard user is never trapped in a
  // menu that hover alone would have dismissed.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

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

          {/* gap-5, not gap-6: the Pricing tab took the desktop row to eight
              items, which overran the logo and phone number at exactly 1024px. */}
          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isSectionActive(link, pathname);

              if (!link.children) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-display text-sm font-semibold text-ink-soft transition-colors hover:text-basin-500",
                      active && "text-basin-500"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              }

              const expanded = openMenu === link.label;

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.label)}
                  onMouseLeave={() =>
                    setOpenMenu((current) =>
                      current === link.label ? null : current
                    )
                  }
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={expanded}
                    onClick={() =>
                      setOpenMenu((current) =>
                        current === link.label ? null : link.label
                      )
                    }
                    className={cn(
                      "flex items-center gap-1 font-display text-sm font-semibold text-ink-soft transition-colors hover:text-basin-500",
                      (active || expanded) && "text-basin-500"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={15}
                      className={cn(
                        "transition-transform duration-200",
                        expanded && "rotate-180"
                      )}
                    />
                  </button>

                  {/* The wrapper owns the centering transform so the panel is
                      free to animate its own translate without cancelling it,
                      and its pt-3 is the hover bridge between tab and panel.

                      A closed wrapper must not take the mouse. The panel inside
                      it is `invisible`, which still occupies its full layout box
                      — 16rem wide, centered, so it reaches well past its own tab
                      and over the neighbour's open menu. Left hit-testable, that
                      empty box swallowed hovers meant for the panel underneath
                      and fired this tab's onMouseEnter, so sliding right through
                      the Services list snapped open Service Areas instead. */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3",
                      expanded
                        ? "pointer-events-auto z-50"
                        : "pointer-events-none z-40"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl border border-navy/5 bg-white p-2 shadow-[0_18px_44px_-14px_rgba(11,37,69,0.32)] transition-all duration-200",
                        expanded
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      )}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-lg px-3 py-2 font-display text-sm font-bold text-navy hover:bg-navy-50"
                      >
                        All {link.label}
                      </Link>
                      <div className="my-1 h-px bg-navy/5" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenMenu(null)}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-navy-50 hover:text-basin-600",
                            pathname === child.href &&
                              "bg-basin-50 text-basin-600"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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
          "bg-white shadow-lg transition-[max-height] duration-300 ease-in-out lg:hidden",
          // Expanded sections can run past the old fixed height, so the sheet
          // is capped at the viewport and scrolls instead of clipping items.
          open
            ? "max-h-[calc(100vh-72px)] overflow-y-auto"
            : "max-h-0 overflow-hidden"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => {
            const active = isSectionActive(link, pathname);

            if (!link.children) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 font-display text-base font-semibold text-ink-soft hover:bg-navy-50",
                    active && "bg-basin-50 text-basin-600"
                  )}
                >
                  {link.label}
                </Link>
              );
            }

            const expanded = openSection === link.label;

            return (
              <div key={link.href}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() =>
                    setOpenSection((current) =>
                      current === link.label ? null : link.label
                    )
                  }
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-3 font-display text-base font-semibold text-ink-soft hover:bg-navy-50",
                    active && "bg-basin-50 text-basin-600"
                  )}
                >
                  {link.label}
                  <ChevronDown
                    size={18}
                    className={cn(
                      "transition-transform duration-200",
                      expanded && "rotate-180"
                    )}
                  />
                </button>

                {expanded && (
                  <div className="mt-1 flex flex-col gap-0.5 border-l-2 border-basin-100 pl-3">
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 font-display text-sm font-bold text-navy hover:bg-navy-50"
                    >
                      All {link.label}
                    </Link>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-navy-50",
                          pathname === child.href &&
                            "bg-basin-50 text-basin-600"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
