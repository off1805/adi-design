import type { Entry } from "@keystatic/core/reader";
import type keystaticConfig from "../../keystatic.config";
import accompagnement from "../../content/accompagnement.json";
import contact from "../../content/contact.json";
import faq from "../../content/faq.json";
import hero from "../../content/hero.json";
import intro from "../../content/intro.json";
import projets from "../../content/projets.json";
import settings from "../../content/settings.json";
import solutions from "../../content/solutions.json";
import temoignages from "../../content/temoignages.json";
import transformation from "../../content/transformation.json";

type S = (typeof keystaticConfig)["singletons"];

/**
 * Tout le contenu éditable depuis /keystatic (fichiers content/*.json).
 * Importés comme modules : rechargés à chaud en local, figés au build en ligne.
 * Chaque modification via Keystatic Cloud crée un commit, Vercel redéploie et le site est régénéré.
 */
const content = {
  settings: settings as Entry<S["settings"]>,
  contact: contact as Entry<S["contact"]>,
  hero: hero as Entry<S["hero"]>,
  intro: intro as Entry<S["intro"]>,
  projets: projets as Entry<S["projets"]>,
  solutions: solutions as Entry<S["solutions"]>,
  transformation: transformation as Entry<S["transformation"]>,
  accompagnement: accompagnement as Entry<S["accompagnement"]>,
  temoignages: temoignages as Entry<S["temoignages"]>,
  faq: faq as Entry<S["faq"]>,
  year: new Date().getFullYear(),
};

export type SiteContent = typeof content;

export function getContent(): SiteContent {
  return content;
}
