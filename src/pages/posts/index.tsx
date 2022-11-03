import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps, GetStaticPropsContext } from "next";

import { HomePage } from "@/_pages/home/HomePage";
import { HomePageLayout } from "@/_pages/home/HomePageLayout";
import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import {
  useLifeProjectIssuesForInfiniteQuery,
  useLifeProjectIssuesQuery,
} from "@/features/post/graphql/issues.generated";
import { BasicLayout } from "@/shared/components/BasicLayout";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
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
    useLifeProjectIssuesForInfiniteQuery.getKey({ first: DEFAULT_PAGINATION_META.LIMIT }),
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
