import { HomePage } from "@/features/home/components/HomePage";
import { HomePageLayout } from "@/features/home/components/HomePageLayout";
import { getAllPosts } from "@/libs/markdown/api";
import array from "@/libs/utils/array";
import { BasicLayout } from "@/shared/components/BasicLayout";
import { PostList } from "@/shared/type/post";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type Props = {
  posts: PostList;
};

const Home: NextPageWithLayout<Props> = ({ posts }) => {
  return <HomePage posts={posts} />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <HomePageLayout>{page}</HomePageLayout>
    </BasicLayout>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "date", "slug", "coverImage"]);

  return {
    props: { posts },
  };
};

export async function getStaticPaths() {
  const DEFAULT_PAGINATION_META = { limit: 10 };
  const posts = getAllPosts(["slug"]);

  const totalPageCount = Math.ceil(posts.length / DEFAULT_PAGINATION_META.limit);
  const defaultPaths = [
    {
      params: { page: [""] },
    },
    {
      params: { page: ["1"] },
    },
  ];

  if (totalPageCount <= 1) {
    const paths = [...defaultPaths];
    paths.push(...paths.map((p) => ({ ...p, locale: "en" })));

    return { paths, fallback: false };
  } else {
    const paths = [...defaultPaths, ...array.createNumberArray(totalPageCount)].map((num) => {
      return {
        params: { page: [`${num}`] },
      };
    });
    paths.push(...paths.map((p) => ({ ...p, locale: "en" })));

    return { paths, fallback: false };
  }
}

export default Home;
