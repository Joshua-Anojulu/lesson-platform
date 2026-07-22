"use client";

import { useActionState } from "react";

import { submitRegistration } from "@/app/register/actions";
import {
  RegistrationField,
  RegistrationSubmitButton,
} from "@/components/registration-field";
import { teachers } from "@/content/teachers";
import { initialRegistrationState } from "@/lib/registration/action-state";
import { getFieldDescriptionIds } from "@/lib/registration/field-description";
import type { RegistrationTextFieldName } from "@/lib/registration/form-data";
import {
  experienceLevels,
  instrumentOptions,
  type RegistrationField as RegistrationFieldName,
} from "@/lib/registration/schema";

type RegistrationFormProps = {
  readonly defaultTeacher?: string | undefined;
};

export function RegistrationForm({ defaultTeacher }: RegistrationFormProps) {
  const [state, formAction] = useActionState(
    submitRegistration,
    initialRegistrationState,
  );
  const error = (field: RegistrationFieldName) => state.fieldErrors[field]?.[0];
  const describedBy = (field: RegistrationFieldName, helper = false) =>
    getFieldDescriptionIds(field, helper, error(field));
  const value = (field: RegistrationTextFieldName) =>
    state.values[field] ?? "";
  const consentError = error("consent");

  return (
    <form
      className="registration-form"
      action={formAction}
      key={state.revision}
      noValidate
    >
      {state.status !== "idle" ? (
        <div
          className={`form-message form-message--${state.status}`}
          role={state.status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {state.message}
        </div>
      ) : null}

      <fieldset>
        <legend>Parent or guardian</legend>
        <div className="form-grid form-grid--two">
          <RegistrationField
            name="parentFirstName"
            label="First name"
            error={error("parentFirstName")}
          >
            <input
              id="parentFirstName"
              name="parentFirstName"
              type="text"
              autoComplete="given-name"
              defaultValue={value("parentFirstName")}
              aria-describedby={describedBy("parentFirstName")}
              aria-invalid={Boolean(error("parentFirstName"))}
              required
            />
          </RegistrationField>
          <RegistrationField
            name="parentLastName"
            label="Last name"
            error={error("parentLastName")}
          >
            <input
              id="parentLastName"
              name="parentLastName"
              type="text"
              autoComplete="family-name"
              defaultValue={value("parentLastName")}
              aria-describedby={describedBy("parentLastName")}
              aria-invalid={Boolean(error("parentLastName"))}
              required
            />
          </RegistrationField>
        </div>
        <div className="form-grid form-grid--two">
          <RegistrationField
            name="parentEmail"
            label="Email"
            error={error("parentEmail")}
          >
            <input
              id="parentEmail"
              name="parentEmail"
              type="email"
              autoComplete="email"
              inputMode="email"
              defaultValue={value("parentEmail")}
              aria-describedby={describedBy("parentEmail")}
              aria-invalid={Boolean(error("parentEmail"))}
              required
            />
          </RegistrationField>
          <RegistrationField
            name="phone"
            label="Phone (optional)"
            error={error("phone")}
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              defaultValue={value("phone")}
              aria-describedby={describedBy("phone")}
              aria-invalid={Boolean(error("phone"))}
            />
          </RegistrationField>
        </div>
      </fieldset>

      <fieldset>
        <legend>Student and lesson</legend>
        <RegistrationField
          name="studentFirstName"
          label="Student first name"
          helper="First name only. Do not enter a last name."
          error={error("studentFirstName")}
        >
          <input
            id="studentFirstName"
            name="studentFirstName"
            type="text"
            autoComplete="off"
            defaultValue={value("studentFirstName")}
            aria-describedby={describedBy("studentFirstName", true)}
            aria-invalid={Boolean(error("studentFirstName"))}
            required
          />
        </RegistrationField>
        <div className="form-grid form-grid--two">
          <RegistrationField
            name="instrument"
            label="Instrument"
            error={error("instrument")}
          >
            <select
              id="instrument"
              name="instrument"
              defaultValue={value("instrument")}
              aria-describedby={describedBy("instrument")}
              aria-invalid={Boolean(error("instrument"))}
              required
            >
              <option value="" disabled>
                Choose an instrument
              </option>
              {instrumentOptions.map((instrument) => (
                <option value={instrument} key={instrument}>
                  {instrument}
                </option>
              ))}
            </select>
          </RegistrationField>
          <RegistrationField
            name="experienceLevel"
            label="Experience level"
            error={error("experienceLevel")}
          >
            <select
              id="experienceLevel"
              name="experienceLevel"
              defaultValue={value("experienceLevel")}
              aria-describedby={describedBy("experienceLevel")}
              aria-invalid={Boolean(error("experienceLevel"))}
              required
            >
              <option value="" disabled>
                Choose a level
              </option>
              {experienceLevels.map((level) => (
                <option value={level.value} key={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </RegistrationField>
        </div>
        <RegistrationField
          name="preferredTeacher"
          label="Preferred teacher (optional)"
          error={error("preferredTeacher")}
        >
          <select
            id="preferredTeacher"
            name="preferredTeacher"
            defaultValue={state.revision > 0 ? value("preferredTeacher") : (defaultTeacher ?? "")}
            aria-describedby={describedBy("preferredTeacher")}
            aria-invalid={Boolean(error("preferredTeacher"))}
          >
            <option value="">No preference</option>
            {teachers.map((teacher) => (
              <option value={teacher.slug} key={teacher.slug}>
                {teacher.name} ({teacher.instruments.join(" / ")})
              </option>
            ))}
          </select>
        </RegistrationField>
        <RegistrationField
          name="notes"
          label="Notes (optional)"
          helper="Share scheduling needs or lesson goals. Do not include sensitive student information."
          error={error("notes")}
        >
          <textarea
            id="notes"
            name="notes"
            rows={5}
            defaultValue={value("notes")}
            aria-describedby={describedBy("notes", true)}
            aria-invalid={Boolean(error("notes"))}
          />
        </RegistrationField>
      </fieldset>

      <div className="consent-field">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          defaultChecked={state.values.consent ?? false}
          aria-describedby={consentError ? "consent-error" : undefined}
          aria-invalid={Boolean(consentError)}
        />
        <label htmlFor="consent">
          I am the parent/guardian and I consent to sending this lesson request. Read the{" "}
          <a href="#privacy-summary">privacy summary</a>.
        </label>
        {consentError ? (
          <span
            className="form-field__error"
            id="consent-error"
            role="alert"
          >
            {consentError}
          </span>
        ) : null}
      </div>

      <RegistrationSubmitButton />
    </form>
  );
}
