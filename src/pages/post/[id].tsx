import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ReactElement } from "react";

import { PostPage } from "@/_pages/post/PostPage";
import { PostPageLayout } from "@/_pages/post/PostPageLayout";
import { useIssueDetailQuery } from "@/generated";
import { BasicLayout } from "@/shared/components/BasicLayout";

import type { NextPageWithLayout } from "@/pages/_app";

const Post: NextPageWithLayout = () => {
  return <PostPage />;
};

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <PostPageLayout>{page}</PostPageLayout>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params ? (context.params.id as string) : "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useIssueDetailQuery.getKey({ id }),
    useIssueDetailQuery.fetcher({ id }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Post;
