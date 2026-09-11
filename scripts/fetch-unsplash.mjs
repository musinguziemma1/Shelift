/**
 * Downloads real Unsplash photography for every image slot on the SHELIFT
 * site and renders site-optimized JPEGs with sharp.
 *
 * Photo selection is aligned with SHELIFT's themes (women & girls, community,
 * health, education, livelihoods, leadership). Each photo is served from
 * Unsplash's public CDN under the free Unsplash License. Attribution is
 * recorded in /images-credits.md.
 *
 * These are representative placeholders — replace them with official SHELIFT
 * field photography at any time by dropping files into public/images/.
 *
 * Slots flagged `keepLocal: true` belong to the SHELIFT team (hand-provided
 * files in public/images) and are NEVER overwritten by this script.
 *
 * Usage: npm run fetch:photos
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");
mkdirSync(outDir, { recursive: true });

/* ------------------------------------------------------------------ */
/* Slot → Unsplash photo mapping                                       */
/*                                                                     */
/* host: "images" (images.unsplash.com/photo-…) or "plus"              */
/* (plus.unsplash.com/premium_photo-…). Getty/contributor photos live  */
/* on the plus host and 404 on images.unsplash.com.                    */
/* ------------------------------------------------------------------ */

const slots = [
  {
    file: "hero.jpg",
    w: 1920,
    h: 1280,
    id: "photo-1553775927-a071d5a6a39a",
    note: "Three women carrying a basin while walking, Uganda. Photographer: Ninno JackJr.",
  },
  {
    file: "hero-02.jpg",
    w: 1920,
    h: 1280,
    id: "photo-1677682693111-c7c6a60c362a",
    note: "A woman holding her baby in a healthcare setting — maternal health.",
  },
  {
    file: "hero-03.jpg",
    w: 1920,
    h: 1280,
    id: "photo-1632215861513-130b66fe97f4",
    note: "A woman teacher standing with a group of children. Photographer: Emmanuel Ikwuegbu.",
  },
  {
    file: "hero-04.jpeg",
    keepLocal: true,
    note: "Hand-provided by the SHELIFT team (livelihoods hero slide) — never auto-fetched.",
  },
  {
    file: "hero-05.jpeg",
    w: 1920,
    h: 1280,
    id: "photo-1563132337-f159f484226c",
    note: "A confident professional woman in an orange blazer. Photographer: Etty Fidele.",
  },
  {
    file: "about.jpg",
    w: 1200,
    h: 1500,
    id: "photo-1524600569259-cc92f4b8c495",
    note: "A woman in a blue-and-yellow floral dress beside a tree.",
  },
  {
    file: "founder.jpg",
    keepLocal: true,
    note: "Hand-provided by the SHELIFT team (founder portrait) — never auto-fetched.",
  },
  {
    file: "board-01.jpg",
    keepLocal: true,
    note: "Hand-provided by the SHELIFT team (board portrait) — never auto-fetched.",
  },
  {
    file: "board-02.jpg",
    keepLocal: true,
    note: "Hand-provided by the SHELIFT team (board portrait) — never auto-fetched.",
  },
  {
    file: "board-03.jpg",
    keepLocal: true,
    note: "Hand-provided by the SHELIFT team (board portrait) — never auto-fetched.",
  },
  {
    file: "health.jpg",
    w: 1200,
    h: 1500,
    id: "photo-1678695972687-033fa0bdbac9",
    note: "A woman clinician in a white coat with a stethoscope.",
  },
  {
    file: "education.jpg",
    w: 1200,
    h: 1500,
    id: "photo-1617057119499-aea7d3eaef02",
    note: "A school child in a green-and-white uniform. Photographer: Abubakar Balogun.",
  },
  {
    file: "livelihoods.jpg",
    w: 1200,
    h: 1500,
    id: "photo-1655720357872-ce227e4164ba",
    note: "A group learning together with a laptop. Photographer: Iwaria Inc.",
  },
  {
    file: "leadership.jpg",
    w: 1200,
    h: 1500,
    id: "photo-1573167627769-e201a7ddf409",
    note: "Women in conversation at a conference table — leadership and advocacy.",
  },
  {
    file: "story-01.jpg",
    w: 1600,
    h: 1000,
    id: "photo-1515658323406-25d61c141a6e",
    note: "A community gathering on open ground. Photographer: Ian Macharia.",
  },
  {
    file: "story-02.jpg",
    w: 1600,
    h: 1000,
    id: "photo-1695131494999-7961f82afda1",
    note: "A smiling child among a group of school children. Photographer: Michael Ali.",
  },
  {
    file: "story-03.jpg",
    w: 1600,
    h: 1000,
    id: "photo-1739300293504-234817eead52",
    note: "A woman standing in front of a laptop — digital enterprise.",
  },
  {
    file: "story-04.jpg",
    w: 1600,
    h: 1000,
    id: "photo-1573165706511-3ffde6ef1fe3",
    note: "Three women seated around a wooden table — collaboration.",
  },
  {
    file: "story-05.jpeg",
    keepLocal: true,
    note: "Hand-provided by the SHELIFT team (photo story plate) — never auto-fetched.",
  },
  {
    file: "cta.jpg",
    w: 1920,
    h: 1280,
    id: "photo-1537706388178-55c10865b82e",
    note: "People dancing on brown soil, Uganda. Photographer: Roman Derrick Okello.",
  },
  {
    file: "og-image.jpg",
    w: 1200,
    h: 630,
    id: "photo-1553775927-a071d5a6a39a",
    note: "Three women carrying a basin while walking, Uganda. Photographer: Ninno JackJr.",
  },
];

const CDN = (slot) => {
  const base =
    slot.host === "plus"
      ? `https://plus.unsplash.com/${slot.id}`
      : `https://images.unsplash.com/${slot.id}`;
  const w = Math.max(slot.w, 1600);
  return `${base}?q=80&w=${w}&fm=jpg&fit=max&auto=format`;
};

let ok = 0;
let failed = 0;

for (const slot of slots) {
  if (slot.keepLocal) {
    console.log(`keep-local ${slot.file} (hand-provided — skipped)`);
    continue;
  }
  try {
    const res = await fetch(CDN(slot), {
      headers: { "Accept": "image/jpeg" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());

    await sharp(buf)
      .resize(slot.w, slot.h, { fit: "cover", position: slot.position ?? sharp.strategy.attention })
      .jpeg({ quality: 76, mozjpeg: true, progressive: true })
      .toFile(join(outDir, slot.file));

    ok++;
    console.log(`ok ${slot.file} (${slot.w}x${slot.h})`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${slot.file}: ${err.message}`);
  }
}

const summary = `Fetched ${ok}/${slots.length} images${failed ? ` (${failed} failed)` : ""}.`;
console.log(summary);
writeFileSync(join(root, "fetch-photos-status.txt"), `${summary} ${new Date().toISOString()}`);