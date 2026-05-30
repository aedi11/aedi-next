import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { VisionSection, EngineSection } from "@/components/Sections";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy-load heavy below-fold sections
const ScopeSection = dynamic(() => import("@/components/Sections").then(m => ({ default: m.ScopeSection })), { ssr: false });
const ImpactSection = dynamic(() => import("@/components/Sections").then(m => ({ default: m.ImpactSection })), { ssr: false });
const ContactSection = dynamic(() => import("@/components/Sections").then(m => ({ default: m.ContactSection })), { ssr: false });
const LeadershipSection = dynamic(() => import("@/components/LeadershipSection"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Fixed background image via CSS — avoids blocking network request */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />


      <main className="relative z-[1]">
        <HeroSection />
        <VisionSection />
        <EngineSection />
        <ScopeSection />
        <ImpactSection />
        <LeadershipSection />
        <ContactSection />
      </main>

      <ScrollToTop />
    </>
  );
}
