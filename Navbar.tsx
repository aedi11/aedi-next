"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#vision",     label: "Vision" },
  { href: "#engine",     label: "Engine" },
  { href: "#scope",      label: "Scope" },
  { href: "#impact",     label: "Impact" },
  { href: "#leadership", label: "Team" },
  { href: "#contact",    label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-3.5 bg-[#1E1B1B]/80 backdrop-blur-md border-b border-[#514733]/30 md:px-8">
        {/* Logo */}
        <div className="font-display text-xl font-extrabold text-[#EAC97C]">AEDI</div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-[#8F7E5E] hover:text-[#EAC97C] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/demo"
            className="text-[13px] font-semibold text-[#EAC97C] bg-[#826015]/20 border border-[#826015]/40 rounded-lg px-4 py-1.5 hover:bg-[#826015]/35 transition-all"
          >
            Concept Demo
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((p) => !p)}
        >
          <span
            className="block w-6 h-0.5 bg-[#EAC97C] rounded transition-transform duration-300"
            style={{ transform: open ? "rotate(45deg) translate(5px, 5px)" : "" }}
          />
          <span
            className="block w-6 h-0.5 bg-[#EAC97C] rounded transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-[#EAC97C] rounded transition-transform duration-300"
            style={{ transform: open ? "rotate(-45deg) translate(5px, -5px)" : "" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed top-[57px] left-0 right-0 z-[99] flex flex-col px-6 py-4 gap-3 bg-[#1E1B1B]/97 backdrop-blur-xl border-b border-[#514733]/30">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[15px] font-medium text-[#B7AA91] hover:text-[#EAC97C] py-2 border-b border-[#514733]/20 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/demo"
            onClick={() => setOpen(false)}
            className="text-[15px] font-bold text-[#EAC97C] py-2"
          >
            Concept Demo →
          </Link>
        </div>
      )}
    </>
  );
}
