/**
 * Central image configuration.
 *
 * Real organisational photography can be dropped into `public/images/` and the
 * site will pick it up automatically — this map is the single source of truth
 * for every image used on the page. Keys must not be hardcoded anywhere else.
 *
 * Recommended dimensions (W×H):
 *  - hero / cta:      1920 × 1280
 *  - about:           1200 × 1500
 *  - strategic areas: 1200 × 1500
 *  - story gallery:   1500 × 1000 (cropped responsively)
 *  - og-image:        1200 × 630
 */
export const images = {
  hero: "/images/hero.jpg",
  hero02: "/images/hero-02.jpg",
  hero03: "/images/hero-03.jpg",
  hero04: "/images/hero-04.jpg",
  hero05: "/images/hero-05.jpg",
  about: "/images/about.jpg",
  health: "/images/health.jpg",
  education: "/images/education.jpg",
  livelihoods: "/images/livelihoods.jpg",
  leadership: "/images/leadership.jpg",
  founder: "/images/founder.jpg",
  story01: "/images/story-01.jpg",
  story02: "/images/story-02.jpg",
  story03: "/images/story-03.jpg",
  story04: "/images/story-04.jpg",
  story05: "/images/story-05.jpg",
  cta: "/images/cta.jpg",
  og: "/images/og-image.jpg",
} as const;

export type ImageKey = keyof typeof images;