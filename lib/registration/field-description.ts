import type { RegistrationField } from "./schema";

export function getFieldDescriptionIds(
  name: RegistrationField,
  hasHelper: boolean,
  error: string | undefined,
): string | undefined {
  const ids: string[] = [];
  if (hasHelper) ids.push(`${name}-description`);
  if (error !== undefined) ids.push(`${name}-error`);
  return ids.length > 0 ? ids.join(" ") : undefined;
}
