/**
 * Single source of truth for school facts.
 * Every value marked `TO CONFIRM` must be verified with the school before
 * launch. Fields that are `null` are hidden from the site entirely — the
 * page code never renders an unconfirmed claim.
 */

export const school = {
  name: "Central Public Sr. Sec. School",
  nameShort: "CPS, Chakghat",
  nameHi: "सेंट्रल पब्लिक सीनियर सेकंडरी स्कूल, चकघाट",

  motto: {
    en: "Lead me from darkness to light",
    // Sanskrit equivalent commonly used for this motto — TO CONFIRM with school
    hi: "तमसो मा ज्योतिर्गमय",
  },

  vision: {
    en: "To be an institution built on tradition and groom global leaders with character.",
    hi: "परंपरा पर आधारित एक ऐसा संस्थान बनना जो चरित्रवान वैश्विक नेता तैयार करे।",
  },
  mission: {
    en: "To provide a liberal and diverse environment for students that nurtures creativity and helps them realize their full potential.",
    hi: "विद्यार्थियों को एक उदार और विविधता से भरा वातावरण देना जो रचनात्मकता को पोषित करे और उन्हें अपनी पूरी क्षमता पहचानने में मदद करे।",
  },

  director: {
    // TO CONFIRM: spelling — the brief said "Prasant Pathak", disclosure-era
    // material suggests "Prashant Pathak". Also confirm exact title.
    name: "Mr. Prashant Pathak",
    nameHi: "श्री प्रशांत पाठक",
    title: { en: "Director", hi: "निदेशक" },
    photo: "/images/director.jpg", // TO CONFIRM: portrait needed
    message: {
      en: "A message from the Director will be published here soon. Please check back shortly.",
      hi: "निदेशक का संदेश शीघ्र ही यहाँ प्रकाशित किया जाएगा।",
    }, // TO CONFIRM: replace with the Director's real message
  },

  principal: {
    name: "Mrs. Anamika Pathak",
    nameHi: "श्रीमती अनामिका पाठक",
    qualification: "M.Sc., D.El.Ed., B.Ed.",
    title: { en: "Principal", hi: "प्राचार्या" },
    photo: null as string | null,
    message: {
      en: "A message from the Principal will be published here soon. Please check back shortly.",
      hi: "प्राचार्या का संदेश शीघ्र ही यहाँ प्रकाशित किया जाएगा।",
    }, // TO CONFIRM: replace with the Principal's real message
  },

  address: {
    line1: "Ward No. 7, Nagar Parishad, Chakghat",
    line2: "Teonthar, Distt. Rewa (M.P.) — 486226",
    pin: "486226",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Chakghat,+Teonthar,+Rewa,+Madhya+Pradesh+486226",
    mapEmbed:
      "https://www.google.com/maps?q=Chakghat,+Rewa,+Madhya+Pradesh+486226&output=embed",
  },

  phones: [
    { label: "Office", display: "07661-283428", tel: "+917661283428" },
    { label: "Mobile", display: "+91-94253 57853", tel: "+919425357853" },
    { label: "Mobile", display: "+91-99933 94839", tel: "+919993394839" },
  ],

  // TO CONFIRM: site footer uses cpseducationgroup@gmail.com while the
  // mandatory disclosure uses cpseducationgroups@gmail.com — one canonical
  // address must be chosen by the school.
  email: "cpseducationgroup@gmail.com",

  // TO CONFIRM: official WhatsApp number. When null, the floating WhatsApp
  // button and WhatsApp CTAs are hidden automatically.
  whatsapp: null as string | null,

  affiliationNo: "1030883",
  schoolCode: "50848",

  // TO CONFIRM: Instagram bio says "Affiliated to C.B.S.E. New Delhi" while
  // the old About page described CBSE affiliation as a future plan. Until the
  // school confirms, no board name is displayed anywhere on the site.
  boardName: null as string | null,

  social: {
    instagram: "https://www.instagram.com/cpsschoolchakghat",
    facebook: "https://www.facebook.com/profile.php?id=61563772234272",
    youtube:
      "https://www.youtube.com/watch?v=NFk0okdo1OE", // infrastructure inspection video
  },

  staff: {
    total: 55,
    pgt: 11,
    tgt: 15,
    prt: 15,
    ntt: 9,
    other: 4,
    teacherSectionRatio: "1:1.5",
    specialEducator: { name: "Mr. Pushpraj Singh", qualification: "M.A., B.Ed." },
    counsellor: {
      name: "Mr. S.K. Gupta",
      qualification: "M.A. (Psychology), B.Ed.",
    },
  },

  infrastructure: {
    campusAreaSqm: 7081.9987,
    classrooms: { count: 34, eachSqm: 46.45 },
    labs: { count: 6, eachSqm: 74 }, // includes computer lab
    internet: true,
    girlsToilets: 21,
    boysToilets: 21,
  },

  results: {
    class10: [
      { year: 2022, registered: 34, passed: 34 },
      { year: 2023, registered: 48, passed: 47 },
      { year: 2024, registered: 45, passed: 45 },
    ],
    class12: [
      { year: 2022, registered: 16, passed: 16 },
      { year: 2023, registered: 25, passed: 18 },
      { year: 2024, registered: 17, passed: 16 },
    ],
  },

  // ---------- TO CONFIRM: not displayed until filled ----------
  officeHours: null as string | null,
  payFeeUrl: null as string | null,
  parentLoginUrl: null as string | null,
  establishedYear: null as number | null, // old footer hinted 2017 — confirm
  classesOffered: null as string | null, // e.g. "Nursery – Class XII"
  mediumOfInstruction: null as string | null,
  seniorSecondaryStreams: null as string[] | null,
  admissionOpenYear: "2025–26", // seen on Instagram registration drive
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cpschakghat.com";
