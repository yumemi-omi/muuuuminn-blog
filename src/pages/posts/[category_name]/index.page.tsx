import { ReactElement } from "react";

import { MASTER_CATEGORIES } from "@/features/category/constants";
import { CategoryType } from "@/features/category/types";
import { PostListType } from "@/features/post/types";
import { MASTER_TAGS } from "@/features/tag/constants";
import { TagType } from "@/features/tag/types";
import { getAllPosts } from "@/libs/markdown/api";
import { BaseLayout } from "@/shared/components";

import { PostsLayout } from "../PostsLayout";

import { Category } from "./Category";

import type { NextPageWithLayout } from "@/pages/_app.page";

type CategoryPageProps = {
  posts: PostListType;
  categories: CategoryType[];
  tags: TagType[];
};

const CategoryPage: NextPageWithLayout<CategoryPageProps> = (props) => {
  return <Category {...props} />;
};

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PostsLayout {...page.props}>{page}</PostsLayout>
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

export default CategoryPage;
