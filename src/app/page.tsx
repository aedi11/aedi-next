import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { VisionSection, EngineSection, ScopeSection, ImpactSection, ContactSection } from "@/components/Sections";
import LeadershipSection from "@/components/LeadershipSection";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      {/* Fixed background image — use Next.js Image for AVIF/WebP optimization */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/Background.png"
          alt=""
          fill
          priority
          quality={75}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>


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
