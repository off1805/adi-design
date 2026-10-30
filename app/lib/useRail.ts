"use client";

import { useRef, useState, type RefObject } from "react";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

/** Part de la largeur dont la rangée est décalée au départ : les cartes entrent depuis le bord de l'écran. */
const OFFSET = 0.55;

/**
 * Rail horizontal piloté par le scroll, façon Apple.
 * Desktop : la scène est épinglée, le scroll fait glisser la rangée ; les cartes entrent par la droite
 * et avancent vers la gauche.
 * Mobile / mouvement réduit : rien n'est animé, la rangée défile au doigt.
 * La scène reçoit la classe `is-animated` quand le rail est actif.
 */
export function useRail({
  stage,
  track,
  count,
}: {
  stage: RefObject<HTMLElement | null>;
  track: RefObject<HTMLElement | null>;
  count: number;
}) {
  const trigger = useRef<ST | null>(null);
  const [active, setActive] = useState(0);
  const last = Math.max(0, count - 1);

  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const scene = stage.current!;
        const el = track.current!;
        const width = () => el.parentElement!.clientWidth;
        const distance = () => Math.max(0, el.scrollWidth - width());
        const offset = () => width() * OFFSET;
        scene.classList.add("is-animated");

        const tween = gsap.fromTo(
          el,
          { x: offset },
          {
            x: () => -distance(),
            ease: "none",
            // Mis à jour à chaque image (et pas seulement au scroll) : le compteur suit le lissage
            onUpdate() {
              setActive(Math.round(this.progress() * last));
            },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: () => `+=${distance() + offset()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
        trigger.current = tween.scrollTrigger ?? null;

        return () => {
          trigger.current = null;
          scene.classList.remove("is-animated");
        };
      });
    },
    { scope: stage },
  );

  // Rangée tactile : carte active = celle la plus proche du bord gauche
  const onScroll = () => {
    const el = track.current;
    if (!el || trigger.current) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (card) setActive(Math.min(last, Math.round(el.scrollLeft / card.offsetWidth)));
  };

  const goTo = (i: number) => {
    const n = Math.max(0, Math.min(last, i));
    const st = trigger.current;
    if (st) {
      const proxy = { y: window.scrollY };
      gsap.to(proxy, {
        y: st.start + (last ? n / last : 0) * (st.end - st.start),
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => window.scrollTo({ top: proxy.y, behavior: "instant" }),
      });
    } else {
      track.current?.children[n]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  return { active, last, goTo, onScroll };
}
