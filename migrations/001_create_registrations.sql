BEGIN;

CREATE TABLE IF NOT EXISTS registrations (
  id text PRIMARY KEY,
  parent_first_name text NOT NULL,
  parent_last_name text NOT NULL,
  parent_email text NOT NULL,
  phone text,
  student_first_name text NOT NULL,
  instrument text NOT NULL,
  experience_level text NOT NULL,
  preferred_teacher text,
  notes text,
  consent boolean NOT NULL CHECK (consent),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS registrations_idempotency_unique
  ON registrations (
    lower(parent_email),
    lower(student_first_name),
    lower(instrument)
  );

COMMIT;
