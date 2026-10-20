"use client";

import Image from "next/image";
import { useState } from "react";
import { SERVICES } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

/** Services en accordéon : numéro, titre, détails (description, prestations, photos). */
export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="bg-ink px-5 py-24 text-white sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1300px]">
        <SectionHead dark label="Nos services">
          Des solutions pensées pour vous
        </SectionHead>

        <ul className="mt-12 border-t border-white/10">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.title} className="border-b border-white/10">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-baseline gap-5 py-6 text-left sm:gap-8"
                >
                  <span className="w-10 shrink-0 text-2xl font-light text-white/45 tabular-nums sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.03em] transition-colors ${
                      isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`hidden shrink-0 text-sm transition-colors sm:inline ${
                      isOpen ? "text-glow underline underline-offset-4" : "text-white/60 group-hover:text-white"
                    }`}
                  >
                    {isOpen ? "Moins de détails" : "Plus de détails"}
                  </span>
                  <span className={`text-xl text-white/60 transition-transform sm:hidden ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>

                {/* Détails : hauteur animée en CSS (grid-rows 0fr → 1fr) */}
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="pb-8 sm:pl-[4.5rem]">
                      <p className="max-w-xl text-sm leading-relaxed text-white/70">{s.text}</p>
                      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr] lg:items-end">
                        <ul className="space-y-2 text-sm text-white/55">
                          {s.items.map((it) => (
                            <li key={it} className="flex items-center gap-2">
                              <span className="h-1 w-1 rounded-full bg-red" />
                              {it}
                            </li>
                          ))}
                        </ul>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {s.images.map((src, k) => (
                            <div key={src} className="relative aspect-[5/3] overflow-hidden rounded-[4px] bg-ink-2">
                              <Image src={src} alt={`${s.title} — réalisation ADI Design ${k + 1}`} fill className="object-cover transition duration-700 hover:scale-105" sizes="(min-width:1024px) 18vw, 45vw" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <a href="#contact" className="mt-6 inline-block text-sm text-glow underline underline-offset-4">
                        Demander un devis pour ce service →
                      </a>
                    </div>
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
