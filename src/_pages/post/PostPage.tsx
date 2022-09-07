import Head from "next/head";
import { FC } from "react";

import { Content } from "@/features/post/components/Content";
import { PostDetail } from "@/features/post/type/post";
import { Box } from "@/libs/chakra";

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
