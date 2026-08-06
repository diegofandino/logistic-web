"use client";

import { Logo } from "@/components/site/logo";
import { usePreferences } from "@/context/preferences-context";

export function SiteFooter() {
  const { t } = usePreferences();

  return (
    <footer className="bg-[#1F2937] px-6 py-8 text-white lg:px-10">
      <div className="mx-auto text-center md:text-justify flex max-w-7xl flex-wrap items-center md:justify-between justify-center gap-4">
        <Logo />
        <div className="text-sm text-white/45">
          © 2026 Volt logistics. {t.footer} {' '}
          <a href="https://diegofandino.dev" target="_black" rel="noopener noreferrer" className="hover:text-white">
            diegofandinodev.
          </a>
        </div>
      </div>
    </footer>
  );
}
