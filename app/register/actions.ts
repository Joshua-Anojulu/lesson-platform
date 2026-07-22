"use server";

import { headers } from "next/headers";

import type { RegistrationActionState } from "@/lib/registration/action-state";
import {
  selectRegistrationDraftValues,
  selectRegistrationFields,
} from "@/lib/registration/form-data";
import { createInMemoryRateLimiter } from "@/lib/registration/rate-limit";
import { registrationInputSchema } from "@/lib/registration/schema";
import { getRegistrationStore } from "@/lib/registration/store";

const registrationRateLimiter = createInMemoryRateLimiter({
  limit: 5,
  windowMs: 15 * 60 * 1_000,
});

export async function submitRegistration(
  previousState: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  const submittedValues = selectRegistrationFields(formData);
  const draftValues = selectRegistrationDraftValues(submittedValues);
  const revision = previousState.revision + 1;
  const requestHeaders = await headers();
  const forwardedAddress = requestHeaders
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const clientAddress =
    forwardedAddress || requestHeaders.get("x-real-ip") || "unavailable";
  const rateLimit = registrationRateLimiter.consume(clientAddress);

  if (!rateLimit.allowed) {
    return {
      status: "error",
      message: `Too many attempts. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
      fieldErrors: {},
      values: draftValues,
      revision,
    };
  }

  const parsed = registrationInputSchema.safeParse(submittedValues);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and send the request again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
      values: draftValues,
      revision,
    };
  }

  try {
    await getRegistrationStore().save(parsed.data);
    return {
      status: "success",
      message:
        "Your lesson request was received. The coordinator will follow up privately.",
      fieldErrors: {},
      values: {},
      revision,
    };
  } catch {
    console.error("Registration persistence failed.");
    return {
      status: "error",
      message:
        "The request could not be saved right now. Please wait a moment and try again.",
      fieldErrors: {},
      values: draftValues,
      revision,
    };
  }
}
