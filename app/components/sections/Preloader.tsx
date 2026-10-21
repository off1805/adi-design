"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, markIntroDone, MOTION_OK, useGSAP } from "../../lib/gsap";

/**
 * Intro courte (~1 s) : logo, compteur, rideau qui se lève.
 * Jouée une seule fois par session pour ne pas gêner les visiteurs qui reviennent.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const seenRef = useRef<boolean | null>(null);

  useGSAP(
    () => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        markIntroDone();
        setDone(true);
      };
      // Sécurité : le site ne reste jamais bloqué derrière l'intro (appareil lent, onglet en arrière-plan)
      const safety = window.setTimeout(finish, 2500);
      // Décidé une seule fois (React rejoue les effets en développement)
      if (seenRef.current === null) {
        try {
          seenRef.current = sessionStorage.getItem("adi-intro") === "1";
          sessionStorage.setItem("adi-intro", "1");
        } catch {
          seenRef.current = false;
        }
      }
      const seen = seenRef.current;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (seen) return finish();
        const count = { v: 0 };
        gsap
          .timeline({ onComplete: finish })
          .from(".pl-logo", { autoAlpha: 0, scale: 0.85, duration: 0.35 })
          .to(count, {
            v: 100,
            duration: 0.55,
            ease: "power2.inOut",
            onUpdate: () => {
              const el = ref.current?.querySelector(".pl-count");
              if (el) el.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          }, "<")
          .to(".pl-bar", { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, "<")
          .to(".pl-inner", { autoAlpha: 0, y: -20, duration: 0.2 })
          .to(ref.current, { yPercent: -100, duration: 0.5, ease: "expo.inOut" }, "-=0.05");
      });
      mm.add("(prefers-reduced-motion: reduce)", finish);
      return () => window.clearTimeout(safety);
    },
    { scope: ref },
  );

  if (done) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[100] grid place-items-center bg-ink text-white">
      <div className="pl-inner flex flex-col items-center">
        <span className="pl-logo grid h-24 w-32 place-items-center rounded-2xl bg-white p-3">
          <Image src="/images/logo.png" alt="ADI Design" width={1076} height={820} className="h-auto w-full" priority />
        </span>
        <span className="mt-8 h-px w-48 overflow-hidden bg-white/15">
          <span className="pl-bar block h-full w-full origin-left scale-x-0 bg-wood" />
        </span>
        <span className="pl-count mt-4 text-sm tracking-[0.3em] tabular-nums text-white/60">000</span>
      </div>
    </div>
  );
}
