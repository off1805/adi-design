"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.round(obj.v)}${suffix}`;
      },
    });
  });
  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}
