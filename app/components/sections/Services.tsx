"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { SERVICES } from "../../lib/data";
import { Icon } from "../ui/Icon";
import { SectionHead } from "../ui/SectionHead";

const n = SERVICES.length;
const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Services en « liste + aperçu » : sur grand écran, la liste des titres à gauche pilote
 * un panneau d'aperçu à droite (photos, description, prestations). Sur mobile,
 * cartes complètes en défilement horizontal avec pagination.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const [slide, setSlide] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const track = useRef<HTMLUListElement>(null);
  const s = SERVICES[active];

  const pick = (i: number) => {
    clearTimeout(hoverTimer.current);
    setActive(i);
    setShot(0);
  };

  // Intention de survol : on ne change qu'après un court arrêt, pour qu'un trajet
  // en diagonale de la liste vers l'aperçu ne bascule pas sur un autre service
  const hover = (i: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => pick(i), 140);
  };
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // Clavier : flèches haut/bas, Début/Fin (motif « tabs » ARIA)
  const onKey = (e: KeyboardEvent) => {
    const next = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + n) % n;
    pick(i);
    tabs.current[i]?.focus();
  };

  // Mobile : carte la plus centrée = carte active (pagination)
  const onTrackScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (card) setSlide(Math.round(el.scrollLeft / (card.offsetWidth + 12)));
  };
  const goSlide = (i: number) => {
    const card = track.current?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section id="services" className="section-y bg-sand">
      <div className="container-site">
        {/* Mobile : titre seul ; grand écran : le titre passe en tête de la colonne de gauche */}
        <div className="lg:hidden">
          <SectionHead label="Nos services">Des solutions pensées pour vous</SectionHead>
        </div>

        {/* Grand écran : titre + liste à gauche, aperçu aligné en haut à droite */}
        <div className="hidden items-start gap-12 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]" onMouseLeave={() => clearTimeout(hoverTimer.current)}>
          <div className="flex flex-col">
            <SectionHead label="Nos services">Des solutions pensées pour vous</SectionHead>
            <div role="tablist" aria-label="Nos services" aria-orientation="vertical" onKeyDown={onKey} className="mt-10 border-t border-ink/10">
              {SERVICES.map((x, i) => {
                const on = i === active;
                return (
                  <button
                    key={x.title}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    id={`svc-tab-${i}`}
                    role="tab"
                    aria-selected={on}
                    aria-controls="svc-panel"
                    tabIndex={on ? 0 : -1}
                    onMouseEnter={() => hover(i)}
                    onClick={() => pick(i)}
                    className="group relative flex w-full items-center gap-5 border-b border-ink/10 py-5 text-left outline-none focus-visible:bg-paper/60"
                  >
                    {/* Filet bois qui souligne le service actif */}
                    <span className={`absolute -bottom-px left-0 h-px bg-wood transition-all duration-500 ${on ? "w-full" : "w-0"}`} />
                    <span className={`w-8 shrink-0 text-lg font-light tabular-nums transition-colors ${on ? "text-wood" : "text-ink/45"}`}>{pad(i)}</span>
                    <span
                      className={`flex-1 text-[clamp(1.5rem,2.3vw,2rem)] leading-tight tracking-[-0.03em] transition duration-300 ${
                        on ? "translate-x-1.5 text-ink" : "text-ink/55 group-hover:text-ink/80"
                      }`}
                    >
                      {x.title}
                    </span>
                    <Icon name="arrow-right" className={`transition duration-300 ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                  </button>
                );
              })}
            </div>

            <p className="mt-auto pt-8 text-[15px] leading-relaxed text-muted">
              Un projet qui combine plusieurs services ?{" "}
              <a href="#contact" className="text-ink underline underline-offset-4 transition-colors hover:text-wood">
                On s’occupe de tout
              </a>
              .
            </p>
          </div>

          <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${active}`} className="sticky top-24">
            <div className="flex flex-col rounded-[4px] bg-paper p-3">
              {/* Photo principale : seules les photos du service actif sont rendues */}
              <div key={s.title} className="relative aspect-[16/10] animate-[fp-in_0.5s_ease-out] overflow-hidden rounded-[4px] bg-stone">
                {s.images.map((src, k) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${s.title} — réalisation ADI Design Cameroun ${k + 1}`}
                    fill
                    className={`object-cover transition duration-700 ease-out ${k === shot ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
                    sizes="(min-width:1200px) 680px, 58vw"
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[13px] text-white tabular-nums backdrop-blur-md">
                  {pad(active)} / {pad(n - 1)}
                </span>
                {/* Vignettes posées sur la photo */}
                <div className="absolute right-4 bottom-4 flex gap-2">
                  {s.images.map((src, k) => (
                    <button
                      key={src}
                      onClick={() => setShot(k)}
                      onMouseEnter={() => setShot(k)}
                      aria-label={`Voir la photo ${k + 1} sur ${s.images.length}`}
                      aria-pressed={k === shot}
                      className={`relative h-11 w-16 overflow-hidden rounded-[4px] ring-offset-2 ring-offset-black/0 transition ${
                        k === shot ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              </div>

              <div key={`t-${s.title}`} className="flex animate-[fp-in_0.5s_ease-out] flex-col gap-5 p-5">
                <div>
                  <h3 className="text-2xl tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">{s.text}</p>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <ul className="flex max-w-md flex-wrap gap-2">
                    {s.items.map((it) => (
                      <li key={it} className="rounded-full border border-ink/15 px-3 py-1 text-[13px] text-ink/75">
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn btn-sm btn-primary">
                    Demander un devis
                    <Icon name="arrow-up-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablette : cartes en défilement horizontal */}
        <ul
          ref={track}
          onScroll={onTrackScroll}
          className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:hidden"
        >
          {SERVICES.map((x, i) => (
            <li key={x.title} className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col rounded-[4px] bg-paper p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-stone">
                <Image src={x.images[0]} alt={`${x.title} — réalisation ADI Design Cameroun`} fill className="object-cover" sizes="(min-width:640px) 384px, 82vw" />
              </div>
              <div className="flex flex-1 flex-col p-3 pt-5">
                <span className="text-sm font-light text-wood tabular-nums">{pad(i)}</span>
                <h3 className="mt-1 text-2xl tracking-[-0.03em]">{x.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{x.text}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {x.items.map((it) => (
                    <li key={it} className="rounded-full border border-ink/15 px-2.5 py-1 text-xs text-ink/75">
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <a href="#contact" className="btn btn-sm btn-secondary">
                    Demander un devis
                    <Icon name="arrow-up-right" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Choisir un service">
            {SERVICES.map((x, i) => (
              <button key={x.title} role="tab" aria-selected={i === slide} aria-label={x.title} onClick={() => goSlide(i)} className="grid h-8 place-items-center">
                <span className={`block h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-ink" : "w-1.5 bg-ink/25"}`} />
              </button>
            ))}
          </div>
          <span className="text-[13px] text-muted tabular-nums">
            {pad(slide)} / {pad(n - 1)}
          </span>
        </div>
      </div>
    </section>
  );
}
