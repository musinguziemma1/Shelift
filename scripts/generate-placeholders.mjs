/**
 * Generates premium design-led placeholder imagery for every image slot on
 * the SHELIFT site, rendered as optimized progressive JPEGs via sharp.
 *
 * The art uses the brand palette (deep forest, terracotta, sand, muted gold)
 * rather than flat stock placeholders, so the site previews with intent.
 * Drop real field photography into `public/images/` under the same filenames
 * to replace them — nothing else changes.
 *
 * Usage: npm run generate:placeholders
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");
mkdirSync(outDir, { recursive: true });

/* ------------------------------------------------------------------ */
/* SVG art composition                                                 */
/* ------------------------------------------------------------------ */

/** Sunrise "hills" arcs rising from the bottom edge. */
const horizonArcs = (w, h, color, baseOpacity) => {
  const arcs = [];
  for (let i = 0; i < 5; i++) {
    const span = (w / 7) * (i + 1.6);
    const cx = w * 0.5;
    arcs.push(
      `<path d="M ${cx - span} ${h} A ${span} ${span * 0.55} 0 0 1 ${cx + span} ${h}"` +
        ` fill="none" stroke="${color}" stroke-width="${3 + i * 1.6}"` +
        ` stroke-opacity="${Math.max(baseOpacity - i * 0.07, 0.03)}" />`,
    );
  }
  return arcs.join("");
};

/** Scattered dot field — quiet, organic detail. */
const dotField = (w, h, color, opacity, count) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const fx = seed - Math.floor(seed);
    const x = w * (0.15 + fx * 0.7);
    const y = h * (0.6 + (seed * 31.7 - Math.floor(seed * 31.7)) * 0.35);
    const r = 2 + ((seed * 7.13) % 5);
    dots.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"` +
        ` fill="${color}" fill-opacity="${(opacity * (0.5 + fx * 0.5)).toFixed(2)}" />`,
    );
  }
  return dots.join("");
};

/** Concentric offset rings — a compass / sunburst motif. */
const sunburst = (w, h, cx, cy, color, opacity) => {
  const rings = [];
  for (let i = 1; i <= 4; i++) {
    rings.push(
      `<circle cx="${cx}" cy="${cy}" r="${i * 42}" fill="none" stroke="${color}"` +
        ` stroke-opacity="${(opacity - i * 0.05).toFixed(2)}" stroke-width="2.5" />`,
    );
  }
  return rings.join("");
};

