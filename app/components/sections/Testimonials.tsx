import { TESTIMONIALS } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

/** Témoignages sur fond noir, colonnes séparées par des filets. */
export function Testimonials() {
  return (
    <section className="bg-ink px-5 py-24 text-white sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1300px]">
        <SectionHead dark label="Témoignages">
          Ils nous ont confié leur intérieur
        </SectionHead>
        <div className="mt-14 grid border-t border-white/10 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.a} className={`py-8 md:px-8 md:py-10 ${i ? "border-t border-white/10 md:border-t-0 md:border-l" : "md:pl-0"}`}>
              <p className="text-sm text-red" aria-label="5 étoiles">★★★★★</p>
              <blockquote className="mt-5 text-lg leading-relaxed text-white/85">“{t.q}”</blockquote>
              <figcaption className="mt-8 text-xs tracking-[0.2em] text-white/60 uppercase">{t.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
