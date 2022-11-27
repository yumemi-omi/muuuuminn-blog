import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostDetail } from "@/features/post/components/PostDetail";
import { PostDetailType } from "@/features/post/type/post";
import { Box } from "@/libs/chakra";

type PostPageProps = {
  post: PostDetailType;
};
export const PostPage: FC<PostPageProps> = ({ post }) => {
  const seo = {
    title: post.title,
    description: post.description,
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <Box>
        <PostDetail postDetail={post} />
      </Box>
    </>
  );
};
