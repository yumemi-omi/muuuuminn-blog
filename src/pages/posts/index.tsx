import { GetStaticProps, GetStaticPropsContext } from "next";

import { PostsPage } from "@/_pages/posts/PostsPage";
import { PostsPageLayout } from "@/_pages/posts/PostsPageLayout";
import { CategoryType } from "@/features/post/subFeatures/category/types";
import { PostListType } from "@/features/post/types";
import { getAllPosts } from "@/libs/markdown/api";
import { BasicLayout } from "@/shared/components/BasicLayout";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type HomeProps = {
  categories: CategoryType[];
  posts: PostListType;
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
    <BasicLayout>
      <PostsPageLayout>{page}</PostsPageLayout>
    </BasicLayout>
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

  return {
    props: { posts },
  };
};

export default Home;
