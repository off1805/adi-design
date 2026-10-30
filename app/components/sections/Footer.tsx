"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useContent, useWhatsapp } from "../../lib/ContentProvider";
import { NAV } from "../../lib/data";
import { Icon } from "../ui/Icon";

const ICONS: Record<string, string> = {
  Facebook: "M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V22H14v-10.3h2.7l.4-3.2H14z",
  Instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.8a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z",
  TikTok: "M19.6 6.7a4.8 4.8 0 01-3.8-4.2V2h-3.4v13.4a2.9 2.9 0 11-2-2.7V9.2a6.3 6.3 0 105.4 6.2V8.6a8.2 8.2 0 004.8 1.5V6.7h-1z",
};

const linkCls = "text-white/70 transition-colors hover:text-white";

/** Pied de page : marque + réseaux, navigation, services, coordonnées, puis barre légale. */
export function Footer() {
  const { contact: CONTACT, settings, solutions, year } = useContent();
  const whatsappLink = useWhatsapp();
  return (
    <footer className="bg-ink-2 pb-8 text-white max-md:pb-24">
      <div className="container-site">
        <div className="pt-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Image src="/images/logo.png" alt={settings.siteName} width={1076} height={820} className="h-auto w-20 brightness-0 invert" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/70">
              {settings.footerText}
            </p>
            <ul className="mt-6 flex gap-2">
              {CONTACT.socials.map(({ platform: label, url: href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${settings.siteName} sur ${label}`}
                    className="grid h-10 w-10 place-items-center border border-white/15 text-white/80 transition hover:border-white hover:bg-white hover:text-black"
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
              {solutions.items.map((s, k) => (
                <li key={k}>
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
              <li className="text-white/70">{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {settings.siteName}, {settings.slogan.charAt(0).toLowerCase() + settings.slogan.slice(1)}</p>
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

const WA_ICON =
  "M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z";

/**
 * Contact permanent.
 * Mobile : barre fixée en bas de l'écran, « WhatsApp » + « Appeler », dans la zone du pouce.
 * Desktop : bouton rond WhatsApp en bas à droite, masqué pendant qu'on descend.
 * Les deux s'effacent quand la section Contact est à l'écran (elle propose déjà ces actions).
 */
export function WhatsAppButton() {
  const whatsappLink = useWhatsapp();
  const { contact, settings } = useContent();
  const [overContact, setOverContact] = useState(false);
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
    const target = document.getElementById("contact");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setOverContact(e.isIntersecting), { rootMargin: "-20% 0px -20% 0px" });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const wa = whatsappLink(`Bonjour ${settings.siteName}, je souhaite un devis.`);
  const icon = (size: number) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={WA_ICON} />
    </svg>
  );

  return (
    <>
      {/* Mobile : barre d'actions */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink/10 bg-paper/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md transition duration-300 md:hidden ${
          overContact ? "pointer-events-none translate-y-full" : ""
        }`}
      >
        <a href={wa} target="_blank" rel="noopener" className="btn btn-primary h-12">
          {icon(18)}
          WhatsApp
        </a>
        <a href={`tel:+${contact.phoneIntl}`} className="btn h-12 border border-ink/20 text-ink">
          <Icon name="phone" size={18} />
          Appeler
        </a>
      </div>

      {/* Desktop : bouton rond */}
      <a
        href={wa}
        target="_blank"
        rel="noopener"
        aria-label="Discuter sur WhatsApp"
        className={`fixed right-6 bottom-6 z-40 hidden size-14 place-items-center bg-ink text-paper transition duration-300 hover:bg-ink-3 md:grid ${
          overContact || down ? "pointer-events-none translate-y-24 opacity-0" : ""
        }`}
      >
        {icon(24)}
      </a>
    </>
  );
}
