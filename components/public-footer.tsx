import Link from "next/link";

import { nonAffiliationDisclaimer } from "@/content/teachers";
import { abuseEmail, siteName } from "@/lib/site";

export function PublicFooter() {
  const abuseHref = `mailto:${abuseEmail}?subject=${encodeURIComponent(
    "Public roster abuse report",
  )}`;

  return (
    <footer className="public-footer">
      <div className="public-footer__inner">
        <div className="public-footer__brand">
          <span className="brand__mark" aria-hidden="true">
            LR
          </span>
          <p>{siteName}</p>
        </div>
        <p className="public-footer__disclaimer">{nonAffiliationDisclaimer}</p>
        <div className="public-footer__links">
          <a href={abuseHref}>Report abuse</a>
          <Link href="/register#privacy-summary">Privacy summary</Link>
        </div>
      </div>
    </footer>
  );
}
