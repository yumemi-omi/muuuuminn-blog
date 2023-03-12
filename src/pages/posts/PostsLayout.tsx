import { FC, ReactNode } from "react";

import { CategoryTabs } from "@/features/category/components/CategoryTabs";
import { CategoryType } from "@/features/category/types";
import { TagFilter } from "@/features/tag/components/TagFilter";
import { TagType } from "@/features/tag/types";
import { Flex } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { BasicSeo, BasicSeoProps } from "@/shared/components/Seo";

type PostsLayoutProps = {
  categories: CategoryType[];
  tags: TagType[];
  children: ReactNode;
};

export const PostsLayout: FC<PostsLayoutProps> = ({ children, categories, tags }) => {
  const { t } = useTranslation();

  const seo: BasicSeoProps = {
    title: t.PAGE.POSTS,
    description: t.DESCRIPTION.POSTS,
    path: "/",
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
