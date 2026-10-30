"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "power3.out", duration: 1 });

/** Requête commune : animations seulement si l'utilisateur n'a pas demandé de les réduire. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export { gsap, ScrollTrigger, useGSAP };
