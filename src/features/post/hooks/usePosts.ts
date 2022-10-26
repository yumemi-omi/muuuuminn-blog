import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import queryConverter from "@/features/post/grapql/queryConverter";
import { useLifeProjectIssuesQuery } from "@/generated";

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

  const { data: issues } = useLifeProjectIssuesQuery(variables);

  const posts = queryConverter.convertIssuesIntoPosts(issues);
  const pageInfo = queryConverter.convertIssuesIntoPostPageInfo(issues);

  return { posts, pageInfo };
};

/**
 * DOC: ページネーション情報(Relay-Style-Cursor-Paginationを使用)
 * 初期ページ{ first: 10 }
 * 前ページに行く{ last: 10, before: 'fuga' }
 * 次ページに行く{ first: 10, after: 'hoge' }
 */
