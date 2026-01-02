"use client";

import ScrollSections from "@/components/ui/scroll-sections";
import { useLanguage, useTranslations } from "@/components/providers/language-provider";

export default function CptScrollReveal() {
  const copy = useTranslations();
  const { locale } = useLanguage();
  const scrollSections = copy.home.cpt.scrollSections;

  return (
    <ScrollSections key={`cpt-scroll-${locale}`} sections={scrollSections} />
  );
}
