import type { ReactNode } from "react";

/** En-tête de section commun : petit sur-titre + titre sobre terminé par un point rouge. */
export function SectionHead({
  label,
  children,
  aside,
  center = false,
  dark = false,
}: {
  label: string;
  children: ReactNode;
  aside?: ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-6 ${center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"}`}>
      <div>
        <p className={`text-xs tracking-[0.3em] uppercase ${dark ? "text-white/60" : "text-muted"}`}>{label}</p>
        <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.75rem)] leading-none font-medium tracking-[-0.04em]">
          {children}
          <span className="text-red">.</span>
        </h2>
      </div>
      {aside && <div className={`max-w-sm text-sm leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>{aside}</div>}
    </div>
  );
}
