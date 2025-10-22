"use client";

import { Suspense } from 'react';
import AnalyticsTracker from './AnalyticsTracker';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function AnalyticsProvider() {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}