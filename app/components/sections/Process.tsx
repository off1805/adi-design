import Image from "next/image";
import { STEPS } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

const PROMISES = ["Écoute de vos besoins", "Conseils personnalisés", "Suivi de chantier", "Respect des délais", "Finitions de qualité"];

/** Méthode : 4 étapes numérotées, sur fond clair. */
export function Process() {
  return (
    <section className="border-t border-ink/10 px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1300px]">
        <SectionHead label="Notre méthode" aside="Un seul interlocuteur, du premier rendez-vous à la remise des clés.">
          Un accompagnement à chaque étape
        </SectionHead>

        <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-ink">
                <Image src={s.src} alt={s.t} fill className="object-cover" sizes="(min-width:1024px) 25vw, 50vw" />
              </div>
              <div className="mt-5 flex items-baseline gap-4 border-t border-ink/10 pt-4">
                <span className="text-2xl font-light text-ink/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl tracking-[-0.02em]">{s.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <ul className="mt-16 flex flex-wrap gap-2">
          {PROMISES.map((t) => (
            <li key={t} className="rounded-full border border-ink/15 px-4 py-2 text-xs text-ink/70">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
