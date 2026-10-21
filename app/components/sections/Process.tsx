"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { STEPS } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

const DELAY = 6000;

/**
 * Méthode en panneaux extensibles : les quatre étapes restent visibles côte à côte,
 * l'étape active s'élargit (photo + texte). Survol, clic ou clavier pour changer ;
 * défilement automatique tant que la section est à l'écran et que personne n'y touche.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), DELAY);
    return () => clearTimeout(id);
  }, [active, auto, inView]);

  // Toute interaction de l'utilisateur arrête le défilement automatique
  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section ref={ref} className="section-y border-t border-ink/10">
      <div className="container-site">
        <SectionHead label="Notre méthode" aside="Un seul interlocuteur, du premier rendez-vous à la remise des clés.">
          Un accompagnement à chaque étape
        </SectionHead>

        <ol className="mt-12 flex flex-col gap-2 lg:h-[460px] lg:flex-row">
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <li
                key={s.t}
                onMouseEnter={() => pick(i)}
                className={`relative overflow-hidden rounded-[4px] transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:min-w-0 lg:basis-0 ${
                  on ? "bg-ink lg:grow-[3.2]" : "bg-sand lg:grow"
                }`}
              >
                <button
                  onClick={() => pick(i)}
                  onFocus={() => pick(i)}
                  aria-expanded={on}
                  className="flex w-full items-baseline gap-4 p-6 text-left lg:absolute lg:inset-0 lg:z-10 lg:flex-col lg:items-start lg:justify-between lg:gap-0"
                >
                  <span className={`text-2xl font-light tabular-nums transition-colors duration-500 ${on ? "text-wood" : "text-ink/45"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[clamp(1.35rem,2vw,1.75rem)] leading-tight tracking-[-0.03em] transition duration-500 ${
                      on ? "text-white lg:opacity-0" : "text-ink"
                    }`}
                  >
                    {s.t}
                  </span>
                </button>

                {/* Contenu de l'étape active : photo en fond, texte en bas (mobile : déplié sous le titre) */}
                <div
                  className={`pointer-events-none grid transition-[grid-template-rows,opacity] duration-500 lg:absolute lg:inset-0 lg:block ${
                    on ? "grid-rows-[1fr] opacity-100 lg:delay-200" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden lg:h-full">
                    <div className="relative mx-6 aspect-[16/9] overflow-hidden rounded-[4px] lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none">
                      <Image src={s.src} alt={s.t} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
                      <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/40 to-ink/10 lg:block" />
                    </div>
                    <div className="p-6 text-white lg:absolute lg:inset-x-0 lg:bottom-0 lg:p-8">
                      <h3 className="hidden text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight tracking-[-0.03em] lg:block">{s.t}</h3>
                      <p className="max-w-md text-[15px] leading-relaxed text-white/80 lg:mt-2 lg:text-base">{s.d}</p>
                    </div>
                  </div>
                </div>

                {/* Progression du défilement automatique */}
                {on && auto && inView && (
                  <span className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-white/15 motion-reduce:hidden">
                    <span key={active} className="block h-full origin-left animate-[step-progress_6s_linear_forwards] bg-wood" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
