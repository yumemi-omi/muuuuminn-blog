import Head from "next/head";
import { FC } from "react";

import { Box } from "@/shared/libs/chakra";

import { Content } from "./Content";

type Props = {
  post: any;
};

export const PostPage: FC<Props> = ({ post }) => {
  const title = `${post.title} | detail`;

  return (
    <Box padding={10}>
      <article>
        <Head>
          <title>{title}</title>
          <meta property="og:image" content={post.ogImage.url} />
        </Head>
        <Content html={post.content} />
      </article>
    </Box>
  );
};
