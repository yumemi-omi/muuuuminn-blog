import { useRouter } from "next/router";
import { FC, useMemo } from "react";

import { PostCardList } from "@/features/post/components";
import { PostListType } from "@/features/post/types";
import { TagType } from "@/features/tag/types";
import { Box } from "@/libs/mantine/layout";

type CategoryProps = {
  posts: PostListType;
  tags: TagType[];
};

export const Category: FC<CategoryProps> = ({ posts, tags }) => {
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
      <Box sx={{ flex: "1 1 auto" }}>
        <PostCardList posts={postsFilteredByTag} />
      </Box>
    </>
  );
};
