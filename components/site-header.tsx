import Link from "next/link";

import { siteName } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label={`LR ${siteName} home`}>
          <span className="brand__mark" aria-hidden="true">
            LR
          </span>
          <span>{siteName}</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/#teachers">Teachers</Link>
          <Link className="action action--compact action--primary" href="/register">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
