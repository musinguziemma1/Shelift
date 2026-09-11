/**
 * Core organisational content for the SHELIFT one-page site, drawn from the
 * SHELIFT Strategic Plan 2025–2027. Nothing here is invented.
 */
import { images } from "./images";

/* ------------------------------------------------------------------ */
/* Organization                                                        */
/* ------------------------------------------------------------------ */

export const organisation = {
  name: "SHELIFT",
  fullName:
    "Sustainable Health, Education, and Livelihood Initiative for Transformation",
  country: "Uganda",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Our Approach", href: "#approach" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Hero slider                                                         */
/* ------------------------------------------------------------------ */

export const heroCta = {
  primaryCta: { label: "Explore Our Work", href: "#about" },
  secondaryCta: { label: "Partner With Us", href: "#partner" },
} as const;

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  headline: readonly string[];
  supporting: string;
};

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "intro",
    image: images.hero,
    alt: "Three women in a Ugandan community carrying a basin together",
    eyebrow: "SHELIFT • 2025—2027",
    headline: [
      "Empowering women and girls",
      "to thrive, lead and transform",
      "their communities.",
    ],
    supporting:
      "We advance health, education, sustainable livelihoods, and gender equity so adolescent girls, women, and households can build resilient futures.",
  },
  {
    id: "health",
    image: images.hero02,
    alt: "A mother holding her baby in a healthcare setting",
    eyebrow: "Health & Well-Being",
    headline: [
      "Care that reaches women and girls",
      "where they live.",
    ],
    supporting:
      "From maternal and adolescent health to nutrition and mental well-being, we work to improve access to essential healthcare close to home.",
  },
  {
    id: "education",
    image: images.hero03,
    alt: "A woman teacher surrounded by school children",
    eyebrow: "Education & Skills",
    headline: [
      "Learning that opens doors",
      "and lasting futures.",
    ],
    supporting:
      "We expand educational opportunities, vocational training, and literacy so girls and women build skills, confidence, and employability.",
  },
  {
    id: "livelihoods",
    image: images.hero04,
    alt: "A woman smiling while working on her laptop",
    eyebrow: "Livelihoods & Entrepreneurship",
    headline: [
      "Dignified work that sustains",
      "whole households.",
    ],
    supporting:
      "Through entrepreneurship, financial literacy, and woman-led enterprise, we help build sustainable incomes that last.",
  },
  {
    id: "leadership",
    image: images.hero05,
    alt: "A confident professional woman in an orange blazer",
    eyebrow: "Rights, Leadership & Gender Equity",
    headline: [
      "Stronger voices for",
      "fairer communities.",
    ],
    supporting:
      "We advocate for women's rights, strengthen leadership roles, and champion community-driven solutions for gender equity.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Purpose strip                                                       */
/* ------------------------------------------------------------------ */

export const purposeItems = [
  {
    number: "01",
    label: "Health",
    text: "Better access to essential healthcare and well-being.",
  },
  {
    number: "02",
    label: "Education",
    text: "Skills, literacy, mentorship, and learning opportunities.",
  },
  {
    number: "03",
    label: "Livelihoods",
    text: "Entrepreneurship, financial literacy, and sustainable income.",
  },
  {
    number: "04",
    label: "Leadership",
    text: "Women's rights, leadership, advocacy, and gender equity.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  image: images.about,
  eyebrow: "Who We Are",
  headline: "Creating pathways for women, girls, and households to thrive.",
  paragraphs: [
    "SHELIFT was established to address the barriers that hold adolescent girls, women, and households back in Uganda — barriers that begin with restricted access to healthcare, education, and economic opportunity.",
    "Our work is inspired by the lived experiences and vision of our founder, Dorah Nakagga, and shaped by the communities we serve. Everything we do is grounded in what girls, women, and their households tell us they need to thrive.",
  ],
  storyLink: { label: "Our Story", href: "#vision" },
} as const;

/* ------------------------------------------------------------------ */
/* Vision & Mission                                                    */
/* ------------------------------------------------------------------ */

export const visionMission = {
  vision:
    "A world where adolescent girls, women, and their households thrive through equitable access to health, education, and sustainable livelihoods, leading to empowered and resilient communities.",
  mission:
    "To empower adolescent girls, women, and households by providing holistic health services, quality education, and economic opportunities that foster sustainable development, social inclusion, and gender equality.",
} as const;