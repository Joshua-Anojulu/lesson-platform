"use client";

import { useFormStatus } from "react-dom";

import type { RegistrationField as RegistrationFieldName } from "@/lib/registration/schema";

type RegistrationFieldProps = {
  readonly name: RegistrationFieldName;
  readonly label: string;
  readonly helper?: string | undefined;
  readonly error?: string | undefined;
  readonly children: React.ReactNode;
};

export function RegistrationField({
  name,
  label,
  helper,
  error,
  children,
}: RegistrationFieldProps) {
  return (
    <div className={`form-field${error ? " form-field--invalid" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {helper ? (
        <span className="form-field__helper" id={`${name}-description`}>
          {helper}
        </span>
      ) : null}
      {error ? (
        <span className="form-field__error" id={`${name}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function RegistrationSubmitButton() {
  const status = useFormStatus();

  return (
    <button
      className="action action--primary registration-form__submit"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? "Saving request" : "Send request"}
    </button>
  );
}
