// hooks/useLocale.ts

import { useRouter } from "next/router";

import locales from "@/libs/i18n/locales";

export type LocalesType = keyof typeof locales;
export type Locales = typeof locales[LocalesType];

export const useTranslation = () => {
  const { locale } = useRouter();

  const t = locale ? locales[locale as LocalesType] : locales["ja"];

  return { locale, t };
};
