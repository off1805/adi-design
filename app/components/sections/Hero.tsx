"use client";

import Image from "next/image";
import { useContent, useWhatsapp } from "../../lib/ContentProvider";

export function Hero() {
  const { hero, settings } = useContent();
  const whatsappLink = useWhatsapp();
  // Apparition en cascade : chaque bloc monte en fondu, légèrement après le précédent
  const rise = (delay: number) => ({ animationDelay: `${delay}ms` });

  return (
    <section id="top">
      <div className="hero-frame relative h-svh min-h-[560px] overflow-hidden">
        <div className="absolute inset-0 motion-safe:animate-[settle_2.4s_cubic-bezier(.2,.7,.2,1)_both]">
          <Image src={hero.image} alt={`Intérieur réalisé par ${settings.siteName}`} fill priority className="object-cover" sizes="100vw" />
        </div>
        {/* Voile sombre : garantit le contraste du texte blanc sur la photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.45),transparent_65%)]" />

        <div className="hero-content absolute inset-0 grid place-items-center px-4 text-center text-white">
          <div>
            {hero.eyebrow && <p className="eyebrow mb-6 text-white/85 motion-safe:animate-[rise_1s_ease-out_both]" style={rise(100)}>{hero.eyebrow}</p>}
            <h1 style={rise(200)} className="motion-safe:animate-[rise_1.1s_ease-out_both] font-title text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] tracking-[-0.02em]">{settings.siteName}</h1>
            <p style={rise(450)} className="motion-safe:animate-[rise_1s_ease-out_both] mx-auto mt-8 max-w-xl sm:mt-10 text-base leading-relaxed text-white/85 sm:text-lg">{hero.subtitle}</p>
            <div style={rise(600)} className="motion-safe:animate-[rise_1s_ease-out_both] mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={whatsappLink(`Bonjour ${settings.siteName}, je souhaite un devis.`)} target="_blank" rel="noopener" className="btn btn-light">
                {hero.primaryCta}
              </a>
              <a href="#projets" className="btn btn-outline-light backdrop-blur-sm">
                {hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
