import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps, GetStaticPropsContext } from "next";

import { HomePage } from "@/_pages/home/HomePage";
import { HomePageLayout } from "@/_pages/home/HomePageLayout";
import { DEFAULT_PAGINATION_META } from "@/features/post/constant";
import {
  useLifeProjectIssuesPageInfoQuery,
  useLifeProjectIssuesQuery,
} from "@/features/post/graphql/issues.generated";
import { BasicLayout } from "@/shared/components/BasicLayout";
import array from "@/shared/utils/array";

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

const DEFAULT_FIRST = 10;

export const getStaticPaths = async (): Promise<{
  paths: string[];
  fallback: boolean;
}> => {
  const queryClient = new QueryClient();
  const result = await queryClient.fetchQuery(
    useLifeProjectIssuesPageInfoQuery.getKey({
      first: DEFAULT_FIRST,
    }),
    useLifeProjectIssuesPageInfoQuery.fetcher({
      first: DEFAULT_FIRST,
    }),
  );

  let cursorList =
    result.node &&
    "id" in result.node &&
    result.node.items &&
    "nodes" in result.node.items &&
    result.node.items.nodes &&
    result.node.items.edges
      ? result.node.items.edges.map((edge) => edge?.cursor)
      : [];
  let after = cursorList[cursorList.length - 1] || null;
  let hasNextPage =
    result.node && "id" in result.node ? result.node.items.pageInfo.hasNextPage : null;
  /**
   * 100件を1ページ分の件数20件で割って、生成されたpath
   */
  const paths = cursorList.flatMap((cursor, i) => {
    if (i === 0) {
      return [`/posts?after=${cursor}`];
    }
    if (i % DEFAULT_PAGINATION_META.LIMIT === 0) {
      return [`/posts?before=${cursor}`, `/posts?after=${cursor}`];
    }
    if (!hasNextPage && i === cursorList.length - 1) {
      return [`/posts?before=${cursor}`];
    }
    return [];
  });

  const totalCount = result.node && "id" in result.node ? result.node.items.totalCount : 0;

  /**
   * 一度のリクエストでとれるissueは100が上限
   * 実際の合計数が上限100より少ない場合は追加リクエストは不要なので、pathsを返す
   */
  if (!hasNextPage) {
    return {
      paths: ["/posts", ...paths],
      fallback: false,
    };
  }

  /**
   * すでに一回分fetchしているので-1している
   */
  const fetchingCounts = Math.ceil(totalCount / DEFAULT_PAGINATION_META.LIMIT) - 1;
  // 101件目以降の処理
  for await (const _ of array.createNumberArray(fetchingCounts)) {
    const result = await queryClient.fetchQuery(
      useLifeProjectIssuesPageInfoQuery.getKey({
        first: DEFAULT_FIRST,
        after,
      }),
      useLifeProjectIssuesPageInfoQuery.fetcher({
        first: DEFAULT_FIRST,
        after,
      }),
    );
    cursorList =
      result.node &&
      "id" in result.node &&
      result.node.items &&
      "nodes" in result.node.items &&
      result.node.items.nodes &&
      result.node.items.edges
        ? result.node.items.edges.map((edge) => edge?.cursor)
        : [];
    after = cursorList[cursorList.length - 1] || null;
    hasNextPage =
      result.node && "id" in result.node ? result.node.items.pageInfo.hasNextPage : null;
    const generatedPaths = cursorList.flatMap((cursor, i) => {
      if (i % DEFAULT_PAGINATION_META.LIMIT === 0) {
        return [`/posts?before=${cursor}`, `/posts?after=${cursor}`];
      }
      if (!hasNextPage && i === cursorList.length - 1) {
        return [`/posts?before=${cursor}`];
      }
      return [];
    });

    paths.push(...generatedPaths);
  }
  console.log({ paths });
  return {
    paths: ["/posts", ...paths],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  console.log({ context });
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useLifeProjectIssuesQuery.getKey({ first: DEFAULT_PAGINATION_META.LIMIT }),
    useLifeProjectIssuesQuery.fetcher({ first: DEFAULT_PAGINATION_META.LIMIT }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
