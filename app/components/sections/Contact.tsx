"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, whatsappLink } from "../../lib/data";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { SplitReveal } from "../ui/SplitReveal";

const PROJECT_TYPES = ["Aménagement complet", "Cuisine sur mesure", "Meuble TV / Mur décoratif", "Dressing / Placards", "Staff & plafonds", "Carrelage / Peinture", "Conception 3D"];

/** Contact sur fond sombre : coordonnées à gauche, formulaire (→ WhatsApp) à droite. */
export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Bonjour ADI Design Cameroun 👋\n\nNom : ${d.get("name")}\nTéléphone : ${d.get("phone")}\nProjet : ${d.get("type")}\n\n${d.get("message")}`;
    window.open(whatsappLink(msg), "_blank");
    setSent(true);
  }

  const field = "w-full border-b border-white/25 bg-transparent py-4 text-[15px] text-white outline-none transition placeholder:text-white/60 focus:border-white";
  const label = "text-sm text-white/65";

  return (
    <section id="contact" className="bg-ink-2 pt-20 pb-16 text-white lg:pt-28">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="flex items-center gap-3 text-sm font-medium text-white/70">
            <span className="h-px w-6 bg-wood" />
            Consultation gratuite
          </p>
          <SplitReveal className="mt-4 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] font-medium tracking-[-0.045em]">
            Parlons de votre projet<span className="text-wood">.</span>
          </SplitReveal>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
            Décrivez votre espace en quelques mots : nous revenons vers vous pour fixer une visite, sans engagement.
          </p>
          <dl className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className={label}>Téléphone & WhatsApp</dt>
              <dd className="mt-2 text-2xl tracking-[-0.02em] whitespace-nowrap">
                <a href={`tel:+${CONTACT.phoneIntl}`} className="transition-colors hover:text-white/70">
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Horaires</dt>
              <dd className="mt-2 text-[15px] text-white/85">Du lundi au samedi</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className={label}>Adresse</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-white/85">
                {CONTACT.address}
                <br />
                {CONTACT.city}, Cameroun
              </dd>
            </div>
          </dl>
        </div>

        <Reveal delay={150} className="w-full max-w-lg lg:justify-self-end">
          <form onSubmit={onSubmit} className="grid content-start gap-2">
            <div className="grid gap-x-8 sm:grid-cols-2">
              <input name="name" required placeholder="Votre nom" aria-label="Votre nom" className={field} />
              <input name="phone" required type="tel" placeholder="Téléphone / WhatsApp" aria-label="Téléphone ou WhatsApp" className={field} />
            </div>
            {/* Flèche explicite : sans elle, le menu ressemble à un champ déjà rempli */}
            <div className="relative">
              <select name="type" defaultValue={PROJECT_TYPES[0]} aria-label="Type de projet" className={`${field} cursor-pointer appearance-none pr-8`}>
                {PROJECT_TYPES.map((o) => (
                  <option key={o} className="text-ink">
                    {o}
                  </option>
                ))}
              </select>
              <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-white/70" />
            </div>
            <textarea name="message" rows={4} placeholder="Parlez-nous de votre espace…" aria-label="Votre message" className={`${field} resize-none`} />
            <button className="btn btn-light mt-8 w-full">
              Envoyer ma demande sur WhatsApp
              <Icon name="arrow-up-right" />
            </button>
            <p className="mt-4 text-center text-sm text-white/70">
              Pas de WhatsApp ?{" "}
              <a href={`tel:+${CONTACT.phoneIntl}`} className="whitespace-nowrap text-white underline underline-offset-4 transition-colors hover:text-white/70">
                Appelez le {CONTACT.phoneDisplay}
              </a>
            </p>
            {sent ? (
              <p role="status" className="mt-3 rounded-[4px] border border-white/15 bg-white/5 px-4 py-3 text-sm text-white">
                Merci ! WhatsApp s’est ouvert avec votre message pré-rempli : il ne reste qu’à appuyer sur « Envoyer ». Si
                rien ne s’est ouvert, appelez-nous directement.
              </p>
            ) : (
              <p className="mt-2 text-center text-[13px] text-white/60">Réponse rapide · Consultation gratuite et sans engagement</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
