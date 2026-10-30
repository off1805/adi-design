"use client";

import Image from "next/image";
import { useContent } from "../../lib/ContentProvider";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";

/**
 * Méthode en frise : les étapes côte à côte, reliées par un filet doré.
 * Aucune interaction ni lecture automatique : tout se lit d'un coup d'œil.
 * Mobile : étapes empilées, filet vertical à gauche.
 */
export function Process() {
  const { title, aside, steps } = useContent().accompagnement;

  return (
    <section className="section-y bg-ink-2 text-white">
      <div className="container-site">
        <SectionHead dark label="Notre méthode" aside={aside}>
          {title}
        </SectionHead>

        <ol className="relative mt-14 grid gap-10 max-lg:border-l max-lg:border-white/15 max-lg:pl-8 lg:grid-cols-4 lg:gap-6">
          {/* Filet qui relie les étapes (desktop) */}
          <span className="absolute top-[7px] right-0 left-0 hidden h-px bg-gradient-to-r from-gold/70 via-gold/30 to-transparent lg:block" aria-hidden />

          {steps.map((s, i) => (
            <li key={i} className="relative">
              <Reveal delay={i * 120}>
                {/* Jalon sur le filet */}
                <span className="absolute top-0 size-[15px] border-2 border-gold bg-ink-2 max-lg:-left-[40px] lg:left-0" aria-hidden />
                <p className="pt-8 text-sm font-medium text-gold tabular-nums lg:pt-10">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-title mt-2 text-2xl leading-tight">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.text}</p>
                {s.image && (
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-cream">
                    <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(min-width:1024px) 25vw, 100vw" />
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
