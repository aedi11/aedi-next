import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { VisionSection, EngineSection, ScopeSection, ImpactSection, ContactSection } from "@/components/Sections";
import LeadershipSection from "@/components/LeadershipSection";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      {/* Fixed background image */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
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
