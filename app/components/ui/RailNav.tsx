import { Icon } from "./Icon";

const btn =
  "grid size-11 place-items-center bg-ink/[0.07] text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-ink/[0.07] disabled:hover:text-ink";

/** Flèches d'un rail horizontal (masquées sur mobile, où l'on fait glisser au doigt). */
export function RailNav({ active, last, goTo, label }: { active: number; last: number; goTo: (i: number) => void; label: string }) {
  return (
    <div className="flex shrink-0 items-center max-md:hidden">
      <div className="flex gap-2">
        <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={`${label} précédent`} className={btn}>
          <Icon name="arrow-left" />
        </button>
        <button onClick={() => goTo(active + 1)} disabled={active === last} aria-label={`${label} suivant`} className={btn}>
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}
