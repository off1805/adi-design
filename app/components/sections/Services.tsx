"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useContent } from "../../lib/ContentProvider";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { SectionHead } from "../ui/SectionHead";

const EASE = "ease-[cubic-bezier(.7,0,.2,1)]";

/**
 * Services en palette de matières : une lamelle par service, la photo de la matière en fond.
 * Desktop : lamelles verticales côte à côte ; celle survolée (ou choisie au clic / clavier)
 * s'ouvre comme un tiroir et dévoile le titre, une phrase et un lien vers le devis.
 * Mobile : mêmes lamelles empilées, celle touchée se déplie en hauteur.
 */
export function Services() {
  const { title, items } = useContent().solutions;
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = items.length;

  const open = (i: number) => {
    clearTimeout(timer.current);
    setActive(i);
  };
  // Intention de survol : on n'ouvre qu'après un vrai arrêt, pour que traverser les lamelles ne vole pas l'ouverture
  const hover = (i: number) => {
    if (i === active) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => open(i), 400);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  // Clavier : flèches, Début/Fin
  const onKey = (e: KeyboardEvent) => {
    const next = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + n) % n;
    open(i);
    tabs.current[i]?.focus();
  };

  if (!n) return null;

  return (
    <section id="services" className="section-y bg-cream">
      <div className="container-site">
        <SectionHead label="Nos services">{title}</SectionHead>

        <Reveal>
        <div
          role="tablist"
          aria-label="Nos services"
          onKeyDown={onKey}
          onMouseLeave={() => clearTimeout(timer.current)}
          className="mt-12 flex flex-col gap-2 lg:h-[min(620px,74vh)] lg:flex-row"
        >
          {items.map((s, i) => {
            const on = i === active;
            const src = s.image;
            return (
              <div
                key={i}
                onMouseEnter={() => hover(i)}
                className={`group relative min-h-[76px] overflow-hidden bg-cream text-white transition-[flex-grow,min-height] duration-700 ${EASE} motion-reduce:transition-none lg:min-h-0 lg:min-w-0 lg:basis-0 ${
                  on ? "min-h-[480px] grow-[8]" : "grow"
                }`}
              >
                {/* Matière en fond */}
                {src && (
                  <Image
                    src={src}
                    alt=""
                    fill
                    className={`object-cover transition duration-700 ${EASE} ${on ? "scale-100" : "scale-110 grayscale-[60%] group-hover:scale-105 group-hover:grayscale-0"}`}
                    sizes="(min-width:1024px) 70vw, 100vw"
                  />
                )}
                <div
                  className={`absolute inset-0 transition duration-700 ${
                    on ? "bg-gradient-to-t from-black/85 via-black/30 to-black/10" : "bg-black/70 group-hover:bg-black/50"
                  }`}
                />

                {/* Lamelle ouverte : cadre doré pour garder le repère */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 z-30 border border-gold/70 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
                />

                {/* Lamelle fermée : « + » en haut, titre à la verticale, filet doré */}
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`svc-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => open(i)}
                  className={`absolute inset-0 z-10 text-left ${on ? "pointer-events-none" : ""}`}
                >
                  <span className={`transition-opacity duration-300 ${on ? "opacity-0" : "opacity-100 delay-200"}`}>
                    <span className="absolute top-5 grid size-9 place-items-center border border-white/30 max-lg:right-5 lg:left-1/2 lg:-translate-x-1/2">
                      <Icon name="plus" size={16} />
                    </span>
                    <span className="absolute bottom-6 flex items-center gap-3 max-lg:top-1/2 max-lg:bottom-auto max-lg:left-5 max-lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:[writing-mode:vertical-rl] lg:rotate-180">
                      <span className="h-px w-6 bg-brass lg:h-6 lg:w-px" />
                      <span className="text-xl font-medium tracking-[-0.02em] whitespace-nowrap">{s.title}</span>
                    </span>
                  </span>
                </button>

                {/* Lamelle ouverte : titre, une phrase, un lien */}
                <div
                  id={`svc-${i}`}
                  role="tabpanel"
                  aria-hidden={!on}
                  className={`absolute inset-x-0 bottom-0 z-20 p-6 transition duration-500 sm:p-8 lg:p-10 ${
                    on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <h3 className="font-title text-[clamp(1.9rem,3vw,2.75rem)] leading-[1.05]">{s.title}</h3>
                  <p className="mt-3 line-clamp-2 max-w-md text-[15px] leading-relaxed text-white/80">{s.text}</p>
                  <a
                    href="#contact"
                    tabIndex={on ? 0 : -1}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white underline underline-offset-4 transition-colors hover:text-white/70"
                  >
                    Demander un devis
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
