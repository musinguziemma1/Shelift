/**
 * Content for the engagement sections (targets, partnerships, CTA, contact,
 * footer), drawn from the SHELIFT Strategic Plan 2025–2027 and its M&E
 * framework. Nothing here is invented.
 */
import { images } from "./images";

/* ------------------------------------------------------------------ */
/* Strategic targets                                                   */
/* ------------------------------------------------------------------ */

export const targets = {
  eyebrow: "Our 2025–2027 Ambition",
  headline: "Measurable change we are working toward.",
  items: [
    {
      value: 30,
      suffix: "%",
      label: "Target increase in healthcare service utilisation",
    },
    {
      value: 40,
      suffix: "%",
      label: "Target increase in literacy & vocational program participation",
    },
    {
      value: 50,
      suffix: "%",
      label: "Target increase in income-generating activities",
    },
    {
      value: 30,
      suffix: "%",
      label: "Target increase in women's participation in leadership & advocacy",
    },
  ] as const,
  footnote:
    "Strategic targets from SHELIFT's 2025–2027 monitoring & evaluation framework. These represent the ambition of the strategic plan — not results achieved to date.",
} as const;

/* ------------------------------------------------------------------ */
/* Partnerships                                                        */
/* ------------------------------------------------------------------ */

export const partnerships = {
  eyebrow: "Partnerships",
  headline: "Transformation is stronger together.",
  lead:
    "Public–private partnerships and collaboration sit at the heart of SHELIFT's implementation strategy. We welcome alignment with organisations that share our vision for girls, women, and households in Uganda.",
  categories: [
    "Government agencies",
    "Corporate entities",
    "Non-governmental organisations",
    "Universities & research institutions",
    "Microfinance organisations",
    "Development partners",
  ] as const,
} as const;

/* ------------------------------------------------------------------ */
/* Call to action                                                      */
/* ------------------------------------------------------------------ */

export const cta = {
  image: images.cta,
  eyebrow: "Get Involved",
  headline: "Help create a future where every girl and woman can thrive.",
  text:
    "Partner with SHELIFT, support a program, or walk with us as we strengthen health, education, and livelihoods across Uganda. Your organisation, network, or expertise can be part of the transformation.",
  primaryCta: { label: "Partner With SHELIFT", href: "#contact" },
  secondaryCta: {
    label: "Get Involved",
    href: "mailto:info@sheliftuganda.org?subject=Getting%20involved%20with%20SHELIFT",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "Contact",
  headline: "Let's build this future together.",
  address: {
    line1: "Plot 12, Jinja Road",
    line2: "Nakawa Division",
    city: "Kampala, Uganda",
  },
  email: "info@sheliftuganda.org",
  phone: "+256 704 176711",
  phoneHref: "+256704176711",
  reasons: [
    "Partnership",
    "Funding & support",
    "Collaboration",
    "Media & communications",
    "Volunteering",
    "Other",
  ] as const,
} as const;

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  tagline:
    "Strengthening Health, Education, and Livelihoods for Inclusive Future Transformation.",
} as const;