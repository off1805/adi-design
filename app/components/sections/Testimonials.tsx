"use client";

import { useEffect, useState } from "react";
import { useContent } from "../../lib/ContentProvider";
import { SectionHead } from "../ui/SectionHead";

const DELAY = 7000;

/** Témoignages : une grande citation à la fois, défilement auto avec barres de progression. */
export function Testimonials() {
  const TESTIMONIALS = useContent().temoignages.items;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), DELAY);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused]);

  return (
    <section className="bg-white px-5 py-24 sm:px-10 lg:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-[1300px]">
        <SectionHead label="Témoignages">Ils nous ont confié leur intérieur</SectionHead>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-1">
            <span className="block font-serif text-[7rem] leading-[0.6] text-wood/40" aria-hidden>
              “
            </span>
          </div>

          <div className="lg:col-span-11">
            {/* Toutes les citations dans la même cellule : la hauteur ne saute pas */}
            <div className="grid" aria-live="polite">
              {TESTIMONIALS.map((t, k) => (
                <figure
                  key={k}
                  aria-hidden={k !== i}
                  className={`col-start-1 row-start-1 transition duration-700 ease-out ${k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
                >
                  <blockquote className="max-w-4xl text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.15] tracking-[-0.03em] text-ink">{t.quote}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="text-sm text-wood" aria-label="5 étoiles">★★★★★</span>
                    <span className="text-xs tracking-[0.2em] text-ink/60 uppercase">{t.author}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-14 flex items-center gap-6">
              <div className="flex flex-1 gap-2">
                {TESTIMONIALS.map((_, k) => (
                  <button key={k} onClick={() => setI(k)} aria-label={`Témoignage ${k + 1}`} className="group h-6 flex-1">
                    <span className="block h-0.5 overflow-hidden bg-ink/15">
                      <span
                        key={k === i ? `${i}-on` : k}
                        className={`block h-full origin-left bg-ink ${k < i ? "scale-x-100" : "scale-x-0"}`}
                        style={k === i ? { animation: `progress ${DELAY}ms linear forwards`, animationPlayState: paused ? "paused" : "running" } : undefined}
                      />
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} aria-label="Témoignage précédent" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white">
                  ←
                </button>
                <button onClick={() => go(1)} aria-label="Témoignage suivant" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
