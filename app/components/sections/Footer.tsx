"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CONTACT, NAV, whatsappLink } from "../../lib/data";

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 text-white sm:px-10">
      <div className="mx-auto max-w-[1300px]">
        <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center">
          <span className="grid h-12 w-16 place-items-center rounded-lg bg-white p-1.5">
            <Image src="/images/logo.png" alt="ADI Design — Le luxe chez vous à petit prix" width={1076} height={820} className="h-auto w-full" />
          </span>
          <nav className="flex flex-wrap gap-6 text-sm text-white/60">
            {NAV.map(({ label, href }) => (
              <a key={href} href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <a href={`tel:+${CONTACT.phoneIntl}`} className="text-sm text-white/80 transition-colors hover:text-glow">
            {CONTACT.phoneDisplay}
          </a>
        </div>
        <p className="mt-12 text-center text-[clamp(3rem,13vw,13rem)] leading-[0.8] font-medium tracking-[-0.05em] whitespace-nowrap">
          ADI Design<span className="text-red">.</span>
        </p>
        <div className="mt-10 flex flex-col justify-between gap-3 text-xs text-white/60 sm:flex-row">
          <p>© 2026 ADI Design — L’apôtre du design intérieur</p>
          <p className="tracking-[0.25em] uppercase">Des idées · Des plans · Des espaces · Votre confort</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  // Masqué quand il recouvrirait des actions importantes (carrousel des projets, formulaire de contact)
  const [hidden, setHidden] = useState(false);
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
      className={`fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition duration-300 hover:scale-110 ${hidden ? "pointer-events-none translate-y-24 opacity-0" : ""}`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" />
      </svg>
    </a>
  );
}
