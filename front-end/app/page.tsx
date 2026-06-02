import LandingCards from "@/features/LandingCards/ui/LandingCards";
import LandingHero from "@/features/LandingHero/ui/LandingHero";
import Features from "@/features/Features/ui/Features";
import CTA from "@/features/CTA/ui/CTA";
import FAQ from "@/features/FAQ/ui/FAQ";
import Contributors from "@/features/Contributors/ui/Contributors";
import Footer from "@/features/Footer/ui/Footer";

export default function Home() {
  return (
    <div>
      <LandingHero />
      <LandingCards />
      <Features />
      <CTA />
      <Contributors />
      <FAQ />
      <Footer />
    </div>
  );
}
