"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/data";

type Member = (typeof TEAM_MEMBERS)[number];

function TeamCard({ member }: { member: Member }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`View ${member.name} profile`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
        className="glass flex flex-col items-center rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(14,116,144,0.1)] hover:-translate-y-1 select-none"
      >
        <div
          className="mb-5 flex h-22 w-22 items-center justify-center overflow-hidden rounded-full"
          style={{ boxShadow: `0 0 0 2px ${member.accent}40` }}
        >
          <Image
            src={member.image}
            alt={member.name}
            width={88}
            height={88}
            className="h-[88px] w-[88px] rounded-full object-cover object-top"
          />
        </div>
        <h3 className="font-display text-base font-bold text-[#EAC97C]">{member.name}</h3>
        {member.dept && (
          <p className="mt-1 text-[11px] leading-snug text-[#B7AA91]/70">{member.dept}</p>
        )}
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: member.accent }}>
          {member.role}
        </div>
        <p className="mt-4 text-[11px] text-[#B7AA91]/40">Click to read more</p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative z-10 w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#8F7E5E]/20 p-8"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#B7AA91]/60 hover:bg-[#B7AA91]/10 hover:text-[#EAC97C] transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-5">
                <div
                  className="flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-full"
                  style={{ boxShadow: `0 0 0 2px ${member.accent}40` }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#EAC97C]">{member.name}</h3>
                  {member.dept && <p className="mt-1 text-sm text-[#B7AA91]/70">{member.dept}</p>}
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: member.accent }}>
                    {member.role}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {Array.isArray(member.bio) ? (
                  <ul className="list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[#B7AA91]">
                    {member.bio.map((point, idx) => <li key={idx}>{point}</li>)}
                  </ul>
                ) : (
                  <p className="text-[14px] leading-relaxed text-[#B7AA91]">{member.bio}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function TeamGrid() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {TEAM_MEMBERS.map((member) => (
        <TeamCard key={member.name} member={member} />
      ))}
    </div>
  );
}
