"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, whatsappLink } from "../../lib/data";

const PROJECT_TYPES = ["Aménagement complet", "Cuisine sur mesure", "Meuble TV / Mur décoratif", "Dressing / Placards", "Staff & plafonds", "Carrelage / Peinture", "Conception 3D"];

/** Contact sur fond noir : coordonnées à gauche, formulaire (→ WhatsApp) à droite. */
export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg = `Bonjour ADI Design 👋\n\nNom : ${d.get("name")}\nTéléphone : ${d.get("phone")}\nProjet : ${d.get("type")}\n\n${d.get("message")}`;
    window.open(whatsappLink(msg), "_blank");
    setSent(true);
  }

  const field = "w-full border-b border-white/20 bg-transparent py-4 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-glow";

  return (
    <section id="contact" className="bg-ink px-5 pt-24 pb-16 text-white sm:px-10 lg:pt-32">
      <div className="mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.3em] text-white/60 uppercase">Consultation gratuite</p>
          <h2 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            Parlons de votre projet<span className="text-red">.</span>
          </h2>
          <dl className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-[0.2em] text-white/60 uppercase">Téléphone & WhatsApp</dt>
              <dd className="mt-2 text-2xl tracking-[-0.02em]">
                <a href={`tel:+${CONTACT.phoneIntl}`} className="transition-colors hover:text-glow">
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-white/60 uppercase">Adresse</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/80">
                {CONTACT.city}
                <br />
                {CONTACT.address}
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="grid content-start gap-2 lg:pt-8">
          <div className="grid gap-x-8 sm:grid-cols-2">
            <input name="name" required placeholder="Votre nom" className={field} />
            <input name="phone" required type="tel" placeholder="Téléphone / WhatsApp" className={field} />
          </div>
          <select name="type" defaultValue={PROJECT_TYPES[0]} className={`${field} appearance-none`}>
            {PROJECT_TYPES.map((o) => (
              <option key={o} className="text-ink">
                {o}
              </option>
            ))}
          </select>
          <textarea name="message" rows={4} placeholder="Parlez-nous de votre espace…" className={field} />
          <button className="mt-8 flex items-center justify-between rounded-full bg-red py-2 pr-2 pl-7 text-sm font-semibold text-white transition-colors hover:bg-red-deep">
            Envoyer ma demande sur WhatsApp
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-red">↗</span>
          </button>
          <a
            href={`tel:+${CONTACT.phoneIntl}`}
            className="flex items-center justify-between rounded-full border border-white/25 py-2 pr-2 pl-7 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            Pas de WhatsApp ? Appelez le {CONTACT.phoneDisplay}
            <span className="grid h-11 w-11 place-items-center rounded-full border border-current">✆</span>
          </a>
          {sent ? (
            <p role="status" className="mt-3 rounded-[4px] border border-glow/30 bg-glow/10 px-4 py-3 text-sm text-white">
              Merci ! WhatsApp s’est ouvert avec votre message pré-rempli : il ne reste qu’à appuyer sur « Envoyer ». Si
              rien ne s’est ouvert, appelez-nous directement.
            </p>
          ) : (
            <p className="mt-3 text-xs text-white/60">Réponse rapide, du lundi au samedi. Consultation gratuite et sans engagement.</p>
          )}
        </form>
      </div>
    </section>
  );
}
