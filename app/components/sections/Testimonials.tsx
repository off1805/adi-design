"use client";

import Image from "next/image";
import { useContent } from "../../lib/ContentProvider";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} étoiles sur 5`}>
      {[0, 1, 2, 3, 4].map((k) => (
        <svg key={k} width="16" height="16" viewBox="0 0 24 24" aria-hidden className={k < value ? "text-wood" : "text-ink/15"} fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

/** Témoignages en cartes : avatar, nom, projet, note, avis et date. Défilement horizontal sur mobile. */
export function Testimonials() {
  const { title, subtitle, items } = useContent().temoignages;

  return (
    <section className="section-y bg-cream">
      <div className="container-site">
        <SectionHead center label="Témoignages">
          {title}
        </SectionHead>
        <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-muted">{subtitle}</p>

        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {items.map((t, k) => (
            <li key={k} className="w-[82vw] max-w-sm shrink-0 snap-start lg:w-auto lg:max-w-none">
              <Reveal delay={k * 100} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl bg-paper p-7">
                  <figcaption className="flex items-center gap-3.5">
                    {t.photo ? (
                      <Image src={t.photo} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                    ) : (
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-sm font-semibold text-ink/70" aria-hidden>
                        {initials(t.name)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">{t.name}</p>
                      {t.role && <p className="truncate text-[13px] text-muted">{t.role}</p>}
                    </div>
                  </figcaption>

                  <div className="mt-5">
                    <Stars value={t.rating ?? 5} />
                  </div>

                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/85">“{t.quote}”</blockquote>

                  {t.date && <p className="mt-6 border-t border-ink/10 pt-4 text-[13px] text-muted">{t.date}</p>}
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
