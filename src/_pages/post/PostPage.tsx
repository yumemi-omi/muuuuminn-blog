import { NextSeo, NextSeoProps } from "next-seo";
import { FC } from "react";

import { PostDetail } from "@/features/post/components/PostDetail";
import { PostDetailType } from "@/features/post/types";

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
      <PostDetail
        overflowX={"hidden"}
        marginY={{ base: 2 }}
        // maxWidth={"640px"}
        marginX={"auto"}
        postDetail={post}
      />
    </>
  );
};
