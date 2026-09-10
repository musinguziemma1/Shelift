/**
 * Content for the storytelling sections (approach, photo story, impact chain),
 * drawn from the SHELIFT Strategic Plan 2025–2027.
 */
import { images } from "./images";

/* ------------------------------------------------------------------ */
/* Approach                                                            */
/* ------------------------------------------------------------------ */

export const approach = {
  eyebrow: "Our Approach",
  headline: "Community-driven, from listen to transform.",
  lead:
    "SHELIFT's strategy is community-driven and participatory — engaging local stakeholders, partners, and beneficiaries at every stage.",
  steps: [
    {
      number: "01",
      label: "Listen",
      text: "We begin with community voices. Priorities are shaped by girls, women, households, and local stakeholders — never assumed.",
    },
    {
      number: "02",
      label: "Equip",
      text: "We strengthen knowledge, skills, and resources through health education, learning, mentorship, and tailored support.",
    },
    {
      number: "03",
      label: "Connect",
      text: "We link people to services, networks, and partners — from health facilities to financial institutions — so support outlives any single project.",
    },
    {
      number: "04",
      label: "Transform",
      text: "Together with communities, we build lasting change across health, education, livelihoods, and leadership.",
    },
  ] as const,
  values: [
    "Community-driven solutions",
    "Accountability & transparency",
    "Innovation & adaptability",
    "Collaboration & partnerships",
    "Equity & inclusion",
  ] as const,
} as const;

/* ------------------------------------------------------------------ */
/* Story gallery                                                       */
/* ------------------------------------------------------------------ */

export const gallery = {
  eyebrow: "Photo Story",
  headline: "Stories of possibility",
  lead:
    "Women and girls at the centre of their own futures — in health, learning, work, and community.",
  tiles: [
    {
      image: images.story01,
      span: "lg:col-span-7 lg:row-span-2",
      label: "Community",
      caption: "Change grows when people move together.",
    },
    {
      image: images.story02,
      span: "lg:col-span-5",
      label: "Education & Skills",
      caption: "Learning that opens new futures.",
    },
    {
      image: images.story03,
      span: "lg:col-span-5",
      label: "Livelihoods",
      caption: "Independence built through digital skill and enterprise.",
    },
    {
      image: images.story04,
      span: "lg:col-span-5 lg:row-span-2",
      label: "Collaboration",
      caption: "Women shaping decisions together.",
    },
    {
      image: images.story05,
      span: "lg:col-span-7 lg:row-span-2",
      label: "Community & Culture",
      caption: "Joy and solidarity within communities.",
    },
  ] as const,
  note:
    "Photography on this page is from Unsplash and is representative — real SHELIFT field photography will replace it via the central image configuration when available.",
} as const;

/* ------------------------------------------------------------------ */
/* Impact pathway                                                      */
/* ------------------------------------------------------------------ */

export const impactPathway = {
  eyebrow: "The Impact Chain",
  headline: "Change begins with opportunity.",
  lead:
    "SHELIFT approaches empowerment holistically. Health creates the foundation for learning; learning opens doors to income; income strengthens voice; and empowered women build resilient communities. No single challenge is treated in isolation.",
  nodes: [
    { label: "Health", text: "Care & well-being" },
    { label: "Education", text: "Learning & skills" },
    { label: "Livelihoods", text: "Dignified work & income" },
    { label: "Leadership", text: "Voice & influence" },
  ] as const,
  outcome: { label: "Resilient Communities", text: "Lasting, holistic change" },
} as const;