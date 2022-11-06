import { dehydrate, InfiniteData, QueryClient } from "@tanstack/react-query";
import { GetStaticProps, GetStaticPropsContext } from "next";

import { HomePage } from "@/_pages/home/HomePage";
import { HomePageLayout } from "@/_pages/home/HomePageLayout";
import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import {
  useLifeProjectIssuesQuery,
  useInfiniteLifeProjectIssuesForInfiniteQuery,
} from "@/features/post/graphql/issues.generated";
import { BasicLayout } from "@/shared/components/BasicLayout";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type HomeProps = {};

const Home: NextPageWithLayout<HomeProps> = () => {
  return (
    <>
      <HomePage />
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
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    useInfiniteLifeProjectIssuesForInfiniteQuery.getKey({ first: DEFAULT_PAGINATION_META.LIMIT }),
    useLifeProjectIssuesQuery.fetcher({ first: DEFAULT_PAGINATION_META.LIMIT }),
  );

  return {
    props: {
      /**
       * workaround
       * https://github.com/TanStack/query/issues/1458#issuecomment-747716357
       * infiniteQueryをprefetchしてdehydrateするとエラーになるため、JSONでパースして回避
       */
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
