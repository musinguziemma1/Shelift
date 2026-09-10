/**
 * The four strategic areas, aligned with SHELIFT's strategic objectives and
 * implementation strategy (Strategic Plan 2025–2027).
 */
import { images } from "./images";

export type StrategicArea = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  focus: readonly string[];
  image: string;
};

export const strategicAreas: readonly StrategicArea[] = [
  {
    id: "health",
    number: "01",
    title: "Health & Well-Being",
    short: "Essential, respectful healthcare that reaches women and girls where they live.",
    description:
      "We improve access to essential healthcare services — from maternal and adolescent health to nutrition and mental well-being — with community outreach and health education at the centre.",
    focus: [
      "Maternal health",
      "Adolescent health",
      "Sexual & reproductive health",
      "Nutrition",
      "Mental well-being",
      "Community health outreach",
      "Health education",
    ],
    image: images.health,
  },
  {
    id: "education",
    number: "02",
    title: "Education & Skills",
    short: "Second chances to learn, earn, and grow.",
    description:
      "We expand educational opportunities, vocational training, and literacy programs, pairing learning with mentorship so girls and women build skills, confidence, and employability.",
    focus: [
      "Education access",
      "Vocational training",
      "Literacy",
      "Digital skills",
      "Mentorship",
      "Scholarships",
      "Employability",
    ],
    image: images.education,
  },
  {
    id: "livelihoods",
    number: "03",
    title: "Livelihoods & Entrepreneurship",
    short: "Sustainable incomes that strengthen households.",
    description:
      "We promote entrepreneurship, financial literacy, and access to sustainable income-generating activities — helping women-led enterprises grow and creating dignified economic futures.",
    focus: [
      "Entrepreneurship",
      "Financial literacy",
      "Business development",
      "Access to capital",
      "Women-led enterprises",
      "Digital financial inclusion",
      "Sustainable income generation",
    ],
    image: images.livelihoods,
  },
  {
    id: "leadership",
    number: "04",
    title: "Rights, Leadership & Gender Equity",
    short: "Stronger voices, fairer futures.",
    description:
      "We advocate for women's rights and strengthen leadership roles through community engagement, advocacy, and gender-responsive approaches to policy and practice.",
    focus: [
      "Women's rights",
      "Leadership development",
      "Advocacy",
      "GBV response",
      "Community engagement",
      "Policy influence",
      "Gender equity",
    ],
    image: images.leadership,
  },
] as const;