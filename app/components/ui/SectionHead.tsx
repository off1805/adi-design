import type { ReactNode } from "react";

/** En-tête de section commun : sur-titre discret + titre, texte d'accompagnement aligné sur la base du titre. */
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
    <div className={`flex flex-col gap-5 ${center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between lg:gap-16"}`}>
      <div className="max-w-3xl">
        <p className={`flex items-center gap-3 text-sm font-medium ${center ? "justify-center" : ""} ${dark ? "text-white/70" : "text-muted"}`}>
          {label}
        </p>
        <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
          {children}
        </h2>
      </div>
      {aside && <div className={`max-w-sm text-[15px] leading-relaxed lg:pb-1.5 ${dark ? "text-white/70" : "text-muted"}`}>{aside}</div>}
    </div>
  );
}
