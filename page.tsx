"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft, Zap, Battery, Cpu,
  BrainCircuit, CheckCircle2, Loader2,
  Send, HardHat, Maximize2, X, AlertTriangle,
} from "lucide-react";
import type { Message, MultiDesignResponse, ReasoningStep, DesignVariant } from "@/lib/types";
import { DEMO_PROMPTS, VARIANT_CONFIG } from "@/lib/data";

/* ─── Reasoning steps shown while "loading" ────────────────────────────────── */
const FAKE_STEPS: ReasoningStep[] = [
  { step_number: 1, title: "Parsing Requirements",            description: "Extracting key parameters: voltage, capacity, current, thermal constraints, and application-specific compliance requirements." },
  { step_number: 2, title: "Cell Chemistry Selection",        description: "Evaluating LiFePO4, NMC 811, NCA, and LTO chemistries against energy density, cycle life, safety, and cost targets." },
  { step_number: 3, title: "Pack Configuration Analysis",     description: "Computing optimal series/parallel topology to achieve target voltage, energy content, and current capability with minimal cell count." },
  { step_number: 4, title: "BMS Architecture Design",         description: "Selecting BMS IC, MOSFET switch topology, balancing strategy, shunt sizing, and communication stack (CAN/RS485/WiFi)." },
  { step_number: 5, title: "Thermal Management Planning",     description: "Modeling heat dissipation at peak load, selecting cooling method, and defining thermal runaway protection strategy." },
  { step_number: 6, title: "Protection Circuit Design",       description: "Specifying over-voltage, under-voltage, over-current, short-circuit, and thermal protection thresholds with hardware and software redundancy." },
  { step_number: 7, title: "BOM Generation & Cost Analysis",  description: "Sourcing real components with part numbers, cross-referencing distributor pricing, and optimising total pack cost across three design variants." },
  { step_number: 8, title: "Circuit Schematic Generation",    description: "Producing block-level circuit schematic for each variant showing power flow, signal paths, protection topology, and communication interfaces." },
];

const PROMPT_ICONS = [Battery, Zap, Cpu];

