"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-24 right-5 z-40 lg:bottom-6 lg:right-6"
        >
          <Link
            href="/quote"
            className="flex items-center gap-2 rounded-full bg-basin-500 px-5 py-3.5 font-display text-sm font-bold text-white shadow-cta transition-transform hover:scale-105 active:scale-95"
          >
            <ClipboardList size={18} />
            Get Quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
