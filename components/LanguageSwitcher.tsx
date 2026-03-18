"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("languages");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    // Replace current locale in path with new locale
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="language-switcher">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          className={`lang-btn ${loc === locale ? "active" : ""}`}
          onClick={() => switchLocale(loc)}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
