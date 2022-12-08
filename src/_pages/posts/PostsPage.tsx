import { useRouter } from "next/router";
import { FC, useMemo } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { CategoryTabs } from "@/features/post/subFeatures/category/components/CategoryTabs";
import { CategoryType } from "@/features/post/subFeatures/category/types";
import { TagFilter } from "@/features/post/subFeatures/tag/components/TagFilter";
import { TagType } from "@/features/post/subFeatures/tag/types";
import { PostListType } from "@/features/post/types";
import { Box, Flex } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { BasicSeo, BasicSeoProps } from "@/shared/components/Seo";

type PostsPageProps = {
  posts: PostListType;
  categories: CategoryType[];
  tags: TagType[];
};

export const PostsPage: FC<PostsPageProps> = ({ posts, categories, tags }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const seo: BasicSeoProps = {
    title: t.PAGE.HOME,
    description: "投稿記事一覧です",
    path: "/",
  };

  const categoryNameAsQuery = (router.query.category as string) || "";
  const selectedCategory = useMemo(
    () => categories.find((category) => category.name === categoryNameAsQuery),
    [categories, categoryNameAsQuery],
  );
  const tagNameAsQuery = (router.query.tag as string) || "";
  const selectedTag = useMemo(
    () => tags.find((tag) => tag.name === tagNameAsQuery),
    [tags, tagNameAsQuery],
  );

  const postsFilteredByCategory = useMemo(() => {
    return selectedCategory
      ? posts.filter((post) => post.category.id === selectedCategory.id)
      : posts;
  }, [posts, selectedCategory]);

  const postsFilteredByTag = useMemo(() => {
    return selectedTag
      ? postsFilteredByCategory.filter((post) =>
          post.tags.some((tag) => tag.name === selectedTag.name),
        )
      : postsFilteredByCategory;
  }, [postsFilteredByCategory, selectedTag]);

  return (
    <>
      <BasicSeo {...seo} />
      <Flex height={"full"} flexDirection={"column"}>
        <CategoryTabs categories={categories} />
        <TagFilter tags={tags} />
        <Box flex={"1 1 auto"}>
          <PostCardList posts={postsFilteredByTag} />
        </Box>
      </Flex>
    </>
  );
};
