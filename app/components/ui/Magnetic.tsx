"use client";

import { useRef, type ReactNode } from "react";
import { FINE_POINTER, gsap, MOTION_OK, useGSAP } from "../../lib/gsap";

/** Le bouton est légèrement attiré par le curseur (desktop uniquement). */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const el = ref.current!;
        const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * strength);
          y((e.clientY - r.top - r.height / 2) * strength);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
