import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticPropsContext } from "next";
import { ReactElement, Suspense } from "react";

import { PostPage } from "@/_pages/post/PostPage";
import { PostPageLayout } from "@/_pages/post/PostPageLayout";
import { useIssueDetailQuery } from "@/features/post/graphql/issueDetail.generated";
import { useLifeProjectIssuesPageInfoQuery } from "@/features/post/graphql/issues.generated";
import { BasicLayout } from "@/shared/components/BasicLayout";
import array from "@/shared/utils/array";

import type { NextPageWithLayout } from "@/pages/_app";


const Post: NextPageWithLayout = () => {
  return (
    <Suspense fallback="loading...">
      <PostPage />
    </Suspense>
  );
};

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <PostPageLayout>{page}</PostPageLayout>
    </BasicLayout>
  );
};

const DEFAULT_FIRST = 100;

export const getStaticPaths = async (): Promise<{
  paths: string[];
  fallback: boolean;
}> => {
  const queryClient = new QueryClient();
  // ↓↓↓100件目までのissueを取得する↓↓↓
  const result = await queryClient.fetchQuery(
    useLifeProjectIssuesPageInfoQuery.getKey({
      first: DEFAULT_FIRST,
    }),
    useLifeProjectIssuesPageInfoQuery.fetcher({
      first: DEFAULT_FIRST,
    }),
  );

  const totalCount = result.node && "id" in result.node ? result.node.items.totalCount : 0;
  const paths =
    result.node &&
    "id" in result.node &&
    result.node.items &&
    "nodes" in result.node.items &&
    result.node.items.nodes
      ? (result.node.items.nodes
          .map((node) =>
            node && node.content && "id" in node.content ? `/post/${node.content.id}` : "",
          )
          .filter((n) => n) as string[])
      : [];

  if (totalCount < DEFAULT_FIRST) {
    /**
     * 一度のリクエストでとれるissueは100が上限
     * 実際の合計数が上限100より少ない場合は追加リクエストは不要なので、pathsを返す
     */
    console.log({
      paths,
    });
    return { paths, fallback: false };
  }

  // ↓↓↓追加リクエストの処理(101件目以降のissueを取得する)↓↓↓
  let endCursor = result.node && "id" in result.node ? result.node.items.pageInfo.endCursor : null;
  const fetchingCounts = Math.ceil(totalCount / DEFAULT_FIRST) - 1;

  for await (const _ of array.createNumberArray(fetchingCounts)) {
    const result = await queryClient.fetchQuery(
      useLifeProjectIssuesPageInfoQuery.getKey({
        first: DEFAULT_FIRST,
        after: endCursor || null,
      }),
      useLifeProjectIssuesPageInfoQuery.fetcher({
        first: DEFAULT_FIRST,
        after: endCursor || null,
      }),
    );
    const generatedPaths =
      result.node &&
      "id" in result.node &&
      result.node.items &&
      "nodes" in result.node.items &&
      result.node.items.nodes
        ? (result.node.items.nodes
            .map((node) =>
              node && node.content && "id" in node.content ? `/post/${node.content.id}` : "",
            )
            .filter((n) => n) as string[])
        : [];
    paths.push(...generatedPaths);

    endCursor = result.node && "id" in result.node ? result.node.items.pageInfo.endCursor : null;
  }
  console.log({
    二回目: paths,
  });
  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params ? (context.params.id as string) : "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useIssueDetailQuery.getKey({ id }),
    useIssueDetailQuery.fetcher({ id }),
  );

  console.log({ state: dehydrate(queryClient) });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Post;
