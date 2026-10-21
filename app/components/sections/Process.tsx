"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { STEPS } from "../../lib/data";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { SectionHead } from "../ui/SectionHead";

/** Méthode : sur grand écran, la section se fige le temps de parcourir les étapes. */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop : la section se fige et le scroll fait défiler les étapes une à une.
      // Le défilement normal ne reprend qu'une fois la dernière étape affichée.
      mm.add("(min-width: 1024px)", () => {
        const n = STEPS.length;
        ScrollTrigger.create({
          trigger: ".pr-grid",
          start: "center center",
          end: `+=${n * 60}%`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
        });
      });

      // Mobile : étape active = celle qui traverse le milieu de l'écran
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".pr-step").forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="border-t border-ink/10 py-20 lg:py-28">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10">
        <SectionHead label="Notre méthode" aside="Un seul interlocuteur, du premier rendez-vous à la remise des clés.">
          Un accompagnement à chaque étape
        </SectionHead>

        <div className="pr-grid mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Photo fixe (desktop) : fondu entre les étapes */}
          <div className="hidden lg:col-span-4 lg:block lg:self-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-ink">
              {STEPS.map((s, i) => (
                <Image
                  key={s.t}
                  src={s.src}
                  alt={s.t}
                  fill
                  className={`object-cover transition duration-700 ease-out ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                  sizes="33vw"
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-3xl font-light tabular-nums">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-xs tracking-[0.25em] uppercase opacity-80">
                  Étape {active + 1} / {STEPS.length}
                </span>
              </div>
            </div>
          </div>

          <ol className="pr-steps border-t border-ink/10 lg:col-span-8">
            {STEPS.map((s, i) => (
              <li key={s.t} className="pr-step flex gap-6 border-b border-ink/10 py-7 sm:gap-8 lg:py-9">
                <span className={`w-10 shrink-0 text-2xl font-light tabular-nums transition-colors duration-500 sm:text-3xl ${i === active ? "text-wood" : "text-ink/25"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className={`text-[clamp(1.5rem,2.4vw,2rem)] leading-tight tracking-[-0.03em] transition-colors duration-500 ${i === active ? "text-ink" : "text-ink/40"}`}>
                    {s.t}
                  </h3>
                  <p className="mt-2 max-w-md text-sm sm:text-base leading-relaxed text-muted">{s.d}</p>
                  <div className="relative mt-5 aspect-[16/9] max-w-sm overflow-hidden rounded-[4px] bg-ink lg:hidden">
                    <Image src={s.src} alt={s.t} fill className="object-cover" sizes="(min-width:640px) 384px, 90vw" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

    </section>
  );
}
