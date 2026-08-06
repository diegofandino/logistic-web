"use client";

import { usePreferences } from "@/context/preferences-context";

export function TrustedBy() {
  const { t } = usePreferences();

  return (
    <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center md:justify-between gap-3 sm:gap-6 border-t border-white/10 px-6 py-7 text-sm text-white/45 lg:px-10">
      <span>{t.trusted}</span>
      <div className="flex gap-8 text-lg font-semibold tracking-[-.04em] text-white/60">
        <span>nordik</span>
        <span>ARC/LOG</span>
        <span>unison</span>
        <span className="hidden sm:inline">VOLTA</span>
      </div>
    </div>
  );
}
