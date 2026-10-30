"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useContent } from "../../lib/ContentProvider";
import { Icon } from "../ui/Icon";
import { SectionHead } from "../ui/SectionHead";

const EASE = "ease-[cubic-bezier(.7,0,.2,1)]";

/**
 * Avant / Après en pile de tirages photo.
 * L'« avant » est posé sur l'« après », légèrement de travers. Quand la section arrive à l'écran,
 * il glisse et s'écarte dans le coin pour révéler l'« après », qui se redresse.
 * Un clic sur la vignette remet l'« avant » sur le dessus (et inversement).
 * Transitions CSS uniquement, coupées si l'utilisateur a demandé moins d'animations.
 */
export function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const { title, aside, before, after, interventions, duration } = useContent().transformation;
  const [revealed, setRevealed] = useState(false);
  const touched = useRef(false);

  // Révélation automatique, une seule fois, quand la pile est bien visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        timer = setTimeout(() => !touched.current && setRevealed(true), 500);
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const toggle = () => {
    touched.current = true;
    setRevealed((v) => !v);
  };

  const print =
    "absolute inset-0 overflow-hidden border-[6px] border-white bg-white shadow-[0_1px_2px_rgba(0,0,0,.06),0_18px_40px_-20px_rgba(0,0,0,.35)]";

  return (
    <section id="avant-apres" className="section-y">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        {/* Pile de tirages */}
        <div ref={ref} className="relative mx-auto aspect-[4/3] w-[86%] sm:w-[80%] lg:w-[88%]">
          {/* Après : dessous, se redresse quand l'avant s'écarte */}
          <figure className={`${print} transition-transform duration-1000 ${EASE} motion-reduce:transition-none ${revealed ? "rotate-0" : "rotate-[3deg]"}`}>
            <Image src={after} alt="Après intervention" fill className="object-cover" sizes="(min-width:1024px) 640px, 86vw" />
            <figcaption className="absolute top-4 right-4 bg-white/85 px-3 py-1 text-[13px] font-medium text-black backdrop-blur-md">Après</figcaption>
          </figure>

          {/* Avant : dessus, glisse dans le coin inférieur gauche et devient une vignette cliquable */}
          <button
            onClick={toggle}
            aria-pressed={!revealed}
            aria-label={revealed ? "Remettre la photo avant sur le dessus" : "Écarter la photo avant pour voir l'après"}
            className={`${print} z-10 origin-bottom-left cursor-pointer transition-transform duration-1000 ${EASE} motion-reduce:transition-none ${
              revealed ? "-translate-x-[14%] translate-y-[22%] -rotate-[8deg] scale-[0.38]" : "-rotate-[2deg]"
            }`}
          >
            <Image src={before} alt="Avant intervention" fill className="object-cover grayscale-[30%]" sizes="(min-width:1024px) 640px, 86vw" />
            {/* Étiquette agrandie quand la photo est réduite, pour rester lisible sur la vignette */}
            <span
              className={`absolute top-4 left-4 flex items-center gap-1.5 bg-black/45 px-3 py-1 font-medium text-white backdrop-blur-md ${revealed ? "text-[30px]" : "text-[13px]"}`}
            >
              Avant
              <Icon name="arrow-up-right" size={revealed ? 30 : 14} />
            </span>
          </button>
        </div>

        {/* Texte : titre, une phrase, ce qui a été fait, un bouton */}
        <div className="max-w-md">
          <SectionHead label="Avant / Après">{title}</SectionHead>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{aside}</p>

          {(interventions.length > 0 || duration) && (
            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-ink/10 pt-6 text-[15px]">
              {interventions.length > 0 && (
                <>
                  <dt className="eyebrow pt-1 text-muted">Travaux</dt>
                  <dd>{interventions.join(" · ")}</dd>
                </>
              )}
              {duration && (
                <>
                  <dt className="eyebrow pt-1 text-muted">Délai</dt>
                  <dd className="text-wood">{duration}</dd>
                </>
              )}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#contact" className="btn btn-primary">
              Transformer mon intérieur
              <Icon name="arrow-up-right" />
            </a>
            <button onClick={toggle} className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-wood">
              {revealed ? "Revoir l’avant" : "Voir l’après"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
