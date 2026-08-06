"use client";

import { usePreferences } from "@/context/preferences-context";

export function PlatformSection() {
  const { t } = usePreferences();

  return (
    <section id="platform" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="mb-2 sm:mb-5 text-sm font-semibold uppercase tracking-[.18em] text-[#5f8868]">
            / The control tower
          </p>
          <h2 className="max-w-md text-4xl font-medium leading-tight tracking-[-.06em] sm:text-6xl">
            {t.controlTitle}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-7 sm:leading-8 text-[#617068]">{t.controlText}</p>
        </div>
        <div className="grid gap-4">
          {t.features.map(([number, title, text], index) => (
            <div
              key={number}
              className={`group grid gap-4 rounded-3xl p-6 sm:grid-cols-[70px_1fr_auto] sm:items-start sm:p-8 ${index === 1 ? "bg-[#d8ff56]" : "bg-[#e6ebe3]"
                }`}
            >
              <span className="text-sm font-semibold text-[#66806c]">{number}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
                <p className="mt-2 max-w-md leading-6 sm:leading-7 text-[#617068]">{text}</p>
              </div>
              <span className="text-2xl hidden sm:block transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
