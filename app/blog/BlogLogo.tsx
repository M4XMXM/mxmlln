'use client';

import { usePathname } from 'next/navigation';
import { SiteLogo } from '../components/SiteLogo';

export function BlogLogo() {
  const pathname = usePathname();
  const isArticlePage = pathname !== '/blog' && pathname.startsWith('/blog/');

  // Article pages spin with scroll; the index shows the static signature.
  return (
    <SiteLogo
      href="/blog"
      ariaLabel="MXMLLN"
      spin={isArticlePage}
      className="blog-logo"
      lottieClassName="blog-logo-lottie"
    />
  );
}
