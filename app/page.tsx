import { ContactSection } from "@/components/site/contact-section";
import { HeroSection } from "@/components/site/hero-section";
import { PlatformSection } from "@/components/site/platform-section";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <main className="overflow-hidden ">
      <HeroSection />
      <PlatformSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
