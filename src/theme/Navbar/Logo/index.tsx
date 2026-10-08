import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';

/**
 * The Nexwall lockup (N monogram and wordmark), the same as on nexwall.com.br, the release notes and the firewall login.
 * Drawn inline so it follows the theme. The logo leads to the main site (the documentation home is the "Administration guide" link).
 */
export default function NavbarLogo(): ReactNode {
  return (
    <Link href="https://nexwall.com.br" className="navbar__brand nx-brand" aria-label="Nexwall">
      <svg className="nx-brand__mark" viewBox="0 0 64 64" width="36" height="36" aria-hidden="true">
        <defs>
          <linearGradient id="nx-brand-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(213, 94%, 62%)" />
            <stop offset="1" stopColor="hsl(220, 100%, 52%)" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#0b1730" stroke="rgba(59, 130, 246, 0.35)" strokeWidth="1.5" />
        <path d="M18 46V18h8l12 17.5V18h8v28h-8L26 28.5V46z" fill="url(#nx-brand-mark)" />
      </svg>
      <span className="nx-brand__word">
        NE<span>X</span>WALL
      </span>
    </Link>
  );
}
