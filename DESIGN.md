# Identité visuelle ADI Design

Référence unique pour le site. Les valeurs vivent dans `app/globals.css` ; ne pas en ajouter sans mettre ce fichier à jour.

## Thème

Clair. Dans le code, `paper` désigne le fond et `ink` le premier plan (texte, boutons pleins).
Les sections Méthode, Contact et pied de page sont sombres (`bg-ink-2`, texte blanc).

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `paper` | `#ffffff` | Fond principal, cartes |
| `cream` | `#faf8f5` | Sections alternées (Projets, Services, Témoignages) |
| `sand` | `#f1ece4` | Petites surfaces : carte FAQ, étiquettes |
| `stone` | `#e4ddd2` | Filets, avatars |
| `ink` | `#0e0d0c` | Texte, boutons pleins |
| `ink-2` | `#1a1816` | Sections sombres : Méthode, Contact, pied de page |
| `ink-3` | `#2a2622` | Survol des boutons pleins |
| `muted` | `#6e655c` | Texte secondaire |
| `wood` (bronze) | `#7a5c28` | Seul accent en texte sur fond clair : étoiles, chiffres, délais |
| `brass` (laiton) | `#b5914a` | Filets, puces. Jamais en texte sur fond clair |
| `gold` (or) | `#c9a96e` | Accent en texte sur fond sombre |

Règles :
- Le blanc domine. La chaleur vient des photos et de trois accents dosés, pas des fonds.
- Sur une photo, toujours un voile noir (`from-black/…`).
- Contrastes : `muted` 5,7:1 sur blanc et 4,9:1 sur `sand` ; `wood` 5,9:1 sur `cream` ; `gold` 8,7:1 sur `ink`.

## Typographie

- **Manrope** pour tout le site. Titres en 500 (`font-title`, approche -0,03 em), texte en 400.
- Sur-titres : classe `eyebrow` (12 px, 600, capitales espacées).

## Formes

- Style carré : aucun arrondi, ni sur les cartes, ni sur les photos, ni sur les boutons. Ne pas utiliser `rounded-*`.
- Boutons : rectangles, 44 px de haut minimum.
- Pas d'ombre, sauf pour un effet de superposition léger (cartes témoignages, pile avant/après).
- Les sections se séparent par le changement de fond, pas par des traits.

## Mouvement

- Un seul effet signature : le défilement horizontal des projets.
- Partout ailleurs : apparitions douces au scroll ou transitions CSS au survol / clic.
- Tout est désactivé si l'utilisateur a demandé moins d'animations.
