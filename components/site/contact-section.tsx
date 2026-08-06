"use client";

import { useActionState } from "react";
import { ArrowUpRight } from "lucide-react";

import { sendContactMessage, type ContactState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePreferences } from "@/context/preferences-context";

const initialState: ContactState = { status: "idle" };

const fieldClassName =
  "h-auto rounded-xl border-white/14 bg-white/7 px-4 py-3.5 text-white placeholder:text-white/45 focus-visible:border-[#d8ff56] focus-visible:ring-0 focus-visible:bg-white/10";

export function ContactSection() {
  const { t } = usePreferences();
  const [state, action, pending] = useActionState(sendContactMessage, initialState);

  return (
    <section id="contact" className="bg-[#d8ff56] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr]">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[.18em] text-[#577347]">
            / {t.contactEyebrow}
          </p>
          <h2 className="max-w-xl text-5xl font-medium leading-[.98] tracking-[-.07em] sm:text-7xl">
            {t.contactTitle}
          </h2>
          <p className="mt-7 max-w-md text-lg leading-7 sm:leading-8 text-[#526448]">{t.contactText}</p>
        </div>
        <form
          action={action}
          className="flex w-full items-center justify-center rounded-[2rem] bg-[#1F2937] p-6 text-white"
        >
          {/* Honeypot: hidden from real users, bots that auto-fill every field trip it. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="grid w-full grid-cols-1 gap-4 place-items-center md:grid-cols-2">
            <Input required name="name" placeholder={t.name} className={fieldClassName} />
            <Input required type="email" name="email" placeholder={t.email} className={fieldClassName} />
            <Input
              name="company"
              placeholder={t.company}
              className={`col-span-1 md:col-span-2 ${fieldClassName}`}
            />
            <Textarea
              required
              name="message"
              placeholder={t.message}
              rows={4}
              className={`col-span-1 resize-none md:col-span-2 ${fieldClassName}`}
            />
            <Button
              type="submit"
              disabled={pending}
              className="col-span-1 w-full cursor-pointer rounded-full bg-[#d8ff56] py-6 text-sm font-bold text-[#1F2937] hover:bg-[#d8ff56]/90 disabled:opacity-60 md:col-span-2"
            >
              {pending ? "..." : t.send} <ArrowUpRight />
            </Button>
            {state.status === "success" && <p className="mt-4 text-center text-sm text-[#d8ff56]">{t.success}</p>}
            {state.status === "error" && <p className="mt-4 text-center text-sm text-[#f58b72]">{t.error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
