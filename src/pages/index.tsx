import Head from "next/head";

import { BasicLayout } from "@/shared/components/BasicLayout";
import { Box } from "@/shared/libs/chakra";
import { useTranslation } from "@/shared/libs/i18n/hooks/useTranslation";
import { getAllPosts } from "@/shared/libs/markdown/api";
import { ChakraNextLink } from "@/shared/libs/next";

import type { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";

type Props = {
  posts: any[];
};

const Index: NextPageWithLayout<Props> = ({ posts }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t.SITE_NAME}</title>
      </Head>
      {posts.map((post) => (
        <Box my={10} key={post.slug}>
          <ChakraNextLink href={`/post/${post.slug}`}>{post.title}</ChakraNextLink>
        </Box>
      ))}
      <div
        dangerouslySetInnerHTML={{
          __html: posts[0].excerpt as string,
        }}
      />
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "date", "slug", "author", "coverImage", "excerpt"]);

  return {
    props: { posts },
  };
};

export default Index;
