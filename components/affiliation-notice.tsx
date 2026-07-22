import { nonAffiliationDisclaimer } from "@/content/teachers";

type AffiliationNoticeProps = {
  readonly detail?: string;
};

export function AffiliationNotice({ detail }: AffiliationNoticeProps) {
  return (
    <aside className="affiliation-notice" aria-label="Affiliation disclosure">
      <span className="affiliation-notice__label">Personal list</span>
      <div>
        {detail ? <p>{detail}</p> : null}
        <p>{nonAffiliationDisclaimer}</p>
      </div>
    </aside>
  );
}
