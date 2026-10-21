"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { FEATURED } from "../../lib/data";
import { gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import { Magnetic } from "../ui/Magnetic";
import { SectionHead } from "../ui/SectionHead";

const CURVE = 1.45; // rayon du cercle = largeur d’une image × CURVE (plus petit = cercle plus serré)
const GAP = 6; // espace entre deux images (px) : la bande reste quasi continue

/**
 * Galerie de projets.
 * Desktop : arc de cercle 3D épinglé, le scroll fait tourner le cercle (+ flèches et points).
 * Mobile / mouvement réduit : simple défilement horizontal au doigt.
 */
export function Featured() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const trigger = useRef<ST | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const last = FEATURED.length - 1;

  // Aller à un projet : en 3D on fait défiler la page jusqu'à la bonne position, sinon on fait glisser la liste
  const goTo = (i: number) => {
    const n = Math.max(0, Math.min(last, i));
    const st = trigger.current;
    if (st) {
      // Défilement piloté par GSAP (instantané à chaque image) pour arriver pile sur le projet, sans élan
      const proxy = { y: window.scrollY };
      gsap.to(proxy, {
        y: st.start + (n / last) * (st.end - st.start),
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => window.scrollTo({ top: proxy.y, behavior: "instant" }),
      });
    } else {
      list.current?.children[n]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  // Mode liste (mobile) : le projet actif est celui le plus proche du centre
  const onListScroll = () => {
    const el = list.current;
    if (!el || trigger.current) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    [...el.children].forEach((c, i) => {
      const card = c as HTMLElement;
      if (Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid) < Math.abs((el.children[best] as HTMLElement).offsetLeft + (el.children[best] as HTMLElement).offsetWidth / 2 - mid)) best = i;
    });
    setActive(best);
  };

  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const stage = ref.current!;
        const cards = gsap.utils.toArray<HTMLElement>(".fp-card", stage);
        stage.classList.add("is-animated");

        // Place chaque carte sur le cercle. L'angle entre deux cartes est calculé à partir de leur largeur :
        // la corde entre deux centres = largeur + GAP, donc les bords se touchent (bande continue).
        const layout = (pos: number) => {
          const w = cards[0].offsetWidth;
          // Rayon proportionnel à la taille des images : la courbure reste la même sur tous les écrans
          const radius = w * CURVE;
          const step = 2 * Math.asin(Math.min(1, (w + GAP) / 2 / radius));
          cards.forEach((card, i) => {
            const d = i - pos;
            const a = d * step;
            gsap.set(card, {
              xPercent: -50,
              x: Math.sin(a) * radius,
              z: (Math.cos(a) - 1) * radius,
              rotationY: (a * 180) / Math.PI,
              autoAlpha: Math.abs(a) > 1.75 ? 0 : 1,
              zIndex: 100 - Math.round(Math.abs(d) * 10),
            });
            gsap.set(card.querySelector(".fp-shade"), { opacity: Math.min(Math.abs(d) * 0.18, 0.55) });
          });
        };

        const state = { pos: 0 };
        layout(0);
        const tween = gsap.to(state, {
          pos: last,
          ease: "none",
          onUpdate: () => {
            layout(state.pos);
            setActive(Math.round(state.pos));
          },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${last * window.innerHeight * 0.8}`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / last, duration: { min: 0.2, max: 0.5 }, delay: 0.1, ease: "power1.inOut", inertia: false },
            invalidateOnRefresh: true,
            onRefresh: () => layout(state.pos),
          },
        });

        trigger.current = tween.scrollTrigger ?? null;

        return () => {
          trigger.current = null;
          stage.classList.remove("is-animated");
        };
      });
    },
    { scope: ref },
  );

  const p = FEATURED[active];

  return (
    <section id="projets" >
      <div ref={ref} className="group/stage relative flex flex-col justify-center overflow-hidden  [--fp-w:min(48vw,780px,calc((100svh-480px)*1.6))] max-md:[--fp-w:min(84vw,calc((100svh-470px)*1.6))] [&.is-animated]:h-svh [&.is-animated]:pt-24 [&.is-animated]:pb-6">
        <div className="mx-auto mb-6 shrink-0 px-5 sm:mb-8">
          <SectionHead center label="Réalisations récentes · Yaoundé">
            Nos projets
          </SectionHead>
        </div>

        {/* Cercle 3D (en mode animé) / défilement horizontal natif sinon */}
        <div className="relative shrink-0 [perspective:1800px] group-[.is-animated]/stage:h-[calc(var(--fp-w)*0.625)]">
          <div ref={list} onScroll={onListScroll} className="flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] [transform-style:preserve-3d] group-[.is-animated]/stage:absolute group-[.is-animated]/stage:inset-0 group-[.is-animated]/stage:overflow-visible group-[.is-animated]/stage:p-0">
            {FEATURED.map((f) => (
              <figure
                key={f.title}
                className="fp-card relative aspect-[16/10] w-[85vw] shrink-0 rounded-md snap-center overflow-hidden rounded-[4px] bg-ink [backface-visibility:hidden] group-[.is-animated]/stage:absolute group-[.is-animated]/stage:top-0 group-[.is-animated]/stage:left-1/2 group-[.is-animated]/stage:w-[var(--fp-w)] sm:w-[60vw]">
                <Image src={f.src} alt={f.title} fill loading="eager" className="object-cover " sizes="(min-width:1024px) 48vw, 85vw" />
                <div className="fp-shade absolute inset-0 bg-ink opacity-0" />
                <figcaption className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {f.tags.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-full border border-white/50 bg-black/15 px-2.5 py-0.5 text-xs text-white backdrop-blur-md">
                      {t}
                    </span>
                  ))}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Légende du projet au centre */}
        <div className="mx-auto mt-6 grid w-full shrink-0 max-w-[1500px] items-end gap-4 px-5 sm:px-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Projet précédent" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink">
                ←
              </button>
              <button onClick={() => goTo(active + 1)} disabled={active === last} aria-label="Projet suivant" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink">
                →
              </button>
            </div>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Choisir un projet">
              {FEATURED.map((f, i) => (
                <button
                  key={f.title}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={f.title}
                  className="grid h-11 place-items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-red" : "w-1.5 bg-ink/25"}`} />
                </button>
              ))}
            </div>
          </div>
          <div key={p.title} className="animate-[fp-in_0.5s_ease-out] text-center">
            <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{p.title}</h3>
            <p className="mt-1 text-xs tracking-[0.2em] text-muted uppercase">{p.place}, Cameroun</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">{p.text}</p>
          </div>
          <div className="md:justify-self-end">
            <Magnetic>
              <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-ink hover:ring-1 hover:ring-ink/15">
                Un projet similaire ?
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink">↗</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
