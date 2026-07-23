import type { VideoSource } from "@/lib/video";

export const nonAffiliationDisclaimer =
  "This is a director's personal recommendation list. It is not a school or district program or endorsement.";

export type TeacherVideo = VideoSource & {
  readonly title: string;
  readonly summary: string;
  readonly duration: string;
};

export type Teacher = {
  readonly slug: string;
  readonly name: string;
  readonly initials: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly position: string;
  };
  readonly instruments: readonly string[];
  readonly shortBio: string;
  readonly bio: readonly string[];
  readonly rate: string;
  readonly rateNote: string;
  readonly selfReportedAffiliation: string;
  readonly videos: readonly TeacherVideo[];
};

export const teachers = [
  {
    slug: "maya-torres",
    name: "Maya Torres",
    initials: "MT",
    image: {
      src: "/images/clarinet-keys-hands.webp",
      alt: "Hands pressing the silver keys of a clarinet",
      position: "70% center",
    },
    instruments: ["Clarinet", "Saxophone"],
    shortBio:
      "Warm, structured coaching for developing woodwind players who want a clearer sound and a more confident practice routine.",
    bio: [
      "Maya teaches middle and high school woodwind students with an emphasis on tone, breathing, and practice habits that fit a busy week.",
      "Her lessons pair careful fundamentals with the music students are already preparing, so each session feels useful right away.",
    ],
    rate: "$58 per 45 minutes",
    rateNote: "Monthly scheduling arranged directly with the teacher.",
    selfReportedAffiliation:
      "Maya reports working with students from several north-area band programs.",
    videos: [
      {
        host: "youtube",
        id: "M7lc1UVf-VE",
        title: "Sample hosted teaching clip",
        summary:
          "A temporary media entry showing the Phase 0 privacy-first playback behavior.",
        duration: "Sample",
      },
    ],
  },
  {
    slug: "caleb-okafor",
    name: "Caleb Okafor",
    initials: "CO",
    image: {
      src: "/images/trumpet-valves-hands.webp",
      alt: "A hand pressing trumpet valves in natural window light",
      position: "72% center",
    },
    instruments: ["Trumpet", "French horn"],
    shortBio:
      "Brass lessons built around healthy air, reliable range, and the small wins that keep young players motivated.",
    bio: [
      "Caleb helps brass students build efficient fundamentals without turning lessons into a checklist. Each session connects technique to a musical goal.",
      "He is especially comfortable supporting students preparing for honor-band auditions, chair tests, and a first solo performance.",
    ],
    rate: "$62 per 45 minutes",
    rateNote: "Instrument-specific materials discussed before the first lesson.",
    selfReportedAffiliation:
      "Caleb reports coaching students who participate in local concert and marching programs.",
    videos: [
      {
        host: "vimeo",
        id: "76979871",
        title: "Sample hosted studio clip",
        summary:
          "A temporary media entry showing the Vimeo do-not-track playback path.",
        duration: "Sample",
      },
    ],
  },
  {
    slug: "nadine-brooks",
    name: "Nadine Brooks",
    initials: "NB",
    image: {
      src: "/images/cello-bow-strings.webp",
      alt: "A bow meeting cello strings during a lesson",
      position: "48% center",
    },
    instruments: ["Cello", "Double bass"],
    shortBio:
      "Patient string instruction that turns posture, bow control, and ensemble music into a steady path forward.",
    bio: [
      "Nadine works with advancing beginners and ensemble players who want their technique to feel more natural and their practice time to feel more focused.",
      "She uses duets, short listening prompts, and practical weekly goals to keep fundamentals connected to real music-making.",
    ],
    rate: "$65 per 45 minutes",
    rateNote: "Limited instrument-rental guidance is available on request.",
    selfReportedAffiliation:
      "Nadine reports teaching students from community orchestra and school orchestra programs.",
    videos: [
      {
        host: "youtube",
        id: "ysz5S6PUM-U",
        title: "Sample hosted lesson clip",
        summary:
          "A temporary media entry showing the click-to-load YouTube path.",
        duration: "Sample",
      },
    ],
  },
] as const satisfies readonly Teacher[];

export function getTeacher(slug: string): Teacher | undefined {
  return teachers.find((teacher) => teacher.slug === slug);
}
