const approvedFieldNames = [
  "parentFirstName",
  "parentLastName",
  "parentEmail",
  "phone",
  "studentFirstName",
  "instrument",
  "experienceLevel",
  "preferredTeacher",
  "notes",
] as const;

export type RegistrationTextFieldName = (typeof approvedFieldNames)[number];

export type RegistrationDraftValues = Partial<
  Record<RegistrationTextFieldName, string>
> & {
  readonly consent?: boolean;
};

export function selectRegistrationFields(formData: FormData) {
  return {
    parentFirstName: formData.get("parentFirstName") ?? undefined,
    parentLastName: formData.get("parentLastName") ?? undefined,
    parentEmail: formData.get("parentEmail") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    studentFirstName: formData.get("studentFirstName") ?? undefined,
    instrument: formData.get("instrument") ?? undefined,
    experienceLevel: formData.get("experienceLevel") ?? undefined,
    preferredTeacher: formData.get("preferredTeacher") ?? undefined,
    notes: formData.get("notes") ?? undefined,
    consent: formData.get("consent") === "on",
  };
}

export function selectRegistrationDraftValues(
  fields: ReturnType<typeof selectRegistrationFields>,
): RegistrationDraftValues {
  const draft: RegistrationDraftValues = {
    consent: fields.consent,
  };
  for (const fieldName of approvedFieldNames) {
    const value = fields[fieldName];
    if (typeof value === "string") {
      draft[fieldName] = value;
    }
  }
  return draft;
}
