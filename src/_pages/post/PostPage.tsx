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
    title: `${post.title}`,
    description: "詳細だよ",
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <Box padding={10}>
        <article>
          <RichMarkdownContent html={post.content} />
        </article>
      </Box>
    </>
  );
};
