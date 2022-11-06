import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { useTranslation } from "@/libs/i18n";

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  const { t } = useTranslation();
  const seo = {
    title: t.PAGE.HOME,
    description: "ホームだよ",
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <PostCardList />
    </>
  );
};
