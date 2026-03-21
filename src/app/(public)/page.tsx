import { LandingNavbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white">
      <LandingNavbar />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <CTASection />
        <LandingFooter />
      </div>
    </main>
  );
}