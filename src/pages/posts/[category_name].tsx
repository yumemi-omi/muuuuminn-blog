import { ReactElement } from "react";

import { CategoryPage } from "@/_pages/category/CategoryPage";
import { CategoryPageLayout } from "@/_pages/category/CategoryPageLayout";
import { MASTER_CATEGORIES } from "@/features/category/constants";
import { CategoryType } from "@/features/category/types";
import { MASTER_TAGS } from "@/features/post/subFeatures/tag/constants";
import { TagType } from "@/features/post/subFeatures/tag/types";
import { PostListType } from "@/features/post/types";
import { getAllPosts } from "@/libs/markdown/api";
import { BaseLayout } from "@/shared/components/BaseLayout";

import type { NextPageWithLayout } from "@/pages/_app";

type CategoryProps = {
  posts: PostListType;
  categories: CategoryType[];
  tags: TagType[];
};

const Category: NextPageWithLayout<CategoryProps> = (props) => {
  return <CategoryPage {...props} />;
};

Category.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <CategoryPageLayout>{page}</CategoryPageLayout>
    </BaseLayout>
  );
};

type Params = {
  params: {
    category_name: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "description",
    "category",
    "tags",
  ]).filter((post) => post.category.name.toLowerCase() === params.category_name);

  const selectedCategory = MASTER_CATEGORIES.find(
    (category) => category.name.toLowerCase() === params.category_name,
  );
  const filteredTags = MASTER_TAGS.filter((tag) => tag.categoryId === selectedCategory?.id);

  return {
    props: {
      posts,
      categories: MASTER_CATEGORIES,
      tags: filteredTags,
    },
  };
}

export async function getStaticPaths() {
  const paths = MASTER_CATEGORIES.map((category) => {
    return {
      params: {
        category_name: category.name.toLowerCase(),
      },
    };
  });

  paths.push(...paths.map((p) => ({ ...p, locale: "en" })));

  return {
    paths: paths,
    fallback: false,
  };
}

export default Category;
