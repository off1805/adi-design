"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { img } from "../../lib/data";
import { FINE_POINTER, gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import { SectionHead } from "../ui/SectionHead";

const STEPS = [
  { t: "Reprise de l’enduit", d: "Mur brut redressé puis recouvert d’un enduit effet béton." },
  { t: "Lames décoratives", d: "Pose de lames verticales pour donner du rythme et de la profondeur." },
  { t: "Cadre & finitions", d: "Encadrement, joints et retouches pour un rendu net, prêt à vivre." },
];

/** Avant / Après : l'image s'ouvre au scroll, le curseur balaie seul puis suit la souris ou le doigt. */
export function Transformation() {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState(50);
  // Dès que l'utilisateur prend la main, le balayage automatique s'arrête
  const touched = useRef(false);
  const take = (v: number) => {
    touched.current = true;
    setPos(Math.min(100, Math.max(0, v)));
  };

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Le cadre s'ouvre depuis le centre, la photo dézoome
        gsap.fromTo(".tr-frame", { clipPath: "inset(12% 8% 12% 8%)" }, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: ".tr-frame", start: "top bottom", end: "center center", scrub: true },
        });
        gsap.fromTo(".tr-frame img", { scale: 1.2 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".tr-frame", start: "top bottom", end: "center center", scrub: true },
        });

        // Démonstration : le curseur révèle l'après, revient sur l'avant, puis se pose au milieu
        const demo = { v: 50 };
        gsap
          .timeline({ scrollTrigger: { trigger: ".tr-frame", start: "top 55%", once: true } })
          .to(demo, { v: 92, duration: 1, ease: "power2.inOut" })
          .to(demo, { v: 8, duration: 1.4, ease: "power2.inOut" })
          .to(demo, { v: 50, duration: 1, ease: "power3.out" })
          .eventCallback("onUpdate", () => {
            if (!touched.current) setPos(demo.v);
          });

        gsap.from(".tr-step", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: ".tr-steps", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const follow = (e: React.PointerEvent<HTMLDivElement>) => {
    // Souris : le curseur suit le survol. Tactile : il suit le doigt pendant le glissé.
    if (e.pointerType === "mouse" && !window.matchMedia(FINE_POINTER).matches) return;
    if (e.pointerType !== "mouse" && e.buttons === 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    take(((e.clientX - r.left) / r.width) * 100);
  };

  return (
    <section ref={ref} className="px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1300px]">
        <SectionHead label="Avant / Après" aside="Survolez ou faites glisser : même mur, même angle. Un exemple réel d’intervention ADI Design.">
          Du mur brut à la pièce signature
        </SectionHead>

        <div
          onPointerMove={follow}
          onPointerDown={follow}
          className="tr-frame relative mt-12 aspect-[4/5] max-h-[78vh] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[4px] bg-ink sm:aspect-[16/9]"
        >
          <Image src={img("mur-apres")} alt="Après intervention ADI Design" fill className="object-cover" sizes="(min-width:1300px) 1300px, 100vw" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={img("mur-avant")} alt="Avant intervention" fill className="object-cover grayscale-[35%]" sizes="(min-width:1300px) 1300px, 100vw" />
          </div>

          {/* Étiquettes : chacune s'efface quand son côté est presque masqué */}
          <span
            className="pointer-events-none absolute top-5 left-5 rounded-full bg-black/40 px-4 py-1.5 text-xs tracking-[0.2em] text-white uppercase backdrop-blur-md transition-opacity"
            style={{ opacity: pos < 15 ? 0 : 1 }}
          >
            Avant
          </span>
          <span
            className="pointer-events-none absolute top-5 right-5 rounded-full bg-white/85 px-4 py-1.5 text-xs tracking-[0.2em] text-ink uppercase backdrop-blur-md transition-opacity"
            style={{ opacity: pos > 85 ? 0 : 1 }}
          >
            Après
          </span>

          <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,.35)]" />
            <div className="absolute top-1/2 -left-7 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl">
              <span className="flex gap-1 text-xs">
                <span>◀</span>
                <span>▶</span>
              </span>
            </div>
          </div>

          {/* Accès clavier / lecteurs d'écran */}
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(pos)}
            onChange={(e) => take(Number(e.target.value))}
            aria-label="Comparer avant et après"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          />

          <div className="pointer-events-none absolute right-5 bottom-5 rounded-full bg-black/40 px-4 py-1.5 text-xs text-white tabular-nums backdrop-blur-md">
            {Math.round(100 - pos)}% transformé
          </div>
        </div>

        

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-sm text-muted">Chaque transformation est d’abord validée en 3D, avant le premier coup de truelle.</p>
          <a href="#contact" className="rounded-full bg-ink px-6 py-3 text-xs font-semibold text-white transition hover:bg-white hover:text-ink hover:ring-1 hover:ring-ink/15">
            Transformer mon intérieur
          </a>
        </div>
      </div>
    </section>
  );
}
