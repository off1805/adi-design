"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import { img } from "../../lib/data";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";
import { SplitReveal } from "../ui/SplitReveal";

// ⚠️ Chiffres d’exemple — à remplacer par les vrais chiffres d’ADI avant la mise en ligne.
const STATS = [
  { v: 7, s: "+", l: "années d’expérience" },
  { v: 150, s: "+", l: "projets livrés" },
  { v: 7, s: "", l: "corps de métier" },
  { v: 98, s: "%", l: "clients satisfaits" },
];

const PERKS = [
  { icon: "◫", l: "Conception\n3D offerte" },
  { icon: "◷", l: "Délais\nrespectés" },
  { icon: "✳", l: "Finitions\nsoignées" },
];

/* Section « À propos » : pastille + grand titre, trio de cartes, chiffres clés */
export function Intro() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Photo du salon : zoom arrière + parallaxe douce
        gsap.fromTo(".intro-photo img", { scale: 1.3, yPercent: -6 }, {
          scale: 1.05,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: ".intro-photo", start: "top bottom", end: "bottom top", scrub: true },
        });
        // Les trois photos partent empilées puis s'ouvrent en éventail
        gsap.from(".intro-fan > div", {
          left: "28%",
          top: 12,
          rotation: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".intro-fan", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="studio" className="mx-auto max-w-[1300px] px-5 py-24 sm:px-10 lg:py-32">
      {/* En-tête : pastille à gauche, grande phrase à droite */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="text-xs tracking-[0.3em] text-muted uppercase">Le cabinet</p>
        </Reveal>
        <div className="lg:col-span-9">
          <SplitReveal className="text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.1] font-medium tracking-[-0.03em]">
            Depuis Yaoundé, notre équipe a transformé des centaines d’intérieurs,{" "}
            <span className="text-muted">de la conception 3D jusqu’à la décoration finale, au prix juste.</span>
          </SplitReveal>
        </div>
      </div>

      {/* Trio de cartes */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <Reveal className="h-full">
          <article className="flex h-full flex-col rounded-[4px] bg-cream p-7">
            <span className="grid size-9 place-items-center rounded-full border border-ink/80 text-sm">↗</span>
            <p className="mt-auto pt-10 text-sm leading-relaxed">
              Des intérieurs haut de gamme pensés pour vous : staff, LED, menuiserie, peinture et carrelage, avec un
              seul interlocuteur du début à la fin.
            </p>
            <ul className="mt-5 flex gap-5">
              {PERKS.map((p) => (
                <li key={p.l} className="flex items-start gap-1.5 text-xs leading-tight whitespace-pre-line text-muted">
                  <span className="text-ink">{p.icon}</span>
                  {p.l}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2">
              <a href="#contact" className="rounded-full bg-ink px-6 py-3 text-xs font-semibold text-white transition hover:bg-red">
                Nous contacter
              </a>
              <a href="#contact" aria-label="Nous contacter" className="grid size-10 place-items-center rounded-full bg-ink text-white transition hover:bg-red">
                ↗
              </a>
            </div>
          </article>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <article className="intro-photo relative h-full min-h-[340px] overflow-hidden rounded-[4px]">
            <Image src={img("salon-tv-marbre")} alt="Salon réalisé par ADI Design" fill className="object-cover" sizes="(min-width:768px) 33vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-transparent to-40%" />
            <h3 className="absolute top-6 left-7 text-2xl font-medium tracking-[-0.02em] text-white">Le luxe chez vous</h3>
          </article>
        </Reveal>

        <Reveal delay={200} className="h-full">
          <article className="flex h-full flex-col rounded-[4px] bg-cream p-7">
            <div className="intro-fan relative mx-auto h-44 w-full max-w-[260px]">
              {[
                { n: "chambre-bleue", c: "left-0 top-8 -rotate-6" },
                { n: "plafond-led", c: "left-[28%] top-3 rotate-3 z-10" },
                { n: "cuisine-ilot", c: "left-[56%] top-0 rotate-12 z-20" },
              ].map((p) => (
                <div key={p.n} className={`absolute h-32 w-24 overflow-hidden rounded-[4px] border-4 border-white shadow-lg ${p.c}`}>
                  <Image src={img(p.n)} alt="Réalisation ADI Design" fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
            <p className="mt-auto pt-8 text-sm leading-relaxed">
              Des espaces et des histoires de clients qui nous ont confié leur intérieur.
            </p>
          </article>
        </Reveal>
      </div>

      {/* Chiffres clés */}
      <Reveal delay={100} className="mt-14 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {STATS.map((k) => (
          <div key={k.l}>
            <p className="text-4xl font-medium tracking-[-0.04em]">
              <Counter to={k.v} suffix={k.s} />
            </p>
            <p className="mt-2 text-xs text-muted">{k.l}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
