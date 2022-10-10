import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { Content } from "@/features/post/components/Content";
import { PostDetail } from "@/features/post/type/post";
import { Box } from "@/libs/chakra";

type Props = {
  post: PostDetail;
};

export const PostPage: FC<Props> = ({ post }) => {
  const seo = {
    title: post.title,
    description: post.content.slice(0, 20),
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <Box px={8}>
        <article>
          <Content html={post.content} />
        </article>
      </Box>
    </>
  );
};
