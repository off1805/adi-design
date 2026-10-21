"use client";

import Image from "next/image";
import { useRef } from "react";
import { img } from "../../lib/data";
import { gsap, MOTION_OK, padMasks, SplitText, useGSAP } from "../../lib/gsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const split = SplitText.create(".hero-title", { type: "chars", mask: "chars" });
        padMasks(split.masks);
        gsap.set(".hero-media", { scale: 1.25 });
        gsap.set(split.chars, { yPercent: 110 });
        gsap.set(".hero-fade", { autoAlpha: 0, y: 20 });

        // Entrée : lancée dès le chargement de la page
        gsap
          .timeline({ delay: 0.1 })
          .to(".hero-media", { scale: 1.08, duration: 2.2, ease: "expo.out" })
          .to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.035, ease: "expo.out" }, 0.15)
          .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.6);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="top">
      <div className="hero-frame relative h-svh min-h-[560px] overflow-hidden">
        <div className="hero-media absolute inset-0">
          <Image src={img("hero-chambre")} alt="Intérieur réalisé par ADI Design" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.45),transparent_65%)]" />

        <div className="hero-content absolute inset-0 grid place-items-center px-4 text-center text-white">
          <div>
            <h1 className="hero-title text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-[-0.045em]">ADI Design</h1>
            <p className="hero-fade mx-auto mt-8 max-w-xl sm:mt-10 text-base leading-relaxed text-white/85 sm:text-lg">
              Architecture d’intérieur clé en main à Yaoundé, du crépissage à la décoration finale.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#contact" className="btn btn-light">
                Demander un devis gratuit
              </a>
              <a href="#projets" className="btn btn-outline-light backdrop-blur-sm">
                Voir nos projets
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
