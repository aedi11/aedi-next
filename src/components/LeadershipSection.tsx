import FadeUp from "./FadeUp";
import TeamGrid from "./TeamGrid";

export default function LeadershipSection() {
  return (
    <section id="leadership" className="relative overflow-hidden">
      <div className="section-divider" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <FadeUp>
          <div className="mb-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#514733]/40 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#EAC97C] ring-1 ring-[#8F7E5E]/20">
              Humans at AEDI
            </span>
          </div>
          <h2
            className="text-center font-display font-extrabold leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(28px,4.5vw,50px)" }}
          >
            <span className="text-gradient-gold">The Minds Driving</span>{" "}
            <span className="text-[#0E7490]">India&apos;s</span>{" "}
            <span className="text-gradient-gold">Tech Sovereignty</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-[#B7AA91]"
            style={{ fontSize: "clamp(15px,1.8vw,18px)" }}
          >
            Our initiative is guided by hands-on mentorship from distinguished leaders.
          </p>
        </FadeUp>

        {/* TeamGrid is a client component with modals */}
        <TeamGrid />
      </div>
    </section>
  );
}
