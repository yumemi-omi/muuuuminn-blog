import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { CategoryType, PostListType } from "@/features/post/type/post";
import { useTranslation } from "@/libs/i18n";

type HomePageProps = {
  categories: CategoryType[];
  posts: PostListType;
};

export const HomePage: FC<HomePageProps> = ({ posts }) => {
  const { t } = useTranslation();
  const seo = {
    title: t.PAGE.HOME,
    description: "ホームだよ",
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <PostCardList posts={posts} />
    </>
  );
};
