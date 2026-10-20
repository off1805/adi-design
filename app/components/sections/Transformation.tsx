"use client";

import Image from "next/image";
import { useState } from "react";
import { img } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

/** Avant / Après : grande image comparative, légende en barre comme les Projets. */
export function Transformation() {
  const [pos, setPos] = useState(50);
  return (
    <section className="px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1300px]">
        <SectionHead label="Avant / Après" aside="Faites glisser le curseur : même mur, même angle. Un exemple réel d’intervention ADI Design.">
          Du mur brut à la pièce signature
        </SectionHead>

        <div className="relative mt-12 aspect-[4/5] max-h-[68vh] w-full select-none overflow-hidden rounded-[4px] bg-ink sm:aspect-[16/9]">
          <Image src={img("mur-apres")} alt="Après intervention ADI Design" fill className="object-cover" sizes="(min-width:1300px) 1300px, 100vw" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={img("mur-avant")} alt="Avant intervention" fill className="object-cover" sizes="(min-width:1300px) 1300px, 100vw" />
          </div>
          <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -left-px w-px bg-white" />
            <div className="absolute top-1/2 -left-6 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-sm text-ink shadow-xl">⟷</div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparer avant et après"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-muted">
          <span>
            <span className="font-semibold text-ink">Avant</span> — mur brut, enduit à reprendre
          </span>
          <span className="text-right">
            <span className="font-semibold text-ink">Après</span> — enduit béton, lames décoratives, cadre
          </span>
        </div>
      </div>
    </section>
  );
}
