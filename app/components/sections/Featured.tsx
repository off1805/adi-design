"use client";

import Image from "next/image";
import { useRef } from "react";
import { useContent } from "../../lib/ContentProvider";
import { useRail } from "../../lib/useRail";
import { Icon } from "../ui/Icon";
import { RailNav } from "../ui/RailNav";
import { SectionHead } from "../ui/SectionHead";

/**
 * Galerie de projets, façon Apple.
 * Desktop : la section est épinglée, le scroll fait glisser la rangée de projets de droite à gauche.
 * Mobile / mouvement réduit : simple défilement horizontal au doigt.
 */
export function Featured() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const items = useContent().projets.items;
  const { active, last, goTo, onScroll } = useRail({ stage: ref, track, count: items.length });

  if (!items.length) return null;

  return (
    <section id="projets" className="bg-cream">
      <div
        ref={ref}
        className="group/stage section-y flex flex-col justify-center overflow-hidden [--fp-w:86vw] md:[--fp-w:min(68vw,1040px,calc((100svh-400px)*1.6))] [&.is-animated]:h-svh [&.is-animated]:py-0 [&.is-animated]:pt-20"
      >
        <div className="container-site flex items-end justify-between gap-6">
          <SectionHead label="Réalisations récentes à Yaoundé">Nos projets</SectionHead>
          <RailNav active={active} last={last} goTo={goTo} label="Projet" />
        </div>

        {/* Rangée de projets : alignée sur la grille à gauche, déborde à droite */}
        <div className="container-site mt-10 md:mt-12">
          <ul
            ref={track}
            onScroll={onScroll}
            className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 md:gap-6 group-[.is-animated]/stage:mx-0 group-[.is-animated]/stage:overflow-visible group-[.is-animated]/stage:px-0 group-[.is-animated]/stage:pb-0"
          >
            {items.map((p, k) => (
              <li key={k} className="group/card w-[var(--fp-w)] shrink-0 snap-start">
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover/card:scale-[1.03]"
                      sizes="(min-width:768px) 68vw, 86vw"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="bg-black/35 px-2.5 py-0.5 text-xs text-white backdrop-blur-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <figcaption className="grid gap-2 pt-5 md:grid-cols-[1fr_1.2fr] md:gap-10">
                    <div>
                      <p className="eyebrow text-muted">{p.place}</p>
                      <h3 className="font-title mt-2 text-[1.75rem] leading-tight tracking-[-0.01em] md:text-[2rem]">{p.title}</h3>
                    </div>
                    <p className="line-clamp-2 text-[15px] leading-relaxed text-muted md:self-end">{p.text}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
            {/* Carte de fin : appel à l'action */}
            <li className="w-[var(--fp-w)] shrink-0 snap-start">
              <div className="flex aspect-[16/10] flex-col justify-end bg-sand p-8 text-white md:p-12">
                <p className="eyebrow text-gold">Votre projet</p>
                <p className="font-title mt-3 max-w-md text-[2rem] leading-[1.1] md:text-[3rem]">Le prochain intérieur, c’est le vôtre.</p>
                <a href="#contact" className="btn btn-light mt-8 self-start">
                  Un projet similaire ?
                  <Icon name="arrow-up-right" />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
