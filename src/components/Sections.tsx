"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import FadeUp from "./FadeUp";
import { WORKFLOW_STEPS, SCOPE_ITEMS, IMPACT_STATS } from "@/lib/data";

/* ── shared section wrapper ── */
function SectionInner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative z-10 mx-auto max-w-6xl px-6 py-24 ${className}`}>
      {children}
    </div>
  );
}

function SectionBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 text-center">
      <span
        className="inline-flex items-center gap-2 rounded-full border bg-[#514733]/40 px-4 py-2 text-[11px] font-bold uppercase tracking-widest"
        style={{ color, borderColor: `${color}30` }}
      >
        {children}
      </span>
    </div>
  );
}

/* ══════════════════════════════
   VISION
   ══════════════════════════════ */
export function VisionSection() {
  return (
    <section id="vision" className="relative overflow-hidden">
      <div className="section-divider" />
      <SectionInner className="text-center">
        <FadeUp>
          <SectionBadge color="#0E7490">The Vision</SectionBadge>
          <h2 className="font-display font-extrabold leading-[1.1] tracking-tight"
            style={{ fontSize:"clamp(30px,5vw,52px)" }}>
            <span className="text-[#EAC97C]">Automation in Electronic Systems Design</span><br />
            <span className="text-[#EAC97C]">is the </span>
            <span className="text-white">Next Big Thing!</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-[#0E7490] to-transparent" />
          <p className="mx-auto max-w-2xl leading-relaxed text-[#C8BAA6]"
            style={{ fontSize:"clamp(15px,1.8vw,18px)" }}>
            As artificial intelligence advances and becomes more deterministic, AI for Electronic Design
            Automation (EDA) is not just an evolution — it is{" "}
            <span className="font-bold text-[#0E7490]">inevitable!</span>
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mx-auto mt-14 max-w-xl glass rounded-2xl px-8 py-9 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,116,144,0.15)]">
            <div className="font-display text-2xl font-bold text-[#0E7490] sm:text-3xl">LRM based EDA</div>
            <p className="mt-4 text-lg leading-relaxed text-[#C8BAA6]">
              AEDI&apos;s compute prowess to synthesize and deliver production ready embedded system designs,
              optimized for the end user.
            </p>
          </div>
        </FadeUp>
      </SectionInner>
    </section>
  );
}

/* ══════════════════════════════
   ENGINE
   ══════════════════════════════ */
const BOX_SIZES = [
  { size: 280, font: "text-[15px]" },
  { size: 200, font: "text-xs" },
  { size: 150, font: "text-[11px]" },
  { size: 120, font: "text-[10px]" },
];

const BOX_TEXTS = [
  "Generative AI with Large Reasoning Models",
  "Causal Reasoning to Eliminate Hallucinations in Design",
  "Verifiable Simulation Engine",
  "Physically Viable Designs",
];

export function EngineSection() {
  return (
    <section id="engine" className="relative overflow-hidden bg-[#1E1B1B]">
      <div className="section-divider" />
      <SectionInner>
        <FadeUp>
          <SectionBadge color="#059669">
            <Cpu className="h-3.5 w-3.5" /> The Engine
          </SectionBadge>
          <h2 className="text-center font-display font-extrabold leading-[1.1] tracking-tight"
            style={{ fontSize:"clamp(28px,4.5vw,50px)" }}>
            <span className="text-[#EAC97C]">Automated Input Discovery to Embedded System Design</span><br />
            <span className="text-[#0E7490]">AI-Driven Proprietary Design Solutions</span>
          </h2>
        </FadeUp>

        {/* Engine boxes */}
        <FadeUp delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {BOX_TEXTS.map((text, i) => {
              const s = BOX_SIZES[i];
              return (
                <div
                  key={text}
                  className="relative shrink-0"
                  style={{ width: s.size, height: s.size, maxWidth: "45vw" }}
                >
                  <Image src="/images/box.png" alt="" fill className="object-contain" />
                  <p className={`absolute inset-[20%] flex items-center justify-center text-center font-display font-bold leading-snug text-[#EAC97C] ${s.font}`}>
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Workflow */}
        <FadeUp delay={0.2}>
          <h3 className="mb-10 mt-20 text-center font-display text-2xl font-bold text-[#EAC97C] sm:text-3xl">
            Design Workflow
          </h3>
        </FadeUp>

        {/* Desktop */}
        <div className="hidden lg:flex items-start justify-center gap-0">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.25)" }}
                className="group relative w-44 shrink-0 cursor-default rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
              >
                <div className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: step.accent }}>{i + 1}</div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${step.accent}18`, border: `1px solid ${step.accent}35` }}>
                  <step.Icon className="h-6 w-6" style={{ color: step.accent }} />
                </div>
                <h4 className="text-center font-display text-xs font-bold leading-tight" style={{ color: step.accent }}>
                  {step.label}
                </h4>
                {step.description && (
                  <p className="mt-1.5 text-center text-[11px] leading-relaxed text-[#B7AA91]">{step.description}</p>
                )}
                {step.bullets && (
                  <div className="mt-2.5 space-y-1.5">
                    {step.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: step.accent }} />
                        <span className="text-[10px] leading-snug text-[#C8BAA6]">{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="flex h-14 shrink-0 items-center px-1 pt-7">
                  <div className="h-px w-7" style={{ background: `linear-gradient(to right, ${step.accent}80, ${WORKFLOW_STEPS[i+1].accent}80)` }} />
                  <div className="h-0 w-0" style={{ borderTop:"5px solid transparent", borderBottom:"5px solid transparent", borderLeft:`7px solid ${WORKFLOW_STEPS[i+1].accent}` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden flex flex-col items-center max-w-md mx-auto gap-0">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex w-full flex-col items-center">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm relative"
              >
                <div className="absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: step.accent }}>{i + 1}</div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${step.accent}18`, border: `1px solid ${step.accent}35` }}>
                    <step.Icon className="h-5 w-5" style={{ color: step.accent }} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold" style={{ color: step.accent }}>{step.label}</h4>
                    {step.description && <p className="mt-0.5 text-xs text-[#B7AA91]">{step.description}</p>}
                  </div>
                </div>
                {step.bullets && (
                  <div className="mt-2.5 grid grid-cols-1 gap-1.5 pl-14 sm:grid-cols-2">
                    {step.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: step.accent }} />
                        <span className="text-xs leading-relaxed text-[#C8BAA6]">{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="flex flex-col items-center py-1">
                  <div className="h-7 w-px" style={{ background: `linear-gradient(to bottom, ${step.accent}60, ${WORKFLOW_STEPS[i+1].accent}60)` }} />
                  <div className="h-0 w-0" style={{ borderLeft:"5px solid transparent", borderRight:"5px solid transparent", borderTop:`7px solid ${WORKFLOW_STEPS[i+1].accent}` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionInner>
    </section>
  );
}

/* ══════════════════════════════
   SCOPE
   ══════════════════════════════ */
export function ScopeSection() {
  return (
    <section id="scope" className="relative overflow-hidden">
      <div className="section-divider" />
      <SectionInner>
        <FadeUp>
          <SectionBadge color="#0E7490">The Scope</SectionBadge>
          <h2 className="text-center font-display font-extrabold leading-[1.1] tracking-tight"
            style={{ fontSize:"clamp(28px,4.5vw,50px)" }}>
            <span className="text-gradient-gold">One Platform.</span>{" "}
            <span className="text-[#0E7490]">Multiple</span>{" "}
            <span className="text-gradient-gold">Applications.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-center leading-relaxed text-[#B7AA91] md:text-xl"
            style={{ fontSize:"clamp(15px,1.8vw,18px)" }}>
            AEDI is a dynamic functional model generating comprehensive embedded system designs for a range of applications.
          </p>
        </FadeUp>

        <div className="mt-14 flex flex-col gap-5">
          {SCOPE_ITEMS.map((item, i) => (
            <FadeUp key={item.title} delay={0.1 + i * 0.08}>
              <div className={`glass flex flex-col items-start gap-6 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_0_25px_rgba(14,116,144,0.1)] md:items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                <div className="shrink-0 rounded-2xl p-4"
                  style={{ backgroundColor: `${item.accent}12`, border: `1px solid ${item.accent}30` }}>
                  <item.Icon className="h-8 w-8" style={{ color: item.accent }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-[#EAC97C] sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#B7AA91]">{item.description}</p>
                </div>
                <div className="hidden shrink-0 lg:block">
                  <Image src={item.image} alt={item.title} width={208} height={144}
                    loading="lazy"
                    className="h-36 w-52 rounded-xl object-contain" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </SectionInner>
    </section>
  );
}

/* ══════════════════════════════
   IMPACT
   ══════════════════════════════ */
export function ImpactSection() {
  return (
    <section id="impact" className="relative overflow-hidden bg-[#1E1B1B]">
      <div className="section-divider" />
      <SectionInner>
        <FadeUp>
          <SectionBadge color="#059669">The Impact</SectionBadge>
          <h2 className="text-center font-display font-extrabold leading-[1.1] tracking-tight"
            style={{ fontSize:"clamp(28px,4.5vw,50px)" }}>
            <span className="text-[#EAC97C]">Redefining </span>
            <span className="text-[#0E7490]">Development</span>
            <span className="text-[#EAC97C]"> Timelines</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-[#B7AA91]"
            style={{ fontSize:"clamp(15px,1.8vw,18px)" }}>
            Our new-tech enabled system delivers best-in-class optimized system solutions, custom firmware,
            precise Gerber files, and an optimized Bill of Materials (BOM) for effective sourcing and seamless assembly.
          </p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((item, i) => (
            <FadeUp key={item.title} delay={0.1 + i * 0.1} className="h-full">
              <div className="glass-strong group flex h-full flex-col rounded-2xl p-7 text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,116,144,0.12)]">
                <div
                  className={`font-display font-black leading-none ${item.small ? "text-3xl sm:text-4xl" : "text-5xl sm:text-6xl"}`}
                  style={{ color: item.accent }}
                >{item.stat}</div>
                <h3 className="mt-4 font-display text-base font-bold text-[#EAC97C]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#B7AA91]">{item.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </SectionInner>
    </section>
  );
}

/* ══════════════════════════════
   CONTACT
   ══════════════════════════════ */
export function ContactSection() {
  return (
    <section id="contact" className="relative py-8">
      <div className="flex items-center justify-between w-full px-1 sm:px-2">
        {/* Left honeycomb */}
        <div className="hidden sm:block shrink-0">
          <Image src="/images/honeycomb.png" alt="" width={200} height={200}
            loading="lazy"
            className="pointer-events-none h-36 w-auto opacity-60 sm:h-52 md:h-64"
            style={{ transform: "rotate(180deg)" }} />
        </div>

        {/* Center */}
        <div className="flex-1 px-6 text-center">
          <a href="mailto:cs@chunchreek.com"
            className="inline-block text-[17px] font-semibold text-[#0E7490] hover:text-[#0E7490]/80 transition-colors">
            cs@chunchreek.com
          </a>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[#B7AA91]/70">
            Automatic Electronic Design Initiative (AEDI)
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            is promoted by
            <span className="hidden sm:inline"> </span>
            <br className="sm:hidden" />
            <span className="font-medium text-[#EAC97C]/80">Chunchreek Ventures India Private Limited (CVIL)</span>
          </p>
          <p className="mt-2.5 text-xs leading-relaxed text-[#B7AA91]/60">
            📍 2C1B, Research and Innovation Park, Indian Institute of Technology (IIT) Delhi,<br />
            Hauz Khas, New Delhi – 110016, India
          </p>
          <p className="mt-2 text-xs text-[#B7AA91]/50">Pictures Design and Content © 2026 of CVIL</p>
          <p className="mt-1 text-xs text-[#B7AA91]/40">CIN: U70200HR2025PTC129523</p>

          {/* Social icons */}
          <div className="mt-5 flex items-center justify-center gap-5">
            <a href="#" aria-label="Instagram" className="text-[#B7AA91]/50 hover:text-[#EAC97C] transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-[#B7AA91]/50 hover:text-[#EAC97C] transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" aria-label="X (Twitter)" className="text-[#B7AA91]/50 hover:text-[#EAC97C] transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        {/* Right honeycomb */}
        <div className="hidden sm:block shrink-0">
          <Image src="/images/honeycomb.png" alt="" width={200} height={200}
            loading="lazy"
            className="pointer-events-none h-36 w-auto opacity-60 sm:h-52 md:h-64"
            style={{ transform: "scaleX(-1) rotate(180deg)" }} />
        </div>
      </div>
    </section>
  );
}
