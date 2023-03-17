import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import { CategoryTabs } from "@/features/category/components";
import { CategoryType } from "@/features/category/types";
import { TagFilter } from "@/features/tag/components";
import { TagType } from "@/features/tag/types";
import { Flex } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { BasicSeo, BasicSeoProps } from "@/shared/components";

type PostsLayoutProps = {
  children: ReactNode;
  categories: CategoryType[];
  tags: TagType[];
};

export const PostsLayout: FC<PostsLayoutProps> = ({ children, categories, tags }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const categoryNameAsQuery = (router.query.category_name as string) || "";

  const title = categoryNameAsQuery
    ? `${categoryNameAsQuery.toUpperCase()} | ${t.PAGE.POSTS}`
    : t.PAGE.POSTS;
  const seo: BasicSeoProps = {
    title,
    description: t.DESCRIPTION.POSTS,
    path: categoryNameAsQuery ? `/posts/${categoryNameAsQuery}` : "/posts",
  };

  return (
    <>
      <BasicSeo {...seo} />
      <Flex gap={2} height={"full"} flexDirection={"column"}>
        <CategoryTabs categories={categories} />
        <TagFilter tags={tags} />
        {children}
      </Flex>
    </>
  );
};
