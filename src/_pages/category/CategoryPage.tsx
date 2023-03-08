import { useRouter } from "next/router";
import { FC, useMemo } from "react";

import { CategoryTabs } from "@/features/category/components/CategoryTabs";
import { CategoryType } from "@/features/category/types";
import { PostCardList } from "@/features/post/components/PostCardList";
import { TagFilter } from "@/features/post/subFeatures/tag/components/TagFilter";
import { TagType } from "@/features/post/subFeatures/tag/types";
import { PostListType } from "@/features/post/types";
import { Box, Flex } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { BasicSeo, BasicSeoProps } from "@/shared/components/Seo";

type CategoryPageProps = {
  posts: PostListType;
  categories: CategoryType[];
  tags: TagType[];
};

export const CategoryPage: FC<CategoryPageProps> = ({ posts, categories, tags }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const seo: BasicSeoProps = {
    title: t.PAGE.POSTS,
    description: t.DESCRIPTION.POSTS,
    path: "/",
  };

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
      <BasicSeo {...seo} />
      <Flex gap={2} height={"full"} flexDirection={"column"}>
        <CategoryTabs categories={categories} />
        <TagFilter tags={tags} />
        <Box flex={"1 1 auto"}>
          <PostCardList posts={postsFilteredByTag} />
        </Box>
      </Flex>
    </>
  );
};
