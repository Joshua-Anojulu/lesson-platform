import Image from "next/image";

import { nonAffiliationDisclaimer } from "@/content/teachers";

type AffiliationNoticeProps = {
  readonly detail?: string;
};

export function AffiliationNotice({ detail }: AffiliationNoticeProps) {
  return (
    <aside className="affiliation-notice" aria-label="Affiliation disclosure">
      <div className="affiliation-notice__media">
        <Image
          src="/images/clarinet-reed-detail.webp"
          width={1600}
          height={900}
          sizes="(max-width: 768px) calc(100vw - 32px), 24vw"
          alt="A clarinet reed and ligature in close detail"
        />
      </div>
      <span className="affiliation-notice__label">Personal list</span>
      <div>
        {detail ? <p>{detail}</p> : null}
        <p>{nonAffiliationDisclaimer}</p>
      </div>
    </aside>
  );
}
