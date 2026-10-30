"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { useContent } from "../../lib/ContentProvider";
import { NAV } from "../../lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { siteName } = useContent().settings;

  // Se cache quand on descend (plus de place pour les photos), revient dès qu'on remonte
  useGSAP(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return; // sur mobile l'en-tête (et « Devis ») reste toujours visible
    const hide = gsap.to(ref.current, { yPercent: -130, duration: 0.4, ease: "power2.out", paused: true });
    ScrollTrigger.create({
      start: "top -400",
      onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
      onLeaveBack: () => hide.reverse(),
    });
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.75);
      const current = [...NAV].reverse().find(({ href }) => {
        const el = document.querySelector(href);
        return el && el.getBoundingClientRect().top < 240;
      });
      if (current) setActive(current.href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !scrolled; // texte clair sur le hero
  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`mx-auto flex max-w-[1300px] items-center justify-between px-5 py-3 transition-all duration-500 sm:px-8 ${
          scrolled ? "bg-paper/85 shadow-[0_10px_30px_-15px_rgba(0,0,0,.2)] backdrop-blur-xl" : "py-5"
        }`}
      >
        <a href="#top" aria-label={`${siteName}, accueil`} className={`flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase ${light ? "text-white" : "text-ink"}`}>
          {/* Logo monochrome : blanc sur le hero, noir une fois la barre sur fond clair */}
          <Image src="/images/logo.png" alt="" width={1076} height={820} priority className={`h-auto w-11 brightness-0 transition ${light ? "invert" : ""}`} />
          <span className="hidden whitespace-nowrap sm:inline">{siteName}</span>
        </a>

        <nav className="hidden items-center gap-1 p-1 lg:flex">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`px-4 py-1.5 text-[13px] transition ${
                active === href
                  ? light
                    ? "bg-white text-black"
                    : "bg-ink text-paper"
                  : light
                    ? "text-white/80 hover:text-white"
                    : "text-ink/60 hover:text-ink"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={`btn btn-sm ${light ? "btn-light" : "btn-primary"}`}
          >
            Devis gratuit
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className={`grid h-10 w-10 place-items-center lg:hidden ${light ? "bg-white text-black" : "bg-ink text-paper"}`}
          >
            <span className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition ${open ? "top-1 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      <div className={`mx-auto mt-2 max-w-[1300px] overflow-hidden bg-paper transition-all duration-500 lg:hidden ${open ? "max-h-96" : "max-h-0"}`}>
        <ul className="p-5 text-lg font-medium tracking-[-0.02em]">
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block py-2">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
