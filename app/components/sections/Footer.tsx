"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CONTACT, NAV, SERVICES, SOCIALS, whatsappLink } from "../../lib/data";
import { Icon } from "../ui/Icon";

const ICONS: Record<(typeof SOCIALS)[number]["label"], string> = {
  Facebook: "M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V22H14v-10.3h2.7l.4-3.2H14z",
  Instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.8a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z",
  TikTok: "M19.6 6.7a4.8 4.8 0 01-3.8-4.2V2h-3.4v13.4a2.9 2.9 0 11-2-2.7V9.2a6.3 6.3 0 105.4 6.2V8.6a8.2 8.2 0 004.8 1.5V6.7h-1z",
};

const linkCls = "text-white/70 transition-colors hover:text-white";

/** Pied de page : marque + réseaux, navigation, services, coordonnées, puis barre légale. */
export function Footer() {
  return (
    <footer className="bg-ink-2 pb-8 text-white">
      <div className="container-site">
        <div className="border-t border-white/10 pt-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Image src="/images/logo.png" alt="ADI Design, le luxe chez vous à petit prix" width={1076} height={820} className="h-auto w-20 brightness-0 invert" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/70">
              Cabinet d’architecture d’intérieur à {CONTACT.city}. Conception 3D, staff, carrelage, mobilier sur mesure : le luxe chez vous à petit prix.
            </p>
            <ul className="mt-6 flex gap-2">
              {SOCIALS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={`ADI Design sur ${label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-white hover:bg-white hover:text-ink"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={ICONS[label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="lg:col-span-2" aria-label="Pied de page">
            <p className="text-sm font-medium text-white">Navigation</p>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={linkCls}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-sm font-medium text-white">Services</p>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#services" className={linkCls}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <p className="text-sm font-medium text-white">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`tel:+${CONTACT.phoneIntl}`} className="text-lg tracking-[-0.01em] text-white transition-colors hover:text-white/70">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener" className={linkCls}>
                  Écrire sur WhatsApp
                </a>
              </li>
              <li className="leading-relaxed text-white/70">
                {CONTACT.address}
                <br />
                {CONTACT.city}, Cameroun
              </li>
              <li className="text-white/70">Du lundi au samedi</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ADI Design, l’apôtre du design intérieur</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            Retour en haut
            <Icon name="arrow-up" size={14} />
          </a>
        </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  // Masqué quand il recouvrirait des actions importantes (carrousel des projets, formulaire de contact)
  const [hidden, setHidden] = useState(false);
  // Masqué aussi pendant qu'on descend (il ne cache plus le contenu en lecture), réapparaît dès qu'on remonte
  const [down, setDown] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 8) {
        setDown(y > last && y > 200);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const targets = ["projets", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHidden(visible.size > 0);
      },
      // « visible » = la section occupe la bande centrale de l'écran (indépendant de sa hauteur)
      { rootMargin: "-35% 0px -35% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Discuter sur WhatsApp"
      className={`fixed right-4 bottom-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink text-white shadow-lg transition duration-300 hover:bg-ink-3 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14 ${hidden || down ? "pointer-events-none translate-y-24 opacity-0" : ""}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" />
      </svg>
    </a>
  );
}
