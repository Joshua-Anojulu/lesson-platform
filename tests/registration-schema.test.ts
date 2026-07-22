import { describe, expect, it } from "vitest";

import { registrationInputSchema } from "../lib/registration/schema";

const validInput = {
  parentFirstName: "Morgan",
  parentLastName: "Lee",
  parentEmail: "morgan.lee@example.com",
  phone: "312-555-0197",
  studentFirstName: "Avery",
  instrument: "Clarinet",
  experienceLevel: "one_to_two_years",
  preferredTeacher: "maya-torres",
  notes: "Weeknights are easiest.",
  consent: true,
} as const;

describe("registrationInputSchema", () => {
  it("parses the minimized Phase 0 registration payload", () => {
    // Given
    const input = validInput;

    // When
    const result = registrationInputSchema.safeParse(input);

    // Then
    expect(result.success).toBe(true);
  });

  it("rejects a payload that attempts to include a student last name", () => {
    // Given
    const input = { ...validInput, studentLastName: "Lee" };

    // When
    const result = registrationInputSchema.safeParse(input);

    // Then
    expect(result.success).toBe(false);
  });

  it("requires parent or guardian consent", () => {
    // Given
    const input = { ...validInput, consent: false };

    // When
    const result = registrationInputSchema.safeParse(input);

    // Then
    expect(result.success).toBe(false);
  });

  it("rejects a preferred teacher outside the static roster", () => {
    // Given
    const input = { ...validInput, preferredTeacher: "forged-teacher" };

    // When
    const result = registrationInputSchema.safeParse(input);

    // Then
    expect(result.success).toBe(false);
  });

  it("normalizes whitespace-only optional fields to undefined", () => {
    // Given
    const input = {
      ...validInput,
      phone: "   ",
      preferredTeacher: "  ",
      notes: "\t",
    };

    // When
    const result = registrationInputSchema.parse(input);

    // Then
    expect(result.phone).toBeUndefined();
    expect(result.preferredTeacher).toBeUndefined();
    expect(result.notes).toBeUndefined();
  });
});
