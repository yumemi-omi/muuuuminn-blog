import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { useInfinitePosts } from "@/features/post/hooks/useInfinitePosts";
import { useTranslation } from "@/libs/i18n";

export const HomePage: FC = () => {
  const { t } = useTranslation();
  const seo = {
    title: t.PAGE.HOME,
    description: "ホームだよ",
  } as NextSeoProps;

  const { posts, fetchNextPage } = useInfinitePosts();

  return (
    <>
      <NextSeo {...seo} />
      <PostCardList posts={posts} />
      <button onClick={() => fetchNextPage()}>さらに表示する</button>
    </>
  );
};
