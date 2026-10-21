"use client";

import { useState } from "react";
import { FAQS, whatsappLink } from "../../lib/data";
import { Icon } from "../ui/Icon";
import { SectionHead } from "../ui/SectionHead";

/** FAQ : accordéon animé (une seule réponse ouverte) + carte de contact rapide. */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-y border-t border-ink/10">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead label="Questions fréquentes">On vous répond</SectionHead>
            <div className="mt-10 rounded-[4px] bg-sand p-7">
              <p className="text-lg leading-snug tracking-[-0.02em]">Une autre question ?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">Écrivez-nous sur WhatsApp, nous répondons rapidement, du lundi au samedi.</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener"
                className="btn btn-sm btn-primary mt-6"
              >
                Poser ma question
                <Icon name="arrow-up-right" />
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
                  className="group flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className="w-8 shrink-0 text-lg font-light text-ink/45 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex-1 text-lg tracking-[-0.02em] transition-colors sm:text-2xl ${isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"}`}>{q}</span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-300 ${
                      isOpen ? "rotate-45 border-ink text-ink" : "border-ink/20 text-ink/70 group-hover:border-ink group-hover:text-ink"
                    }`}
                  >
                    <Icon name="plus" />
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
