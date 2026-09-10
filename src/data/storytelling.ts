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
      span: "col-span-2 row-span-2",
      label: "Health & Well-Being",
      caption: "Accessible, respectful care — delivered where communities live.",
    },
    {
      image: images.story02,
      span: "",
      label: "Education & Skills",
      caption: "Learning that opens new futures.",
    },
    {
      image: images.story03,
      span: "",
      label: "Livelihoods",
      caption: "Independence built through enterprise.",
    },
    {
      image: images.story04,
      span: "col-span-2 lg:col-span-1 lg:row-span-2",
      label: "Leadership",
      caption: "Voices that shape decisions.",
    },
    {
      image: images.story05,
      span: "col-span-2",
      label: "Community",
      caption: "Change grows when people move together.",
    },
  ] as const,
  note:
    "Imagery shown is representative placeholder photography — real SHELIFT field photography will replace these via the central image configuration.",
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