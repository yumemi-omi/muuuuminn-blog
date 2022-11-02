import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import { useLifeProjectIssuesQuery } from "@/features/post/graphql/issues.generated";
import queryConverter from "@/features/post/graphql/queryConverter";

type UsePostType = {
  limit?: number;
  before?: string;
  after?: string;
};

const getDirectionKey = (args?: UsePostType) => {
  if (args?.after) {
    return "first";
  }
  if (args?.before) {
    return "last";
  }
  return "first";
};

export const usePosts = (args?: UsePostType) => {
  const directionKey = getDirectionKey(args);
  const variables = {
    [directionKey]: DEFAULT_PAGINATION_META.LIMIT,
    // before, afterともに設定しないときはnullにする。していないと正しくページネーションができない。
    before: args?.before || null,
    after: args?.after || null,
  };

  const { data: issues } = useLifeProjectIssuesQuery(variables, { keepPreviousData: true });

  const posts = queryConverter.convertIssuesIntoPosts(issues);
  const pageInfo = queryConverter.convertIssuesIntoPostPageInfo(issues);

  return {
    posts,
    pageInfo,
    getKey: useLifeProjectIssuesQuery.getKey,
    fetcher: useLifeProjectIssuesQuery.fetcher,
  };
};

/**
 * DOC: ページネーション情報(Relay-Style-Cursor-Paginationを使用)
 * 初期ページ{ first: 10 }
 * 前ページに行く{ last: 10, before: 'fuga' }
 * 次ページに行く{ first: 10, after: 'hoge' }
 */
