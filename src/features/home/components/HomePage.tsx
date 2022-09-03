import Head from "next/head";
import { FC } from "react";

import { Box } from "@/libs/chakra";
import { useTranslation } from "@/libs/i18n";
import { ChakraNextLink } from "@/libs/next";
import { PostList } from "@/shared/type/post";

type Props = {
  posts: PostList;
};

export const HomePage: FC<Props> = ({ posts }) => {
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
    </>
  );
};
