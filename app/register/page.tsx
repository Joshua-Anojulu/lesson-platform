import type { Metadata } from "next";

import { RegistrationForm } from "@/components/registration-form";
import { teachers } from "@/content/teachers";

type RegisterPageProps = {
  readonly searchParams: Promise<{
    readonly teacher?: string | readonly string[];
  }>;
};

export const metadata: Metadata = {
  title: "Register for lessons",
  description:
    "Send a minimal private lesson request to the roster coordinator.",
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const { teacher } = await searchParams;
  const selectedTeacher =
    typeof teacher === "string" &&
    teachers.some((candidate) => candidate.slug === teacher)
      ? teacher
      : undefined;

  return (
    <main id="main-content" className="register-page page-frame">
      <section className="register-intro">
        <p className="eyebrow">Private registration</p>
        <h1>One request. Only what the introduction needs.</h1>
        <p>
          This form goes to the private Phase 0 store. It does not create an
          account or collect payment.
        </p>
        <div className="register-intro__limits">
          <span>Student first name only</span>
          <span>No birthdate</span>
          <span>No school field</span>
        </div>
      </section>

      <section className="register-surface">
        <RegistrationForm defaultTeacher={selectedTeacher} />
      </section>

      <section className="privacy-summary" id="privacy-summary">
        <div>
          <span className="privacy-summary__label">Privacy summary</span>
          <h2>Small by design.</h2>
        </div>
        <div className="privacy-summary__copy">
          <p>
            We collect the parent or guardian&apos;s name and email, an optional
            phone number, the student&apos;s first name, instrument, experience
            level, optional teacher preference, optional notes, and consent.
          </p>
          <p>
            We do not ask for a student last name, birthdate, school, account,
            or payment information in Phase 0. Requests stay in the private
            registration store and are available only to the pilot coordinator.
          </p>
          <p>
            To request access, correction, export, or deletion, use the abuse
            report email in the footer and identify the parent email used on the
            request.
          </p>
        </div>
      </section>
    </main>
  );
}
