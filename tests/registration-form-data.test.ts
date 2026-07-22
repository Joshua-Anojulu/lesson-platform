import { describe, expect, it } from "vitest";

import { selectRegistrationFields } from "../lib/registration/form-data";

describe("selectRegistrationFields", () => {
  it("ignores framework metadata while preserving the approved fields", () => {
    // Given
    const formData = new FormData();
    formData.set("parentFirstName", "Morgan");
    formData.set("consent", "on");
    formData.set("$ACTION_ID_internal", "framework-value");

    // When
    const result = selectRegistrationFields(formData);

    // Then
    expect(result).toEqual({
      parentFirstName: "Morgan",
      parentLastName: undefined,
      parentEmail: undefined,
      phone: undefined,
      studentFirstName: undefined,
      instrument: undefined,
      experienceLevel: undefined,
      preferredTeacher: undefined,
      notes: undefined,
      consent: true,
    });
  });
});
