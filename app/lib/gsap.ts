"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
gsap.defaults({ ease: "power3.out", duration: 1 });

/** Requête commune : animations seulement si l'utilisateur n'a pas demandé de les réduire. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Effets réservés aux écrans avec souris (curseur, magnétisme). */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Événement émis quand l'intro est terminée (le hero démarre à ce moment-là). */
export const INTRO_DONE = "adi:intro-done";

let introDone = false;
export function markIntroDone() {
  introDone = true;
  window.dispatchEvent(new Event(INTRO_DONE));
}
/** Exécute `cb` dès que l'intro est finie (immédiatement si c'est déjà le cas). */
export function onIntroDone(cb: () => void) {
  if (introDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_DONE, cb, { once: true });
  return () => window.removeEventListener(INTRO_DONE, cb);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Agrandit les masques SplitText vers le bas pour ne pas couper les jambages (g, j, p). */
export function padMasks(masks: Element[]) {
  gsap.set(masks, { paddingBottom: "0.14em", marginBottom: "-0.14em" });
}
