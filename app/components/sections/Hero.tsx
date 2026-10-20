"use client";

import Image from "next/image";
import { useRef } from "react";
import { img } from "../../lib/data";
import { gsap, MOTION_OK, onIntroDone, padMasks, SplitText, useGSAP } from "../../lib/gsap";
import { Magnetic } from "../ui/Magnetic";

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

        // Entrée : lancée à la fin de l'intro
        const intro = gsap
          .timeline({ paused: true })
          .to(".hero-media", { scale: 1.08, duration: 2.2, ease: "expo.out" })
          .to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.035, ease: "expo.out" }, 0.15)
          .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.6);
        const stop = onIntroDone(() => intro.play());

        // Au scroll : parallaxe de la photo, le titre s'éloigne, le cadre s'arrondit
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } })
          .to(".hero-media", { yPercent: 18, ease: "none" }, 0)
          .to(".hero-content", { yPercent: -40, autoAlpha: 0, ease: "none" }, 0)
          .to(".hero-frame", { borderRadius: "2.5rem", scale: 0.94, ease: "none" }, 0);

        return stop;
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="top" className="p-2 sm:p-2">
      <div className="hero-frame relative h-[calc(100svh-1.5rem)] min-h-[560px] overflow-hidden rounded-[1rem] sm:h-[calc(100svh-2rem)]">
        <div className="hero-media absolute inset-0">
          <Image src={img("hero-chambre")} alt="Intérieur réalisé par ADI Design" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.45),transparent_65%)]" />

        <div className="hero-content absolute inset-0 grid place-items-center px-4 text-center text-white">
          <div>
            <p className="hero-fade mb-5 text-xs tracking-[0.35em] uppercase opacity-85">L’apôtre du design intérieur</p>
            <h1 className="hero-title text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] font-medium tracking-[-0.045em]">ADI Design</h1>
<p className="hero-fade mt-5 font-script text-2xl text-white/90 sm:text-3xl">Le luxe chez vous à petit prix</p>
            <p className="hero-fade mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Architecture d’intérieur clé en main à Yaoundé, du crépissage à la décoration finale.
            </p>
            <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#contact" className="rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-deep">
                Demander un devis gratuit
              </a>
              <a href="#projets" className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink">
                Voir nos projets
              </a>
            </div>
            <p className="hero-fade mt-6 inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-1.5 text-xs text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-glow" />
              Conception 3D offerte et validée avant travaux
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white sm:p-8">
          <p className="hero-fade hidden max-w-xs text-sm leading-relaxed text-white/80 sm:block">
            Cabinet d’architecture d’intérieur à Yaoundé. Conception 3D, staff, carrelage, mobilier sur mesure.
          </p>
          <Magnetic className="hero-fade mx-auto sm:mx-0">
            <a href="#studio" aria-label="Défiler vers la suite" className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-red hover:text-white">
              ↓
            </a>
          </Magnetic>
          <p className="hero-fade hidden text-right text-xs tracking-[0.25em] uppercase sm:block">
            Yaoundé
            <br />
            <span className="text-white/60">Cameroun</span>
          </p>
        </div>
      </div>
    </section>
  );
}
