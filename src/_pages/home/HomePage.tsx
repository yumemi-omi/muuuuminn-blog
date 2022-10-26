import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import { FC } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import { usePosts } from "@/features/post/hooks/usePosts";
import { useTranslation } from "@/libs/i18n";
import { CustomNextLink } from "@/libs/next";

export const HomePage: FC = () => {
  const { t } = useTranslation();
  const seo = {
    title: t.PAGE.HOME,
    description: "ホームだよ",
  } as NextSeoProps;

  const router = useRouter();
  const before = (router.query.before as string) || "";
  const after = (router.query.after as string) || "";

  const { posts, pageInfo } = usePosts({
    limit: DEFAULT_PAGINATION_META.LIMIT,
    before,
    after,
  });

  return (
    <>
      <NextSeo {...seo} />
      {pageInfo.hasPreviousPage && (
        <CustomNextLink href={`?before=${pageInfo.startCursor}`}>
          <ChevronLeftIcon />
        </CustomNextLink>
      )}
      {pageInfo.hasNextPage && (
        <CustomNextLink href={`?after=${pageInfo.endCursor}`}>
          <ChevronRightIcon />
        </CustomNextLink>
      )}
      <PostCardList posts={posts} />
    </>
  );
};
