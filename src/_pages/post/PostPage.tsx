import { NextSeo, NextSeoProps } from "next-seo";
import { useRouter } from "next/router";
import { FC } from "react";

import { usePostDetail } from "@/features/post/hooks/usePostDetail";
import { Box } from "@/libs/chakra";
import { RichMarkdownContent } from "@/shared/components/RichMarkdownContent";

export const PostPage: FC = () => {
  const router = useRouter();
  const id = (router.query.id as string) || "";
  const { postDetail } = usePostDetail({ id });

  const seo = {
    title: postDetail.title,
    description: postDetail.description,
  } as NextSeoProps;

  return (
    <>
      <NextSeo {...seo} />
      <Box as="article" px={8}>
        <RichMarkdownContent html={postDetail.content} />
      </Box>
    </>
  );
};
