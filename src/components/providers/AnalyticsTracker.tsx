"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const gtmPageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'page_view',
      page_location: window.location.href,
      page_path: url,
      page_title: document.title,
    });
  }
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      gtmPageview(pathname);
    }
  }, [pathname, searchParams]);

  return null;
}
