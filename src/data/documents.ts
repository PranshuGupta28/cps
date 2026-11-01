/**
 * Manifest of official documents hosted in /public/documents.
 * Re-hosted with clean names from the old site's mandatory disclosure.
 * Add new entries here after dropping files into public/documents/.
 */

export type DocCategory =
  | "affiliation"
  | "safety"
  | "fees"
  | "academic"
  | "committees"
  | "results"
  | "staff";

export interface SchoolDocument {
  id: string;
  title: { en: string; hi: string };
  file: string | null; // path under /documents — null = pending upload
  category: DocCategory;
  updatedOn: string; // ISO date
  size?: string;
  /** Show a "needs update" badge in listings (document is outdated). */
  outdated?: boolean;
}

export const documents: SchoolDocument[] = [
  {
    id: "affiliation-letter",
    title: {
      en: "Affiliation / upgradation letter and recent extension",
      hi: "संबद्धता / उन्नयन पत्र और नवीनतम विस्तार",
    },
    file: "affiliation-letter.pdf",
    category: "affiliation",
    updatedOn: "2026-04-01",
    size: "1.1 MB",
  },
  {
    id: "society-registration",
    title: {
      en: "Society / trust registration certificate",
      hi: "सोसाइटी / ट्रस्ट पंजीकरण प्रमाणपत्र",
    },
    file: "society-registration.pdf",
    category: "affiliation",
    updatedOn: "2026-04-01",
    size: "1.1 MB",
  },
  {
    id: "noc",
    title: {
      en: "No Objection Certificate (NOC) — State Govt.",
      hi: "अनापत्ति प्रमाणपत्र (NOC) — राज्य सरकार",
    },
    file: "noc-cbse.pdf",
    category: "affiliation",
    updatedOn: "2026-04-01",
    size: "237 KB",
  },
  {
    id: "rte-recognition",
    title: {
      en: "Recognition certificate under RTE Act 2009",
      hi: "RTE अधिनियम 2009 के अंतर्गत मान्यता प्रमाणपत्र",
    },
    file: "rte-recognition.pdf",
    category: "affiliation",
    updatedOn: "2026-04-01",
    size: "898 KB",
  },
  {
    id: "building-safety",
    title: {
      en: "Building safety certificate (National Building Code)",
      hi: "भवन सुरक्षा प्रमाणपत्र (राष्ट्रीय भवन संहिता)",
    },
    file: "building-safety.pdf",
    category: "safety",
    updatedOn: "2025-01-01",
    size: "710 KB",
  },
  {
    id: "fire-safety",
    title: {
      en: "Fire safety certificate",
      hi: "अग्नि सुरक्षा प्रमाणपत्र",
    },
    file: "fire-safety.pdf",
    category: "safety",
    updatedOn: "2025-01-01",
    size: "396 KB",
  },
  {
    id: "self-certification",
    title: {
      en: "Self certification for affiliation / upgradation",
      hi: "संबद्धता / उन्नयन हेतु स्व-प्रमाणन",
    },
    file: "deo-self-certification.pdf",
    category: "affiliation",
    updatedOn: "2026-04-01",
    size: "986 KB",
  },
  {
    id: "water-sanitation",
    title: {
      en: "Water, health and sanitation certificates",
      hi: "जल, स्वास्थ्य और स्वच्छता प्रमाणपत्र",
    },
    file: "water-health-sanitation.pdf",
    category: "safety",
    updatedOn: "2025-01-01",
    size: "292 KB",
  },
  {
    id: "fee-structure",
    title: {
      en: "Fee structure — session 2025–26",
      hi: "फीस संरचना — सत्र 2025–26",
    },
    file: "fee-structure-2025-26.pdf",
    category: "fees",
    updatedOn: "2025-04-01",
    size: "324 KB",
  },
  {
    id: "annual-calendar",
    title: {
      en: "Annual academic calendar — 2025–26",
      hi: "वार्षिक शैक्षणिक कैलेंडर — 2025–26",
    },
    file: "annual-calendar-2025-26.pdf",
    category: "academic",
    updatedOn: "2025-04-01",
    size: "941 KB",
  },
  {
    id: "smc-list",
    title: {
      en: "School Management Committee (SMC) list",
      hi: "विद्यालय प्रबंधन समिति (SMC) सूची",
    },
    file: "smc-list.pdf",
    category: "committees",
    updatedOn: "2025-04-01",
    size: "655 KB",
  },
  {
    id: "pta-list",
    title: {
      en: "Parents Teachers Association (PTA) members list",
      hi: "अभिभावक शिक्षक संघ (PTA) सदस्य सूची",
    },
    file: "pta-list.pdf",
    category: "committees",
    updatedOn: "2025-04-01",
    size: "394 KB",
  },
  {
    id: "board-results",
    title: {
      en: "Board examination results — last 3 years",
      hi: "बोर्ड परीक्षा परिणाम — पिछले 3 वर्ष",
    },
    file: "board-results-last-3-years.pdf",
    category: "results",
    updatedOn: "2026-04-01",
    size: "296 KB",
  },
  {
    id: "teachers-list",
    title: {
      en: "Teachers' list",
      hi: "शिक्षकों की सूची",
    },
    file: "teachers-list.xlsx",
    category: "staff",
    updatedOn: "2025-05-05",
    size: "12 KB",
  },
  // TO CONFIRM: the book list was part of the disclosure set but no file was
  // found on the old site. Upload book-list.pdf to public/documents and set
  // `file` to publish it.
  {
    id: "book-list",
    title: { en: "Book list", hi: "पुस्तक सूची" },
    file: null,
    category: "academic",
    updatedOn: "2025-04-01",
  },
];

export function getDocument(id: string): SchoolDocument | undefined {
  return documents.find((d) => d.id === id);
}
