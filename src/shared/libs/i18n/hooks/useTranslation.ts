// hooks/useLocale.ts

import { useRouter } from "next/router";

import locales from "@/shared/libs/i18n/locales";

type LocalesType = keyof typeof locales;

export const useTranslation = () => {
  const { locale } = useRouter();

  const t = locale ? locales[locale as LocalesType] : locales["ja"];

  return { locale, t };
};