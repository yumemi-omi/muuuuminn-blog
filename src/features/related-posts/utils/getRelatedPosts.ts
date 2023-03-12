import { CategoryType } from "@/features/category/types";
import { PostListType } from "@/features/post/types";
import { TagType } from "@/features/tag/types";

export const getRelatedPosts = (
  posts: PostListType,
  query: {
    category: CategoryType;
    tags: TagType[];
    tagMatchLevel: number;
    limit: number;
    excludeSlug: string;
  },
): PostListType => {
  const { category, tags, tagMatchLevel = 1, limit = 5, excludeSlug } = query;
  const matchLevel = tags.length < tagMatchLevel ? tags.length : tagMatchLevel;

  return posts
    .filter((post) => {
      const matchCategory = post.category.name === category.name;
      return matchCategory && post.slug !== excludeSlug;
    })
    .splice(0, limit)
    .filter((post) => {
      const tagMatchCount = post.tags.reduce((prev, current) => {
        if (tags.find((tag) => tag.name === current.name)) {
          return prev + 1;
        }
        return prev;
      }, 0);
      return matchLevel <= tagMatchCount;
    });
};
