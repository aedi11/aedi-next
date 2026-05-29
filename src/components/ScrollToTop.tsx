"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-7 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#826015]/80 border border-[#EAC97C]/30 text-[#EAC97C] hover:bg-[#826015] transition-all duration-300 shadow-lg"
    >
      <ChevronUp className="h-4 w-4" />
    </button>
  );
}
