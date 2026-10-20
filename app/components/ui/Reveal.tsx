"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "../../lib/gsap";

/** Apparition douce au scroll (montée + fondu). */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(ref.current, {
          y: 50,
          autoAlpha: 0,
          duration: 1.1,
          delay: delay / 1000,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
