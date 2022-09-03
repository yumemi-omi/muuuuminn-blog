import Head from "next/head";
import { FC } from "react";

import { Box } from "@/shared/libs/chakra";
import { useTranslation } from "@/shared/libs/i18n/hooks/useTranslation";
import { ChakraNextLink } from "@/shared/libs/next";

type Props = {
  posts: any[];
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
      <div
        dangerouslySetInnerHTML={{
          __html: posts[0].excerpt as string,
        }}
      />
    </>
  );
};
