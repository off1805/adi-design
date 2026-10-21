"use client";

import { useState } from "react";
import { FAQS, whatsappLink } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

/** FAQ : accordéon animé (une seule réponse ouverte) + carte de contact rapide. */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead label="Questions fréquentes">On vous répond</SectionHead>
            <div className="mt-10 rounded-[4px] bg-cream p-7">
              <p className="text-lg leading-snug tracking-[-0.02em]">Une autre question ?</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">Écrivez-nous sur WhatsApp, nous répondons rapidement, du lundi au samedi.</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 text-xs font-semibold text-white transition hover:bg-white hover:text-ink hover:ring-1 hover:ring-ink/15"
              >
                Poser ma question
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink">↗</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="border-t border-ink/10 lg:col-span-8">
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <li key={q} className="border-b border-ink/10">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-baseline gap-5 py-7 text-left"
                >
                  <span className="w-8 shrink-0 text-lg font-light text-ink/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 text-lg tracking-[-0.02em] transition-colors sm:text-2xl ${isOpen ? "text-ink" : "text-ink/70 group-hover:text-ink"}`}>{q}</span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center self-center rounded-full border transition duration-300 ${
                      isOpen ? "rotate-45 border-ink bg-ink text-white" : "border-ink/15 text-ink/60 group-hover:border-ink"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className={`max-w-xl pb-7 pl-[3.25rem] text-base leading-relaxed text-muted transition duration-500 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
                      {a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
