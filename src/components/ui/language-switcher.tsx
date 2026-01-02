"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, useTranslations } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/translations";

const LOCALE_OPTIONS: Locale[] = ["pt-BR", "en"];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const copy = useTranslations();

  return (
    <div className={cn("flex items-center", className)}>
      <Select
        value={locale}
        onValueChange={(value) => setLocale(value as Locale)}
      >
        <SelectTrigger
          aria-label={copy.languageSwitcher.ariaLabel}
          className={cn(
            "h-9 min-w-[110px] border-white/20 bg-black/40 text-xs font-medium uppercase tracking-wide text-white",
            "backdrop-blur-md"
          )}
        >
          <SelectValue placeholder={copy.languageSwitcher.label} />
        </SelectTrigger>
        <SelectContent align="end">
          {LOCALE_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {copy.languageSwitcher.options[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
