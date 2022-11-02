import { useMemo } from "react";

import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import { useInfiniteLifeProjectIssuesQuery } from "@/features/post/graphql/issues.generated";
import queryConverter from "@/features/post/graphql/queryConverter";

export const useInfinitePosts = () => {
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
  } = useInfiniteLifeProjectIssuesQuery("after", initialVariables, {
    getNextPageParam(lastQueryResult, _allQueryResultList) {
      const pageInfo = queryConverter.convertIssuesIntoPostPageInfo(lastQueryResult);
      if (pageInfo.hasNextPage) {
        return pageInfo.endCursor;
      }
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
    getKey: useInfiniteLifeProjectIssuesQuery.getKey,
  };
};

/**
 * DOC: ページネーション情報(Relay-Style-Cursor-Paginationを使用)
 * 初期ページ{ first: 10 }
 * 前ページに行く{ last: 10, before: 'fuga' }
 * 次ページに行く{ first: 10, after: 'hoge' }
 */
