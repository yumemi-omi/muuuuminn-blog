import { HomePage } from "@/features/home/components/HomePage";
import { HomePageLayout } from "@/features/home/components/HomePageLayout";
import { BasicLayout } from "@/shared/components/BasicLayout";
import { getAllPosts } from "@/shared/libs/markdown/api";
import array from "@/shared/libs/utils/array";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type Props = {
  posts: any[];
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
  const posts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

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
