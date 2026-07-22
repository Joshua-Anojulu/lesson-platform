import type { RegistrationFieldErrors } from "./schema";
import type { RegistrationDraftValues } from "./form-data";

export type RegistrationActionState = {
  readonly status: "idle" | "error" | "success";
  readonly message: string;
  readonly fieldErrors: RegistrationFieldErrors;
  readonly values: RegistrationDraftValues;
  readonly revision: number;
};

export const initialRegistrationState: RegistrationActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
  revision: 0,
};
