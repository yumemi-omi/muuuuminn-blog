import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import {
  LifeProjectIssuesQuery,
  useInfiniteLifeProjectIssuesForInfiniteQuery,
} from "@/features/post/graphql/issues.generated";
import queryConverter from "@/features/post/graphql/queryConverter";

export const useInfinitePosts = (_initialData?: InfiniteData<LifeProjectIssuesQuery>) => {
  const queryClient = useQueryClient();
  const initialVariables = {
    first: DEFAULT_PAGINATION_META.LIMIT,
    after: null,
  };

  const {
    data: issuesGroup,
    status,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteLifeProjectIssuesForInfiniteQuery("after", initialVariables, {
    getNextPageParam(lastQueryResult, _allQueryResultList) {
      const pageInfo = queryConverter.convertIssuesIntoPostPageInfo(lastQueryResult);
      if (pageInfo.hasNextPage) {
        return pageInfo.endCursor;
      }
    },
    initialData: () => {
      return queryClient.getQueryData(
        useInfiniteLifeProjectIssuesForInfiniteQuery.getKey({
          first: DEFAULT_PAGINATION_META.LIMIT,
        }),
      );
    },
  });

  const posts = useMemo(() => {
    return issuesGroup
      ? issuesGroup?.pages.flatMap((issues) => {
          return queryConverter.convertIssuesIntoPosts(issues);
        })
      : [];
  }, [issuesGroup]);

  return {
    posts,
    status,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    getKey: useInfiniteLifeProjectIssuesForInfiniteQuery.getKey,
  };
};

/**
 * DOC: ページネーション情報(Relay-Style-Cursor-Paginationを使用)
 * 初期ページ{ first: 10 }
 * 前ページに行く{ last: 10, before: 'fuga' }
 * 次ページに行く{ first: 10, after: 'hoge' }
 */
