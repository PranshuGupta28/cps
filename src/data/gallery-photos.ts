export type GalleryCategory =
  | "Campus & Facilities"
  | "Student Activities"
  | "Cultural & Annual Functions"
  | "School Events"
  | "Achievements & Recognition";

export type GalleryPhoto = {
  src: string;
  category: GalleryCategory;
  title: string;
  alt: string;
};

// Keep captions descriptive and generic until the school confirms exact event names/dates.
// The first six photos are selected for the homepage preview.
export const cpsGalleryPhotos: readonly GalleryPhoto[] = [
  {
    src: "/images/gallery/school-assembly-aerial.webp",
    category: "School Events",
    title: "School Gathering",
    alt: "Students gathered together in the school campus",
  },
  {
    src: "/images/gallery/campus-classroom.webp",
    category: "Campus & Facilities",
    title: "Classroom",
    alt: "Classroom at Central Public Senior Secondary School",
  },
  {
    src: "/images/gallery/computer-lab.webp",
    category: "Campus & Facilities",
    title: "Computer Laboratory",
    alt: "Computer laboratory at the school",
  },
  {
    src: "/images/gallery/cultural-performance-1.webp",
    category: "Cultural & Annual Functions",
    title: "Cultural Performance",
    alt: "Students performing on stage during a cultural programme",
  },
  {
    src: "/images/gallery/student-achievement-ceremony.webp",
    category: "Achievements & Recognition",
    title: "Student Recognition",
    alt: "Students being recognized during a school ceremony",
  },
  {
    src: "/images/gallery/student-artwork.webp",
    category: "Student Activities",
    title: "Student Artwork",
    alt: "Creative artwork made by students",
  },
  {
    src: "/images/gallery/student-learning-activity.webp",
    category: "Student Activities",
    title: "Learning Activity",
    alt: "Students taking part in a school learning activity",
  },
  {
    src: "/images/gallery/school-activity-room.webp",
    category: "Campus & Facilities",
    title: "Activity Room",
    alt: "Activity and display room at the school",
  },
  {
    src: "/images/gallery/student-support-activity.webp",
    category: "Student Activities",
    title: "Student Activity",
    alt: "Students participating in a school activity",
  },
  {
    src: "/images/gallery/school-awareness-session.webp",
    category: "School Events",
    title: "School Session",
    alt: "Students attending an awareness session at school",
  },
  {
    src: "/images/gallery/stage-celebration.webp",
    category: "Cultural & Annual Functions",
    title: "Stage Celebration",
    alt: "Students taking part in a stage celebration",
  },
  {
    src: "/images/gallery/school-flag-formation.webp",
    category: "School Events",
    title: "School Formation",
    alt: "Students forming a flag-themed display at school",
  },
  {
    src: "/images/gallery/school-celebration-guests.webp",
    category: "Cultural & Annual Functions",
    title: "School Celebration",
    alt: "School community and guests at a celebration",
  },
  {
    src: "/images/gallery/cultural-performance-2.webp",
    category: "Cultural & Annual Functions",
    title: "Cultural Programme",
    alt: "Students presenting a cultural performance",
  },
  {
    src: "/images/gallery/traditional-dance-performance.webp",
    category: "Cultural & Annual Functions",
    title: "Traditional Dance",
    alt: "Students performing a traditional dance on stage",
  },
  {
    src: "/images/gallery/themed-cultural-performance.webp",
    category: "Cultural & Annual Functions",
    title: "Themed Performance",
    alt: "Students presenting a themed cultural performance",
  },
  {
    src: "/images/gallery/creative-student-activities.webp",
    category: "Student Activities",
    title: "Creative Activities",
    alt: "Students engaged in creative activities",
  },
  {
    src: "/images/gallery/school-community-outreach.webp",
    category: "School Events",
    title: "Community Activity",
    alt: "School community participating in an outdoor activity",
  },
  {
    src: "/images/gallery/school-community-celebration.webp",
    category: "Achievements & Recognition",
    title: "Community Celebration",
    alt: "Members of the school community at a celebration",
  },
  {
    src: "/images/gallery/recognition-ceremony.webp",
    category: "Achievements & Recognition",
    title: "Recognition Ceremony",
    alt: "Recognition ceremony at the school",
  },
  {
    src: "/images/gallery/student-stage-performance.webp",
    category: "Cultural & Annual Functions",
    title: "Stage Performance",
    alt: "Students performing on stage",
  },
  {
    src: "/images/gallery/hands-on-learning.webp",
    category: "Student Activities",
    title: "Hands-on Learning",
    alt: "Students participating in a hands-on learning activity",
  },
  {
    src: "/images/gallery/school-event-highlights.webp",
    category: "School Events",
    title: "School Event Highlights",
    alt: "Highlights from school activities and events",
  },
  {
    src: "/images/gallery/student-group-photo.webp",
    category: "Achievements & Recognition",
    title: "School Community",
    alt: "Students and staff together at a school event",
  },
];
