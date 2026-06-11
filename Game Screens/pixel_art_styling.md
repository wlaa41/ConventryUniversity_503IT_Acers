# PHISH-SCAPE — Pixel-Art Game UI

A retro/arcade-styled, single-screen game interface built with Tailwind CSS (browser build), Chart.js, and Iconify. The theme is a neon "cyber-maze" arcade look used to gamify phishing awareness: the player navigates a maze while avoiding an angler fish (the "bait"/threat) and must clear a challenge to unlock a door.

## Techs 

- **Tailwind CSS v4** via the browser CDN (`@tailwindcss/browser@4`), configured inline with `@theme`.
- **Chart.js** (loaded, available for stats/score charts — not yet used in the markup).
- **Iconify** (`iconify-icon` web component, lucide icon set).
- **Google Fonts**: Inter, Poppins, Fira Code, Plus Jakarta Sans (the layout itself runs on `font-mono`).

## Design Tokens

Defined on `:root` and mapped into Tailwind via `@theme inline`. Dark, neon arcade palette with zero border-radius for a crisp pixel feel.

| Token | Value | Role |
|-------|-------|------|
| `--background` | `#020617` | App background (near-black navy) |
| `--foreground` | `#f8fafc` | Primary text |
| `--primary` | `#22d3ee` | Cyan — HUD borders, score, accents |
| `--primary-foreground` | `#020617` | Text on primary surfaces |
| `--secondary` | `#d946ef` | Magenta — threat, locks, glow FX |
| `--tertiary` | `#84cc16` | Lime — timer, secondary highlights |
| `--card` | `#0f172a` | Header/footer panels |
| `--border` / `--input` | `#1e293b` | Borders and inputs |
| `--ring` | `#22d3ee` | Focus ring |
| `--radius` | `0rem` | Sharp corners everywhere (pixel aesthetic) |

## Layout

A full-height flex column: `header` (HUD) → `main` (game area) → `footer` (control bar).

### Header — HUD
- **Left:** Score (`000450`, cyan) and Time (`02:45`, lime), each with an uppercase magenta label.
- **Center:** Title `PHISH-SCAPE` plus a 4-dot "level/progress" indicator (two filled cyan, two dimmed).
- **Right:** A "Threat Level" meter (magenta fill at ~2/3 with glow) and a `HINT [50 PTS]` button.
- Styled with a thick cyan bottom border and a hard cyan drop shadow (`shadow-[0_4px_0_0_...]`).

### Main — Game Area
- Background image (a maze) with `bg-cover bg-center`.
- A faint 40px grid overlay drawn with two linear gradients at 20% opacity.
- A 16:9 gameplay container (`aspect-video`, cyan border, soft glow) holding:
  - **Player sprite** — top-left third, `animate-bounce`, `pixelated` rendering.
  - **Angler fish (threat)** — right side, `animate-pulse`, magenta glow, with a bouncing `CLICK ME!` tag.
  - **Locked door** — bottom-center, magenta border, lock icon, "DOOR LOCKED: CHALLENGE REQUIRED".
  - **Particles** — small cyan/lime dots using `animate-ping` with a staggered delay.

### Footer — Control Bar
- **Left:** Control hints — a `MOVE` (arrow-up icon) and a `W A S D` (keyboard icon) chip.
- **Right:** An italic flavor line ("Don't let the bait catch you...") plus Settings and Pause icon buttons.
- Thick cyan top border to mirror the header.

## Notable Patterns

- **Neon glow** is achieved with arbitrary `shadow-[...]` and `drop-shadow-[...]` utilities using `rgba` of the primary/secondary colors.
- **Pixel rendering** relies on a `pixelated` class — note this isn't a Tailwind default; it needs a rule like `.pixelated { image-rendering: pixelated; }` to take effect.
- **Motion** comes entirely from Tailwind's built-in `animate-bounce`, `animate-pulse`, and `animate-ping` (decorative only; no game logic is wired up).

## Possible Next Steps

- Add the `.pixelated` CSS rule so sprites render crisply when scaled.
- Wire up interactivity (movement, click handlers on the threat, the HINT button).
- Use the already-loaded Chart.js to render a score/threat history panel.
- Externalize the sprite/background image URLs if you want offline or self-hosted assets.
