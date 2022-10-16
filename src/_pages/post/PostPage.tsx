import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostDetail } from "@/features/post/type/post";
import { Box } from "@/libs/chakra";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

type Props = {
  post: PostDetail;
};

export const PostPage: FC<Props> = ({ post }) => {
  const seo = {
    title: post.title,
    // TODO: mdファイルのfront matterにdescriptionを記載するのがよさそう
    description: post.content.slice(0, 20),
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <Box as="article" px={8}>
        <RichMarkdownContent html={post.content} />
      </Box>
    </>
  );
};
