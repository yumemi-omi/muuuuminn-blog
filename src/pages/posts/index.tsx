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
  const posts = getAllPosts(["title", "date", "slug", "coverImage", "description"]);

  return {
    props: { posts },
  };
};

// export async function getStaticPaths() {
//   const { LIMIT } = DEFAULT_PAGINATION_META;
//   const posts = getAllPosts(["slug"]);

//   const totalPageCount = Math.ceil(posts.length / LIMIT);
//   const defaultPaths = [
//     {
//       params: { page: [""] },
//     },
//     {
//       params: { page: ["1"] },
//     },
//   ];

//   if (totalPageCount <= 1) {
//     const paths = [...defaultPaths];
//     paths.push(...paths.map((p) => ({ ...p, locale: "en" })));

//     return { paths, fallback: false };
//   } else {
//     const paths = [...defaultPaths, ...array.createNumberArray(totalPageCount)].map((num) => {
//       return {
//         params: { page: [`${num}`] },
//       };
//     });
//     paths.push(...paths.map((p) => ({ ...p, locale: "en" })));

//     return { paths, fallback: false };
//   }
// }

export default Home;
