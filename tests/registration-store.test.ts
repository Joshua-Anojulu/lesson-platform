import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import type { RegistrationInput } from "../lib/registration/schema";
import { createLocalRegistrationStore } from "../lib/registration/store";

const temporaryDirectories: string[] = [];

const registration: RegistrationInput = {
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
};

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("local registration store", () => {
  it("appends one private JSON line for a new registration", async () => {
    // Given
    const directory = await mkdtemp(join(tmpdir(), "lesson-platform-store-"));
    temporaryDirectories.push(directory);
    const filePath = join(directory, "registrations.jsonl");
    const store = createLocalRegistrationStore(filePath);

    // When
    const result = await store.save(registration);

    // Then
    expect(result.kind).toBe("created");
    const lines = (await readFile(filePath, "utf8")).trim().split("\n");
    expect(lines).toHaveLength(1);
  });

  it("normalizes identity text while including instrument in the idempotency key", async () => {
    // Given
    const directory = await mkdtemp(join(tmpdir(), "lesson-platform-store-"));
    temporaryDirectories.push(directory);
    const filePath = join(directory, "registrations.jsonl");
    const store = createLocalRegistrationStore(filePath);
    await store.save(registration);

    // When
    const result = await store.save({
      ...registration,
      parentEmail: "MORGAN.LEE@EXAMPLE.COM",
      studentFirstName: "avery",
    });

    // Then
    expect(result.kind).toBe("duplicate");
    const lines = (await readFile(filePath, "utf8")).trim().split("\n");
    expect(lines).toHaveLength(1);
  });

  it("creates a separate record when the instrument changes", async () => {
    // Given
    const directory = await mkdtemp(join(tmpdir(), "lesson-platform-store-"));
    temporaryDirectories.push(directory);
    const filePath = join(directory, "registrations.jsonl");
    const store = createLocalRegistrationStore(filePath);
    await store.save(registration);

    // When
    const result = await store.save({ ...registration, instrument: "Saxophone" });

    // Then
    expect(result.kind).toBe("created");
    const lines = (await readFile(filePath, "utf8")).trim().split("\n");
    expect(lines).toHaveLength(2);
  });
});
