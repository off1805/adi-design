"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useContent } from "../../lib/ContentProvider";
import { FINE_POINTER, gsap, MOTION_OK, useGSAP } from "../../lib/gsap";
import { Icon } from "../ui/Icon";
import { SectionHead } from "../ui/SectionHead";

/** Avant / Après : l'image s'ouvre au scroll, le curseur balaie seul puis suit la souris ou le doigt. */
export function Transformation() {
  const ref = useRef<HTMLElement>(null);
  const { title, aside, before, after, caption } = useContent().transformation;
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
    <section ref={ref} className="section-y">
      <div className="container-site">
        <SectionHead label="Avant / Après" aside={aside}>
          {title}
        </SectionHead>

        <div
          onPointerMove={follow}
          onPointerDown={follow}
          className="tr-frame relative mt-12 aspect-square max-h-[62vh] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[4px] bg-ink sm:aspect-[2/1]"
        >
          <Image src={after} alt="Après intervention" fill className="object-cover" sizes="(min-width:1200px) 1200px, 100vw" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={before} alt="Avant intervention" fill className="object-cover grayscale-[35%]" sizes="(min-width:1200px) 1200px, 100vw" />
          </div>

          {/* Étiquettes : chacune s'efface quand son côté est presque masqué */}
          <span
            className="pointer-events-none absolute top-5 left-5 rounded-full bg-black/40 px-3.5 py-1.5 text-[13px] font-medium text-white backdrop-blur-md transition-opacity"
            style={{ opacity: pos < 15 ? 0 : 1 }}
          >
            Avant
          </span>
          <span
            className="pointer-events-none absolute top-5 right-5 rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] font-medium text-ink backdrop-blur-md transition-opacity"
            style={{ opacity: pos > 85 ? 0 : 1 }}
          >
            Après
          </span>

          <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,.35)]" />
            <div className="absolute top-1/2 -left-7 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl">
              <Icon name="chevrons-h" size={20} />
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

          <div className="pointer-events-none absolute right-5 bottom-5 rounded-full bg-black/40 px-3.5 py-1.5 text-[13px] text-white tabular-nums backdrop-blur-md">
            {Math.round(100 - pos)}% transformé
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-[15px] leading-relaxed text-muted">{caption}</p>
          <a href="#contact" className="btn btn-primary">
            Transformer mon intérieur
            <Icon name="arrow-up-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
