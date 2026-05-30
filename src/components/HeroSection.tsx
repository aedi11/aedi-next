"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, FileText } from "lucide-react";
import FadeUp from "./FadeUp";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-mesh overflow-hidden">
      {/* Decorative orbs — hidden on mobile for perf */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        <div className="absolute rounded-full animate-orb-float"
          style={{ width:500, height:500, background:"#826015", opacity:0.06, filter:"blur(120px)", left:"15%", top:"10%" }} />
        <div className="absolute rounded-full animate-orb-float"
          style={{ width:300, height:300, background:"#EAC97C", opacity:0.03, filter:"blur(100px)", left:"70%", top:"60%", animationDelay:"-8s", animationDuration:"25s" }} />
        <div className="absolute rounded-full animate-orb-float"
          style={{ width:400, height:400, background:"#0E7490", opacity:0.05, filter:"blur(130px)", left:"80%", top:"5%", animationDelay:"-5s", animationDuration:"18s" }} />
        <div className="absolute rounded-full animate-orb-float"
          style={{ width:250, height:250, background:"#059669", opacity:0.04, filter:"blur(100px)", left:"5%", top:"70%", animationDelay:"-12s", animationDuration:"22s" }} />
        {/* Rings */}
        <div className="absolute rounded-full border border-[#0E7490] opacity-[0.12] animate-ring-spin"
          style={{ width:200, height:200, right:"10%", top:"25%" }} />
        <div className="absolute rounded-full border border-[#EAC97C] opacity-[0.12]"
          style={{ width:120, height:120, left:"8%", top:"30%", animation:"ring-spin 20s linear infinite reverse" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(14,116,144,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(234,201,124,0.2) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <FadeUp>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#514733]/60 px-5 py-2.5 text-sm font-semibold text-[#EAC97C] ring-1 ring-[#0E7490]/30 backdrop-blur-sm">
            <Rocket className="h-4 w-4" />
            Proudly contributing to AI INDIA Mission
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-gradient-gold">Automated Electronic<br />Design Initiative</span>
            <span className="mt-3 block font-semibold tracking-[0.25em] text-[#0E7490]"
              style={{ fontSize:"clamp(26px,4vw,46px)" }}>AEDI</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-[#B7AA91]"
            style={{ fontSize:"clamp(17px,2.2vw,20px)" }}>
            Empowering embedded electronics ecosystem through High Performance Computing. AEDI engineers
            successfully tested the hypothesis to commit towards a product focused, generative AI approach
            to synthesize and deliver physically feasible, comprehensive, embedded system designs.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#vision"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#826015] px-8 py-4 text-[15px] font-bold text-[#1E1B1B] transition-all duration-300 hover:bg-[#9A7A2F] hover:shadow-[0_0_30px_rgba(118,185,0,0.2)] hover:-translate-y-0.5"
            >
              Explore the Initiative
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/demo"
              className="glass inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-semibold text-[#EAC97C] transition-all duration-300 hover:bg-[#514733]/40 hover:shadow-[0_0_20px_rgba(14,116,144,0.2)] hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" />
              Concept Demo
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.5}>
          <motion.div
            className="mt-20 flex flex-col items-center gap-4"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xl font-medium text-[#EAC97C] sm:text-2xl">In association with</span>
            <div className="flex flex-wrap items-center justify-center gap-10">
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/iitd_logo.png" alt="IIT Delhi" width={120} height={120}
                  sizes="(max-width: 768px) 80px, 120px"
                  className="h-24 w-auto object-contain sm:h-32" priority />
                <span className="text-[11px] font-medium tracking-wide text-[#B7AA91]/70">IIT Delhi</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image src="/images/nvidia_transparent.png" alt="NVIDIA Inception" width={120} height={120}
                  sizes="(max-width: 768px) 100px, 120px"
                  className="h-24 w-auto object-contain sm:h-32" priority />
                <span className="text-[11px] font-medium tracking-wide text-[#B7AA91]/70">NVIDIA Inception</span>
              </div>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
