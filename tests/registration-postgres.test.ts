import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Pool } from "pg";
import { describe, expect, it } from "vitest";

import type { RegistrationInput } from "../lib/registration/schema";
import { createPostgresRegistrationStore } from "../lib/registration/store";

const testDatabaseUrl = process.env["TEST_DATABASE_URL"]?.trim();
const describeWithPostgres = testDatabaseUrl ? describe : describe.skip;

function getTestDatabaseUrl(): string {
  if (!testDatabaseUrl) {
    throw new Error("TEST_DATABASE_URL is required for this integration test.");
  }
  return testDatabaseUrl;
}

describeWithPostgres("Postgres registration store", () => {
  it("applies the migration and enforces the normalized idempotency key", async () => {
    // Given
    const databaseUrl = getTestDatabaseUrl();
    const pool = new Pool({ connectionString: databaseUrl, max: 1 });
    const migration = await readFile(
      resolve(process.cwd(), "migrations", "001_create_registrations.sql"),
      "utf8",
    );
    await pool.query(migration);
    const testId = randomUUID();
    const parentEmail = `phase0-pg-test-${testId}@example.com`;
    const registration: RegistrationInput = {
      parentFirstName: "Postgres",
      parentLastName: "Test",
      parentEmail,
      studentFirstName: "Avery",
      instrument: "Clarinet",
      experienceLevel: "one_to_two_years",
      preferredTeacher: "maya-torres",
      consent: true,
    };
    const store = createPostgresRegistrationStore(databaseUrl);

    try {
      // When
      const created = await store.save(registration);
      const duplicate = await store.save({
        ...registration,
        parentEmail: parentEmail.toUpperCase(),
        studentFirstName: "avery",
      });

      // Then
      expect(created.kind).toBe("created");
      expect(duplicate.kind).toBe("duplicate");
      const count = await pool.query<{ readonly count: string }>(
        "SELECT count(*) FROM registrations WHERE lower(parent_email) = lower($1)",
        [parentEmail],
      );
      expect(count.rows[0]?.count).toBe("1");
    } finally {
      await pool.query(
        "DELETE FROM registrations WHERE lower(parent_email) = lower($1)",
        [parentEmail],
      );
      await pool.end();
    }
  });
});
