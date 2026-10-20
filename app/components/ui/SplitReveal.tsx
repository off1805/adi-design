"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, padMasks, SplitText, useGSAP } from "../../lib/gsap";

/** Titre révélé ligne par ligne derrière un masque, au scroll. */
export function SplitReveal({
  as: Tag = "h2",
  children,
  className = "",
  type = "lines",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  type?: "lines" | "chars";
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        SplitText.create(ref.current, {
          type: type === "chars" ? "lines,chars" : "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            padMasks(self.masks);
            return gsap.from(type === "chars" ? self.chars : self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: type === "chars" ? 0.025 : 0.12,
              ease: "expo.out",
              scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
            });
          },
        });
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
