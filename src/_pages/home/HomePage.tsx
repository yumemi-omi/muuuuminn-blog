import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { PostList } from "@/features/post/type/post";
import { useTranslation } from "@/libs/i18n";

type Props = {
  posts: PostList;
};

export const HomePage: FC<Props> = ({ posts }) => {
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
