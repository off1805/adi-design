"use client";

import Image from "next/image";
import { useContent } from "../../lib/ContentProvider";
import { Counter } from "../ui/Counter";
import { Icon, type IconName } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

const PERKS: { icon: IconName; l: string }[] = [
  { icon: "cube", l: "Conception\n3D offerte" },
  { icon: "clock", l: "Délais\nrespectés" },
  { icon: "sparkle", l: "Finitions\nsoignées" },
];

// Position des trois photos en éventail
const FAN = ["left-0 top-8 -rotate-6", "left-[28%] top-3 rotate-3 z-10", "left-[56%] top-0 rotate-12 z-20"];

/* Section « À propos » : pastille + grand titre, trio de cartes, chiffres clés */
export function Intro() {
  const { intro, settings } = useContent();

  return (
    <section id="studio" className="container-site section-y pb-12! lg:pb-14!">
      {/* En-tête : pastille à gauche, grande phrase à droite */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="h-px w-6 bg-brass" />
            Le cabinet
          </p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal><h2 className="font-title text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.1] tracking-[-0.01em]">
            {intro.title}{""}
            <span className="text-muted">{intro.titleMuted}</span>
          </h2></Reveal>
        </div>
      </div>

      {/* Trio de cartes */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <Reveal className="h-full">
          <article className="flex h-full flex-col bg-cream p-7">
            <span className="grid size-10 place-items-center border border-ink/20">
              <Icon name="arrow-up-right" />
            </span>
            <p className="mt-auto pt-10 text-[15px] leading-relaxed">
              {intro.cardText}
            </p>
            <ul className="mt-5 flex gap-5">
              {PERKS.map((p) => (
                <li key={p.l} className="flex items-start gap-2 text-[13px] leading-snug whitespace-pre-line text-muted">
                  <Icon name={p.icon} className="mt-0.5 text-wood" />
                  {p.l}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-sm btn-primary mt-7 self-start">
              Nous contacter
              <Icon name="arrow-up-right" />
            </a>
          </article>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <article className="relative h-full min-h-[340px] overflow-hidden">
            <Image src={intro.photo} alt={`Réalisation ${settings.siteName}`} fill className="object-cover" sizes="(min-width:768px) 33vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent to-40%" />
            <h3 className="absolute top-6 left-7 text-2xl font-medium tracking-[-0.02em] text-white">{intro.photoTitle}</h3>
          </article>
        </Reveal>

        <Reveal delay={200} className="h-full">
          <article className="flex h-full flex-col bg-cream p-7">
            <div className="relative mx-auto h-44 w-full max-w-[260px]">
              {intro.fanImages.slice(0, 3).map((src, k) => (
                <div key={k} className={`absolute h-32 w-24 overflow-hidden border-4 border-white ${FAN[k]}`}>
                  <Image src={src} alt={`Réalisation ${settings.siteName}`} fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
            <p className="mt-auto pt-8 text-[15px] leading-relaxed">
              {intro.fanText}
            </p>
          </article>
        </Reveal>
      </div>

      {/* Chiffres clés */}
      <Reveal delay={100} className="mt-14 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {intro.stats.map((k) => (
          <div key={k.label}>
            <p className="font-title text-5xl tracking-[-0.02em] text-wood">
              <Counter to={k.value ?? 0} suffix={k.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{k.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
