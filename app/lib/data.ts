export const img = (name: string) => `/images/${name}.jpg`;

export const CONTACT = {
  phoneDisplay: "6 93 89 42 22",
  phoneIntl: "237693894222",
  city: "Yaoundé",
  address: "Mvog Bi",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${CONTACT.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/share/19zHQNsDmQ/" },
  { label: "Instagram", href: "https://www.instagram.com/adidesigncameroun" },
  { label: "TikTok", href: "https://www.tiktok.com/@adi.design.camero" },
] as const;

export const NAV = [
  { label: "Accueil", href: "#top" },
  { label: "Cabinet", href: "#studio" },
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const FEATURED = [
  { src: img("salon-tv-marbre"), title: "Salon Marbre & Lumière", place: "Yaoundé", tags: ["Mur TV", "Staff LED", "Niches bois"], text: "Un mur TV en marbre encadré de niches rétroéclairées et d’un plafond staff lumineux." },
  { src: img("cuisine-ilot"), title: "Cuisine Îlot Noyer", place: "Yaoundé", tags: ["Cuisine", "Sur mesure", "Éclairage"], text: "Laque blanche, noyer et plan noir : une cuisine ouverte pensée autour d’un îlot convivial." },
  { src: img("dressing-verre"), title: "Dressing Vitré", place: "Yaoundé", tags: ["Dressing", "Verre fumé", "LED"], text: "Portes vitrées cadre noir, éclairage intégré et rangements pensés au centimètre près." },
  { src: img("plafond-led"), title: "Plafond Lumineux", place: "Yaoundé", tags: ["Staff", "LED", "Plafond"], text: "Un plafond staff à plusieurs niveaux, souligné de rubans LED pour une lumière douce et indirecte." },
  { src: img("meuble-tv-cheminee"), title: "Meuble TV Cheminée", place: "Yaoundé", tags: ["Meuble TV", "Marbre", "Niches"], text: "Panneau marbre, cheminée électrique et colonnes lumineuses : le séjour devient une pièce signature." },
  { src: img("hero-chambre"), title: "Séjour Contemporain", place: "Yaoundé", tags: ["Lambris", "Marbre", "Décoration"], text: "Lambris noyer, marbre veiné et mobilier doux pour un séjour chaleureux et lumineux." },
];

export const SERVICES = [
  {
    title: "Conception 3D",
    text: "Plans et rendus réalistes de votre futur intérieur, validés avec vous avant le premier coup de marteau.",
    items: ["Relevé et plans d’aménagement", "Rendus 3D photoréalistes", "Choix des matériaux et couleurs", "Ajustements jusqu’à validation"],
    images: [img("rendu-3d-salon"), img("conception-3d"), img("rendu-3d-cave"), img("salon-tv-livraison")],
  },
  {
    title: "Aménagement complet",
    text: "Du gros œuvre à la décoration finale, nous coordonnons tous les corps de métier avec un seul interlocuteur.",
    items: ["Coordination de chantier", "Salons, chambres et cuisines", "Éclairage et décoration", "Livraison clé en main"],
    images: [img("salon-tv-marbre"), img("chambre-lambris"), img("cuisine-ilot"), img("meuble-tv-cheminee")],
  },
  {
    title: "Staff & plafonds",
    text: "Plafonds suspendus, corniches et moulures, avec éclairage LED intégré pour une lumière douce et indirecte.",
    items: ["Faux plafonds à niveaux", "Corniches et moulures", "Rubans et spots LED", "Plafonds décoratifs"],
    images: [img("plafond-led"), img("plafond-staff"), img("plafond-chantier"), img("chambre-plafond-ciel")],
  },
  {
    title: "Mobilier sur mesure",
    text: "Cuisines, dressings, placards et meubles TV dessinés et fabriqués pour s’adapter parfaitement à votre espace.",
    items: ["Cuisines équipées", "Dressings et placards", "Meubles TV et niches", "Bureaux et rangements"],
    images: [img("dressing-verre"), img("cuisine-blanche"), img("dressing-led"), img("meuble-tv-blanc")],
  },
  {
    title: "Carrelage",
    text: "Sols et murs résistants et esthétiques, posés au millimètre, du grès cérame au marbre.",
    items: ["Pose de sols", "Revêtements muraux", "Crédences et salles de bain", "Finitions et joints"],
    images: [img("mur-apres"), img("cuisine-angle"), img("cuisine-lineaire"), img("mur-marbre-led")],
  },
  {
    title: "Crépissage & peinture",
    text: "Des murs parfaitement préparés et des teintes choisies avec vous pour sublimer chaque pièce.",
    items: ["Crépissage et enduits", "Peinture intérieure", "Effets décoratifs", "Lambris et habillages muraux"],
    images: [img("mur-tv-pose"), img("lambris-pose"), img("mur-avant"), img("chambre-bleue")],
  },
];

export const STEPS = [
  { t: "Écoute", d: "Visite et consultation gratuites : votre espace, vos goûts, votre budget.", src: img("chantier-laser") },
  { t: "Conception 3D", d: "Vous voyez le résultat final avant le début des travaux.", src: img("rendu-3d-salon") },
  { t: "Réalisation", d: "Staff, carrelage, menuiserie, LED — avec suivi de chantier.", src: img("equipe-pose") },
  { t: "Livraison", d: "Finitions contrôlées, délais respectés.", src: img("salon-tv-livraison") },
];

// ⚠️ Témoignages d'exemple — à remplacer par de vrais avis clients avant la mise en ligne.
export const TESTIMONIALS = [
  { q: "Le rendu 3D était fidèle au résultat final. Notre salon est devenu un vrai lieu de réception.", a: "Client — Salon" },
  { q: "Équipe ponctuelle et soigneuse. La cuisine est exactement ce qu’on voulait, budget tenu.", a: "Cliente — Cuisine" },
  { q: "Le plafond LED et le dressing ont transformé notre chambre. Du savoir-faire dans le détail.", a: "Client — Chambre" },
];

export const FAQS = [
  ["La consultation est-elle gratuite ?", "Oui. Nous nous déplaçons, écoutons votre besoin et vous conseillons sans engagement."],
  ["Puis-je voir le résultat avant les travaux ?", "Chaque projet commence par une conception 3D que vous validez avant toute intervention."],
  ["Intervenez-vous sur un chantier brut ?", "Oui, après le gros œuvre : crépissage, staff, carrelage, peinture jusqu’à l’aménagement complet."],
  ["Quels sont les délais ?", "Un planning précis vous est remis avec le devis, et nous le respectons."],
];
