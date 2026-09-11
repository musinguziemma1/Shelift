/**
 * Downloads real Unsplash photography for every image slot on the SHELIFT
 * site and renders site-optimized JPEGs with sharp.
 *
 * Photo selection is aligned with SHELIFT's themes (women & girls, community,
 * health, education, livelihoods, leadership). Each photo is served from
 * Unsplash's public CDN (images.unsplash.com) under the free Unsplash
 * License. Attribution is recorded in /images-credits.md.
 *
 * These are representative placeholders — replace them with official SHELIFT
 * field photography at any time by dropping files into public/images/.
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
    file: "hero-04.jpg",
    w: 1920,
    h: 1280,
    id: "photo-1573495612522-d994e72e5f56",
    note: "A woman smiling while working on her laptop — women and digital skills.",
  },
  {
    file: "hero-05.jpg",
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
    w: 1200,
    h: 1500,
    position: "centre",
    id: "photo-1573497019940-1c28c88b4f3e",
    note: "A confident Black businesswoman in professional attire, centred portrait — representative founder image.",
  },
  {
    file: "board-01.jpg",
    w: 800,
    h: 800,
    position: "centre",
    id: "photo-1560250097-0b93528c311a",
    note: "A professional Black man in a suit, centred portrait — representative board image.",
  },
  {
    file: "board-02.jpg",
    w: 800,
    h: 800,
    position: "centre",
    id: "photo-1519085360753-af0119f7cbe7",
    note: "A smiling Black businessman in a suit — representative board image.",
  },
  {
    file: "board-03.jpg",
    w: 800,
    h: 800,
    position: "centre",
    id: "photo-1573496359142-b8d87734a5a2",
    note: "A professional Black businesswoman with arms crossed — representative board image.",
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
    file: "story-05.jpg",
    w: 1600,
    h: 1000,
    id: "photo-1770240090780-a80f44963545",
    note: "Two smiling women embracing, draped in colourful cloth.",
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

const CDN = (id, w) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&fm=jpg&fit=max&auto=format`;

let ok = 0;
let failed = 0;

for (const slot of slots) {
  try {
    const res = await fetch(CDN(slot.id, Math.max(slot.w, 1600)), {
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