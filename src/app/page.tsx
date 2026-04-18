import HeroSection from "@/components/HeroSection";
import BrandMarquee from "@/components/BrandMarquee";
import FeaturedWork from "@/components/FeaturedWork";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="relative z-20 mx-auto max-w-7xl px-10 pb-4 pt-8 text-center md:px-16">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.35em] text-white/80 md:text-sm">
          My Clients
        </p>
      </section>
      <BrandMarquee />
      <FeaturedWork />
      <CTASection />
    </>
  );
}