/* ─── StreamingSteps ────────────────────────────────────────────────────────── */
function StreamingSteps({ steps }: { steps: ReasoningStep[] }) {
  return (
    <div className="mb-5 rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <BrainCircuit className="h-4 w-4 text-[#0E7490]" />
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#0E7490]">AI Analysis in Progress</h3>
      </div>
      <div>
        {steps.map((step, i) => (
          <motion.div
            key={step.step_number}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex gap-3 pb-4 last:pb-0"
          >
            {i < steps.length - 1 && (
              <div className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-[#514733]" />
            )}
            <div className="relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#0E7490]/20 ring-1 ring-[#0E7490]/40">
              <CheckCircle2 className="h-3 w-3 text-[#0E7490]" />
            </div>
            <div className="pt-0.5">
              <span className="text-[13px] font-semibold text-[#EAC97C]">{step.title}</span>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#8F7E5E]">{step.description}</p>
            </div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex gap-3 pt-1">
          <div className="relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#826015]/20 ring-1 ring-[#826015]/40">
            <Loader2 className="h-3 w-3 animate-spin text-[#EAC97C]" />
          </div>
          <span className="pt-0.5 text-[13px] italic text-[#8F7E5E]">Processing next step...</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── ReasoningSteps (final, all revealed) ──────────────────────────────────── */
function ReasoningSteps({ steps }: { steps: ReasoningStep[] }) {
  return (
    <div className="mb-5 rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/10 p-5">
      <div className="mb-4 flex items-center gap-2">
        <BrainCircuit className="h-4 w-4 text-[#0E7490]" />
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#0E7490]">AI Analysis</h3>
      </div>
      <div>
        {steps.map((step, i) => (
          <motion.div
            key={step.step_number}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.1, ease: "easeOut" }}
            className="relative flex gap-3 pb-4 last:pb-0"
          >
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 + 0.15 }}
                className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px origin-top bg-[#514733]"
              />
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.1 + 0.1 }}
              className="relative z-10 mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#0E7490]/20 ring-1 ring-[#0E7490]/40"
            >
              <CheckCircle2 className="h-3 w-3 text-[#0E7490]" />
            </motion.div>
            <div className="pt-0.5">
              <span className="text-[13px] font-semibold text-[#EAC97C]">{step.title}</span>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#8F7E5E]">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── SpecCard ──────────────────────────────────────────────────────────────── */
function SpecCard({ title, data }: { title: string; data: Record<string, string | number | string[]> }) {
  return (
    <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/20 p-4">
      <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#EAC97C]">{title}</h4>
      <dl className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between gap-4">
            <dt className="text-[11px] capitalize text-[#8F7E5E]">{key.replace(/_/g, " ")}</dt>
            <dd className="text-right text-[11px] text-[#C8BAA6]">
              {Array.isArray(value) ? value.join(", ") : String(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ─── ElectricalSpecsTable ──────────────────────────────────────────────────── */
function ElectricalSpecsTable({ specs }: { specs: NonNullable<DesignVariant["electrical_specs"]> }) {
  return (
    <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/20 p-4">
      <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#EAC97C]">Electrical Specifications</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-[#8F7E5E]/20">
              <th className="pb-2 text-left font-semibold text-[#8F7E5E]">Parameter</th>
              <th className="pb-2 text-center font-semibold text-[#8F7E5E]">Value</th>
              <th className="pb-2 text-center font-semibold text-[#8F7E5E]">Unit</th>
              <th className="hidden pb-2 text-left font-semibold text-[#8F7E5E] sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((s, i) => (
              <tr key={i} className="border-b border-[#514733]/30 last:border-0">
                <td className="py-1.5 text-[#C8BAA6]">{s.parameter}</td>
                <td className="py-1.5 text-center font-bold text-[#EAC97C]">{s.value}</td>
                <td className="py-1.5 text-center text-[#8F7E5E]">{s.unit}</td>
                <td className="hidden py-1.5 text-[#8F7E5E] sm:table-cell">{s.notes ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── SchematicViewer ───────────────────────────────────────────────────────── */
function SchematicViewer({ svg, variantName }: { svg: string; variantName: string }) {
  const [fullscreen, setFullscreen] = useState(false);

  const isValidSvg = typeof svg === "string" && svg.trim().startsWith("<svg");

  if (!isValidSvg) {
    return (
      <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/10 p-5 text-center">
        <AlertTriangle className="mx-auto mb-2 h-5 w-5 text-[#8F7E5E]" />
        <p className="text-[11px] text-[#8F7E5E]">Circuit schematic not available for this variant.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#1a1714] p-3">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#EAC97C]">
            Circuit Schematic — {variantName}
          </h4>
          <button
            onClick={() => setFullscreen(true)}
            className="flex items-center gap-1 rounded-lg border border-[#514733]/50 px-2.5 py-1 text-[10px] text-[#8F7E5E] transition-colors hover:border-[#826015]/50 hover:text-[#EAC97C]"
          >
            <Maximize2 className="h-3 w-3" />
            Expand
          </button>
        </div>
        <div
          className="overflow-hidden rounded-lg"
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{ maxHeight: 320, lineHeight: 0 }}
        />
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-2xl border border-[#514733]/50 bg-[#1a1714] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-[#EAC97C]">
                  Circuit Schematic — {variantName}
                </h3>
                <button
                  onClick={() => setFullscreen(false)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#514733]/50 px-3 py-1.5 text-[11px] text-[#8F7E5E] transition-colors hover:text-[#EAC97C]"
                >
                  <X className="h-3.5 w-3.5" /> Close
                </button>
              </div>
              <div
                className="overflow-auto rounded-lg"
                dangerouslySetInnerHTML={{ __html: svg }}
                style={{ maxHeight: "75vh", lineHeight: 0 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── VariantContent ────────────────────────────────────────────────────────── */
function VariantContent({ design }: { design: DesignVariant }) {
  const cfg = VARIANT_CONFIG[design.variant_name] ?? VARIANT_CONFIG["Cost Optimized"];
  return (
    <div className="space-y-4">
      {/* Header */}
      <div
        className="rounded-xl p-4"
        style={{ background: `linear-gradient(135deg,${cfg.color}08 0%,${cfg.color}03 100%)`, border: `1px solid ${cfg.color}20` }}
      >
        <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
          {design.variant_name}
        </p>
        <p className="mt-1 text-[13px] text-[#B7AA91]">{design.variant_description}</p>
        {design.total_estimated_cost_usd && (
          <p className="mt-2 text-[11px] text-[#8F7E5E]">
            Estimated Total Cost: <span className="font-bold text-[#EAC97C]">{design.total_estimated_cost_usd}</span>
          </p>
        )}
        {/* Key highlights */}
        {design.key_highlights?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {design.key_highlights.map((h, i) => (
              <span key={i} className="rounded-full border px-2.5 py-0.5 text-[10px] text-[#C8BAA6]"
                style={{ borderColor: `${cfg.color}30`, background: `${cfg.color}08` }}>
                {h}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Project Summary */}
      {design.project_summary && (
        <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/20 p-4">
          <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#EAC97C]">Project Summary</h4>
          <p className="text-[13px] leading-relaxed text-[#C8BAA6]">{design.project_summary}</p>
          {design.certifications?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {design.certifications.map((c, i) => (
                <span key={i} className="rounded bg-[#059669]/10 px-2 py-0.5 text-[10px] font-bold text-[#059669] ring-1 ring-[#059669]/20">{c}</span>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* Circuit Schematic */}
      {design.schematic_svg && (
        <SchematicViewer svg={design.schematic_svg} variantName={design.variant_name} />
      )}

      {/* Electrical Specs Table */}
      {design.electrical_specs?.length > 0 && (
        <ElectricalSpecsTable specs={design.electrical_specs} />
      )}

      {/* Cell & Pack */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {design.cell && <SpecCard title="Cell Specification" data={design.cell} />}
        {design.pack_configuration && <SpecCard title="Pack Configuration" data={design.pack_configuration} />}
      </div>

      {/* BMS & Cooling */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {design.bms && <SpecCard title="BMS Specification" data={design.bms} />}
        {design.cooling && <SpecCard title="Thermal Management" data={design.cooling} />}
      </div>

      {/* Design Choices */}
      {design.design_choices?.length > 0 && (
        <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/20 p-4">
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#EAC97C]">Design Choices & Trade-offs</h4>
          <div className="space-y-4">
            {design.design_choices.map((dc, i) => (
              <div key={i} className="border-l-2 pl-4" style={{ borderColor: cfg.color }}>
                <div className="text-[13px] font-semibold text-[#EAC97C]">{dc.topic}</div>
                <div className="mt-0.5 text-[13px] text-[#C8BAA6]">
                  <span className="font-medium text-white">Decision:</span> {dc.decision}
                </div>
                <div className="mt-0.5 text-[11px] text-[#8F7E5E]">
                  <span className="font-medium">Rationale:</span> {dc.rationale}
                </div>
                {dc.trade_offs && (
                  <div className="mt-0.5 text-[11px] italic text-[#8F7E5E]/70">
                    <span className="font-medium not-italic">Trade-offs:</span> {dc.trade_offs}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOM */}
      {design.bom_table?.length > 0 && (
        <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/20 p-4">
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#EAC97C]">Bill of Materials</h4>
          <div className="overflow-x-auto">
            <table className="bom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Component</th>
                  <th>Part No.</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Specs</th>
                  <th>Est. Unit Cost</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {design.bom_table.map((row, i) => (
                  <tr key={i}>
                    <td>{row.item_number}</td>
                    <td className="font-medium text-[#B7AA91]">{row.component_name}</td>
                    <td className="font-mono text-[10px] text-[#0E7490]">{row.part_number ?? "—"}</td>
                    <td className="text-[11px]">{row.description}</td>
                    <td>{row.quantity}</td>
                    <td className="text-[11px]">{row.specifications}</td>
                    <td className="font-semibold text-[#EAC97C]">{row.estimated_unit_cost_usd ?? "—"}</td>
                    <td className="text-[10px] text-[#8F7E5E]">{row.supplier ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {design.total_estimated_cost_usd && (
            <div className="mt-3 flex justify-end border-t border-[#8F7E5E]/30 pt-3">
              <span className="text-[13px] text-[#8F7E5E]">Total Estimated Cost: </span>
              <span className="ml-2 text-[13px] font-bold text-[#EAC97C]">{design.total_estimated_cost_usd}</span>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      {design.notes?.length > 0 && (
        <div className="rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/20 p-4">
          <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#EAC97C]">Engineering Notes</h4>
          <ul className="list-inside list-disc space-y-1.5">
            {design.notes.map((n, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-[#B7AA91]">{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── DesignTabs ────────────────────────────────────────────────────────────── */
function DesignTabs({ designs }: { designs: DesignVariant[] }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {designs.map((d, i) => {
          const cfg = VARIANT_CONFIG[d.variant_name] ?? VARIANT_CONFIG["Cost Optimized"];
          const isActive = i === activeTab;
          return (
            <button
              key={d.variant_name}
              onClick={() => setActiveTab(i)}
              className="whitespace-nowrap rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200"
              style={isActive
                ? { background: cfg.bg, borderColor: cfg.ring, color: cfg.color, boxShadow: cfg.glow }
                : { background: "transparent", borderColor: "rgba(81,71,51,0.5)", color: "#8F7E5E" }}
            >
              {d.variant_name}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {designs[activeTab] && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <VariantContent design={designs[activeTab]} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── AssistantResponse ─────────────────────────────────────────────────────── */
function AssistantResponse({ data }: { data: MultiDesignResponse }) {
  return (
    <div className="w-full">
      <ReasoningSteps steps={data.reasoning_steps} />
      <DesignTabs designs={data.designs} />
    </div>
  );
}

/* ─── Main Demo Page ────────────────────────────────────────────────────────── */
export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [streamingSteps, setStreamingSteps] = useState<ReasoningStep[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingSteps]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [inputValue]);

  const canSend = inputValue.trim().length > 0 && !loading;

  const sendQuery = useCallback(
    async (query: string, promptIndex?: number) => {
      if (!query.trim() || loading) return;

      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: query }]);
      setLoading(true);
      setStreamingSteps([]);
      setInputValue("");

      try {
        /* Animate 8 reasoning steps — 15 seconds each (120s total) */
        for (let i = 0; i < FAKE_STEPS.length; i++) {
          await new Promise<void>((r) => setTimeout(r, 15000));
          setStreamingSteps((prev) => [...prev, FAKE_STEPS[i]]);
        }
        await new Promise<void>((r) => setTimeout(r, 1500));

        const index = promptIndex ?? 0;
        const res = await fetch(`/api/demo-result?index=${index}`);
        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(err.error ?? `Server error ${res.status}`);
        }
        const { response } = (await res.json()) as { response: MultiDesignResponse };
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: "", data: response }]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: `Error: ${msg}`, isError: true }]);
      } finally {
        setLoading(false);
        setStreamingSteps([]);
      }
    },
    [loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) {
        const idx = DEMO_PROMPTS.findIndex((dp) => dp.prompt === inputValue.trim());
        sendQuery(inputValue, idx >= 0 ? idx : 0);
      }
    }
  };

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="flex h-svh flex-col bg-[#1E1B1B]">
      {/* Header */}
      <header className="shrink-0 border-b border-[#514733]/40 bg-[#1E1B1B]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3.5">
          <Link href="/" className="flex items-center gap-1 text-[13px] text-[#8F7E5E] transition-colors hover:text-[#EAC97C]">
            <ChevronLeft className="h-4 w-4" />Back
          </Link>
          <div className="h-5 w-px bg-[#514733]" />
          <h1 className="font-display text-[17px] font-extrabold text-[#EAC97C]">AEDI</h1>
          <span className="rounded-full bg-[#826015]/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#EAC97C]/70 ring-1 ring-[#826015]/30">Demo</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#8F7E5E]/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#059669]" />
            Powered by AEDI Engine
          </span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-5xl px-5 py-7">

          {isEmpty && (
            <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="mb-5 inline-flex items-center justify-center rounded-full bg-[#826015]/15 p-5 ring-1 ring-[#826015]/30 animate-pulse-soft">
                  <Zap className="h-8 w-8 text-[#EAC97C]" />
                </div>
                <h2 className="font-display text-2xl font-extrabold text-[#EAC97C] sm:text-3xl">
                  Automated Electronic Design Initiative
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-[#8F7E5E]">
                  Select a design brief below. AEDI will run through 8 analysis steps and generate 3 fully optimized battery
                  pack designs — Cost, Performance, and Space optimized — each with complete BOM, circuit schematic, and electrical specs.
                </p>
              </motion.div>

              <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
                {DEMO_PROMPTS.map((dp, i) => {
                  const Icon = PROMPT_ICONS[i];
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      onClick={() => sendQuery(dp.prompt, i)}
                      className="group flex flex-col items-start gap-3 rounded-xl border border-[#8F7E5E]/20 bg-[#514733]/15 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#826015]/40 hover:bg-[#514733]/30 hover:shadow-[0_0_20px_rgba(130,96,21,0.1)] active:translate-y-0"
                    >
                      <Icon className="h-5 w-5 text-[#826015] transition-colors group-hover:text-[#EAC97C]" />
                      <span className="text-[13px] font-bold leading-snug text-[#EAC97C]">{dp.label}</span>
                      <span className="line-clamp-2 text-[11px] leading-relaxed text-[#8F7E5E]">{dp.prompt}</span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-6 max-w-xl text-center text-[12px] italic leading-relaxed text-[#8F7E5E]/70"
              >
                *Note: These are concept demos only. For accurate real world results please connect with AEDI.
              </motion.p>
            </div>
          )}

          {!isEmpty && (
            <div className="space-y-5">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`rounded-2xl px-5 py-4 ${
                      msg.role === "user"
                        ? "max-w-[85%] border border-[#826015]/40 bg-[#826015]/30 text-[#EAC97C]"
                        : "w-full border border-[#8F7E5E]/10 bg-[#514733]/10"
                    }`}>
                      {msg.role === "user" ? (
                        <p className="text-[14px] leading-relaxed">{msg.content}</p>
                      ) : msg.data ? (
                        <AssistantResponse data={msg.data} />
                      ) : (
                        <p className={`text-[14px] leading-relaxed ${msg.isError ? "text-red-400" : "text-[#C8BAA6]"}`}>
                          {msg.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-full rounded-2xl border border-[#8F7E5E]/15 bg-[#514733]/10 px-5 py-5">
                    {streamingSteps.length > 0 ? (
                      <StreamingSteps steps={streamingSteps} />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="h-4 w-4 animate-spin text-[#0E7490]" />
                        <span className="text-[13px] text-[#8F7E5E]">Connecting to AEDI engine...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Bar */}
      <div className="safe-bottom shrink-0 border-t border-[#514733]/40 bg-[#1E1B1B]/95 px-4 py-3.5 backdrop-blur-md">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end gap-2.5 rounded-2xl border border-[#514733]/50 bg-[#2A2420]/60 px-4 py-2.5 focus-within:border-[#0E7490]/40 transition-colors">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your battery pack requirements or select a prompt above..."
              rows={1}
              maxLength={4000}
              className="max-h-[120px] min-h-[20px] flex-1 resize-none overflow-y-auto bg-transparent text-[14px] leading-relaxed text-[#C8BAA6] outline-none placeholder:text-[#8F7E5E]/50"
            />
            <button
              onClick={() => { if (canSend) { const idx = DEMO_PROMPTS.findIndex((dp) => dp.prompt === inputValue.trim()); sendQuery(inputValue, idx >= 0 ? idx : 0); } }}
              disabled={!canSend}
              aria-label="Send message"
              className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#826015] text-[#1E1B1B] transition-all duration-200 hover:bg-[#9A7A2F] disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-2">
            <HardHat className="h-3.5 w-3.5 text-[#EAC97C]/60" />
            <p className="text-[11px] italic text-[#8F7E5E]/70">
              Engineers at work — Please come after sometime. Regret the inconvenience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
