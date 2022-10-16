import { dehydrate, QueryClient } from "@tanstack/react-query";

import { HomePage } from "@/_pages/home/HomePage";
import { HomePageLayout } from "@/_pages/home/HomePageLayout";
import { PostList } from "@/features/post/type/post";
import { LifeRepositoryDocument, LifeRepositoryQuery, useLifeRepositoryQuery } from "@/generated";
import fetcher from "@/libs/fetcher";
import { getAllPosts } from "@/libs/markdown/api";
import { BasicLayout } from "@/shared/components/BasicLayout";
import array from "@/shared/utils/array";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type Props = {
  posts: PostList;
};

const getFiles = (lifeRepo: LifeRepositoryQuery) => {
  const obj = lifeRepo?.repository?.object;

  if (obj && "entries" in obj) {
    return obj.entries
      ?.map((entry) => {
        const objInEntry = entry.object;
        if (objInEntry && "entries" in objInEntry) {
          return objInEntry.entries?.map((en) => ({
            id: en.object && "id" in en.object && en.object.id,
            name: en.name,
            content: en.object && "text" in en.object && en.object.text,
            folderName: entry.name,
          }));
        }
      })
      .flat();
  }

  return [];
};

const Home: NextPageWithLayout<Props> = ({ posts }) => {
  const { data } = useLifeRepositoryQuery();
  const files = getFiles(data || {});
  console.log({ files });
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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["LifeRepository"], fetcher(LifeRepositoryDocument));

  const posts = getAllPosts(["title", "date", "slug", "coverImage"]);

  return {
    props: { posts, dehydratedState: dehydrate(queryClient) },
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
