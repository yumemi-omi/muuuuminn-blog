import { GetStaticProps, GetStaticPropsContext } from "next";

import { PostsPage } from "@/_pages/posts/PostsPage";
import { PostsPageLayout } from "@/_pages/posts/PostsPageLayout";
import { MASTER_CATEGORIES } from "@/features/category/constants";
import { CategoryType } from "@/features/category/types";
import { MASTER_TAGS } from "@/features/post/subFeatures/tag/constants";
import { TagType } from "@/features/post/subFeatures/tag/types";
import { PostListType } from "@/features/post/types";
import { getAllPosts } from "@/libs/markdown/api";
import generateRssFeed from "@/libs/rss/generateRSSFeed";
import { BaseLayout } from "@/shared/components/BaseLayout";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type HomeProps = {
  posts: PostListType;
  categories: CategoryType[];
  tags: TagType[];
};

const Home: NextPageWithLayout<HomeProps> = (props) => {
  return (
    <>
      <PostsPage {...props} />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <PostsPageLayout {...page.props}>{page}</PostsPageLayout>
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async (_context: GetStaticPropsContext) => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "description",
    "category",
    "tags",
  ]);

  await generateRssFeed();

  return {
    props: {
      posts,
      categories: MASTER_CATEGORIES,
      tags: MASTER_TAGS,
    },
  };
};

export default Home;
