import Head from "next/head";
import Link from "next/link";

import { BasicLayout } from "@/shared/components/BasicLayout";
import { Box } from "@/shared/libs/chakra/components/Box";
import { useTranslation } from "@/shared/libs/i18n/hooks/useTranslation";
import { getAllPosts } from "@/shared/libs/markdown/api";

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
          <Link as={`/post/${post.slug}`} href="/post/[slug]">
            <a className="hover:underline">{post.title}</a>
          </Link>
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
