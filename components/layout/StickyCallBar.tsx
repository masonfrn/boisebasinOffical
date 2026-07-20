import { Phone, MessageSquare } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy/10 bg-white/95 backdrop-blur lg:hidden [padding-bottom:env(safe-area-inset-bottom)]">
      <a
        href={BUSINESS.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-navy py-3.5 font-display text-sm font-bold text-white"
      >
        <Phone size={17} /> Call Now
      </a>
      <a
        href={BUSINESS.smsHref}
        className="flex flex-1 items-center justify-center gap-2 bg-basin-500 py-3.5 font-display text-sm font-bold text-white"
      >
        <MessageSquare size={17} /> Text Us
      </a>
    </div>
  );
}