function buildSvg(p) {
  const { w, h, from, mid, to, accent, ax, ay, accentOpacity = 0.55, motif } = p;

  let decorative = "";
  if (motif === "arcs") decorative = horizonArcs(w, h, "#e0c183", 0.28);
  else if (motif === "dots") decorative = dotField(w, h, "#e0c183", 0.3, 26);
  else if (motif === "sunburst") decorative = sunburst(w, h, w * 0.78, h * 0.3, "#e0c183", 0.3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="0.55" stop-color="${mid}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${ax}" cy="${ay}" r="0.75">
      <stop offset="0" stop-color="${accent}" stop-opacity="${accentOpacity}"/>
      <stop offset="0.4" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="warm" cx="0.25" cy="0.85" r="0.9">
      <stop offset="0" stop-color="#f6e2d8" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#f6e2d8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#warm)"/>
  <g>${decorative}</g>
</svg>`;
}
/* ------------------------------------------------------------------ */
/* Image specs                                                         */
/* ------------------------------------------------------------------ */

const specs = [
  // Main hero — dawn over the horizon, warm gold rising
  { file: "hero.jpg", w: 1920, h: 1280, from: "#0b1a12", mid: "#233f30", to: "#2e543e", accent: "#b98a33", ax: "58%", ay: "38%", accentOpacity: 0.5, motif: "arcs" },
  // Hero slider 02 — Health, calm greens with terracotta warmth
  { file: "hero-02.jpg", w: 1920, h: 1280, from: "#0b1a12", mid: "#2e543e", to: "#39684c", accent: "#d48057", ax: "35%", ay: "60%", accentOpacity: 0.5, motif: "dots" },
  // Hero slider 03 — Education, bright sand meeting gold
  { file: "hero-03.jpg", w: 1920, h: 1280, from: "#12291e", mid: "#2e543e", to: "#4c8260", accent: "#cfaa5f", ax: "72%", ay: "28%", accentOpacity: 0.5, motif: "sunburst" },
  // Hero slider 04 — Livelihoods, warm terracotta depth
  { file: "hero-04.jpg", w: 1920, h: 1280, from: "#5f2c1d", mid: "#8b3d22", to: "#a84c28", accent: "#e0c183", ax: "45%", ay: "70%", accentOpacity: 0.5, motif: "arcs" },
  // Hero slider 05 — Leadership, deep forest with a gold horizon
  { file: "hero-05.jpg", w: 1920, h: 1280, from: "#0b1a12", mid: "#233f30", to: "#12291e", accent: "#e0c183", ax: "60%", ay: "25%", accentOpacity: 0.55, motif: "sunburst" },
  // About — soft sand meeting clay warmth
  { file: "about.jpg", w: 1200, h: 1500, from: "#eadfc7", mid: "#dcc9a2", to: "#c05f35", accent: "#8b3d22", ax: "70%", ay: "22%", accentOpacity: 0.4, motif: "sunburst" },
  // Health — calm greens with terracotta warmth
  { file: "health.jpg", w: 1200, h: 1500, from: "#12291e", mid: "#39684c", to: "#4c8260", accent: "#d48057", ax: "30%", ay: "60%", accentOpacity: 0.5, motif: "dots" },
  // Education — bright sand with gold
  { file: "education.jpg", w: 1200, h: 1500, from: "#dcc9a2", mid: "#cfaa5f", to: "#9a6f26", accent: "#12291e", ax: "65%", ay: "30%", accentOpacity: 0.45, motif: "sunburst" },
  // Livelihoods — warm terracotta depth
  { file: "livelihoods.jpg", w: 1200, h: 1500, from: "#8b3d22", mid: "#a84c28", to: "#c05f35", accent: "#e0c183", ax: "35%", ay: "70%", accentOpacity: 0.5, motif: "arcs" },
  // Leadership — deep forest with a gold horizon
  { file: "leadership.jpg", w: 1200, h: 1500, from: "#0b1a12", mid: "#233f30", to: "#12291e", accent: "#e0c183", ax: "70%", ay: "25%", accentOpacity: 0.55, motif: "sunburst" },
  // Founder portrait — warm editorial tones
  { file: "founder.jpg", w: 1200, h: 1500, from: "#733420", mid: "#a84c28", to: "#c05f35", accent: "#e0c183", ax: "30%", ay: "55%", accentOpacity: 0.5, motif: "sunburst" },
  // Story gallery
  { file: "story-01.jpg", w: 1500, h: 1000, from: "#2e543e", mid: "#39684c", to: "#4c8260", accent: "#d48057", ax: "25%", ay: "65%", accentOpacity: 0.45, motif: "dots" },
  { file: "story-02.jpg", w: 1500, h: 1000, from: "#dcc9a2", mid: "#eadfc7", to: "#caac78", accent: "#b98a33", ax: "70%", ay: "25%", accentOpacity: 0.5, motif: "sunburst" },
  { file: "story-03.jpg", w: 1500, h: 1000, from: "#a84c28", mid: "#c05f35", to: "#d48057", accent: "#e0c183", ax: "70%", ay: "35%", accentOpacity: 0.5, motif: "dots" },
  { file: "story-04.jpg", w: 1500, h: 1000, from: "#12291e", mid: "#233f30", to: "#2e543e", accent: "#e0c183", ax: "60%", ay: "30%", accentOpacity: 0.5, motif: "arcs" },
  { file: "story-05.jpg", w: 1500, h: 1000, from: "#5f2c1d", mid: "#733420", to: "#8b3d22", accent: "#e0c183", ax: "30%", ay: "70%", accentOpacity: 0.5, motif: "arcs" },
  // CTA — deep forest, warm gold glow
  { file: "cta.jpg", w: 1920, h: 1280, from: "#0b1a12", mid: "#233f30", to: "#12291e", accent: "#b98a33", ax: "50%", ay: "30%", accentOpacity: 0.5, motif: "arcs" },
  // Open Graph share image
  { file: "og-image.jpg", w: 1200, h: 630, from: "#12291e", mid: "#2e543e", to: "#39684c", accent: "#e0c183", ax: "20%", ay: "50%", accentOpacity: 0.5, motif: "arcs" },
];

/* ------------------------------------------------------------------ */
/* Render                                                              */
/* ------------------------------------------------------------------ */

for (const spec of specs) {
  const svg = Buffer.from(buildSvg(spec));
  await sharp(svg)
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(join(outDir, spec.file));
  console.log(`✓ ${spec.file} (${spec.w}×${spec.h})`);
}

console.log("Placeholder images generated in public/images/");