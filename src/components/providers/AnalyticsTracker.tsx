"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';

const gtmPageview = (url: string) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    });
  } else {
    console.log({
      event: 'pageview',
      page: url,
    });
  }
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      gtmPageview(pathname);
      gtag.pageview(pathname);
    }
  }, [pathname, searchParams]);

  return null;
}
