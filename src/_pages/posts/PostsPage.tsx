import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";

import { PostCardList } from "@/features/post/components/PostCardList";
import { CategoryTabs } from "@/features/post/subFeatures/category/components/CategoryTabs";
import { CategoryType } from "@/features/post/subFeatures/category/types";
import { PostListType } from "@/features/post/types";
import { useTranslation } from "@/libs/i18n";
import { BasicSeo, BasicSeoProps } from "@/shared/components/Seo";

type PostsPageProps = {
  categories: CategoryType[];
  posts: PostListType;
};

export const PostsPage: FC<PostsPageProps> = ({ posts, categories }) => {
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

  const filteredPosts = useMemo(() => {
    return selectedCategory
      ? posts.filter((post) => post.category.id === selectedCategory?.id)
      : posts;
  }, [posts, selectedCategory]);

  return (
    <>
      <BasicSeo {...seo} />
      <Box height={{ base: "calc(100% - 32px)", md: "calc(100% - 40px)" }}>
        <CategoryTabs categories={categories} />
        <PostCardList posts={filteredPosts} />
      </Box>
    </>
  );
};
