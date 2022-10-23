import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { HomePage } from "@/_pages/home/HomePage";
import { HomePageLayout } from "@/_pages/home/HomePageLayout";
import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import { useLifeProjectIssuesQuery } from "@/generated";
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const before = context.params ? (context.params.before as string) : "";
  const after = context.params ? (context.params.after as string) : "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["LifeProjectIssues"],
    useLifeProjectIssuesQuery.fetcher({
      first: DEFAULT_PAGINATION_META.LIMIT,
      before,
      after,
    }),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
