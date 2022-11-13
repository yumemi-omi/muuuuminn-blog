const COMMON_I18N = {
  COPYRIGHT: "© 2022 muuuuminn ブログ. All rights reserved.",
} as const;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ja: {
    SITE_NAME: "muuuuminn ブログ",
    PAGE: {
      HOME: "ホーム",
      POLICY: "プライバシーポリシー",
      ABOUT_ME: "自己紹介",
    },
    ALT: {
      SITE_LOGO: "サイトロゴ",
    },
    ...COMMON_I18N,
  },
  en: {
    SITE_NAME: "muuuuminn blog",
    PAGE: {
      HOME: "Home",
      POLICY: "Privacy policy",
      ABOUT_ME: "About me",
    },
    ALT: {
      SITE_LOGO: "Site logo",
    },
    ...COMMON_I18N,
  },
} as const;
