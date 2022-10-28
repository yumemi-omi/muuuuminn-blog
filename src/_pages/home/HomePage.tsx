import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

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

  const { posts, pageInfo, getKey, fetcher } = usePosts({
    limit: DEFAULT_PAGINATION_META.LIMIT,
    before,
    after,
  });

  // https://tanstack.com/query/v4/docs/reference/useQueryClient
  const client = useQueryClient();
  const prefetchPosts = useCallback(
    (directionKey: "last" | "first") => {
      const variables = {
        [directionKey]: DEFAULT_PAGINATION_META.LIMIT,
        before: directionKey === "last" ? pageInfo.startCursor : null,
        after: directionKey === "first" ? pageInfo.endCursor : null,
      };
      client.prefetchQuery(getKey(variables), fetcher(variables));
    },
    [client, getKey, fetcher, pageInfo],
  );

  return (
    <>
      <NextSeo {...seo} />
      {pageInfo.hasPreviousPage && (
        <CustomNextLink
          onClick={() => prefetchPosts("last")}
          href={`?before=${pageInfo.startCursor}`}
        >
          <ChevronLeftIcon />
        </CustomNextLink>
      )}
      {pageInfo.hasNextPage && (
        <CustomNextLink
          onClick={() => prefetchPosts("first")}
          href={`?after=${pageInfo.endCursor}`}
        >
          <ChevronRightIcon />
        </CustomNextLink>
      )}
      <PostCardList posts={posts} />
    </>
  );
};
