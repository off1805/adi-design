# Identité visuelle ADI Design

Référence unique pour le site. Les valeurs vivent dans `app/globals.css` ; ne pas en ajouter sans mettre ce fichier à jour.

## Thème

Sombre uniquement (`color-scheme: dark`). Dans le code, `paper` désigne le fond et `ink` le premier plan :
`text-ink`, `border-ink/10` ou `bg-ink/[0.07]` donnent donc du clair sur sombre.

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `ink-2` | `#080706` | Sections les plus sombres : Méthode, Contact, pied de page |
| `paper` | `#0e0d0c` | Fond principal |
| `cream` | `#151412` | Sections alternées (Projets, Services, Témoignages) |
| `sand` | `#1e1c19` | Surfaces : cartes, champs |
| `stone` | `#2c2925` | Filets, avatars |
| `ink` | `#f3efe9` | Texte, boutons pleins |
| `ink-3` | `#ffffff` | Survol des boutons pleins |
| `muted` | `#a39a8e` | Texte secondaire |
| `wood` / `gold` | `#c9a96e` | Or : accent en texte (étoiles, chiffres, délais, sur-titres sur fond profond) |
| `brass` | `#b5914a` | Laiton : filets et puces |

Règles :
- Le noir domine. La chaleur vient des photos et de l'or, dosé.
- Sur une photo, toujours un voile noir (`from-black/…`), jamais `ink` (qui est clair).
- Contrastes vérifiés sur tous les fonds : texte ≥ 14,8:1, `muted` ≥ 6,1:1, or ≥ 7,6:1, laiton ≥ 5,7:1.

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
