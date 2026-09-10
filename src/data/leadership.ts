/**
 * Leadership & governance content.
 *
 * The founder, Dorah Nagawa, is named in the SHELIFT Strategic Plan brief.
 * Board member names/portfolios are NOT specified in any available source of
 * truth, so the three board slots are deliberately honest placeholders —
 * replace the name, role, and short fields with the real details from the
 * Strategic Plan 2025–2027 before launch.
 */
import { images } from "./images";

export const leadership = {
  eyebrow: "Leadership & Governance",
  headline: "Rooted in community, led with purpose.",
  lead: "SHELIFT is shaped by a founder whose vision grew from lived experience, and guided by a board committed to accountability, transparency, and the communities we serve.",
  founder: {
    name: "Dorah Nagawa",
    role: "Founder",
    title: "Founder, SHELIFT",
    image: images.founder,
    paragraphs: [
      "SHELIFT was inspired by the lived experiences and vision of our founder, Dorah Nagawa — built on real understanding of the barriers adolescent girls, women, and households face in accessing healthcare, education, and economic opportunity in Uganda.",
      "Her leadership keeps communities at the centre of our work, ensuring every program is shaped by the people it is designed to serve.",
    ],
    pull: "Community voices at the heart of every decision.",
  },
  boardHeading: "Governing Board",
  boardSubheading: "Accountability & transparency",
  board: [
    {
      id: "board-01",
      name: "Board Member",
      role: "Governing Board",
      short: "Name and biography to be completed from the Strategic Plan 2025–2027.",
    },
    {
      id: "board-02",
      name: "Board Member",
      role: "Governing Board",
      short: "Name and biography to be completed from the Strategic Plan 2025–2027.",
    },
    {
      id: "board-03",
      name: "Board Member",
      role: "Governing Board",
      short: "Name and biography to be completed from the Strategic Plan 2025–2027.",
    },
  ] as const,
  boardNote:
    "Board member names, portfolios, and biographies will be completed from the Strategic Plan 2025–2027 before launch.",
} as const;