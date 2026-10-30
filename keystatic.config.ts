import { config, fields, singleton } from "@keystatic/core";

// Les images envoyées depuis l'admin sont enregistrées dans public/images, avec les photos existantes
const image = (label: string) =>
  fields.image({ label, directory: "public/images", publicPath: "/images/", validation: { isRequired: true } });

const text = (label: string, multiline = false) => fields.text({ label, multiline, validation: { isRequired: true } });

const json = { data: "json" } as const;

export default config({
  // En local : fichiers modifiés directement. En ligne : Keystatic Cloud (commit sur GitHub → redéploiement Vercel)
  storage: process.env.NODE_ENV === "development" ? { kind: "local" } : { kind: "cloud" },
  cloud: { project: "adi-design/adi-design" },
  ui: {
    brand: { name: "ADI Design" },
    navigation: {
      Général: ["settings", "contact"],
      Sections: ["hero", "intro", "projets", "solutions", "transformation", "accompagnement", "temoignages", "faq"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Identité & SEO",
      path: "content/settings",
      format: json,
      schema: {
        siteName: text("Nom de l'entreprise"),
        slogan: text("Slogan"),
        footerText: text("Texte de présentation (pied de page)", true),
        seoTitle: text("Titre Google"),
        seoDescription: text("Description Google", true),
      },
    }),

    contact: singleton({
      label: "Contact & réseaux",
      path: "content/contact",
      format: json,
      schema: {
        phoneDisplay: text("Téléphone (affiché)"),
        phoneIntl: fields.text({
          label: "Téléphone (format international)",
          description: "Chiffres uniquement, avec l'indicatif. Ex. : 237693894222",
          validation: { isRequired: true, pattern: { regex: /^\d{8,15}$/, message: "Chiffres uniquement" } },
        }),
        whatsappIntl: fields.text({
          label: "Numéro WhatsApp (format international)",
          description: "Chiffres uniquement, avec l'indicatif. Ex. : 237693894222",
          validation: { isRequired: true, pattern: { regex: /^\d{8,15}$/, message: "Chiffres uniquement" } },
        }),
        hours: text("Heures d'ouverture (affichées)"),
        opens: fields.text({ label: "Ouverture (HH:MM, pour Google)", defaultValue: "08:00" }),
        closes: fields.text({ label: "Fermeture (HH:MM, pour Google)", defaultValue: "18:00" }),
        address: text("Adresse / quartier"),
        city: text("Ville"),
        mapsUrl: fields.url({ label: "Lien Google Maps (optionnel)" }),
        socials: fields.array(
          fields.object({
            platform: fields.select({
              label: "Réseau",
              options: [
                { label: "Facebook", value: "Facebook" },
                { label: "Instagram", value: "Instagram" },
                { label: "TikTok", value: "TikTok" },
              ],
              defaultValue: "Facebook",
            }),
            url: fields.url({ label: "Lien", validation: { isRequired: true } }),
          }),
          { label: "Réseaux sociaux", itemLabel: (p) => p.fields.platform.value },
        ),
      },
    }),

    hero: singleton({
      label: "Hero (haut de page)",
      path: "content/hero",
      format: json,
      schema: {
        image: image("Image de fond"),
        subtitle: text("Sous-titre", true),
        primaryCta: text("Bouton principal"),
        secondaryCta: text("Bouton secondaire"),
      },
    }),

    intro: singleton({
      label: "Le cabinet & chiffres",
      path: "content/intro",
      format: json,
      schema: {
        title: text("Titre (partie foncée)", true),
        titleMuted: text("Titre (partie grisée)", true),
        cardText: text("Texte de la carte", true),
        photo: image("Photo centrale"),
        photoTitle: text("Titre sur la photo"),
        fanText: text("Texte sous les 3 photos", true),
        fanImages: fields.array(image("Photo"), { label: "3 photos en éventail", validation: { length: { min: 3, max: 3 } } }),
        stats: fields.array(
          fields.object({
            value: fields.integer({ label: "Valeur", validation: { isRequired: true } }),
            suffix: fields.text({ label: "Suffixe (+, %…)" }),
            label: text("Libellé"),
          }),
          { label: "Chiffres clés (projets livrés…)", itemLabel: (p) => `${p.fields.value.value ?? ""}${p.fields.suffix.value} ${p.fields.label.value}` },
        ),
      },
    }),

    projets: singleton({
      label: "Projets",
      path: "content/projets",
      format: json,
      schema: {
        items: fields.array(
          fields.object({
            image: image("Photo"),
            title: text("Titre"),
            place: text("Lieu"),
            tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
            text: text("Description", true),
          }),
          { label: "Projets (dans l'ordre d'affichage)", itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),

    solutions: singleton({
      label: "Solutions / services",
      path: "content/solutions",
      format: json,
      schema: {
        title: text("Titre de la section"),
        items: fields.array(
          fields.object({
            title: text("Nom du service"),
            text: text("Description", true),
            items: fields.array(fields.text({ label: "Prestation" }), { label: "Prestations", itemLabel: (p) => p.value }),
            images: fields.array(image("Photo"), { label: "Photos", validation: { length: { min: 1 } } }),
          }),
          { label: "Services", itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),

    transformation: singleton({
      label: "Avant / Après",
      path: "content/transformation",
      format: json,
      schema: {
        title: text("Titre"),
        aside: text("Texte à droite du titre", true),
        before: image("Photo AVANT"),
        after: image("Photo APRÈS"),
        caption: text("Texte sous l'image", true),
      },
    }),

    accompagnement: singleton({
      label: "Accompagnement (méthode)",
      path: "content/accompagnement",
      format: json,
      schema: {
        title: text("Titre"),
        aside: text("Texte à droite du titre", true),
        steps: fields.array(
          fields.object({ title: text("Étape"), text: text("Description", true), image: image("Photo") }),
          { label: "Étapes", itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),

    temoignages: singleton({
      label: "Témoignages",
      path: "content/temoignages",
      format: json,
      schema: {
        visible: fields.checkbox({ label: "Afficher la section", defaultValue: true }),
        title: text("Titre"),
        subtitle: text("Sous-titre", true),
        items: fields.array(
          fields.object({
            name: text("Nom du client"),
            role: fields.text({ label: "Projet / fonction (ex. : Rénovation salon, Bastos)" }),
            photo: fields.image({ label: "Photo (optionnelle, sinon initiales)", directory: "public/images", publicPath: "/images/" }),
            rating: fields.integer({ label: "Note (1 à 5)", defaultValue: 5, validation: { isRequired: true, min: 1, max: 5 } }),
            date: fields.text({ label: "Date (ex. : Mars 2026)" }),
            quote: text("Avis", true),
          }),
          { label: "Témoignages", itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    faq: singleton({
      label: "FAQ",
      path: "content/faq",
      format: json,
      schema: {
        items: fields.array(
          fields.object({ question: text("Question"), answer: text("Réponse", true) }),
          { label: "Questions", itemLabel: (p) => p.fields.question.value },
        ),
      },
    }),
  },
});
