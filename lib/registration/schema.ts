import { z } from "zod";

import { teachers } from "@/content/teachers";

export const experienceLevels = [
  { value: "brand_new", label: "Brand new" },
  { value: "under_one_year", label: "Less than one year" },
  { value: "one_to_two_years", label: "One to two years" },
  { value: "three_plus_years", label: "Three or more years" },
] as const;

export const instrumentOptions = [
  "Flute",
  "Clarinet",
  "Saxophone",
  "Trumpet",
  "French horn",
  "Trombone",
  "Euphonium",
  "Tuba",
  "Percussion",
  "Violin",
  "Viola",
  "Cello",
  "Double bass",
] as const;

const optionalPhoneSchema = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim().length === 0
      ? undefined
      : value,
  z
    .string()
    .trim()
    .min(7, "Enter a complete phone number.")
    .max(30, "Phone number is too long.")
    .optional(),
);

const optionalTextSchema = (maximum: number) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim().length === 0
        ? undefined
        : value,
    z.string().trim().max(maximum, "This response is too long.").optional(),
  );

const teacherSlugs: ReadonlySet<string> = new Set(
  teachers.map((teacher) => teacher.slug),
);
const optionalTeacherSchema = optionalTextSchema(120).refine(
  (value) => value === undefined || teacherSlugs.has(value),
  "Choose a listed teacher or no preference.",
);

const parentEmailSchema = z.preprocess(
  (value) =>
    typeof value === "string" ? value.trim().toLowerCase() : value,
  z.email({ error: "Enter a valid email address." }).max(254),
);

export const registrationInputSchema = z.strictObject({
    parentFirstName: z.string().trim().min(1, "Enter your first name.").max(80),
    parentLastName: z.string().trim().min(1, "Enter your last name.").max(80),
    parentEmail: parentEmailSchema,
    phone: optionalPhoneSchema,
    studentFirstName: z
      .string()
      .trim()
      .min(1, "Enter the student's first name.")
      .max(80),
    instrument: z.enum(instrumentOptions, {
      error: "Choose an instrument.",
    }),
    experienceLevel: z.enum(
      experienceLevels.map((level) => level.value),
      { error: "Choose an experience level." },
    ),
    preferredTeacher: optionalTeacherSchema,
    notes: optionalTextSchema(1_000),
    consent: z.literal(true, {
      error: "Confirm that you are the student's parent or guardian.",
    }),
  });

export type RegistrationInput = z.infer<typeof registrationInputSchema>;

export type RegistrationField = keyof RegistrationInput;

export type RegistrationFieldErrors = {
  readonly [Field in RegistrationField]?: readonly string[] | undefined;
};
