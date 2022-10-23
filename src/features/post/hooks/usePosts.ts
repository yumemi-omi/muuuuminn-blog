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
    before: args?.before || null,
    after: args?.after || null,
  };
  const { data: issues } = useLifeProjectIssuesQuery(variables);

  const posts = queryConverter.convertIssuesIntoPosts(issues);
  const pageInfo = queryConverter.convertIssuesIntoPostPageInfo(issues);

  return { posts, pageInfo };
};
