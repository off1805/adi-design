"use client";

import { useState, type FormEvent } from "react";
import { useContent, useWhatsapp } from "../../lib/ContentProvider";
import { Icon } from "../ui/Icon";
import { SectionHead } from "../ui/SectionHead";

/**
 * Contact, piloté par WhatsApp : action principale à gauche (bouton + coordonnées),
 * formulaire court à droite (3 champs) qui ouvre WhatsApp avec le message prérempli.
 */
export function Contact() {
  const { contact, settings, solutions } = useContent();
  const whatsappLink = useWhatsapp();
  const [sent, setSent] = useState(false);
  const types = [...solutions.items.map((s) => s.title), "Autre projet"];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Bonjour ${settings.siteName},\n\nJe m'appelle ${d.get("name")} et je souhaite un devis pour : ${d.get("type")}.\nMon numéro WhatsApp : ${d.get("phone")}`;
    window.open(whatsappLink(msg), "_blank");
    setSent(true);
  }

  const field =
    "w-full border border-white/15 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/50 focus:border-white/60";

  return (
    <section id="contact" className="section-y bg-ink-2 text-white">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead dark label="Consultation gratuite">
            Parlons de votre projet
          </SectionHead>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">Le plus simple : écrivez-nous sur WhatsApp. Nous répondons rapidement.</p>

          <a href={whatsappLink(`Bonjour ${settings.siteName}, je souhaite un devis.`)} target="_blank" rel="noopener" className="btn btn-light mt-8">
            Discuter sur WhatsApp
            <Icon name="arrow-up-right" />
          </a>

          <dl className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-[15px] sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-white/55">Téléphone</dt>
              <dd className="mt-2">
                <a href={`tel:+${contact.phoneIntl}`} className="whitespace-nowrap transition-colors hover:text-white/70">
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-white/55">Horaires</dt>
              <dd className="mt-2 text-white/85">{contact.hours}</dd>
            </div>
            <div>
              <dt className="eyebrow text-white/55">Adresse</dt>
              <dd className="mt-2 text-white/85">
                {contact.mapsUrl ? (
                  <a href={contact.mapsUrl} target="_blank" rel="noopener" className="underline underline-offset-4 transition-colors hover:text-white/70">
                    {contact.address}, {contact.city}
                  </a>
                ) : (
                  `${contact.address}, ${contact.city}`
                )}
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="grid content-start gap-3 bg-white/[0.04] p-6 sm:p-8">
          <p className="font-title text-xl">Recevoir mon devis</p>
          <p className="mb-3 text-sm text-white/60">Trois informations, et WhatsApp s’ouvre avec votre message prêt à envoyer.</p>
          <input name="name" required autoComplete="name" placeholder="Votre nom" aria-label="Votre nom" className={field} />
          <input name="phone" required type="tel" autoComplete="tel" placeholder="Votre numéro WhatsApp" aria-label="Votre numéro WhatsApp" className={field} />
          <div className="relative">
            <select name="type" defaultValue={types[0]} aria-label="Type de projet" className={`${field} cursor-pointer appearance-none pr-10`}>
              {types.map((t) => (
                <option key={t} className="text-ink">
                  {t}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white/60" />
          </div>
          <button className="btn btn-light mt-3 w-full">
            Envoyer sur WhatsApp
            <Icon name="arrow-up-right" />
          </button>
          <p role="status" className="min-h-5 text-center text-[13px] text-white/60">
            {sent ? "WhatsApp s’est ouvert : il ne reste qu’à appuyer sur « Envoyer »." : "Gratuit et sans engagement."}
          </p>
        </form>
      </div>
    </section>
  );
}
