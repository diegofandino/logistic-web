"use client";

import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/context/preferences-context";
import type { Copy } from "@/lib/locale";

export function Hero() {
  const { t } = usePreferences();

  return (
    <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-15 pt-15 lg:grid-cols-[.95fr_1.05fr] lg:px-10 lg:pb-28 lg:pt-28">
      <div>
        <p className="mb-6 flex items-center gap-2 text-sm font-medium text-[#d8ff56]">
          <span className="h-2 w-2 rounded-full bg-[#d8ff56]" />
          {t.eyebrow}
        </p>
        <h1 className="max-w-xl text-6xl font-medium leading-[.94] tracking-[-0.075em] sm:text-8xl">
          {t.title}
          <br />
          <span className="text-[#d8ff56]">{t.titleAccent}</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-7 sm:leading-8 text-white/65">{t.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            className="rounded-full w-full sm:w-auto bg-[#d8ff56] px-5 py-5 sm:py-4 text-sm font-semibold text-[#1F2937] hover:bg-[#d8ff56]/90"
          >
            {t.primary} <ArrowUpRight />
          </Button>
          <Button
            variant="outline"
            render={<a href="#platform" />}
            nativeButton={false}
            className="rounded-full w-full sm:w-auto border-white/20 bg-transparent px-5 py-5 sm:py-4 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            {t.secondary}
          </Button>
        </div>
      </div>
      <NetworkPanel t={t} />
    </div>
  );
}

function NetworkPanel({ t }: { t: Copy }) {
  return (
    <div className="relative">
      <div className="rounded-[2rem] border border-white/10 bg-[#1e332d] p-3 shadow-2xl shadow-black/30">
        <div className="rounded-[1.5rem] bg-[#f1f4eb] p-5 text-[#1F2937] sm:p-7">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#6c7d72]">{t.panelSub}</p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight">{t.panelTitle}</h2>
            </div>
            <Badge className="rounded-full bg-[#d8ff56] px-3 py-1 text-xs font-bold text-[#1F2937] hover:bg-[#d8ff56]">
              LIVE
            </Badge>
          </div>
          <div className="relative h-48 overflow-hidden rounded-2xl bg-[#dfe8dd]">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(30deg,transparent_48%,#90a999_49%,#90a999_50%,transparent_51%),linear-gradient(150deg,transparent_48%,#90a999_49%,#90a999_50%,transparent_51%)] [background-size:90px_90px]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 200" fill="none">
              <path
                d="M-10 160C60 40 120 175 220 80S340 20 510 130"
                stroke="#1F2937"
                strokeWidth="3"
                strokeDasharray="8 8"
              />
              <circle cx="220" cy="80" r="9" fill="#d8ff56" stroke="#1F2937" strokeWidth="4" />
              <circle cx="405" cy="77" r="9" fill="#f58b72" stroke="#1F2937" strokeWidth="4" />
            </svg>
            <span className="absolute left-[40%] top-[28%] h-3 w-3 animate-pulse rounded-full bg-[#d8ff56]" />
            <span className="absolute right-[16%] top-[32%] rounded-full bg-white px-2 py-1 text-[9px] font-bold shadow">
              TRK-2048
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              [t.fleet, "84%", "+12%"],
              [t.onTime, "97.8%", "+4.2%"],
              [t.route, "128", "+18"],
            ].map(([label, value, change]) => (
              <div key={label} className="rounded-xl bg-white p-3">
                <p className="text-[10px] text-[#73847a]">{label}</p>
                <p className="mt-1 text-xl font-semibold">{value}</p>
                <p className="text-[10px] font-semibold text-[#4d9e65]">{change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
