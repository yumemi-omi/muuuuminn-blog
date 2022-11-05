import { InfiniteData } from "@tanstack/react-query";
import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { LifeProjectIssuesQuery } from "@/features/post/graphql/issues.generated";
import { useInfinitePosts } from "@/features/post/hooks/useInfinitePosts";
import { useTranslation } from "@/libs/i18n";

type HomePageProps = {
  // issuesGroup: InfiniteData<LifeProjectIssuesQuery>;
};

export const HomePage: FC<HomePageProps> = () => {
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
