import Head from "next/head";
import { FC } from "react";

import { Box } from "@/libs/chakra";
import { PostDetail } from "@/shared/type/post";

import { Content } from "./Content";

type Props = {
  post: PostDetail;
};

export const PostPage: FC<Props> = ({ post }) => {
  const title = `${post.title} | detail`;

  return (
    <Box padding={10}>
      <article>
        <Head>
          <title>{title}</title>
          <meta property="og:image" content={post.ogImageUrl} />
        </Head>
        <Content html={post.content} />
      </article>
    </Box>
  );
};
