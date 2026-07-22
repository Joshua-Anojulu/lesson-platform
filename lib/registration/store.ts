import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { Pool } from "pg";
import { z } from "zod";

import { registrationInputSchema, type RegistrationInput } from "./schema";

export type SaveResult = { readonly kind: "created" | "duplicate" };

export type RegistrationStore = {
  readonly save: (registration: RegistrationInput) => Promise<SaveResult>;
};

const storedRegistrationSchema = registrationInputSchema.extend({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
});

type StoredRegistration = z.infer<typeof storedRegistrationSchema>;

function idempotencyKey(registration: RegistrationInput): string {
  return [
    registration.parentEmail,
    registration.studentFirstName,
    registration.instrument,
  ]
    .map((value) => value.trim().toLocaleLowerCase("en-US"))
    .join("\u0000");
}

async function readLocalRegistrations(filePath: string): Promise<readonly StoredRegistration[]> {
  try {
    const contents = await readFile(filePath, "utf8");
    return contents
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const value: unknown = JSON.parse(line);
        return storedRegistrationSchema.parse(value);
      });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export function createLocalRegistrationStore(filePath: string): RegistrationStore {
  let pendingWrite: Promise<void> = Promise.resolve();

  return {
    save: (registration) => {
      const operation = pendingWrite.then(async (): Promise<SaveResult> => {
        const existing = await readLocalRegistrations(filePath);
        const key = idempotencyKey(registration);
        if (existing.some((entry) => idempotencyKey(entry) === key)) {
          return { kind: "duplicate" };
        }

        const record: StoredRegistration = {
          ...registration,
          id: randomUUID(),
          createdAt: new Date().toISOString(),
        };
        await mkdir(dirname(filePath), { recursive: true });
        await appendFile(filePath, `${JSON.stringify(record)}\n`, {
          encoding: "utf8",
          mode: 0o600,
        });
        return { kind: "created" };
      });
      pendingWrite = operation.then(
        () => undefined,
        () => undefined,
      );
      return operation;
    },
  };
}

export function createPostgresRegistrationStore(databaseUrl: string): RegistrationStore {
  const pool = new Pool({
    connectionString: databaseUrl,
    max: 3,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 10_000,
    allowExitOnIdle: true,
  });
  pool.on("error", () => {
    console.error("Postgres discarded an idle registration connection.");
  });

  return {
    save: async (registration) => {
      const result = await pool.query<{ readonly id: string }>(
        `
          INSERT INTO registrations (
            id,
            parent_first_name,
            parent_last_name,
            parent_email,
            phone,
            student_first_name,
            instrument,
            experience_level,
            preferred_teacher,
            notes,
            consent
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (
            (lower(parent_email)),
            (lower(student_first_name)),
            (lower(instrument))
          ) DO NOTHING
          RETURNING id
        `,
        [
          randomUUID(),
          registration.parentFirstName,
          registration.parentLastName,
          registration.parentEmail,
          registration.phone ?? null,
          registration.studentFirstName,
          registration.instrument,
          registration.experienceLevel,
          registration.preferredTeacher ?? null,
          registration.notes ?? null,
          registration.consent,
        ],
      );
      return result.rowCount === 0
        ? { kind: "duplicate" }
        : { kind: "created" };
    },
  };
}

const localStore = createLocalRegistrationStore(
  resolve(process.cwd(), "data", "registrations.local.jsonl"),
);
let postgresStore: RegistrationStore | undefined;

export function getRegistrationStore(): RegistrationStore {
  const databaseUrl = process.env["DATABASE_URL"]?.trim();
  if (databaseUrl === undefined || databaseUrl.length === 0) {
    return localStore;
  }
  postgresStore ??= createPostgresRegistrationStore(databaseUrl);
  return postgresStore;
}
