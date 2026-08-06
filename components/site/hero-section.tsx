import { Hero } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { TrustedBy } from "@/components/site/trusted-by";

export function HeroSection() {
  return (
    <section className="relative bg-[#1F2937] text-[#f5f7f0]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(115,107,215,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(115,107,215,.3)_1px,transparent_1px)] [background-size:80px_80px]" />
      <Navbar />
      <Hero />
      <TrustedBy />
    </section>
  );
}
