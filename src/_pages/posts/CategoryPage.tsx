import { useRouter } from "next/router";
import { FC, useMemo } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { TagType } from "@/features/post/subFeatures/tag/types";
import { PostListType } from "@/features/post/types";
import { Box } from "@/libs/chakra";

type CategoryPageProps = {
  posts: PostListType;
  tags: TagType[];
};

export const CategoryPage: FC<CategoryPageProps> = ({ posts, tags }) => {
  const router = useRouter();

  const tagNameAsQuery = (router.query.tag as string) || "";
  const selectedTag = useMemo(
    () => tags.find((tag) => tag.name === tagNameAsQuery),
    [tags, tagNameAsQuery],
  );

  const postsFilteredByTag = useMemo(() => {
    return selectedTag
      ? posts.filter((post) => post.tags.some((tag) => tag.name === selectedTag.name))
      : posts;
  }, [posts, selectedTag]);

  return (
    <>
      <Box flex={"1 1 auto"}>
        <PostCardList posts={postsFilteredByTag} />
      </Box>
    </>
  );
};
