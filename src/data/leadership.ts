/**
 * Leadership & governance content.
 *
 * The founder, Dorah Nakagga, is named in the SHELIFT Strategic Plan brief.
 * Board member names/portfolios are NOT specified in any available source of
 * truth, so the three board slots use role-based focus titles with short
 * duty descriptions as honest placeholders — replace the name, role, and
 * short fields with the real details from the Strategic Plan 2025–2027
 * before launch. Portraits are representative Unsplash placeholders, not
 * the real people.
 */
import { images } from "./images";

export const leadership = {
  eyebrow: "Leadership & Governance",
  headline: "Rooted in community, led with purpose.",
  lead: "SHELIFT is shaped by a founder whose vision grew from lived experience, and guided by a board committed to accountability, transparency, and the communities we serve.",
  founder: {
    name: "Dorah Nakagga",
    role: "Founder",
    title: "Founder and Director of SHELIFT",
    image: images.founder,
    paragraphs: [
      "SHELIFT was inspired by the lived experiences and vision of our founder, Dorah Nakagga — built on real understanding of the barriers adolescent girls, women, and households face in accessing healthcare, education, and economic opportunity in Uganda.",
      "Her leadership keeps communities at the centre of our work, ensuring every program is shaped by the people it is designed to serve.",
    ],
    pull: "Community voices at the heart of every decision.",
  },
  boardHeading: "Governing Board",
  boardSubheading: "Accountability & transparency",
  board: [
    {
      id: "board-01",
      name: "Sendaula Emmanuel",
      role: "Governance & Strategy",
      image: images.board01,
      short:
        "Guides organisational strategy, policy, and compliance — keeping SHELIFT accountable to its mission and the communities it serves.",
    },
    {
      id: "board-02",
      name: "Musinguzi Emmanuel",
      role: "Programmes Officer",
      image: images.board02,
      short:
        "Brings community voice into programme design and safeguarding, so health, education, and livelihoods work reaches those most in need.",
    },
    {
      id: "board-03",
      name: "Kembabazi Constance",
      role: "Finance & Accountability",
      image: images.board03,
      short:
        "Oversees budgets, financial controls, and transparent reporting so every programme delivers real value for money.",
    },
  ] as const,
  boardNote:
    "We aim to build an environment for growth and learning, where board members can contribute their expertise to help SHELIFT achieve its mission. The board is committed to transparency, accountability, and continuous improvement in all aspects of governance.",
} as const;