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

const getDirectionKey = (args: { before: string | null; after: string | null }) => {
  if (args.after) {
    return "first";
  }
  if (args.before) {
    return "last";
  }
  return "first";
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const before = context.query ? (context.query.before as string) : null;
  const after = context.query ? (context.query.after as string) : null;

  const directionKey = getDirectionKey({ before, after });
  const variables = {
    [directionKey]: DEFAULT_PAGINATION_META.LIMIT,
    // before, afterともに設定しないときはnullにする。していないと正しくページネーションができない。
    before: before || null,
    after: after || null,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useLifeProjectIssuesQuery.getKey(variables),
    useLifeProjectIssuesQuery.fetcher(variables),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
