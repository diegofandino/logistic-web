"use client";

import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { usePreferences } from "@/context/preferences-context";

export function Navbar() {
  const { t, language, toggleLanguage } = usePreferences();

  return (
    <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <Logo />
      <div className="hidden items-center gap-8 text-sm text-white/65 md:flex">
        {t.nav.map((item) => (
          <a href="#platform" key={item} className="transition hover:text-white">
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="rounded-full hover:bg-[#d8ff56]  cursor-pointer border-white/15 bg-transparent px-3 py-2 text-xs font-medium text-white/75 hover:border-white/40 hover:text-[#1F2937]"
        >
          {language === "en" ? "ES" : "EN"}
        </Button>
        <Button
          render={<a href="#contact" />}
          nativeButton={false}
          className="hidden rounded-full bg-[#d8ff56] px-4 py-2.5 text-sm font-semibold text-[#1F2937] hover:bg-[#d8ff56]/90 sm:flex"
        >
          {t.cta} <ArrowUpRight />
        </Button>
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 md:hidden"
              />
            }
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="border-white/10 bg-[#1F2937] text-white">
            <SheetHeader>
              <SheetTitle className="text-white">
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4">
              {t.nav.map((item) => (
                <SheetClose
                  key={item}
                  render={<a href="#platform" />}
                  nativeButton={false}
                  className="rounded-lg px-2 py-3 text-base text-white/75 transition hover:bg-white/5 hover:text-white"
                >
                  {item}
                </SheetClose>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3 p-4">
              <SheetClose
                render={<a href="#contact" />}
                nativeButton={false}
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#d8ff56] px-4 py-2.5 text-sm font-semibold text-[#1F2937] hover:bg-[#d8ff56]/90"
              >
                {t.cta} <ArrowUpRight />
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
