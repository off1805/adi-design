import { FAQS } from "../../lib/data";
import { SectionHead } from "../ui/SectionHead";

/** FAQ : même structure que l'accordéon des Services (numéro, filets). */
export function Faq() {
  return (
    <section className="px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead label="Questions fréquentes">On vous répond</SectionHead>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Une autre question ? Écrivez-nous sur WhatsApp, nous répondons rapidement.
          </p>
        </div>
        <div className="border-t border-ink/10 lg:col-span-8">
          {FAQS.map(([q, a], i) => (
            <details key={q} className="group border-b border-ink/10">
              <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6">
                <span className="w-8 shrink-0 text-lg font-light text-ink/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-lg tracking-[-0.02em] sm:text-xl">{q}</span>
                <span className="text-xl text-ink/50 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-xl pb-6 pl-[3.25rem] text-sm leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
