"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, type Locale, type Translations } from "@/lib/translations";

const STORAGE_KEY = "vision-ai-locale";
const DEFAULT_LOCALE: Locale = "pt-BR";
const SUPPORTED_LOCALES: Locale[] = ["pt-BR", "en"];

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (storedLocale === "pt-BR" || storedLocale === "en") {
      setLocaleState(storedLocale);
      return;
    }

    const browserLocale = window.navigator.language?.toLowerCase() ?? "";
    if (browserLocale.startsWith("en")) {
      setLocaleState("en");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    if (!SUPPORTED_LOCALES.includes(nextLocale)) return;
    setLocaleState(nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, copy: translations[locale] }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useTranslations() {
  return useLanguage().copy;
}
