"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FloatingQuoteButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/quote") return null;

  return (
    <div
      className={cn(
        "fixed bottom-24 right-5 z-40 transition-all duration-200 ease-out motion-reduce:transition-none lg:bottom-6 lg:right-6",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-5 scale-90 opacity-0"
      )}
    >
      <Link
        href="/quote"
        className="flex items-center gap-2 rounded-full bg-basin-500 px-5 py-3.5 font-display text-sm font-bold text-white shadow-cta transition-transform hover:scale-105 active:scale-95"
      >
        <ClipboardList size={18} />
        Get Quote
      </Link>
    </div>
  );
}
