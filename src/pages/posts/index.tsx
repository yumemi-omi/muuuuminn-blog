import { GetStaticProps, GetStaticPropsContext } from "next";

import { HomePage } from "@/_pages/home/HomePage";
import { HomePageLayout } from "@/_pages/home/HomePageLayout";
import { CategoryType, PostListType } from "@/features/post/type/post";
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
      <HomePage {...props} />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <HomePageLayout>{page}</HomePageLayout>
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
